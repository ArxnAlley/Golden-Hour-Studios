/* galleryJS */

document.addEventListener("DOMContentLoaded", () => 
{
    console.log("DOM fully loaded — bookings script running");

    // ELEMENTS
    
    const stepPackage = document.getElementById("dummy-step-package");
    
    const stepDate = document.getElementById("dummy-step-date");
    
    const stepTime = document.getElementById("dummy-step-time");
    
    const packageSelect = document.getElementById("dummyPackageSelect");
    
    const timeSelect = document.getElementById("dummyTimeSelect");
    
    const addBtn = document.getElementById("dummyAddToCartBtn");
    
    const cartIcon = document.getElementById("dummyCartIcon");
    
    const cartBadge = cartIcon.querySelector(".dummyCartBadge");
    
    const prevBtn = document.getElementById("dummyPrevMonth");
    
    const nextBtn = document.getElementById("dummyNextMonth");
    
    const monthLabel = document.getElementById("dummyMonthLabel");
    
    const calendarGrid = document.getElementById("dummyCalendarGrid");
    
    const headerHeight = document.querySelector(".HEADER").offsetHeight || 140;
    
    const extraPadding = 20;

    // STATE
    
    let cartData = JSON.parse(localStorage.getItem("cartData")) || [];
    
    let currentDate = new Date();
    
    let selectedDate = null;

    // INITIALIZE CART UI
    
    cartBadge.textContent = cartData.length;
    
    if(cartData.length > 0) 
        {
        
            cartIcon.classList.remove("dummyCartHidden");
        
            cartIcon.style.opacity = "1";
        
            cartIcon.style.pointerEvents = "auto";
        } 
        
    else 
        {
            cartIcon.classList.add("dummyCartHidden");
        
            cartIcon.style.opacity = "0";
        
            cartIcon.style.pointerEvents = "none";
        }

    // HELPER: Scroll Step Into View
    
    function scrollToCard(step) 
    {
        const innerCard = step.querySelector(".dummyInner");
        
        if (!innerCard) return;
        
        const cardTop = innerCard.getBoundingClientRect().top + window.pageYOffset;
        
        const scrollPos = cardTop - headerHeight - extraPadding;
        
        window.scrollTo({ top: scrollPos, behavior: "smooth" });
    }

    // BACK BUTTONS

    document.querySelectorAll(".dummyBackBtn").forEach(btn => 
    {
        btn.addEventListener("click", () => 
        {
            const target = btn.dataset.back;
            
            [stepPackage, stepDate, stepTime].forEach(step => step.classList.remove("dummyVisible"));
            
            let targetStep = target === "package" ? stepPackage : step === "date" ? stepDate : null;
            
            if (targetStep) { targetStep.classList.add("dummyVisible"); scrollToCard(targetStep); }
        });
    });

    // STEP 1 → STEP 2
    
    packageSelect.addEventListener("change", () => 
    {
        if (!packageSelect.value) return;
        
        stepDate.classList.add("dummyVisible");
        
        scrollToCard(stepDate);
    });

    
    // CALENDAR RENDER
    
    function renderCalendar() 
    {
        calendarGrid.innerHTML = "";
        
        const year = currentDate.getFullYear();
        
        const month = currentDate.getMonth();
        
        monthLabel.textContent = currentDate.toLocaleString("default", { month: "long", year: "numeric" });
        
        const firstDay = new Date(year, month, 1).getDay();
        
        const daysInMonth = new Date(year, month + 1, 0).getDate();
        
        const totalCells = 42;

        for (let i = 0; i < totalCells; i++) 
        {
            const cell = document.createElement("div");
            
            const dayNumber = i - firstDay + 1;

            if (dayNumber > 0 && dayNumber <= daysInMonth) 
            {
                cell.textContent = dayNumber;
                
                cell.addEventListener("click", () => 
                {
                    document.querySelectorAll(".dummySelectedDate").forEach(d => d.classList.remove("dummySelectedDate"));
                    
                    cell.classList.add("dummySelectedDate");
                    
                    const monthStr = String(month + 1).padStart(2, "0");
                    
                    const dayStr = String(dayNumber).padStart(2, "0");
                    
                    selectedDate = `${year}-${monthStr}-${dayStr}`;
                    
                    stepTime.classList.add("dummyVisible");
                    
                    scrollToCard(stepTime);
                });
            } 
            
            else 
            { 
                cell.style.visibility = "hidden"; 
            }

            calendarGrid.appendChild(cell);
        }
    }

    prevBtn.addEventListener("click", () => { currentDate.setMonth(currentDate.getMonth() - 1); renderCalendar(); });
    
    nextBtn.addEventListener("click", () => { currentDate.setMonth(currentDate.getMonth() + 1); renderCalendar(); });
    
    renderCalendar();

    // PRESELECT PACKAGE IF RETURNING FROM CART

    if (sessionStorage.getItem("fromCart")) 
    {
        if(cartData.length > 0) 
        {
            const lastAddedPackage = cartData[cartData.length - 1].package;
            
            for (let i = 0; i < packageSelect.options.length; i++) 
            {
                if (packageSelect.options[i].text === lastAddedPackage) 
                {
                    packageSelect.selectedIndex = i;

                    break;
                }
            }
            
            stepDate.classList.add("dummyVisible");
            
            scrollToCard(stepDate);
        }
        
        sessionStorage.removeItem("fromCart");
    }

    // ADD TO CART

    addBtn.addEventListener("click", () => 
    {
        const selectedPackage = packageSelect.options[packageSelect.selectedIndex].text;
        
        const selectedTime = timeSelect.value;
        
        const price = parseFloat(packageSelect.selectedOptions[0]?.dataset.price || 0);

        if (!selectedPackage || !selectedDate || !selectedTime) 
        {
            alert("Please select a package, date, and time before adding to cart.");
            
            return;
        }

        cartData.push({ package: selectedPackage, price, date: selectedDate, time: selectedTime });

        localStorage.setItem("cartData", JSON.stringify(cartData));
        
        sessionStorage.setItem("fromBookings", "true");

        cartBadge.textContent = cartData.length;
        
        cartIcon.classList.remove("dummyCartHidden");
        
        cartIcon.style.opacity = "1";
        
        cartIcon.style.pointerEvents = "auto";

        console.log("Added to cart:", cartData[cartData.length - 1]);
        
        alert("Package added to your cart!");
    });

});

