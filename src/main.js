import './style.css'

function init() {
    gsap.registerPlugin(ScrollTrigger);
    initHamburgerMenu();
    initPlantijnAnimation();
    initMartinaAnimation();
    initMapAnimation();
    initDiplomaAnimation();
    initPerfectAnimation();
    initDrawing();
    initPerfectionRandomizer();
}
function initHamburgerMenu() {
    const hamburger = document.getElementById('hamburger');
    const navLinks = document.getElementById('nav-links');

    // Toggle menu zichtbaarheid en scrollgedrag
    hamburger.addEventListener('click', () => {
        const isExpanded = hamburger.getAttribute('aria-expanded') === 'true';
        //Voor accessibility aria-expanded attribute plaatsen
        hamburger.setAttribute('aria-expanded', !isExpanded);
        navLinks.classList.toggle('show');

        // Blokkeer of herstel scrollen op de body
        if (!isExpanded) {
            document.body.classList.add('no-scroll');
        } else {
            document.body.classList.remove('no-scroll');
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

function initPlantijnAnimation() {
    //sefineer sprite variabelen
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
            endTrigger: ".martina_container",
            scrub: true,
            pin: ".hero",
            end: "-=200"
        },
    });

    const plantijn = {
        step: 0,
    };
    const $picture = document.querySelector(".hero_image-url");
    const $plantijnImage = $picture.querySelector("img");

    //On update triggered door de scrub, hier wordt de sprite viewport verplaatst
    tl.to(plantijn, {
        step: plantijnPositions.length - 1,
        ease: SteppedEase.config(plantijnPositions.length - 1),
        onUpdate: () => {
            const plantijnPosition = plantijnPositions[plantijn.step];
            $plantijnImage.style.transform = `translate(${-100 * plantijnPosition.x * plantijnStepX}%, ${-100 * plantijnPosition.y * plantijnStepY}%)`; //Translate op de image verplaatst de viewport van de sprite, belangrijk hier is dat in de css de sprite width juist staat zodat de viewport maar 1 deel van de sprite toont.

        },
    });
    tl.to(".hero_toggle-1", { display: "none", opacity: 0, ease: "power2.out", duration: 1 }, ">");
    tl.to(".hero_toggle-2", { display: "block", opacity: 1, ease: "power2.out", duration: 1 }, ">");
    tl.to(".hero_title1", { color: "#EBDFD3", });
}

function initMartinaAnimation() {
    const mm = gsap.matchMedia(); //stel de media queries in
    mm.add(
        {
            isDevice: "(max-width: 900px)",
            isDesktop: "(min-width: 900px)",
        },
        (context) => {
            const { conditions } = context;
            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: ".martina_container",
                    endTrigger: ".martina_container",
                    scrub: true,
                    pin: ".martina_container",
                    start: 'center center',
                    end: 'bottom'
                }
            });
            if (conditions.isDevice) {

                tl.from(".martina_wrapper", { scale: 0 });
                tl.to(".martina_wrapper", { scale: 1.1, ease: "bounce", duration: 1 });
                tl.to(".martina_wrapper", { scale: 1, ease: "back.out", duration: 1 });
                tl.to(".martina_stemple", { display: 'none' }, ">");
                tl.to(".ruit_toggle", { display: 'none' }, ">");
                tl.to(".martina", { scale: 0.7, ease: "back.out", duration: 0.25, marginTop: '3rem' }, ">");
                tl.to(".martina_final", { display: 'block', ease: "power2.in", duration: 0.5 });
            }

            if (conditions.isDesktop) {
                tl.to(".martina_wrapper", { scale: 0.6, ease: "bounce", duration: 1 }, "<");
                tl.to(".martina_wrapper", { scale: 0.5, ease: "back.out", duration: 1 }, "<");
                tl.to(".martina_stemple", { display: 'none' }, "<");
                tl.to(".ruit_toggle", { display: 'none' }, "<");
                tl.to(".martina", { scale: 4, ease: "back.out", duration: 0.25, marginTop: '3rem' });
                tl.to(".martina_final", { display: 'block', ease: "power2.in", duration: 0.5 }, "<");
                tl.to(".martina_container", { flexDirection: "row-reverse" }, "<"); // voegt flex-direction toe
            }
        }
    );
}




