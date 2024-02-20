import json

import boto3
import pymysql


def get_db_credentials():
    secret_name = "rds_access_secret"
    region_name = "us-east-1"

    session = boto3.session.Session()
    client = session.client(service_name='secretsmanager', region_name=region_name)

    try:
        get_secret_value_response = client.get_secret_value(SecretId=secret_name)
        secret = get_secret_value_response['SecretString']
        return json.loads(secret)  # Assuming the secret is stored in JSON format
    except ClientError as e:
        raise e

def lambda_handler(event, context):
    # Extract username and password from the event
    username = event.get('username')
    password = event.get('password')
    
    # Retrieve database credentials
    db_credentials = get_db_credentials()
    
    # Connect to the MySQL database
    try:
        connection = pymysql.connect(
            host=db_credentials['host'],
            user=db_credentials['username'],
            password=db_credentials['password'],
            database='my_database',
            cursorclass=pymysql.cursors.DictCursor
        )
        
        with connection.cursor() as cursor:
            # SQL query to check if user exists
            sql = "SELECT * FROM users WHERE username = %s AND password = %s"
            cursor.execute(sql, (username, password))
            result = cursor.fetchone()
            
            # Check if user was found
            if result:
                return {
                    'statusCode': 200,
                    'body': json.dumps({'message': 'User exists'})
                }
            else:
                return {
                    'statusCode': 404,
                    'body': json.dumps({'message': 'User not found'})
                }
    except pymysql.MySQLError as e:
        print(e)
        return {
            'statusCode': 500,
            'body': json.dumps({'message': 'Internal server error'})
        }
    finally:
        connection.close()
