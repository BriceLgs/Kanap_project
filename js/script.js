fetch("http://localhost:3000/api/products")
.then((response) => response.json())
.then((data) => ajoutProduit(data))

function ajoutProduit(Produit) {
    console.log(Produit)
    const imageUrl = Produit[0].imageUrl
    console.log("url de l'image", imageUrl)


let anchor = document.createElement("a")
anchor.href = imageUrl
anchor.text = "test"
const items = document.querySelector("#items")
items.appendChild(anchor)
console.log("ajout de lien")
    
}