// Packages & Pricing Page - Hamburger Menu Functionality

document.addEventListener("DOMContentLoaded", () => 
{
    const hamburger = document.querySelector(".hamburger");

    const navLinks = document.querySelector(".navLinks");

    if (!hamburger || !navLinks) return;

    // Toggle panel

    hamburger.addEventListener("click", () => 
    {
        const isOpen = navLinks.classList.toggle("open");

        // Swap icon (keep gold color always) - using HTML entities like homepage

        hamburger.innerHTML = isOpen ? "&#10005;" : "&#9776;"; // X or burger

        hamburger.style.color = "#DAA520"; // Always gold

        // Accessibility

        hamburger.setAttribute("aria-expanded", isOpen);
    });

    // Close panel when a link is clicked

    navLinks.querySelectorAll("a").forEach(link => 
    {
        link.addEventListener("click", () => 
        {
            navLinks.classList.remove("open");
    
            hamburger.innerHTML = "&#9776;"; // Reset to burger
    
            hamburger.style.color = "#DAA520"; // Reset color
    
            hamburger.setAttribute("aria-expanded", false);
        });
    });
});