document.addEventListener('DOMContentLoaded', function() {
    const ads = JSON.parse(localStorage.getItem('salesAds')) || [];
    const adsContainer = document.getElementById('ads-container');
    const cartSales = JSON.parse(localStorage.getItem("cartSales") || "[]");

    function addToCart(button) {
        const card = button.closest('.card');
        const productImage = card.querySelector('.card-img-top');
        const cartIcon = document.getElementById("cart-icon");

        const productRect = productImage.getBoundingClientRect();
        const cartRect = cartIcon.getBoundingClientRect();

        const flyingImage = productImage.cloneNode(true);
        flyingImage.style.position = 'fixed';
        flyingImage.style.left = `${productRect.left}px`;
        flyingImage.style.top = `${productRect.top}px`;
        flyingImage.style.width = `${productRect.width}px`;
        flyingImage.style.height = `${productRect.height}px`;
        flyingImage.style.zIndex = '1000';
        flyingImage.style.transition = 'all 1s ease-in-out';
        flyingImage.style.borderRadius = '10%';
        document.body.appendChild(flyingImage);

        setTimeout(() => {
            flyingImage.style.left = `${cartRect.left}px`;
            flyingImage.style.top = `${cartRect.top}px`;
            flyingImage.style.width = '30px';
            flyingImage.style.height = '30px';
            flyingImage.style.opacity = '0.5';
        }, 10);

        flyingImage.addEventListener('transitionend', () => {
            flyingImage.remove();
            cartIcon.classList.add('animated');

            setTimeout(() => {
                cartIcon.classList.remove('animated');
            }, 500); 
        });

        button.innerText = "Already in cart";
            button.classList.remove("btn-primary");
            button.classList.add("btn-secondary");
            button.disabled = true;
    };

    ads.forEach(ad => {
        const adCard = document.createElement('div');
        adCard.className = 'card mb-4';
        adCard.innerHTML = `
            <div class="card-body">
                <h5 class="card-title">${ad.category} - ${ad.property}</h5>
                <p class="card-text"><strong>Location:</strong> ${ad.location}</p>
                <p class="card-text"><strong>Price:</strong> $${ad.price}</p>
                <p class="card-text"><strong>Number of Rooms:</strong> ${ad.rooms}</p>
                <p class="card-text"><strong>Area:</strong> ${ad.area} sq. meters</p>
                <p class="card-text"><strong>Additional:</strong> ${ad.additional}</p>
                <button class="btn btn-primary add-to-cart-btn">Add to Cart</button>
            </div>
        `;
    
        const button = adCard.querySelector('.add-to-cart-btn');
        const isInCart = cartSales.some(item => item.location === ad.location && item.title === `${ad.category} - ${ad.property}`); // Убедитесь, что проверка уникальная
        
        if (isInCart) {
            updateButtonState(button);
        }
    
        button.addEventListener('click', () => {
            const cartStorageSales = JSON.parse(localStorage.getItem("cartSales") || "[]");
            const cardSales = { 
                title: `${ad.category} - ${ad.property}`, 
                location: ad.location,
                price: `$${ad.price}`, 
                rooms: ad.rooms, 
                area: ad.area, 
                additional: ad.additional,
                imgSrc: ad.imgSrc
            };
    
            localStorage.setItem("cartSales", JSON.stringify([...cartStorageSales, cardSales]));
            updateButtonState(button);
            addToCart(button);
        });
    
        adsContainer.appendChild(adCard);
    });    
});
