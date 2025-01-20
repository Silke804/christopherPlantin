import './style.css'

document.addEventListener("DOMContentLoaded", (event) => {
    gsap.registerPlugin(ScrollTrigger);

    initHamburgerMenu();
    initPlantijnAnimation();
    initMartinaAnimation();
    initMapAnimation();
    initHelaasAnimation();

});

function initHelaasAnimation() {
    const tl = gsap.timeline({
        scrollTrigger: {
            trigger: ".helaas_container",
            endTrigger: ".helaas_container",
            //scrub: true,
            // markers: true,
            //pin: ".martina_wrapper",
            start: 'top center',
            end: 'top center'
        }
    });

    //target helaas1 , 2, 3

}

function initMartinaAnimation() {
    const tl = gsap.timeline({
        scrollTrigger: {
            trigger: ".martina_container",
            endTrigger: ".martina_container",
            //scrub: true,
            // markers: true,
            //pin: ".martina_wrapper",
            start: 'top center',
            end: 'top center',
        },
    });
    tl.from(".martina_wrapper", { scale: 0 })
    tl.to(".martina_wrapper", { scale: 1.1, ease: "bounce", duration: 1 })
    tl.to(".martina_wrapper", { scale: 1, ease: "back.out", duration: 0.25 })
}

function initHamburgerMenu() {
    const hamburger = document.getElementById('hamburger');
    const navLinks = document.getElementById('nav-links');
    const body = document.body;

    // Toggle menu zichtbaarheid en scrollgedrag
    hamburger.addEventListener('click', () => {
        const isExpanded = hamburger.getAttribute('aria-expanded') === 'true';
        hamburger.setAttribute('aria-expanded', !isExpanded);
        navLinks.classList.toggle('show');

        // Blokkeer of herstel scrollen
        if (!isExpanded) {
            body.classList.add('no-scroll');
        } else {
            body.classList.remove('no-scroll');
        }
    });

    // Sluit het menu wanneer een link wordt aangeklikt
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('show');
            hamburger.setAttribute('aria-expanded', false);
            body.classList.remove('no-scroll'); // Herstel scrollen
        });
    });
}

function initMapAnimation() {
    const mapCol = 2;
    const mapRow = 2;
    const mapStepX = 1 / mapCol;
    const mapStepY = 1 / mapRow;
    const mapPositions = [
        { x: 0, y: 0, target: ".map1520" },
        { x: 1, y: 0, target: ".map1545" },
        { x: 0, y: 1, target: ".map1548" },
        // { x: 1, y: 1 }
    ]

    const tl = gsap.timeline({
        scrollTrigger: {
            trigger: ".map",
            endTrigger: ".map",
            scrub: true,
            markers: true,
            pin: ".map",
            // start: 'end end',
            // end: '500 end',
        },
    });

    const map = {
        step: 0
    };
    const mapImage = document.querySelector(".map_image-url")

    tl.to(map, {
        step: mapPositions.length - 1,
        ease: SteppedEase.config(mapPositions.length - 1),
        onUpdate: () => {
            const currentPosition = mapPositions[map.step];
            mapImage.style.transform = `translate(${-100 * currentPosition.x * mapStepX
                }%, ${-100 * currentPosition.y * mapStepY}%)`;

            for (let i = 0; i < mapPositions.length; i++) {
                let elements = document.querySelectorAll(mapPositions[i].target);
                if (elements) {
                    elements.forEach(element => {
                        if (mapPositions[i].target === currentPosition.target) {
                            //show
                            //element.style.display = 'block';
                            gsap.to(element, { opacity: 1, display: 'block', ease: 'power2.out', duration: 1 })

                        } else {
                            //element.style.display = 'none';
                            gsap.to(element, { display: 'none', opacity: 0, ease: 'power2.out', duration: 1 })
                            //hide
                        }
                    });
                }
            }
        }
    })
}


function initPlantijnAnimation() {
    //define sprite variables for swapping
    const plantijnColm = 2;
    const plantijnRow = 1;
    const plantijnStepX = 1 / plantijnColm;
    const plantijnStepY = 1 / plantijnRow;
    const plantijnPositions = [
        { x: 0, y: 0 },
        { x: 1, y: 0 },
    ];

    const tl = gsap.timeline({
        scrollTrigger: {
            trigger: ".navbar",
            scrub: true,
            // markers: true,
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
            //console.log(plantijn.step);
            const plantijnPosition = plantijnPositions[plantijn.step];
            $plantijnImage.style.transform = `translate(${-100 * plantijnPosition.x * plantijnStepX
                }%, ${-100 * plantijnPosition.y * plantijnStepY}%)`;
        },
    });
    //Text toggle animation post sprite swap
    tl.to(".hero_toggle-1", { display: "none", opacity: 0, ease: "power2.out", duration: 1 }, ">")
    tl.to(".hero_toggle-2", { display: "block", opacity: 1, ease: "power2.out", duration: 1 })
}