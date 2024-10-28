const cards = document.querySelectorAll(".card")

cards.forEach((el, idx) => {
    console.dir(el)
    const btnParent = el.childNodes[7]
    const btn = btnParent.childNodes[1]
    const titleParent = el.childNodes[3]
    const title = titleParent.childNodes[3].innerText
    const price = titleParent.childNodes[1].innerText
    const img = el.childNodes[1]
    const imgSrc = img.getAttribute('src');

    btn.addEventListener("click", () =>{
        const selectedApartments = Array.from(el.querySelectorAll('input[name="apartment"]:checked'))
                                        .map(input => input.nextElementSibling.textContent);

        if (selectedApartments.length === 0) {
            alert("Select at least 1 apartment.");
            return;
        }

        const cartStorage = localStorage.getItem("cart") || "[]"
        const cart = JSON.parse(cartStorage)
        const card = { title, price, imgSrc, selectedApartments }
        localStorage.setItem("cart", JSON.stringify([...cart, card]))

        addToCart(btn);
    })
})

function addToCart(button) {
    const card = button.closest('.card');
    const productImage = card.querySelector('.card-img-top');
    const cartIcon = document.getElementById("cart-icon");

    // We get the initial and final coordinates
    const productRect = productImage.getBoundingClientRect();
    const cartRect = cartIcon.getBoundingClientRect();

    // Creating a clone of the image
    const flyingImage = productImage.cloneNode(true);
    flyingImage.style.position = 'fixed';
    flyingImage.style.left = `${productRect.left}px`;
    flyingImage.style.top = `${productRect.top}px`;
    flyingImage.style.width = `${productRect.width}px`;
    flyingImage.style.height = `${productRect.height}px`;
    flyingImage.style.zIndex = '1000'; // Setting a high z-index for the surface layer
    flyingImage.style.transition = 'all 1s ease-in-out';
    flyingImage.style.borderRadius = '10%'; // Rounding the corners
    document.body.appendChild(flyingImage);

    // Starting the animation
    setTimeout(() => {
        flyingImage.style.left = `${cartRect.left}px`;
        flyingImage.style.top = `${cartRect.top}px`;
        flyingImage.style.width = '30px';
        flyingImage.style.height = '30px';
        flyingImage.style.opacity = '0.5';
    }, 10);

    // We delete the clone and add the animation class to the trash
    flyingImage.addEventListener('transitionend', () => {
        flyingImage.remove();
        cartIcon.classList.add('animated');

        // Deleting the animation class after its completion
        setTimeout(() => {
            cartIcon.classList.remove('animated');
        }, 500); 
    });
}
