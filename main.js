//Cosas pòr hacer: utilizar confirm en formulario, acordeon plegado, sort de mayor a menor, completar la tienda, y que el ultimo cafe este (no habilitado)...plus: boton de ordenar, pointer no disponible, autochek del confirm 

//carrito de compra
const btnCart = document.getElementById("buyCar");
const containerProducts = document.querySelector(".containerProducts");
btnCart.addEventListener("click", () => {
  containerProducts.classList.toggle("cartHidden");
});

const carProduct = document.querySelector(".cartProduct");
// const rowProduct = document.querySelector(".rowProduct");
const infoProduct = document.querySelector(".infoProduct");

const deleteProduct = document.querySelector(".deleteProduct");

const countProduct = document.querySelector("#count");
const totalPagar = document.querySelector("#totalPagar");

//productos

const sectionNov = document.getElementById("sectionNov");
sectionNov.id = "sectionNov";

const apiCafe = async () => {
  const resutl = await fetch(`
  https://cafe-de-altura.vercel.app/api/products`);
  const data = await resutl.json();
  console.log(data);
  return data;
};

//funcion para agregar productos de la api a la pagina y al carrito de compras
let allCoffe = [];
const cafeInfo = async () => {
  const cafe = await apiCafe();
  const products = cafe.products;
  const articleProducts = document.querySelector(".products");

  //forEach que printa los productos en la pagina
  
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

      // const aBtn = document.createElement("a");
      // aBtn.href = `./car.html`;
      // aBtn.target = "_blank";

      const btnBuy = document.createElement("button");

      btnBuy.className = "buttonProducts";
      btnBuy.innerText = "Añadir";

      divCard.appendChild(imgCafe);
      divCard.appendChild(h4Name);
      divCard.appendChild(priceCafe);
      divCard.appendChild(btnBuy);
      // divCard.appendChild(aBtn);
      articleProducts.appendChild(divCard);

      // evento para añadir los productos al carrito
      btnBuy.addEventListener("click", () => {
        const coffeeCart = {
          cantidad: 1,
          img: imgCafe.src,
          tittle: h4Name.textContent,
          price: priceCafe.textContent,
        };

        const existCafe = allCoffe.some(
          (cafe) => cafe.tittle === coffeeCart.tittle
        );
        if (existCafe) {
          const cafeProduct = allCoffe.map((cafe) => {
            if (cafe.tittle === coffeeCart.tittle) {
              cafe.cantidad++;
              return cafe;
            } else {
              return cafe;
            }
          });
          allCoffe = [...cafeProduct];
        } else {
          allCoffe = [...allCoffe, coffeeCart];
        }
        localStorage;
        printTocart();
      });

      // funcion para añadir y pintar los cafes en el carrito de compras

      function printTocart() {
        infoProduct.innerHTML = "";

        if (allCoffe.length === 0) {
          const emptyCart = document.createElement("p");
          emptyCart.innerText = "Su carrito esta vacio";
          emptyCart.style =
            "padding-left: 2.5em; font-weight: 700;font-size: 1.3em";
          infoProduct.appendChild(emptyCart);
        }

        let totalProduct = 0;
        let totalPrecio = 0;

        //forEach para pintar los cafes en el carrito y subirlos a localStorage
        allCoffe.forEach((cafe) => {
          localStorage.setItem("product", JSON.stringify(allCoffe));
          const directionCart = document.createElement("div");

          const divProduct = document.createElement("div");
          divProduct.classList.add("productsCart");

          const cantidadCafe = document.createElement("span");
          cantidadCafe.classList.add("cantidadProducto");
          cantidadCafe.innerHTML = cafe.cantidad;
          const divTittleImg = document.createElement("div");
          const imgProduct = document.createElement("img");
          imgProduct.src = cafe.img;
          imgProduct.style = "width: 120px; height: 120px";

          const titleProduct = document.createElement("h4");
          titleProduct.innerHTML = cafe.tittle;

          divTittleImg.appendChild(imgProduct);
          divTittleImg.appendChild(titleProduct);
          divTittleImg.classList.add("tituloProducto");

          const spanPrice = document.createElement("span");
          spanPrice.classList.add("precioProducto");
          spanPrice.innerHTML = cafe.price;

          const imgDeleteProduct = document.createElement("div");
          imgDeleteProduct.innerHTML = ` <svg class="btnDelete" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
          <path stroke-linecap="round" stroke-linejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"></path>
        </svg>`;
          imgDeleteProduct.classList.add("btnDelete");

          const btnDelete = document.createElement("button");
          btnDelete.style =
            "background-color:transparent;border:0px; cursor:pointer";

          btnDelete.appendChild(imgDeleteProduct);

          divProduct.appendChild(cantidadCafe);
          divProduct.appendChild(divTittleImg);
          divProduct.appendChild(spanPrice);
          divProduct.appendChild(btnDelete);
          directionCart.appendChild(divProduct);
          infoProduct.appendChild(directionCart);

          btnDelete.addEventListener("click", () => {
            const tittleP = cafe.tittle;
            if (cafe.cantidad > 1) {
              cafe.cantidad--;
            } else {
              allCoffe = allCoffe.filter(
                (product) => product.tittle !== tittleP
              );
            }
            printTocart();
          });

          if (cafe.price[1].includes(",")) {
            totalPrecio =
              totalPrecio + parseInt(cafe.cantidad * cafe.price.slice(0, 1));
          } else {
            totalPrecio =
              totalPrecio + parseInt(cafe.cantidad * cafe.price.slice(0, 2));
          }
          totalProduct = totalProduct + cafe.cantidad;
        });
        totalPagar.innerText = `${totalPrecio},00€`;

        countProduct.innerText = totalProduct;
      }
    }
  });
};

