const signupform = document.querySelector(".signupform");
const loginform = document.querySelector(".loginform");
const confirm_password = document.querySelector(".confirm_password");
// function for signup
signupform.addEventListener("submit", function (e) {
  e.preventDefault();
  //   to prevent refresh
  const firstname = document.getElementById("firstname").value;
  const lastname = document.getElementById("lastname").value;
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  const confirmPassword = document.getElementById("confirmPassword").value;

  if (password !== confirmPassword) {
    alert("password do not match");
    return;
  }

  //   store in localStorage
  localStorage.setItem("firstname", firstname);
  localStorage.setItem("lastname", lastname);
  localStorage.setItem("email", email);
  localStorage.setItem("password", password);

  alert("Data saved successfully");
  window.location.href = "login.html";
});
