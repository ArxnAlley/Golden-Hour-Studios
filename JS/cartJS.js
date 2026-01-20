/* cartJS.js */

document.addEventListener("DOMContentLoaded", () => 
{
    // RESET CART UNLESS FROM BOOKINGS

    if (!sessionStorage.getItem("fromBookings")) 
    {
        localStorage.removeItem("cartData");
    } 

    else 
    {        
        sessionStorage.removeItem("fromBookings");
    }

    // DOM ELEMENTS
    
    const cartItemsContainer = document.getElementById("cartItemsList");
    
    const subtotalEl = document.getElementById("subtotal");
    
    const taxEl = document.getElementById("tax");
    
    const totalEl = document.getElementById("total");
    
    const checkoutBtn = document.getElementById("checkoutBtn");
    
    const checkoutOverlay = document.querySelector(".checkoutOverlay");
    
    const checkoutForm = document.querySelector(".checkoutForm");
    
    const confirmation = document.querySelector(".confirmation");

    // RENDER CART FUNCTION

    function renderCart() 
    {
        const cartData = JSON.parse(localStorage.getItem("cartData")) || [];
        
        cartItemsContainer.innerHTML = ""; // Clear container

        if (cartData.length === 0) 
        {
            cartItemsContainer.innerHTML =
                "<p>Your cart is empty. Please select a package from Bookings.</p>";
            
                subtotalEl.textContent = "$0";
            
                taxEl.textContent = "$0";
            
                totalEl.textContent = "$0";
            
                checkoutBtn.disabled = true;
            
                syncCartHeights();
            
                return;
        }

        checkoutBtn.disabled = false;

        let subtotal = 0;

        // LOOP THROUGH CART ITEMS
        
        cartData.forEach((item, index) => 
        {
            subtotal += item.price;

            const itemDiv = document.createElement("div");
            
            itemDiv.classList.add("cartItem");

            itemDiv.innerHTML = `
                <div class="itemDetails">
                    
                    <strong>${item.package}</strong><br>
                    
                    <span>${item.date} — ${item.time}</span>
                </div>

                <button class="removeItemBtn" title="Remove Item">🗑️</button>
            `;

            // REMOVE ITEM EVENT
            
            itemDiv.querySelector(".removeItemBtn").addEventListener("click", () => 
            {
                cartData.splice(index, 1);

                localStorage.setItem("cartData", JSON.stringify(cartData));

                renderCart();
            });

            cartItemsContainer.appendChild(itemDiv);
        });

        // BACK TO BOOKINGS BUTTON
        
        const backBtn = document.createElement("button");

        backBtn.classList.add("checkoutBtn", "backToBookingsBtn");

        backBtn.textContent = "Back to Bookings";

        backBtn.addEventListener("click", () => 
        {
            // Preserve current cart in sessionStorage so user can add more packages

            sessionStorage.setItem("fromCart", "true");

            window.location.href = "bookings.html";
        });

        cartItemsContainer.appendChild(backBtn);

        // CALCULATE TAX AND TOTAL

        const tax = +(subtotal * 0.07).toFixed(2);

        const total = +(subtotal + tax).toFixed(2);

        subtotalEl.textContent = `$${subtotal}`;

        taxEl.textContent = `$${tax}`;

        totalEl.textContent = `$${total}`;

        syncCartHeights();
    }

    // SYNC CART HEIGHTS
    
    function syncCartHeights() 
    {
        const summary = document.querySelector(".cartSummary");

        if (!summary) return;
        
        cartItemsContainer.style.minHeight = summary.offsetHeight + "px";
    }

    // INITIAL LOAD
    
    renderCart();

    window.addEventListener("resize", syncCartHeights);

    // CHECKOUT FLOW

    checkoutBtn.addEventListener("click", () => 
    {
        checkoutOverlay.classList.remove("hidden");
    });

    checkoutForm.addEventListener("submit", (e) => 
    {
        e.preventDefault();

        const inputs = checkoutForm.querySelectorAll("input");
        for (const input of inputs) 

        {
            if (!input.value.trim()) 
            {
                alert("Please fill out all fields.");

                return;
            }
        }

        checkoutOverlay.classList.add("hidden");

        confirmation.style.display = "block";

        setTimeout(() => 
        {
            confirmation.style.display = "none";
        }, 7000);

        localStorage.removeItem("cartData");
        
        renderCart();
    });

    checkoutOverlay.addEventListener("click", (e) => 
    {
        if (e.target === checkoutOverlay) 
        {
            checkoutOverlay.classList.add("hidden");
        }
    });

});