cafeInfo();

//Zona de preguntas
let invisible = false;
let invisible1 = false;
let invisible2 = false;


const btnOrder = document.getElementById("btnOrder");
btnOrder.style = "background-color:transparent;border:0px; cursor:pointer; transition: all 0.5s linear;";
const btnLowPrice = document.getElementById("btnLowPrice");
btnLowPrice.style = "background-color:transparent;border:0px; cursor:pointer; transition: all 0.5s linear;";
const btnSend = document.getElementById("btnSend");
btnSend.style = "background-color:transparent;border:0px; cursor:pointer; transition: all 0.5s linear;";

const pOrder = document.getElementsByClassName("pOrder")[0];
// pOrder.style.transition = "opacity 0.5s ease";




const pLowerPrice = document.getElementsByClassName("pLowerPrice")[0];

const pSend = document.getElementsByClassName("pSend")[0];

const placeOrder = document.getElementById("placeOrder");
placeOrder.style.cursor='pointer'


const lowPrice = document.getElementById("lowPrices");
lowPrice.style.cursor='pointer'
const sendCoffee = document.getElementById("sendCoffee");
sendCoffee.style.cursor='pointer'

const faq1 = document.getElementById('faq1')
const faq2 = document.getElementById('faq2')
const faq3 = document.getElementById('faq3')

const pFaq2 = document.getElementById('pFaq2')
const pFaq3 = document.getElementById('pFaq3')

placeOrder.addEventListener("click", () => {
  hideShowP(pOrder, btnOrder, placeOrder,faq1);
});

lowPrice.addEventListener("click", () => {
  hideShowP1(pLowerPrice, btnLowPrice, lowPrice,faq2,pFaq2);
});
sendCoffee.addEventListener("click", () => {
  hideShowP2(pSend, btnSend, sendCoffee,faq3,pFaq3);
});

function hideShowP(divBot, btn, divTop, faq,p) {
  
  if (invisible) {
    invisible = false;
    divBot.classList.remove("invisible");
    divTop.style = "border-bottom-left-radius: 0px";
    divTop.style = "border-bottom-right-radius: 0px";
    divTop.style = "cursor:pointer";
    btn.style.transform = "";
    faq.style= 'border-bottom: 2px solid;border-color: #e3ded7;'
  } else {
    faq.style.border = 'none'
    invisible = true;
    divBot.classList.add("invisible");
    divTop.style =
    "border-bottom-left-radius: 10px;border-bottom-right-radius: 10px; cursor:pointer";
    btn.style.transform = "rotate(180deg)";
  }
}

function hideShowP1(divBot, btn, divTop, faq,p) {
  
  if (invisible1) {
    invisible1 = false;
    divBot.classList.remove("invisible");
    p.classList.remove("invisible");
    p.style.display='block'
    divTop.style = "border-bottom-left-radius: 0px";
    divTop.style = "border-bottom-right-radius: 0px";
    divTop.style = "cursor:pointer";
    btn.style.transform = "";
    faq.style= 'border-bottom: 2px solid;border-color: #e3ded7;'
    pFaq2.style='display:block'
    
  } else {
    faq.style.border = 'none'
    invisible1 = true;
    divBot.classList.add("invisible");
    p.classList.add("invisible");
    divTop.style =
    "border-bottom-left-radius: 10px;border-bottom-right-radius: 10px; cursor:pointer";
    btn.style.transform = "rotate(180deg)";
    console.log('hola');
    setTimeout(() => {
      pFaq2.style='display:none';
    }, 500);
    
  }
}

function hideShowP2(divBot, btn, divTop, faq,p) {
  
  if (invisible2) {
    invisible2 = false;
    divBot.classList.remove("invisible");
    p.classList.remove("invisible");
    divTop.style = "border-bottom-left-radius: 0px";
    divTop.style = "border-bottom-right-radius: 0px";
    divTop.style = "cursor:pointer";
    btn.style.transform = "";
    faq.style= 'border-bottom: 2px solid;border-color: #e3ded7;'
  } else {
    faq.style.border = 'none'
    invisible2 = true;
    divBot.classList.add("invisible");
    p.classList.add("invisible");
    divTop.style =
      "border-bottom-left-radius: 10px;border-bottom-right-radius: 10px; cursor:pointer";
    btn.style.transform = "rotate(180deg)";
    
  }
}
//Formulario

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

  if (
    nameArea.value.length === 0 ||
    emailArea.value.length === 0 ||
    phoneArea.value.length === 0
  ) {
    alert("There can be no empty field");
  } else if (!/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g.test(emailArea.value)) {
    alert("You must enter the correct Email Format");
  } else if (!checkbox.checked) {
    const confirmCheck = confirm("Please accept the terms and conditions");
    if (confirmCheck) {
      checkbox.checked = true
      
    }
  } else {
    newFormData.push(FormData);
    localStorage.setItem("FormData", JSON.stringify(newFormData));
    nameArea.value = "";
    emailArea.value = "";
    phoneArea.value = "";
    messageArea.value = "";
    checkbox.checked = false;
    alert("Your form has been sent successfully");
  }
}
