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