function initMapAnimation() {
    const mm = gsap.matchMedia();

    mm.add({
        // Definieer de media query condities
        isDevice: "(max-width: 900px)",
        isDesktop: "(min-width: 900px)"
    }, (context) => {
        const { isDevice, isDesktop } = context.conditions; // Haal de condities op uit context

        const mapCol = 2;
        const mapRow = 2;
        const mapStepX = 1 / mapCol;
        const mapStepY = 1 / mapRow;
        const mapPositions = [
            { x: 0, y: 0, target: ".map1520", year: 1520 },
            { x: 1, y: 0, target: ".map1545", year: 1545 },
            { x: 0, y: 1, target: ".map1548", year: 1548 },
        ];

        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: ".map",
                endTrigger: ".contract",
                scrub: true,
                pin: ".map",
                end: "+=5000"
            },
        });

        const map = { step: 0 };
        const mapGSMPicture = document.querySelector(".map_image-gsm");
        const mapGSM = mapGSMPicture.querySelector("img");
        const mapDesktopPicture = document.querySelector(".map_image-desktop");
        const mapDesktop = mapDesktopPicture.querySelector("img");
        const yearElement = document.querySelector(".map_year h2");

        tl.to(map, {
            step: mapPositions.length - 1,
            ease: SteppedEase.config(mapPositions.length - 1),
            onUpdate: () => {
                const currentPosition = mapPositions[map.step];

                // Update sprite-afbeeldingen
                mapGSM.style.transform = `translate(${-100 * currentPosition.x * mapStepX}%, ${-100 * currentPosition.y * mapStepY}%)`;
                mapDesktop.style.transform = `translate(${-100 * currentPosition.x * mapStepX}%, ${-100 * currentPosition.y * mapStepY}%)`;

                // Update zichtbaarheid van teksten
                for (let i = 0; i < mapPositions.length; i++) {
                    let elements = document.querySelectorAll(mapPositions[i].target);
                    if (elements) {
                        elements.forEach(element => {
                            if (mapPositions[i].target === currentPosition.target) {
                                gsap.to(element, { opacity: 1, display: 'block', ease: 'power2.out', duration: 1 });
                            } else {
                                gsap.to(element, { display: 'none', opacity: 0, ease: 'power2.out', duration: 1 });
                            }
                        });
                    }
                }

                // Update het jaartal met telanimatie
                const startYear = map.step === 1 ? 1520 : 1545; // Startjaar afhankelijk van de stap
                const endYear = currentPosition.year;

                gsap.to(yearElement, {
                    duration: 0.5,
                    textContent: endYear,
                    ease: "power2.out",
                    snap: { textContent: 1 }, // Afronding naar hele getallen
                });
            }
        });

        const positionValue = isDevice ? "100vh" : "100vw";
        const positionProperty = isDevice ? "y" : "x";

        // Algemene animaties (zowel voor device als desktop)
        tl.to(".map_year", { [positionProperty]: positionValue, duration: 0.5, ease: "power2.out" },)
            .to(".map", { backgroundColor: "#333332", backgroundPosition: "100% 0", duration: 0.5, ease: "power2.out" }, "<")
            .to(".map1548", { display: 'none', opacity: 0, ease: 'power2.out', duration: 0.5 }, "<")
            .to(".map_image", { display: 'none', opacity: 0, ease: 'power2.out', duration: 0.5 }, "<")
            .to(".map_text-map1548", { display: 'none', opacity: 0, ease: 'power2.out', duration: 0.5 }, "<")
            .to(".map_year", { color: "#333332" }, "<")
            .from(".helaas_1", { scale: 0 })
            .from(".helaas_2", { scale: 0 })
            .from(".helaas_3", { scale: 0 })
            .from(".helaas_text", { scale: 0 });

        if (isDesktop) {
            tl.to(".map_year", { display: "none" });
        }
    });
}

