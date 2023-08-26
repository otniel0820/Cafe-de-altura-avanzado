document.getElementById("registrationForm").addEventListener("submit", function(event) {
    event.preventDefault();

    // Obtener valores de los campos
    const username = document.getElementById("username").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    // Crear un objeto con los datos del usuario
    const userData = {
      username: username,
      email: email,
      password: password
    };

    // Guardar los datos en localStorage
    localStorage.setItem("userData", JSON.stringify(userData));

    // Limpiar los campos después del registro
    document.getElementById("username").value = "";
    document.getElementById("email").value = "";
    document.getElementById("password").value = "";

    alert("Usuario registrado correctamente. Los datos se han guardado en localStorage.");
  });