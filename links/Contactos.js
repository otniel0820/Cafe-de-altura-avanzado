const btnForm= document.querySelector("#btnForm")

btnForm.addEventListener("click", addToForm);

function addToForm(event) {
    event.preventDefault();

    const formData = {
      nombre: document.getElementById("nombre").value,
      email: document.getElementById("email").value,
      mensaje: document.getElementById("mensaje").value
    };

    console.log(formData);

    localStorage.setItem("contactData", JSON.stringify(formData));
    alert("Mensaje enviado.");
    
  }