document.addEventListener('DOMContentLoaded', function() {
    const ads = JSON.parse(localStorage.getItem('leaseAds')) || [];
    const adsContainer = document.getElementById('ads-container');
    const cartLease = JSON.parse(localStorage.getItem("cartLease") || "[]");
    const rowCount = document.getElementById('row-count');

    function filterAds() {
        const priceFrom = parseFloat(document.getElementById('price-from').value) || 0;
        const priceTo = parseFloat(document.getElementById('price-to').value) || Infinity;
        const areaFrom = parseFloat(document.getElementById('arear-from').value) || 0;
        const areaTo = parseFloat(document.getElementById('area-to').value) || Infinity;
        const rooms = document.getElementById('rooms').value;
        const propertyType = document.getElementById('property-type').value;

        const filteredAds = ads.filter(ad => {
            const price = parseFloat(ad.price);
            const area = parseFloat(ad.area);
            const matchesPrice = price >= priceFrom && price <= priceTo;
            const matchesArea = area >= areaFrom && area <= areaTo;
            const matchesRooms = rooms === "" || ad.rooms === rooms;
            const matchesType = propertyType === "" || ad.property === propertyType;
            return matchesPrice && matchesArea && matchesRooms && matchesType;
        });

        displayAds(filteredAds);
    }

    function displayAds(filteredAds) {
        adsContainer.innerHTML = '';
        filteredAds.forEach(ad => {
            const adCard = document.createElement('div');
            adCard.className = 'card mb-4 shadow-sm';
            adCard.innerHTML = `
                <div class="row g-0">
                    <div class="col-md-4">
                        <img src="${ad.image || 'default_image.jpg'}" class="img-fluid rounded-start" alt="Card image" style="height: 271px; object-fit: cover;">
                    </div>
                    <div class="col-md-4">
                        <div class="card-body">
                            <h5 class="card-title">${ad.category} - ${ad.property}</h5>
                            <p class="card-text"><strong>Location:</strong> ${ad.location}</p>
                            <p class="card-text"><strong>Price:</strong> $${ad.price}</p>
                            <p class="card-text"><strong>Number of Rooms:</strong> ${ad.rooms}</p>
                            <p class="card-text"><strong>Area:</strong> ${ad.area} sq. meters</p>
                            <br><button class="btn btn-primary add-to-cart-btn">Add to Cart</button>
                        </div>
                    </div>
                    <div class="col-md-4">
                        <div class="card-body">
                            <p class="card-text"><strong>Additional:</strong> ${ad.additional}</p>
                        </div>
                    </div>
                </div>
            `;

            const button = adCard.querySelector('.add-to-cart-btn');
            const isInCart = cartLease.some(item => item.location === `${ad.category} - ${ad.property}`);

            if (isInCart) {
                updateButtonState(button);
            }

            button.addEventListener('click', () => {
                const cartStorageLease = JSON.parse(localStorage.getItem("cartLease") || "[]");
                const cardLease = { 
                    title: ad.location,
                    location: `${ad.category} - ${ad.property}`, 
                    price: `$${ad.price}`, 
                    rooms: ad.rooms, 
                    area: ad.area, 
                    additional: ad.additional,
                    imgSrc: ad.image 
                };
                
                localStorage.setItem("cartLease", JSON.stringify([...cartStorageLease, cardLease]));
                updateButtonState(button);
                addToCart(button);
            });

            adsContainer.appendChild(adCard);
        });
        
        rowCount.innerText = `Total properties found: ${filteredAds.length}`;
    }

    function updateButtonState(button) {
        button.innerText = "Already in cart";
        button.classList.remove("btn-primary");
        button.classList.add("btn-secondary");
        button.disabled = true;
    }

    function addToCart(button) {
        const card = button.closest('.card');
        const productImage = card.querySelector('img');
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
    }

    document.querySelector('.filter-form').addEventListener('submit', function(event) {
        event.preventDefault();
        filterAds();
    });

    displayAds(ads);
});

/*
document.addEventListener("DOMContentLoaded", function() {
    const tableContainer = document.querySelector("main");
    const textElement = document.createElement("p");

    textElement.textContent = "Some text under this table";
    textElement.style.marginTop = "20px";
    tableContainer.appendChild(textElement);
});

document.addEventListener("DOMContentLoaded", function() {
    const tableContainer = document.querySelector("main");
    const circle = document.createElement("div");

    circle.style.width = "100px";
    circle.style.height = "100px";
    circle.style.backgroundColor = "blue";
    circle.style.borderRadius = "50%";
    circle.style.mardingtop = "20px";
    circle.style.transition = "transform 0.3s ease";

    tableContainer.appendChild(circle);

    circle.addEventListener("mouseover", function() {
        circle.style.transform = "scale(1.3)";
    });

    circle.addEventListener("mouseout", function() {
        circle.style.transform = "scale(1)";
    })
});

document.addEventListener("DOMContentLoaded", function() {
    const tableContainer = document.querySelector("main");
    const button = document.createElement("button");

    button.textContent = "Button";
    button.style.padding = "10px 20px";
    button.style.marginTop = "20px";
    button.style.backgroundColor = "green";
    button.style.color = "white";
    button.style.border = "none";
    button.style.borderRadius = "5px";
    button.style.cursor = "pointer";
    button.style.transition = "background-color 0.3s ease";

    tableContainer.style.display = "flex";
    tableContainer.style.justifyContent = "center";
    tableContainer.style.alignItems = "center";

    tableContainer.appendChild(button);

    button.addEventListener("mouseover", function() {
        button.style.backgroundColor = "red";
    });

    button.addEventListener("mouseout", function() {
        button.style.backgroundColor = "green";
    });
});*/