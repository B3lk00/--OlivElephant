console.log("Sajt je učitan.");


//hamburger i nav bar

document.addEventListener("DOMContentLoaded", function () {
    const menuToggle = document.getElementById("menuToggle");
    const mobileMenu = document.getElementById("mobileMenu");
    const dropdownButtons = document.querySelectorAll(".nav-drop");

    if (menuToggle && mobileMenu) {
        menuToggle.addEventListener("click", function () {
            mobileMenu.classList.toggle("active");

            const menuIsOpen = mobileMenu.classList.contains("active");

            menuToggle.setAttribute(
                "aria-expanded",
                menuIsOpen ? "true" : "false"
            );

            menuToggle.textContent = menuIsOpen ? "×" : "☰";
        });
    }

    dropdownButtons.forEach(function (button) {
        button.addEventListener("click", function (event) {
            if (window.innerWidth > 768) return;

            event.preventDefault();

            const currentDropdown = button.closest(".dropdown");

            document.querySelectorAll(".dropdown.open").forEach(function (dropdown) {
                if (dropdown !== currentDropdown) {
                    dropdown.classList.remove("open");
                }
            });

            currentDropdown.classList.toggle("open");
        });
    });

    document.querySelectorAll("#mobileMenu a").forEach(function (link) {
        link.addEventListener("click", function () {
            if (!mobileMenu || window.innerWidth > 768) return;

            mobileMenu.classList.remove("active");

            if (menuToggle) {
                menuToggle.textContent = "☰";
                menuToggle.setAttribute("aria-expanded", "false");
            }
        });
    });
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


/* ==========================================
   OLIV ELEPHANT INTRO ANIMACIJA
========================================== */

document.addEventListener("DOMContentLoaded", function () {
    const intro = document.getElementById("intro");
    const glitchText = document.getElementById("glitchText");

    if (!intro || !glitchText) return;

    if (sessionStorage.getItem("introPlayed")) {
        intro.remove();
        return;
    }

    sessionStorage.setItem("introPlayed", "true");

    const finalText = "OlivElephant";
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789#@!?%&_=+-*/[]{}<>|\\/~$€£¥";

    let iteration = 0;

    const interval = setInterval(() => {
        const text = finalText
            .split("")
            .map((letter, index) => {
                if (letter === " ") return " ";
                if (index < iteration) return finalText[index];
                return chars[Math.floor(Math.random() * chars.length)];
            })
            .join("");

        glitchText.innerText = text;
        iteration += 0.13;

        if (iteration >= finalText.length) {
            glitchText.innerText = finalText;
            clearInterval(interval);

            setTimeout(() => {
                glitchText.innerHTML = "OLIVELEPHANT SPORTSKO<br>REKREATIVNI CENTAR";
            }, 1200);

            setTimeout(() => {
                intro.style.opacity = "0";

                setTimeout(() => {
                    intro.remove();
                }, 800);
            }, 3200);
        }
    }, 35);
});
