console.log("Sajt je učitan.");

/* HAMBURGER MENI */

document.addEventListener("DOMContentLoaded", function () {
    const menuToggle = document.getElementById("menuToggle");
    const mobileMenu = document.getElementById("mobileMenu");

    if (menuToggle && mobileMenu) {
        menuToggle.addEventListener("click", function () {
            mobileMenu.classList.toggle("active");
        });
    }
});

/* LIGHTBOX UNIVERZALNI */

let currentImage = 0;
let images = [];

function openLightbox(index) {
    const galleryImages = document.querySelectorAll(".gallery img");

    images = Array.from(galleryImages).map(img => img.getAttribute("src"));

    currentImage = index;

    document.getElementById("lightbox-img").src = images[currentImage];
    document.getElementById("lightbox").style.display = "flex";
}

function closeLightbox() {
    document.getElementById("lightbox").style.display = "none";
}

function changeImage(direction) {
    currentImage += direction;

    if (currentImage < 0) {
        currentImage = images.length - 1;
    }

    if (currentImage >= images.length) {
        currentImage = 0;
    }

    document.getElementById("lightbox-img").src = images[currentImage];
}
