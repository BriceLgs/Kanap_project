const orderId = getOrderId()
displayOrderId(orderId)
removeDataCache()


function getOrderId() {
    const queryString = window.location.search 
    const urlParams = new URLSearchParams(queryString)
    return urlParams.get("orderId")
    
}


function displayOrderId(orderId) {
    const orderIdElement = document.getElementById("orderId")
    orderIdElement.textContent = orderId
}

// Une fois la page de confirmation charger ( remove du localStorage )

function removeDataCache() {
    const cache = window.localStorage
    cache.clear()
}