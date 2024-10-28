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
    })
})

function flyToCart(button) {
    const card = button.closest('.card');
    const productImage = card.querySelector('.card-img-top');
    const cartIcon = document.getElementById("cart-icon");

    // Получаем начальные и конечные координаты
    const productRect = productImage.getBoundingClientRect();
    const cartRect = cartIcon.getBoundingClientRect();

    // Создаем клон изображения
    const flyingImage = productImage.cloneNode(true);
    flyingImage.style.position = 'fixed';
    flyingImage.style.left = `${productRect.left}px`;
    flyingImage.style.top = `${productRect.top}px`;
    flyingImage.style.width = `${productRect.width}px`;
    flyingImage.style.height = `${productRect.height}px`;
    flyingImage.style.zIndex = '1000'; // Устанавливаем высокий z-index для поверхностного слоя
    flyingImage.style.transition = 'all 1s ease-in-out';
    flyingImage.style.borderRadius = '10%'; // Закругление углов
    document.body.appendChild(flyingImage);

    // Запускаем анимацию
    setTimeout(() => {
        flyingImage.style.left = `${cartRect.left}px`;
        flyingImage.style.top = `${cartRect.top}px`;
        flyingImage.style.width = '30px';
        flyingImage.style.height = '30px';
        flyingImage.style.opacity = '0.5';
    }, 10);

    // Удаляем клон и добавляем класс анимации корзине
    flyingImage.addEventListener('transitionend', () => {
        flyingImage.remove();
        cartIcon.classList.add('animated');

        // Удаляем класс анимации после её завершения
        setTimeout(() => {
            cartIcon.classList.remove('animated');
        }, 500); // Продолжительность анимации совпадает с CSS (0.5s)
    });
}

function addToCart(button) {

    // Запускаем анимацию
    flyToCart(button);
}
