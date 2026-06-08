console.log("Sajt je učitan.");

const dropdowns = document.querySelectorAll(".dropdown");

dropdowns.forEach((dropdown) => {
    dropdown.addEventListener("mouseenter", () => {
        dropdown.classList.add("open");
    });

    dropdown.addEventListener("mouseleave", () => {
        dropdown.classList.remove("open");
    });
});

/*lightbox za klubhouse*/

const images = [
    "images/caffe1.jpg",
    "images/caffe2.jpg",
    "images/caffe3.jpg",
    "images/caffe4.jpg"
];

let currentImage = 0;

function openLightbox(index) {
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

/*lightbox za rent a quad*/

const images = [
    "images/quad1.jpg",
    "images/buggy1.jpg",
    "images/gclass1.jpg",
    "images/rent1.jpg"
];

let currentImage = 0;

function openLightbox(index) {
    currentImage = index;
    document.getElementById("lightbox-img").src = images[currentImage];
    document.getElementById("lightbox").style.display = "flex";
}

function closeLightbox() {
    document.getElementById("lightbox").style.display = "none";
}

function changeImage(direction) {
    currentImage += direction;

    if (currentImage < 0) currentImage = images.length - 1;
    if (currentImage >= images.length) currentImage = 0;

    document.getElementById("lightbox-img").src = images[currentImage];
}

/*za prenociste*/

const images = [
    "images/apartman1.jpg",
    "images/apartman2.jpg",
    "images/apartman3.jpg",
    "images/avlija.jpg",
    "images/terasa.jpg",
    "images/priroda.jpg"
];

/*hamburger */

const menuToggle = document.getElementById("menuToggle");
const mobileMenu = document.getElementById("mobileMenu");

if (menuToggle && mobileMenu) {
    menuToggle.addEventListener("click", function () {
        mobileMenu.classList.toggle("active");
    });
}
