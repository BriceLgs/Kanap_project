// CREATION DU CART ARRAY / POUR CHAQUE ITEM : DISPLAY //

var cart = localStorage.getItem("cart");

    // FORM //

const orderButton = document.querySelector("#order")
orderButton.addEventListener("click", (e) => submitForm(e))

if (cart == null) {
    cart = [];
} else {
    cart = JSON.parse(cart);
}
var total = 0;

// création de la promesse 


const promises = cart.map(cartItem => fetch("http://localhost:3000/api/products/" + cartItem.id).then(response => response.json()))

// mise en place de la promesse

Promise.all(promises).then((kanaps) => {
    cart.forEach(eltCart => {
        var kanap = getKanapFromCart(eltCart, kanaps)
        

        const article = createArticle(eltCart)
        const imageDiv = createImageDiv(kanap)
        article.appendChild(imageDiv)
        

        const cartItemContent = document.createElement("div")
        cartItemContent.classList.add("cart__item__content")
        
        
        
    
        const description = createCardDescription(eltCart, kanap)

        const settings = document.createElement("div")
        settings.classList.add("cart__item__content__settings")
        
        
        const quantity = document.createElement("div")
        quantity.classList.add("cart__item__content__settings__quantity")
        const p = document.createElement("p")
        p.textContent = "Qté : "
        quantity.appendChild(p)
        const input = document.createElement("input")
        input.type = "number"
        input.classList.add("itemQuantity")
        input.name = "itemQuantity"
        input.min = "1"
        input.max = "100"
        input.value = eltCart.quantity
        // création de l'event ( quantité )
        input.addEventListener("change", (event) => {
            eltCart.quantity = event.target.value
            updateData(cart, kanaps)
        })
        
        quantity.appendChild(input)
        settings.appendChild(quantity)

        const div = document.createElement("div")
        div.classList.add("cart__item__content__settings__delete")
        // création de l'event ( suppression )
        div.addEventListener("click", () => {
            const itemtoDelete = cart.findIndex(
                (item) => item.id === eltCart.id && item.color === eltCart.color)
                cart.splice(itemtoDelete, 1)
                updateData(cart, kanaps)
                deleteDataFromPage(eltCart)
        })
        
        const p3 = document.createElement("p")
        p3.textContent = "Supprimer"
        div.appendChild(p3)
        settings.appendChild(div)
        
        cartItemContent.appendChild(description)
        cartItemContent.appendChild(settings)

        article.appendChild(cartItemContent)
        displayArticle(article)
    })

    displayTotalPrice(cart, kanaps)
    displayTotalQuantity()
    
})
        .catch(err => console.log(err))

        // Function de la création du kanap
function getKanapFromCart(cartItem, kanaps) {
    var result = null;
    kanaps.forEach(kanap => {
        if (kanap._id == cartItem.id) {
            result = kanap;
        }
    })
    return result
}
    
function updateData(cart, kanaps) {
    displayTotalQuantity()
    displayTotalPrice(cart, kanaps)
    newDataLocalStorage(cart)
}   

function deleteDataFromPage(cartItem) {
    document.querySelector(`article[data-id="${cartItem.id}"][data-color="${cartItem.color}"]`
    ).remove()
}

// ---LOCALSTORAGE--- //

function newDataLocalStorage(cart) {
    localStorage.setItem("cart", JSON.stringify(cart))
}


// TOTAL //
function displayTotalPrice(cart, kanaps) {
    if (cart === undefined) {
        total = 0
    } else {
        var total = 0;
        cart.forEach(elt => {
            kanaps.forEach(kanap => {
                if (elt.id == kanap._id) {
                    total = total + (elt.quantity * kanap.price);
                }
            })
        })
    }
    document.querySelector("#totalPrice").textContent = total
}

function displayTotalQuantity() {
    const totalQuantity = document.querySelector("#totalQuantity")
    const total = cart.reduce((total, cartItem) => total + cartItem.quantity, 0)
    totalQuantity.textContent = total
    // totalQuantity.textContent = total
    
}

