const btnForm= document.querySelector("#btnForm")

btnForm.addEventListener("submit", addToForm);

function addToForm(event) {
    event.preventDefault();

    const formData = {
      nombre: document.getElementById("nombre").value,
      email: document.getElementById("email").value,
      mensaje: document.getElementById("mensaje").value
    };

    localStorage.setItem("contactData", JSON.stringify(formData));
    alert("Mensaje enviado.");
    
  }