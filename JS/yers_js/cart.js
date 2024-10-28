const cartSide = document.querySelector(".row.mt-4");

const cartStorage = JSON.parse(localStorage.getItem("cart") || "[]")

if (cartStorage.length) {
    cartStorage.forEach(el => {
        const {title, price, imgSrc, selectedApartments } = el

        const newCard = document.createElement("div")
        newCard.className = "col-md-4";
        newCard.innerHTML = `
            <div class="card h-100 d-flex flex-column">
                <img src="${imgSrc}" class="card-img-top" alt="Card image">
                <div class="card-body d-flex flex-grow-1 flex-column">
                    <h5 class="card-title">${title}</h5>
                    <p class="card-text">${price}</p><hr>
                    <p>${selectedApartments.join('<br>')}</p><hr>
                </div>
                <div class="mt-auto">
                    <a href="#" class="mb-2 btn btn-danger" onclick="removeFromCart('${title}')">Remove</a>
                    <a href="#" class="mb-2 btn btn-success">Some</a>
                </div>
            </div>
        `;
        cartSide.appendChild(newCard)
    });
} else {
    const emptyMessage = document.createElement("p");
    emptyMessage.textContent = "Your cart is empty. Tap search to select some housing.";
    emptyMessage.className = "text-center"; 
    cartSide.appendChild(emptyMessage);
}

function removeFromCart(title) {
    const cartStorage = JSON.parse(localStorage.getItem("cart") || "[]");
    const updatedCart = cartStorage.filter(item => item.title !== title);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
    location.reload(); // Перезагружаем страницу, чтобы обновить корзину
}