// --- DISPLAY HTML --- //

function displayArticle(article) {
    document.querySelector("#cart__items").appendChild(article)

}

function createArticle(cartItem) {
    
    const article = document.createElement("article")
    article.classList.add("cart__item")
    article.dataset.id = cartItem.id
    article.dataset.color = cartItem.color
    return article
    
}

function createCardDescription(cartItem, kanap) {

    const description = document.createElement("div")
    description.classList.add("cart__item__content__description")
    
    const h2 = document.createElement("h2")
    h2.textContent = kanap.name;
    const p = document.createElement("p")
    p.textContent = cartItem.color;
    const p2 = document.createElement("p")
    p2.textContent = kanap.price + " €";

    description.appendChild(h2)
    description.appendChild(p)
    description.appendChild(p2)
    return description
}

function createImageDiv(kanap) {
    const div = document.createElement("div")
    div.classList.add("cart__item__img")


    const image = document.createElement("img")
    image.src = kanap.imageUrl
    image.alt = kanap.altTxt
    div.appendChild(image)
    return div
}

// ---------- FORMULAIRE ---------- //

function submitForm(e) {
    e.preventDefault();
    if (cart.length === 0) {
     alert("Veuillez acheter un produit") 
     return
    }
// si c'est invalid, tu vas pas plus loin
    if (inputInvalid()) return
    if (emailInvalid()) return
    
    // Fetch en method POST permettant de récuperer l'orderId
    const body = questionBody()
    fetch("http://localhost:3000/api/products/order", {
        method: "POST",
        body: JSON.stringify(body),
        headers: {
            "Content-Type": "application/json"
        }
    })
    .then((res) => res.json())
    .then((data) => {
        const orderId = data.orderId
        window.location.href = "/html/confirmation.html" + "?orderId=" + orderId
        return console.log(data)
    }) 
        .catch ((err) => console.log(err))
}

function questionBody() {
    const form = document.querySelector(".cart__order__form")
    const firstName = form.elements.firstName.value
    const lastName = form.elements.lastName.value
    const address = form.elements.address.value
    const city = form.elements.city.value
    const email = form.elements.email.value

    const body = { 
        contact: {
            firstName: firstName,
            lastName: lastName,
            address: address,
            city: city,
            email: email
            },   
         products: cart.map(cart => {
             return cart.id
        })
    }
    return body
}

// Configuration des input invalid 
function inputInvalid() {
    firstNameError()
    lastNameError()
    cityError()
    addressError()

}

function firstNameError() {
        const firstName = document.querySelector("#firstName").value
    if (firstName.trim() == "" || firstName.trim() <  2) {
        document.getElementById("firstNameErrorMsg").innerHTML = "Veillez remplir votre prénom"
        return true
        } 
}

function lastNameError() {
        const lastName = document.querySelector("#lastName").value
        if (lastName.trim() == "" || lastName.trim() <  2) {
            document.getElementById("lastNameErrorMsg").innerHTML = "Veillez remplir votre nom de famille"
            return true
        }    
}
    
function addressError() {
        const lastName = document.querySelector("#lastName").value
        if (lastName.trim() == "" || lastName.trim() <  2) {
            document.getElementById("addressErrorMsg").innerHTML = "Veillez remplir votre adresse"
            return true
        } 
}

function cityError() {
        const city = document.querySelector("#city").value
        if (city.trim() == "" || city.trim() < 2) {
            document.getElementById("cityErrorMsg").innerHTML = "Veillez remplir votre ville"
            return true
        }
        return false 
}

function emailInvalid() {
    const email = document.querySelector("#email").value
    if (email.trim() == "") {
        document.getElementById("emailErrorMsg").innerHTML = "Veillez remplir votre adresse email"
        return true
    } 
    const regex = /^[A-Za-z0-9+_.-]+@(.+)$/
    if (regex.test(email) === false) {
        document.getElementById("emailErrorMsg").innerHTML = "Le format de votre adresse email n'est pas correct"
        return true
    }
    return false
}

