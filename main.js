//funcionalidad de botones de navBar, telefono e inicio de sesion no, el caro de compras si
//boton descubrir origenes y comprar cafe
//sccion de novedades que funciione y que agregue los productos al carrito
// seccion de preguntas y respuestas que funciones las flechitas
//seccion de como llegar
//El formulario que funcione y envie la informacion a localStorage
// footer que funciones todos los link

const buyCar = document.getElementById("buyCar");
const sectionNov = document.getElementById("sectionNov");
sectionNov.id = "sectionNov";

const apiCafe = async () => {
  const resutl = await fetch(`
    https://cafe-de-altura.vercel.app/api/products`);
  const data = await resutl.json();
  console.log(data);
  return data;
};

const cafeInfo = async () => {
  const cafe = await apiCafe();
  const products = cafe.products;
  const articleProducts = document.getElementById("products");

  products.forEach((cafe, indice) => {
    if (indice >= 0 && indice <= 3) {
      const divCard = document.createElement("div");
      divCard.style.gap = "1em";

      const imgCafe = document.createElement("img");

      imgCafe.src = cafe.img_url;

      const h4Name = document.createElement("h4");
      h4Name.innerText = cafe.brand;

      const priceCafe = document.createElement("p");
      priceCafe.innerText = `${cafe.price},00€`;

      const aBtn = document.createElement("a");
      aBtn.href = `./car.html`;
      aBtn.target = "_blank";

      const btnBuy = document.createElement("button");

      btnBuy.className = "buttonProducts";
      btnBuy.innerText = "Añadir";

      aBtn.appendChild(btnBuy);
      divCard.appendChild(imgCafe);
      divCard.appendChild(h4Name);
      divCard.appendChild(priceCafe);
      divCard.appendChild(aBtn);
      articleProducts.appendChild(divCard);
    }
  });
};

cafeInfo();

const btnOrder = document.getElementById("btnOrder");
btnOrder.style = "background-color:transparent;border:0px";
const btnLowPrice = document.getElementById("btnLowPrice");
btnLowPrice.style = "background-color:transparent;border:0px";
const btnSend = document.getElementById("btnSend");
btnSend.style = "background-color:transparent;border:0px";

const pOrder = document.getElementById("pOrder");
pOrder.style.transition = "opacity 0.9s ease";

const pLowerPrice = document.getElementById("pLowerPrice");
pLowerPrice.style.transition = "opacity 0.9s ease";

const pSend = document.getElementById("pSend");
pSend.style.transition = "opacity 0.9s ease";

const placeOrder = document.getElementById('placeOrder')

const lowPrice = document.getElementById('lowPrices')

const sendCoffee= document.getElementById('sendCoffee')

btnOrder.addEventListener("click", () => {
  hideShowP(pOrder, btnOrder, placeOrder);
});

btnLowPrice.addEventListener("click", () => {
  hideShowP(pLowerPrice, btnLowPrice, lowPrice);
});
btnSend.addEventListener("click", () => {
  hideShowP(pSend, btnSend, sendCoffee);
});

function hideShowP(p, btn, div) {
  if (p.style.display === "none") {
    p.style.display = "block";
    div.style= 'border-bottom-left-radius: 0px'
    div.style = 'border-bottom-right-radius: 0px'
    btn.style.transform = "";
  } else {
    p.style.display = "none";
    div.style= 'border-bottom-left-radius: 10px;border-bottom-right-radius: 10px'
    btn.style.transform = "rotate(180deg)";
  }
}

const nameArea = document.getElementById("nameArea");
const emailArea = document.getElementById("emailArea");
const phoneArea = document.getElementById("phoneArea");
const messageArea = document.getElementById("messageArea");
const btnForm = document.getElementById("sendButton");
const checkbox = document.getElementById("checkbox");

btnForm.addEventListener("click", addFormData);
let newFormData = [];

function addFormData(event) {
  event.preventDefault();
  let FormData = {
    Name: nameArea.value,
    Email: emailArea.value,
    PhoneNumber: phoneArea.value,
    Message: messageArea.value,
  };
  if (!/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g.test(emailArea.value)) {
    alert('Debe introducir un Formato de Email Correcto')
  }
  else if (!checkbox.checked) {
    alert("Please accept the terms and conditions");
  } else {
    newFormData.push(FormData);
    localStorage.setItem("FormData", JSON.stringify(newFormData));
    nameArea.value = "";
    emailArea.value = "";
    phoneArea.value = "";
    messageArea.value = "";
    checkbox.checked= false
  }
}
