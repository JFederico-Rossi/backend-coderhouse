//socket de cliente
document.addEventListener("DOMContentLoaded", () => {
const socket = io()

socket.on("getProducts", (data) => {
    const products = document.getElementById("list-products")
    if (!products) {
        console.error('El elemento con id "list-products" todavía no fue creado');
        return;
    }
    products.innerHTML = ""

    data.forEach(product => {
        const div = document.createElement("div")
        div.innerHTML = `
        <h4> ${product.title} </h4>
        <p> $ ${product.price}</p>
        <p> ${product.description}</p>
        `
        products.appendChild(div)
        
    });
})
})