import './style.css'

document.addEventListener("DOMContentLoaded", (event) => {
    gsap.registerPlugin(ScrollTrigger);

    const hamburger = document.getElementById('hamburger');
    const navLinks = document.getElementById('nav-links');

    // Toggle menu zichtbaarheid
    hamburger.addEventListener('click', () => {
        const isExpanded = hamburger.getAttribute('aria-expanded') === 'true';
        hamburger.setAttribute('aria-expanded', !isExpanded);
        navLinks.classList.toggle('show');
    });

    // Sluit het menu wanneer een link wordt aangeklikt
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('show');
            hamburger.setAttribute('aria-expanded', false);
        });
    });

    const plantijnColm = 2;
    const plantijnRow = 1;
    const plantijnStepX = 1 / plantijnColm;
    const plantijnStepY = 1 / plantijnRow;
    const plantijnPositions = [
        { x: 0, y: 0 },
        { x: 1, y: 0 },

    ];

    const init = () => {
        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: ".navbar",
                scrub: true,
                markers: true,
                pin: ".hero",
                start: 'end end',
                end: '500 end',
            },
        });

        const plantijn = {
            step: 0,
        };
        const $plantijnImage = document.querySelector(".hero_image-url");

        tl.to(plantijn, {
            step: plantijnPositions.length - 1,

            ease: SteppedEase.config(plantijnPositions.length - 1),
            onUpdate: () => {
                console.log(plantijn.step);
                const plantijnPosition = plantijnPositions[plantijn.step];
                $plantijnImage.style.transform = `translate(${-100 * plantijnPosition.x * plantijnStepX
                    }%, ${-100 * plantijnPosition.y * plantijnStepY}%)`;
            },
        });
        tl.to(".hero_toggle-1", { display: "none", opacity: 0, ease: "power2.out", duration: 1 }, ">")
        tl.to(".hero_toggle-2", { display: "block", opacity: 1, ease: "power2.out", duration: 1 })

    };

    init();

});