function initDrawing() {
    const openBtn = document.getElementById('openSignature');
    const signBtn = document.getElementById('storeSignature');
    const resetBtn = document.getElementById('resetSignature');
    const cancelBtn = document.getElementById('cancelSignature');
    const canvas = document.getElementById('drawingCanvas');
    const overlay = document.getElementById('canvas-overlay');
    const img = document.getElementById('signature');

    const ctx = canvas.getContext('2d');
    let drawing = false;

    let openCanvas = (_) => {
        overlay.style.display = 'block';
        canvas.width = canvas.clientWidth;
        canvas.height = canvas.clientHeight;
        document.body.classList.add('no-scroll')
    }

    let storeImage = (_) => {
        img.src = canvas.toDataURL('image/png');
        img.style.display = 'block';
        overlay.style.display = 'none';
        document.body.classList.remove('no-scroll')
    }

    let cancel = (_) => {
        overlay.style.display = 'none';
        document.body.classList.remove('no-scroll')
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
        ctx.lineWidth = 4;
        ctx.lineCap = 'round';
        ctx.strokeStyle = 'black';

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

    //event listeners voor buttons
    openBtn.addEventListener('click', openCanvas);
    signBtn.addEventListener('click', storeImage);
    resetBtn.addEventListener('click', resetImage);
    cancelBtn.addEventListener('click', cancel);
}
function initDiplomaAnimation() {

    const mm = gsap.matchMedia();
    mm.add(
        {
            isDevice: "(max-width: 900px)",
            isDesktop: "(min-width: 900px)",
        }, (context) => {
            const { conditions } = context;
            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: ".contract",
                    endTrigger: ".perfection",
                    scrub: true,
                    start: '-150 center',
                    end: 'start 500'
                }
            })
            if (conditions.isDevice) {
                tl.from(".contract_text", { y: "-70%", opacity: 0, ease: "power2.out" }, ">")
                tl.from(".pijl_contract", { y: "150%", opacity: 0, ease: "power2.out" }, "<")
                tl.from(".labore_text", { y: "150%", opacity: 0, ease: "power2.out" })
                tl.from(".labore_container", { y: "-50%", opacity: 0, ease: "power2.out" }, "<")

            }

            if (conditions.isDesktop) {
                tl.from(".contract_text", { y: "-200%", opacity: 0, ease: "power2.out" }, "<")
                tl.from(".pijl_contract", { y: "150%", opacity: 0, ease: "power2.out" }, "<")
                tl.from(".labore_text", { y: "150%", opacity: 0, ease: "power2.out" })
                tl.from(".labore_container", { y: "-150%", opacity: 0, ease: "power2.out" }, "<")

            }
        });
}

function initPerfectAnimation() {
    const tl = gsap.timeline({
        scrollTrigger: {
            trigger: ".perfection",
            endTrigger: ".grid_container",
            scrub: true,
            start: 'start center',
            end: 'start center'
        }
    });
    tl.from(".star_1", { oppacity: 0, scale: 0, ease: "power2.out", duration: 1 })
    tl.from(".star_2", { oppacity: 0, scale: 0, ease: "power2.out", duration: 1 })
    tl.from(".star_3", { oppacity: 0, scale: 0, ease: "power2.out", duration: 1 })
    tl.from(".perfection_text", { oppacity: 0, scale: 0, ease: "power2.out", duration: 1 }, "-=2")
    tl.from(".star_4", { oppacity: 0, scale: 0, ease: "power2.out", duration: 1 })
    tl.from(".star_5", { oppacity: 0, scale: 0, ease: "power2.out", duration: 1 })
    tl.from(".star_6", { oppacity: 0, scale: 0, ease: "power2.out", duration: 1 })
}


