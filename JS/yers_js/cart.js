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

// Counting the total number of cards
const totalItems = cartStorage.length + cartStorageSales.length;

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
    const itemCountMessage = document.createElement("p");
    itemCountMessage.className = "text-center my-5";
    itemCountMessage.innerText = `You have ${totalItems} item(s) in your cart.`; 
    cartSide.appendChild(itemCountMessage);

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

function showModal(content) {
    // Creating an overlay to darken the background
    const overlay = document.createElement("div");
    overlay.style.position = "fixed";
    overlay.style.top = 0;
    overlay.style.left = 0;
    overlay.style.width = "100%";
    overlay.style.height = "100%";
    overlay.style.backgroundColor = "rgba(0, 0, 0, 0.5)";
    overlay.style.display = "flex";
    overlay.style.alignItems = "center";
    overlay.style.justifyContent = "center";
    overlay.style.zIndex = "1000";

    // Creating the modal window itself
    const modal = document.createElement("div");
    modal.style.width = "70%"; // Window width
    modal.style.height = "70%"; // Window height
    modal.style.maxWidth = "800px";
    modal.style.padding = "40px";
    modal.style.backgroundColor = "white";
    modal.style.borderRadius = "8px";
    modal.style.boxShadow = "0 4px 8px rgba(0, 0, 0, 0.2)";
    modal.style.overflowY = "auto";
    modal.innerHTML = `<p>${content}</p><button id="closeModal">Close</button>`;

    // Adding a modal window to the overlay
    overlay.appendChild(modal);

    // Adding an overlay to the body
    document.body.appendChild(overlay);

    // Closing a modal window with a button
    document.getElementById("closeModal").onclick = () => {
        document.body.removeChild(overlay);
    };
}

document.querySelectorAll(".btn-success").forEach(button => {
    button.addEventListener("click", (event) => {
        event.preventDefault();
        showModal("Your custom message here.");
    });
});