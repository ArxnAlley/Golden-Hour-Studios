// Hamburger animation

document.addEventListener("DOMContentLoaded", () => 
{
    const hamburger = document.querySelector(".hamburgerBTN");
    
    const menu = document.querySelector(".burgerLinks");

    if (!hamburger || !menu) return;

    hamburger.addEventListener("click", () => 
    {
        const isOpen = menu.classList.toggle("open");
        
        hamburger.innerHTML = isOpen ? "&#10005;" : "&#9776;";
        
        hamburger.setAttribute("aria-expanded", isOpen);
    });

        menu.querySelectorAll("a").forEach(link => 
        {
            link.addEventListener("click", () => {
            
            menu.classList.remove("open");
            
            hamburger.innerHTML = "&#9776;";
            
            hamburger.setAttribute("aria-expanded", false);
        });
    });
});