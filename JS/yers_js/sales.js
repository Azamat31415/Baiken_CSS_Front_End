const cards = document.querySelectorAll(".row");

// Function for updating the button status
function updateButtonState(button) {
    button.innerText = "Already in cart";
    button.classList.remove("btn-primary");
    button.classList.add("btn-secondary");
    button.disabled = true;
}

// Loading the trash from localStorage and setting the status of the buttons
const cartSales = JSON.parse(localStorage.getItem("cartSales") || "[]");

cards.forEach((el, idx) => {
    const titleParent = el.childNodes[3];
    const title = titleParent.childNodes[1].innerText;
    const price = titleParent.childNodes[3].innerText;
    const btnParent = titleParent.childNodes[7];
    const btn = btnParent.childNodes[1];
    const imgParent = el.childNodes[1];
    const img = imgParent.childNodes[1];
    const imgSrc = img.getAttribute("src");

    // Check if there is an item in the cart to update the button
    const isInCart = cartSales.some(item => item.title === title);
    if (isInCart) {
        updateButtonState(btn);
    }

    btn.addEventListener("click", () => {
        const cartStorageSales = localStorage.getItem("cartSales") || "[]";
        const cartSales = JSON.parse(cartStorageSales);
        const cardSales = { title, price, imgSrc };

        // Save it to localStorage and update the button
        localStorage.setItem("cartSales", JSON.stringify([...cartSales, cardSales]));
        updateButtonState(btn); // We update the text and style of the button after adding it
    });
});

// Counting the number of cards
const rowElements = document.querySelectorAll('.row'); 
const rowCount = rowElements.length; 

// We find an element to display the number of cards
const rowCountDisplay = document.getElementById('row-count');
rowCountDisplay.innerText = `Total number of ads: ${rowCount}`; 