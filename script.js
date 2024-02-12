const signupform = document.querySelector(".signupform");
const loginform = document.querySelector(".loginform");

// function for signup
signupform.addEventListener("submit", function (e) {
  e.preventDefault();
  //   to prevent refresh
  const email = document.querySelector(".signupform input[type=email]").value;
  const password = document.querySelector(
    ".signupform input[type=password]"
  ).value;
  //   store in localStorage
  localStorage.setItem("email", email);
  localStorage.setItem("password", password);

  alert("Data saved successfully");
  window.location.href = "login.html";
});
