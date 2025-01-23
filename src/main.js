import './style.css'
document.addEventListener("DOMContentLoaded", (event) => {
    gsap.registerPlugin(ScrollTrigger);

    initHamburgerMenu();
    initPlantijnAnimation();
    initMartinaAnimation();
    initMapAnimation();
    initHelaasAnimation();
    initDrawing();
    initPerfectionRandomizer();
});

function initHelaasAnimation() {
    const tl = gsap.timeline({
        scrollTrigger: {
            trigger: ".helaas_container",
            endTrigger: ".helaas_container",
            //  scrub: true,
            // markers: true,
            //pin: ".martina_wrapper",
            start: 'top center',
            end: 'top center'
        }
    });

    tl.from(".helaas_1", { scale: 0 })
    tl.from(".helaas_2", { scale: 0 })
    tl.from(".helaas_3", { scale: 0 })
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

    // Mag pas starten als je verder scrolled.na de fix van de grote img 
    tl.to(".martina_stemple", { display: 'none' }) //start samen met de vorige
    tl.to(".ruit_toggle", { display: 'none' }) //start samen met de vorige
    tl.to(".martina", { scale: 0.7, ease: "back.out", duration: 0.25, marginTop: '3rem' }) //start samen met de vorige

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


function initDrawing() {
    const openBtn = document.getElementById('openSignature');
    const signBtn = document.getElementById('storeSignature');
    const resetBtn = document.getElementById('resetSignature');
    const canvas = document.getElementById('drawingCanvas');
    const overlay = document.getElementById('canvas-overlay');
    const img = document.getElementById('signature');

    const ctx = canvas.getContext('2d');
    let drawing = false;


    let openCanvas = (_) => {
        overlay.style.display = 'block';
        canvas.width = canvas.clientWidth;
        canvas.height = canvas.clientHeight;

    }

    let storeImage = (_) => {
        img.src = canvas.toDataURL('image/png');
        img.style.display = 'block';
        overlay.style.display = 'none';
    }

    let resetImage = (_) => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
    }

    let getPosition = (event) => {
        const rect = canvas.getBoundingClientRect();
        if (event.touches) {
            return {
                x: event.touches[0].clientX - rect.left,
                y: event.touches[0].clientY - rect.top,
            };
        }
        return {
            x: event.clientX - rect.left,
            y: event.clientY - rect.top,
        };
    }

    let startDrawing = (event) => {
        drawing = true;
        const pos = getPosition(event);
        ctx.beginPath();
        ctx.moveTo(pos.x, pos.y);
        event.preventDefault();
    }

    let stopDrawing = (event) => {
        drawing = false;
        ctx.closePath();
    }

    let draw = (event) => {
        if (!drawing) return;
        const pos = getPosition(event);
        ctx.lineWidth = 2; // Breedte van de lijn
        ctx.lineCap = 'round'; // Maak de lijnranden rond
        ctx.strokeStyle = 'black'; // Kleur van de lijn

        ctx.lineTo(pos.x, pos.y);
        ctx.stroke();
        event.preventDefault();
    }


    // Event Listeners voor muis
    canvas.addEventListener('mousedown', startDrawing);
    canvas.addEventListener('mouseup', stopDrawing);
    canvas.addEventListener('mousemove', draw);

    // Event Listeners voor touch
    canvas.addEventListener('touchstart', startDrawing);
    canvas.addEventListener('touchend', stopDrawing);
    canvas.addEventListener('touchmove', draw);

    openBtn.addEventListener('click', openCanvas);
    signBtn.addEventListener('click', storeImage);
    resetBtn.addEventListener('click', resetImage);
}


function initPerfectionRandomizer() {
    const container = document.querySelector(".random-grid")
    const letters = Array.from(container.querySelectorAll("span")).filter(span => span.textContent !== " " && span.textContent !== ".")
    var rootStyle = window.getComputedStyle(document.body)
    const columns = rootStyle.getPropertyValue('--perfection-columns')
    const rows = rootStyle.getPropertyValue('--perfection-rows')

    //Generate coords
    const allCoords = [];
    for (let y = 0; y < rows; y++) {
        for (let x = 0; x < columns; x++) {
            allCoords.push([x, y]);
        }
    }
    let trimmedCoords = [];
    trimmedCoords = allCoords.slice(0, letters.length)
    //Shuffle coords
    for (let i = trimmedCoords.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1))
        let temp = trimmedCoords[i]
        trimmedCoords[i] = trimmedCoords[j]
        trimmedCoords[j] = temp
    }
    letters.forEach((letter, index) => {
        let [x, y] = trimmedCoords[index];
        letter.style.gridColumn = x + 1;
        letter.style.gridRow = y + 1;

        // Voeg willekeurige rotatie toe
        let randomTranslate = 75

        letter.style.transform = `translate(${Math.random() * randomTranslate}%,${Math.random() * randomTranslate}%) rotate(${Math.random() * 360}deg)`;
    });
}
