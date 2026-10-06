document.addEventListener("DOMContentLoaded", () => {

    const header = document.querySelector(".header");
    const menuButton = document.getElementById("menuButton");
    const nav = document.getElementById("nav");
    const navLinks = document.querySelectorAll(".nav a");
    const revealElements = document.querySelectorAll(".reveal");

    const updateHeader = () => {
        header.classList.toggle("scrolled", window.scrollY > 30);
    };

    updateHeader();
    window.addEventListener("scroll", updateHeader, { passive: true });


    if (menuButton && nav) {
        menuButton.addEventListener("click", () => {
            const open = nav.classList.toggle("open");

            menuButton.classList.toggle("active", open);
            menuButton.setAttribute("aria-expanded", String(open));
            document.body.classList.toggle("menu-open", open);
        });

        navLinks.forEach(link => {
            link.addEventListener("click", () => {
                nav.classList.remove("open");
                menuButton.classList.remove("active");
                menuButton.setAttribute("aria-expanded", "false");
                document.body.classList.remove("menu-open");
            });
        });
    }


    const observer = new IntersectionObserver(
        entries => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("visible");
                    observer.unobserve(entry.target);
                }
            });
        },
        {
            threshold: 0.12,
            rootMargin: "0px 0px -40px 0px"
        }
    );

    revealElements.forEach(element => observer.observe(element));

});
