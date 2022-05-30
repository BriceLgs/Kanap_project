// Je viens chercher les données de l'API
fetch("http://localhost:3000/api/products")
.then((response) => response.json())
.then((data) => ajoutProduit(data))

// Je viens creer mon produit ( canapé )
function ajoutProduit(produits) {

    produits.forEach((kanap) => {
        const {_id, imageUrl, altTxt, name, description} = kanap
    
    
        const anchor = createAnchor(_id)
        const article = document.createElement("article")
        const image = CreateImage(imageUrl, altTxt)
        const h3 = CreateH3(name)
        const paragraph = CreateParagraph(description)
    
    appendElt(article, image, h3, paragraph)
    appendArticles(anchor, article)
})
}

// création de la fonction permettant d'afficher les éléments de l'article ( image, titre, paragraph )
function appendElt(article, image, h3, paragraph) {
    article.appendChild(image)
    article.appendChild(h3)
    article.appendChild(paragraph)
}

// création de la fonction permettant d'afficher l'article a la page
function appendArticles(anchor, article) {
    const items = document.querySelector("#items")
    items.appendChild(anchor)
    anchor.appendChild(article)
}

// création de l'anchor
function createAnchor(id) {
    let anchor = document.createElement("a")
    anchor.href = "./product.html?id=" + id
    return anchor
}


function CreateImage(imageUrl, altTxt) {
    const image = document.createElement("img")
    image.src = imageUrl
    image.alt = altTxt
    return image
}


function CreateH3 (name) {
    const h3 = document.createElement("h3")
    h3.textContent = name
    h3.classList.add("productName")
    return h3
}

function CreateParagraph(description) {
    const paragraph = document.createElement("p")
    paragraph.textContent = description
    paragraph.classList.add("productDescription")
    return paragraph
}