function initPerfectionRandomizer() {

    const container = document.querySelector(".random-grid")
    const letters = Array.from(container.querySelectorAll("span")).filter(span => span.textContent !== " " && span.textContent !== ".") //neem alle letters uit de grid en filter spaties en punten eruit
    var rootStyle = window.getComputedStyle(document.body) //haal de css variabelen op 
    const columns = rootStyle.getPropertyValue('--perfection-columns')
    const rows = rootStyle.getPropertyValue('--perfection-rows')

    const randomPunten = Array.from(container.querySelectorAll(".random_punt")); //haal de punten op die verborgen zijn
    container.addEventListener('click', (ev) => {
        container.classList.toggle('readable')
        randomPunten.forEach(rp => rp.classList.toggle('random_punt')) //Display hidden points
    });

    // maak cordinaten
    const allCoords = []; // array voor alle cordinaten van de grid ex.: 4 grid -> 0,0 0,1 1,0 1,0 
    for (let y = 0; y < rows; y++) {
        for (let x = 0; x < columns; x++) {
            allCoords.push([x, y]);
        }
    }
    let trimmedCoords = [];
    trimmedCoords = allCoords.slice(0, letters.length) //aantal letters in de grid is gelijk aan het aantal letters in de tekst
    //zet de letters op random cordinaten
    for (let i = trimmedCoords.length - 1; i > 0; i--) { //verander de volgorde van de letters
        let j = Math.floor(Math.random() * (i + 1))
        let temp = trimmedCoords[i]
        trimmedCoords[i] = trimmedCoords[j]
        trimmedCoords[j] = temp
    }
    letters.forEach((letter, index) => { //elke letter krijgt een random cordinaat
        let [x, y] = trimmedCoords[index];
        letter.style.gridColumn = x + 1;
        letter.style.gridRow = y + 1;

        //voeg een random rotatie toe en een random translatie
        let randomTranslate = 75
        letter.style.transform = `translate(${Math.random() * randomTranslate}%,${Math.random() * randomTranslate}%) rotate(${Math.random() * 360}deg)`;
    });

    const tl = gsap.timeline(
        {
            scrollTrigger: {
                trigger: ".wereld",
                endTrigger: ".wereld",
                scrub: true,
                pin: ".perfection_interactie",
                start: "top 170",
                end: "200 top",
            }
        })

    // maak een animatie die de letters naar de wereld brengt
    const grid = document.querySelector('.wereld')
    const allLetters = Array.from(container.querySelectorAll("span"))
    const clonedLetters = []
    allLetters.forEach(l => {
        let clone = document.createElement("span")
        clone.innerText = l.innerText
        clone.style.display = 'none'
        clonedLetters.push(clone)
        grid.appendChild(clone)
    });

    const world_img = grid.querySelector('img')
    const pointer = { step: 0 }

    tl.to(pointer, {
        step: allLetters.length - 1,
        ease: `steps(${allLetters.length - 1})`,
        onUpdate: () => {
            //zoek het midden van de wereld
            let centerX = grid.clientWidth / 2;
            let centerY = grid.clientHeight / 2;
            //bereken de radius van de wereld
            let radius = world_img.clientWidth / 2;
            //bereken de hoek tussen de letters 
            let angleDeg = (360 / allLetters.length);
            //draai de letters naar de wereld 
            let angleRad = angleDeg / 180 * Math.PI;
            //gebuik Pythagorese stelling om de x en y coordinaten te berekenen
            let x = centerX + radius * Math.cos(angleRad * pointer.step);
            let y = centerY + radius * Math.sin(angleRad * pointer.step);
            //slecteer de letter die moet verplaatst worden
            let currentLetter = clonedLetters[pointer.step]
            //voeg een css class toe
            currentLetter.classList.add('cloned-letter')
            //animeer de letter naar de wereld en draai ze naar het midden
            gsap.to(currentLetter, { display: 'block', position: 'absolute', left: `${x}px`, top: `${y}px`, transform: `translate(-50%, -50%) rotate(${(angleDeg * pointer.step) + 90}deg)`, ease: 'power2.out', duration: '1' })
        }
    });
}

init(); 