let isEmpty = true;

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
        isEmpty = false;
    });
}

const cartSideSales = document.querySelector(".row.mt-4");

const cartStorageSales = JSON.parse(localStorage.getItem("cartSales") || "[]")

if (cartStorageSales.length) {
    cartStorageSales.forEach(el => {
        const {title, price, imgSrc } = el

        const newCardSales = document.createElement("div")
        newCardSales.className = "col-md-4";
        newCardSales.innerHTML = `
            <div class="card h-100 d-flex flex-column">
                <img src="${imgSrc}" class="card-img-top" alt="Card image">
                <div class="card-body d-flex flex-grow-1 flex-column">
                    <h5 class="card-title">${title}</h5><hr>
                    <p class="card-text">${price}</p>
                </div>
                <div class="mt-auto">
                    <a href="#" class="mb-2 btn btn-danger" onclick="removeFromCartSales('${title}')">Remove</a>
                    <a href="#" class="mb-2 btn btn-success">Some</a>
                </div>
            </div>
        `;
        cartSideSales.appendChild(newCardSales)
        isEmpty = false;
    });
}

// We display a message if both baskets are empty
if (isEmpty) {
    const emptyMessage = document.createElement("p");
    emptyMessage.className = "text-center text-muted my-5";
    emptyMessage.innerText = "Your cart is empty. Tap search to find some housing.";
    cartSide.appendChild(emptyMessage);
    
    const searchButton = document.createElement("a");
    searchButton.href = "Sales.html"; 
    searchButton.className = "mt-3 btn btn-primary btn-lg";
    searchButton.innerText = "Search"; 
    cartSide.appendChild(searchButton); 
} else {
    const clearCartButton = document.createElement("button");
    clearCartButton.id = "clear-cart";
    clearCartButton.className = "btn btn-danger my-3";
    clearCartButton.textContent = "Clear All Items";
    clearCartButton.addEventListener("click", clearAllItems);

    cartSide.appendChild(clearCartButton);
}

function clearAllItems() {
    localStorage.removeItem("cart"); 
    localStorage.removeItem("cartSales"); 
    location.reload(); 
}

function removeFromCart(title) {
    const cartStorage = JSON.parse(localStorage.getItem("cart") || "[]");
    const updatedCart = cartStorage.filter(item => item.title !== title);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
    location.reload(); // Reloading the page to update the shopping cart
}

function removeFromCartSales(title) {
    const cartStorageSales = JSON.parse(localStorage.getItem("cartSales") || "[]");
    const updatedCartSales = cartStorageSales.filter(item => item.title !== title);
    localStorage.setItem("cartSales", JSON.stringify(updatedCartSales));
    location.reload(); // Reloading the page to update the shopping cart
}