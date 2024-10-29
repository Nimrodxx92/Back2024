const form = document.getElementById("loginForm");

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const data = new FormData(form);

  const obj = {};
  data.forEach((value, key) => (obj[key] = value));

  fetch("/auth", {
    headers: {
      "Content-type": "application/json",
    },
    method: "POST",
    body: JSON.stringify(obj),
  })
    .then((response) => response.json())
    .then((data) => {
      if (data.token) {
        localStorage.setItem("jwtToken", data.token);
        window.location.href = "/profile";
      } else {
        console.log(data.message);
      }
    })
    .catch((error) => console.log(error));
});
