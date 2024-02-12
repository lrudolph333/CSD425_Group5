const signupform = document.querySelector(".signupform");
const loginform = document.querySelector(".loginform");

// function for login
loginform.addEventListener("submit", function (e) {
  e.preventDefault();
  // getting data from localStorage
  const storedEmail = localStorage.getItem("email");
  const storedPassword = localStorage.getItem("password");
  // Retrieve email and password from login form
  const email = document.querySelector(".loginform input[type=email]").value;
  const password = document.querySelector(
    ".loginform input[type=password]"
  ).value;
  if (email === storedEmail && password === storedPassword) {
    window.location.href = "index.html";
  } else {
    alert("Invalid email or password. Please try again");
  }
});
