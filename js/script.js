fetch("http://localhost:3000/api/products")
.then((response) => response.json())
.then((data) => ajoutProduit(data))

// {
//     colors: [
//     "Blue",
//     "White",
//     "Black"
//     ],
//     _id: "107fb5b75607497b96722bda5b504926",
//     name: "Kanap Sinopé",
//     price: 1849,
//     imageUrl: "http://localhost:3000/images/kanap01.jpeg",
//     description: "Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
//     altTxt: "Photo d'un canapé bleu, deux places"
//     },

function ajoutProduit(produits) {
// const id = Produit[0].id
// const imageUrl = Produit[0].imageUrl 
// const altTxt = Produit[0].altTxt
// const name = Produit[0].name
// const description = Produit[0].description 


produits.forEach((canape) => {
    const {_id, imageUrl, altTxt, name, description} = canape
    
    
    const anchor = createAnchor(_id)
    const article = document.createElement("article")
    const image = CreateImage(imageUrl, altTxt)
    const h3 = CreateH3(name)
    const paragraph = CreateParagraph(description)
    
    appendElt(article, image, h3, paragraph)
    appendArticles(anchor, article)
})
}

function appendElt(article, image, h3, paragraph) {
    article.appendChild(image)
    article.appendChild(h3)
    article.appendChild(paragraph)
}


function createAnchor(id) {
    let anchor = document.createElement("a")
    anchor.href = "./product.html?id=" + id
    return anchor
}

function appendArticles(anchor, article) {
    const items = document.querySelector("#items")
    items.appendChild(anchor)
    anchor.appendChild(article)
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