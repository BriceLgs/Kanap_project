const locationUrl = window.location.search;
const urlSearch = new URLSearchParams(locationUrl);
const id = urlSearch.get("id");
if ( id != null) {
    var itemPrice = 0
    var imgUrl, altTxt
}

// API //

fetch(`http://localhost:3000/api/products/${id}`)
.then((response) => response.json())
.then((response) => dataParam(response))

function dataParam(kanap){

    const { imageUrl, name, altText, colors, description, price } = kanap
    createImage(imageUrl, altText)
    createName(name)
    createPrice(price)
    createDescription(description)
    createColors(colors)
}

// Function pour l'image //

function createImage(imageUrl, altText) {
    const image = document.createElement("img")
    image.src = imageUrl
    image.alt = altText
    const parent = document.querySelector(".item__img")
    parent.appendChild(image)
}


// Function pour l'image //

function createName(name) {
    const h1 = document.querySelector("#title")
    document.querySelector("#title").textContent = name
}

// Function pour l'image //

function createPrice(price) {
    const span = document.querySelector("#price")
    document.querySelector("#price").textContent = price
}

// Function pour l'image //

function createDescription(description){
const desc = document.querySelector("#description")
document.querySelector("#description").textContent = description
}

// Function pour l'image //

function createColors(colors) {
    const select = document.querySelector("#colors")
    colors.forEach(color => {
        const option = document.createElement("option")
        option.value = color
        option.textContent = color
        select.appendChild(option)
    });
}

// addEventListener BUTTON FUNCTION //

const button = document.querySelector("#addToCart") 
button.addEventListener("click", onClick)
function onClick() {
        const color = document.querySelector("#colors").value
        const quantity = document.querySelector("#quantity").value
        const prix = document.querySelector("#price").value
       
        if (orderInvalid(color, quantity)) return
        addToCart(color, quantity, prix)
    }

// FUNCTION DE COMMANDE //

function addToCart(color, quantity, prix) {
    var cart = localStorage.getItem("cart");
    

    if (cart == null) {
        cart = [];
    } else {
        cart = JSON.parse(cart);
    }
    
    const data = {
        id: id,
        color: color,
        quantity: Number(quantity)
    }

    if (cart.length == 0) {
        cart.push(data);
    } else {
        var find = false;
       for (let index = 0; index < cart.length; index++) {
           const element = cart[index];
            if (element.id == id && element.color == color) {
                find = true;
                cart[index].quantity+=Number(quantity);
            }
       }
       console.log(cart)

       if (!find) {
           cart.push(data);
       }
    }

    
    localStorage.setItem("cart", JSON.stringify(cart));

    }

// SI C'EST INVALIDE : ALERT //

function orderInvalid(color, quantity) {
        if (color == null || color == "" || quantity == 0) {
            alert("Selectionner une couleur et une quantité");
            return true
       }
      
    }
