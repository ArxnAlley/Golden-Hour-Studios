// Events Page - Card Flip for Touch Devices

document.addEventListener("DOMContentLoaded", () => 
{
    const eventCards = document.querySelectorAll(".eventCard");

    if (!eventCards.length) return;

    eventCards.forEach(card => 
    {
        // Track if card is flipped
        let isFlipped = false;

        // Handle touch/click events
        card.addEventListener("click", (e) => 
        {
            // Only on touch devices or small screens
            if (window.innerWidth <= 768) 
            {
                e.preventDefault();
                
                // Toggle flip state
                isFlipped = !isFlipped;
                
                const cardInner = card.querySelector(".cardInner");
                
                if (isFlipped) 
                {
                    cardInner.style.transform = "rotateY(180deg)";
                } 
                else 
                {
                    cardInner.style.transform = "rotateY(0deg)";
                }
            }
        });

        // Reset flip on window resize if switching to desktop
        window.addEventListener("resize", () => 
        {
            if (window.innerWidth > 768) 
            {
                const cardInner = card.querySelector(".cardInner");
                cardInner.style.transform = "";
                isFlipped = false;
            }
        });
    });
});