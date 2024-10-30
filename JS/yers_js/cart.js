let isEmpty = true;

const cartContainer = document.querySelector(".row.mt-4");

const cartStorage = JSON.parse(localStorage.getItem("cart") || "[]");
const cartStorageSales = JSON.parse(localStorage.getItem("cartSales") || "[]");
const cartStorageLease = JSON.parse(localStorage.getItem("cartLease") || "[]");

function createCartCard({ title, location, price, imgSrc, rooms, area, additional }, removeCallback) {
    const newCard = document.createElement("div");
    newCard.className = "col-md-4";
    newCard.innerHTML = `
        <div class="card h-100 d-flex flex-column">
            <img src="${imgSrc || './Assets/photo_2024-08-01_20-08-19.jpg'}" class="card-img-top" alt="Card image">
            <div class="card-body d-flex flex-grow-1 flex-column">
                <h5 class="card-title">${location}</h5>
                <p><strong>Category:</strong> ${title}</p>
                <p class="card-text"><strong>Price:</strong> ${price}</p>
                <p><strong>Number of rooms:</strong> ${rooms}</p>
                <p><strong>Area:</strong> ${area}</p>
            </div>
            <div class="mt-auto">
                <a href="#" class="mb-2 btn btn-danger" onclick="${removeCallback}('${title}')">Remove</a>
                <a href="#" class="mb-2 btn btn-success">Some</a>
            </div>
        </div>
    `;
    cartContainer.appendChild(newCard);
}

if (cartStorage.length || cartStorageSales.length || cartStorageLease.length) {
    cartStorage.forEach(ad => createCartCard(ad, 'removeFromCart'));
    cartStorageSales.forEach(ad => createCartCard(ad, 'removeFromCartSales'));
    cartStorageLease.forEach(ad => createCartCard(ad, 'removeFromCartLease'));
    isEmpty = false;
}

if (isEmpty) {
    const emptyMessage = document.createElement("p");
    emptyMessage.className = "text-center text-muted my-5";
    emptyMessage.innerText = "Your cart is empty. Tap search to find some housing.";
    cartContainer.appendChild(emptyMessage);
    
    const searchButton = document.createElement("a");
    searchButton.href = "Sales.html"; 
    searchButton.className = "mt-3 btn btn-primary btn-lg";
    searchButton.innerText = "Search"; 
    cartContainer.appendChild(searchButton); 
} else {
    const totalItems = cartStorage.length + cartStorageSales.length + cartStorageLease.length;
    const itemCountMessage = document.createElement("p");
    itemCountMessage.className = "text-center my-5";
    itemCountMessage.innerText = `You have ${totalItems} item(s) in your cart.`; 
    cartContainer.appendChild(itemCountMessage);

    const clearCartButton = document.createElement("button");
    clearCartButton.id = "clear-cart";
    clearCartButton.className = "btn btn-danger my-3";
    clearCartButton.textContent = "Clear All Items";
    clearCartButton.addEventListener("click", clearAllItems);

    cartContainer.appendChild(clearCartButton);
}

function clearAllItems() {
    localStorage.removeItem("cart"); 
    localStorage.removeItem("cartSales"); 
    localStorage.removeItem("cartLease"); 
    location.reload(); 
}

function removeFromCart(title) {
    const updatedCart = cartStorage.filter(item => item.title !== title);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
    location.reload();
}

function removeFromCartSales(title) {
    const updatedCartSales = cartStorageSales.filter(item => item.title !== title);
    localStorage.setItem("cartSales", JSON.stringify(updatedCartSales));
    location.reload();
}

function removeFromCartLease(title) {
    const updatedCartLease = cartStorageLease.filter(item => item.title !== title);
    localStorage.setItem("cartLease", JSON.stringify(updatedCartLease));
    location.reload();
}

function showModal(content) {
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

    const modal = document.createElement("div");
    modal.style.width = "70%";
    modal.style.height = "70%";
    modal.style.maxWidth = "800px";
    modal.style.padding = "40px";
    modal.style.backgroundColor = "white";
    modal.style.borderRadius = "8px";
    modal.style.boxShadow = "0 4px 8px rgba(0, 0, 0, 0.2)";
    modal.style.overflowY = "auto";
    modal.innerHTML = `<p>${content}</p><button id="closeModal">Close</button>`;

    overlay.appendChild(modal);
    document.body.appendChild(overlay);

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
