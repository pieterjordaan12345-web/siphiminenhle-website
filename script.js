// ========================================
// SIPHIMINENHLE WEBSITE INTERACTIONS
// FIXED + FULLY SYNCED
// ========================================


// ========================================
// HEADER SHOW / HIDE (ROBUST FIX)
// ========================================

let lastScrollY = window.scrollY;

window.addEventListener("scroll", () => {
    const header = document.querySelector("header");
    if (!header) return;

    const currentScroll = window.scrollY;

    if (currentScroll > lastScrollY && currentScroll > 80) {
        header.classList.add("header-hidden");
    } else {
        header.classList.remove("header-hidden");
    }

    lastScrollY = currentScroll;
});


// ========================================
// FADE-IN ANIMATIONS (FIXED SAFE OBSERVER)
// ========================================

// IMPORTANT FIX:
// - services page uses service-card
// - contact page uses contact-card
// - homepage uses feature, about, mission etc.

const animatedElements = document.querySelectorAll(`
    .service-card,
    .feature,
    .contact-card,
    .about,
    .mission,
    .services-preview,
    .intro
`);

if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("show");
                    observer.unobserve(entry.target); // prevents re-trigger flicker
                }
            });
        },
        {
            threshold: 0.12,
            rootMargin: "0px 0px -50px 0px"
        }
    );

    animatedElements.forEach((el) => {
        if (el) observer.observe(el);
    });
} else {
    // fallback for older browsers
    animatedElements.forEach((el) => {
        if (el) el.classList.add("show");
    });
}


// ========================================
// SMOOTH SCROLLING (FIXED SAFE VERSION)
// ========================================

document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {

        const targetID = this.getAttribute("href");

        if (!targetID || targetID === "#") return;

        const target = document.querySelector(targetID);

        if (target) {
            e.preventDefault();
            target.scrollIntoView({
                behavior: "smooth",
                block: "start",
            });
        }
    });
});


// ========================================
// BUTTON RIPPLE EFFECT (FIXED SAFETY)
// ========================================

document.querySelectorAll(".btn").forEach((button) => {
    button.addEventListener("click", function (e) {

        const circle = document.createElement("span");

        const rect = button.getBoundingClientRect();

        const diameter = Math.max(rect.width, rect.height);

        circle.style.width = circle.style.height = diameter + "px";

        circle.style.left =
            e.clientX - rect.left - diameter / 2 + "px";

        circle.style.top =
            e.clientY - rect.top - diameter / 2 + "px";

        circle.classList.add("ripple");

        const oldRipple = button.querySelector(".ripple");
        if (oldRipple) oldRipple.remove();

        button.appendChild(circle);
    });
});


// ========================================
// FLOATING BUTTON ANIMATION (CLEAN + STABLE)
// ========================================

setInterval(() => {
    const buttons = document.querySelectorAll(".float");

    buttons.forEach((btn) => {
        btn.classList.add("pulse");

        setTimeout(() => {
            btn.classList.remove("pulse");
        }, 800);
    });
}, 6500);


// ========================================
// ACTIVE NAV AUTO DETECT (FINAL FIX)
// ========================================

document.addEventListener("DOMContentLoaded", () => {
    const links = document.querySelectorAll("nav a");

    const currentPage =
        window.location.pathname.split("/").pop() || "index.html";

    links.forEach((link) => {
        const href = link.getAttribute("href");

        if (href === currentPage) {
            link.classList.add("active");
        }
    });
});