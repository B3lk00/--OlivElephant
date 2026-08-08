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


/* ==========================================================
   OLIV ELEPHANT — BA / DE / EN JEZIČKI SISTEM
   - Ne dira intro / loading screen
   - Pamti izbor jezika
   - Prvi put prikazuje diskretnu notifikaciju nakon introa
========================================================== */

(function () {
    const OE_TRANSLATIONS = {
        en: {
        "Početna": "Home",
        "O strelištu": "Shooting Range",
        "Klubhaus": "Clubhouse",
        "4x4 Rent & Tours": "4x4 Rent & Tours",
        "Prenoćište": "Accommodation",
        "Kontakt": "Contact",
        "OlivElephant Sportsko Rekreativni Centar": "OlivElephant Sports & Recreation Center",
        "Sportsko Rekreativni Centar": "Sports & Recreation Center",
        "Strelište • Avantura • Priroda • Odmor": "Shooting • Adventure • Nature • Relaxation",
        "© 2026 OlivElephant Sportsko Rekreativni Centar. Sva prava zadržana.": "© 2026 OlivElephant Sports & Recreation Center. All rights reserved.",
        "📍 Kruhari, Sanski Most": "📍 Kruhari, Sanski Most",
        "Stvoreno za one koji žele nešto drugačije.": "Created for those looking for something different.",
        "Mjesto gdje se sportsko streljaštvo, edukacija, off-road iskustvo, domaća atmosfera i odmor u prirodi spajaju u jedan potpuno drugačiji doživljaj.": "A place where sport shooting, education, off-road experiences, local hospitality and relaxation in nature come together in one truly different experience.",
        "Istražite priču centra": "Discover the story of the center",
        "SPORTSKO": "SPORTS",
        "REKREATIVNI": "RECREATION",
        "CENTAR": "CENTER",
        "SANSKI MOST": "SANSKI MOST",
        "Jedno mjesto. Više doživljaja.": "One place. Many experiences.",
        "Nije samo mjesto": "It is more than a place",
        "na koje dolazite.": "you simply visit.",
        "OlivElephant spaja sport, prirodu, sigurnost, edukaciju i avanturu u prostor osmišljen za potpuno drugačiji doživljaj. Od prvog dolaska do posljednjeg trenutka, svaki dio centra ima svoju svrhu.": "OlivElephant brings sport, nature, safety, education and adventure together in a space designed for a truly different experience. From arrival to the final moment, every part of the center has a purpose.",
        "Aktuelni događaj": "Current event",
        "Tactical Medical Kurs": "Tactical Medical Course",
        "Prijave su u toku": "Registration is open",
        "Tokom cijele godine organizujemo kurseve, turnire, obuke i posebne događaje. Broj mjesta je ograničen, a prijave se vrše unaprijed.": "Throughout the year we organize courses, tournaments, training sessions and special events. Places are limited and advance registration is required.",
        "Ograničen broj učesnika": "Limited number of participants",
        "Teorijski i praktični dio": "Theory and practical training",
        "Prijava i informacije →": "Registration & information →",
        "Ono što nas izdvaja": "What sets us apart",
        "Svaki detalj ima svoju svrhu.": "Every detail has a purpose.",
        "Sigurnost i stručni nadzor": "Safety and professional supervision",
        "Aktivnosti se odvijaju u kontrolisanom okruženju, uz jasna pravila i odgovoran pristup.": "Activities take place in a controlled environment with clear rules and a responsible approach.",
        "Programi za različita iskustva": "Programs for different experience levels",
        "Sadržaj je prilagođen početnicima, iskusnim strijelcima, pojedincima, grupama i posjetiocima željnim avanture.": "Programs are tailored to beginners, experienced shooters, individuals, groups and visitors looking for adventure.",
        "Sport, priroda i odmor": "Sport, nature and relaxation",
        "Na jednom mjestu povezujemo streljaštvo, off-road ture, domaću atmosferu i boravak u prirodi.": "In one place we combine shooting, off-road tours, local hospitality and time in nature.",
        "Događaji koji okupljaju ljude": "Events that bring people together",
        "Redovni turniri, obuke i kursevi stvaraju živ centar u kojem se uvijek dešava nešto novo.": "Regular tournaments, training sessions and courses create a lively center where something new is always happening.",
        "Strelište - OlivElephant Sportsko Rekreativni Centar": "Shooting Range - OlivElephant Sports & Recreation Center",
        "OlivElephant • Strelište": "OlivElephant • Shooting Range",
        "Strelište": "Shooting Range",
        "Profesionalno okruženje za sportsko, rekreativno i edukativno streljaštvo. Sigurnost, kontrola i kvalitetno iskustvo nalaze se u osnovi svakog treninga, obuke i posjete.": "A professional environment for sport, recreational and educational shooting. Safety, control and a quality experience are at the core of every training session, course and visit.",
        "Temelj svakog dolaska": "The foundation of every visit",
        "Sigurnost": "Safety",
        "Svaka aktivnost počinje jasnim pravilima, stručnim nadzorom i odgovornim pristupom. Prije prvog pucnja učesnik se upoznaje sa prostorom, opremom i pravilima ponašanja na strelištu.": "Every activity begins with clear rules, professional supervision and a responsible approach. Before the first shot, participants are introduced to the range, equipment and safety procedures.",
        "Cilj nije samo pogoditi metu, već razviti pravilne navike, kontrolu i sigurnost koja se podrazumijeva u svakom trenutku.": "The goal is not only to hit the target, but to develop proper habits, control and safety at all times.",
        "Razvoj tehnike": "Technique development",
        "Sportsko streljaštvo": "Sport shooting",
        "Trening je usmjeren na preciznost, brzinu, kontrolu i pravilnu tehniku. Svaki program se prilagođava iskustvu učesnika i cilju koji želi postići.": "Training focuses on accuracy, speed, control and proper technique. Each program is adapted to the participant's experience and goals.",
        "Kroz kontinuiran rad razvijaju se sigurnost u izvođenju, pravilno rukovanje i sposobnost donošenja mirnih odluka pod pritiskom.": "Consistent practice develops confidence, proper handling and the ability to make calm decisions under pressure.",
        "Iskustvo za posjetioce": "Visitor experience",
        "Rekreacija": "Recreation",
        "Strelište je pogodno i za pojedince, grupe i goste koji se prvi put susreću sa streljaštvom i žele ga upoznati u kontrolisanom okruženju.": "The range is also suitable for individuals, groups and first-time guests who want to discover shooting in a controlled environment.",
        "Uz stručnu podršku, posjeta postaje zanimljivo i edukativno iskustvo koje spaja koncentraciju, disciplinu i osjećaj ličnog napretka.": "With professional guidance, a visit becomes an engaging and educational experience combining concentration, discipline and a sense of personal progress.",
        "Programi strelišta": "Range programs",
        "Dva pravca.": "Two paths.",
        "Jedan standard.": "One standard.",
        "Sportski razvoj kroz klub ili strukturirana edukacija kroz akademiju. Sve ostaje na jednoj stranici — bez nepotrebnog otvaranja dodatnih podstranica.": "Sport development through the club or structured education through the academy. Everything stays on one page without unnecessary extra pages.",
        "KLUB": "CLUB",
        "Klub praktičnog streljaštva": "Practical Shooting Club",
        "Obuka • Trening • PIRO • Turniri": "Training • Practice • PIRO • Tournaments",
        "Klub okuplja zaljubljenike u praktično streljaštvo kroz obuke, redovne treninge, napredne programe i takmičenja.": "The club brings practical shooting enthusiasts together through training, regular practice, advanced programs and competitions.",
        "Obuka": "Training",
        "Osnove praktičnog streljaštva i sigurno rukovanje.": "Practical shooting fundamentals and safe handling.",
        "Trening": "Practice",
        "Redovni treninzi za preciznost, brzinu i tehniku.": "Regular practice for accuracy, speed and technique.",
        "Napredni programi i specijalizovane vježbe.": "Advanced programs and specialized exercises.",
        "Turniri": "Tournaments",
        "Organizacija i učešće na turnirima.": "Tournament organization and participation.",
        "AKADEMIJA": "ACADEMY",
        "Akademija oružja Oliv Elephant": "Oliv Elephant Firearms Academy",
        "Edukacija • Sigurnost • Obuke i kursevi": "Education • Safety • Training & Courses",
        "Akademija pruža edukaciju iz oblasti sigurnog rukovanja oružjem, teorijske nastave i praktične obuke.": "The academy provides education in safe firearm handling, theory and practical training.",
        "Akademija oružja": "Firearms Academy",
        "Edukacija o vrstama oružja, sigurnosti i pravilnoj upotrebi.": "Education on firearm types, safety and proper use.",
        "OlivElephant programi": "OlivElephant programs",
        "Specijalizovani programi, obuke i kursevi.": "Specialized programs, training and courses.",
        "Galerija": "Gallery",
        "Strelište kroz detalje.": "The range in detail.",
        "Kliknite na fotografiju za pregled preko cijelog ekrana i listanje kompletne galerije.": "Click a photo for full-screen viewing and to browse the complete gallery.",
        "Klubhaus - OlivElephant Sportsko Rekreativni Centar": "Clubhouse - OlivElephant Sports & Recreation Center",
        "OlivElephant • Klubhaus": "OlivElephant • Clubhouse",
        "Mjesto gdje završava tempo aktivnosti, a počinje druženje. Klubhaus okuplja članove, posjetioce i goste centra u opuštenom i domaćem ambijentu.": "A place where the pace of activity slows down and social time begins. The Clubhouse brings members, visitors and guests together in a relaxed, welcoming atmosphere.",
        "Nije zamišljen kao običan caffe, već kao prostor koji povezuje cijeli doživljaj OlivElephanta — od terena do stola.": "It is not designed as an ordinary café, but as a space connecting the entire OlivElephant experience — from the field to the table.",
        "Neka mjesta služe da prođe vrijeme.": "Some places simply pass the time.",
        "Klubhaus je napravljen da ga poželite produžiti.": "The Clubhouse is made to make you want to stay longer.",
        "Jedan dolazak": "One visit",
        "Četiri trenutka koja čine atmosferu.": "Four moments that create the atmosphere.",
        "Stani": "Pause",
        "Nakon treninga, ture ili boravka u prirodi, prvi trenutak je jednostavan — sjesti, usporiti i promijeniti ritam.": "After training, a tour or time in nature, the first moment is simple — sit down, slow down and change the pace.",
        "Prvi utisak": "First impression",
        "Udahni": "Breathe",
        "Miran ambijent i otvoren prostor stvaraju mjesto gdje se razgovor vraća u prvi plan, bez žurbe i buke.": "A calm atmosphere and open space create a place where conversation comes first, without rush or noise.",
        "Predah": "A break",
        "Probaj": "Taste",
        "Domaći kolači, prirodni sokovi, kafa i proizvodi lokalnog porijekla upotpunjuju osjećaj autentičnog domaćeg mjesta.": "Homemade cakes, natural juices, coffee and locally sourced products complete the feeling of an authentic local place.",
        "Domaći ukus": "Local flavor",
        "Ostani": "Stay",
        "Klubhaus nije samo stanica između aktivnosti, već prostor u kojem se iskustvo centra nastavlja kroz druženje.": "The Clubhouse is not just a stop between activities, but a place where the center's experience continues through socializing.",
        "Dobra atmosfera": "Good atmosphere",
        "Caffe Mozambik": "Caffe Mozambik",
        "Identitet unutar centra.": "An identity within the center.",
        "Caffe Mozambik je srce Klubhausa i mjesto gdje se sastaju posjetioci različitih interesa — strijelci, gosti, porodice, ljubitelji prirode i avanture.": "Caffe Mozambik is the heart of the Clubhouse, bringing together shooters, guests, families and lovers of nature and adventure.",
        "Upravo ta mješavina ljudi, aktivnosti i domaće ponude daje prostoru karakter koji se ne može svesti samo na kafu, kolače ili odmor.": "That mix of people, activities and local offerings gives the space a character that goes far beyond coffee, cakes or relaxation.",
        "Detalji koji grade atmosferu.": "Details that create the atmosphere.",
        "Kliknite fotografiju za pregled preko cijelog ekrana i listanje galerije.": "Click a photo for full-screen viewing and browse the gallery.",
        "4x4 Rent & Tours - OlivElephant Sportsko Rekreativni Centar": "4x4 Rent & Tours - OlivElephant Sports & Recreation Center",
        "OlivElephant • Off-road iskustvo": "OlivElephant • Off-road Experience",
        "Quadovi, buggy vozila i terenska vozila za vožnju kroz prirodu, šumske puteve i okolinu centra — sa vodičem ili bez vodiča, u zavisnosti od iskustva i odabrane rute.": "Quads, buggies and off-road vehicles for exploring nature, forest roads and the area around the center — with or without a guide, depending on experience and the selected route.",
        "Način vožnje": "Driving option",
        "Sa vodičem ili samostalno": "Guided or self-drive",
        "Za koga": "For whom",
        "Pojedinci, parovi i grupe": "Individuals, couples and groups",
        "Ambijent": "Setting",
        "Šuma, makadam i priroda": "Forest, gravel roads and nature",
        "Izaberi vozilo": "Choose your vehicle",
        "Tri načina da doživiš teren.": "Three ways to experience the terrain.",
        "Brzo i direktno": "Fast and direct",
        "Quad": "Quad",
        "Dinamična vožnja za ljubitelje adrenalina, prirode i kraćih off-road tura. Idealan izbor za solo vožnju i istraživanje terena.": "Dynamic riding for fans of adrenaline, nature and shorter off-road tours. An ideal choice for solo riding and exploring the terrain.",
        "Stabilno i atraktivno": "Stable and exciting",
        "Buggy": "Buggy",
        "Kombinacija stabilnosti, kontrole i atraktivne vožnje. Pogodan za avanturističke ture kroz različite tipove terena.": "A combination of stability, control and exciting driving, suitable for adventurous tours across different types of terrain.",
        "Snaga i komfor": "Power and comfort",
        "G-Class": "G-Class",
        "Terensko iskustvo u snažnom vozilu, idealno za zahtjevnije rute, grupne vožnje i goste koji žele više komfora bez odricanja od avanture.": "An off-road experience in a powerful vehicle, ideal for demanding routes, group rides and guests who want more comfort without giving up adventure.",
        "Opcija 01": "Option 01",
        "Tura sa vodičem": "Guided tour",
        "Organizovana ruta, podrška tokom vožnje i sigurnije upoznavanje terena za goste koji prvi put dolaze ili žele vođeno iskustvo.": "An organized route, support during the drive and a safer introduction to the terrain for first-time guests or those who prefer a guided experience.",
        "Opcija 02": "Option 02",
        "Vožnja bez vodiča": "Self-drive",
        "Za iskusnije vozače i goste koji žele slobodniji tempo, u skladu sa dogovorom, pravilima centra i izabranom rutom.": "For more experienced drivers and guests who prefer a freer pace, subject to agreement, center rules and the selected route.",
        "Ponuda vozila": "Vehicle selection",
        "Teren kroz objektiv.": "The terrain through the lens.",
        "Prenoćište - OlivElephant Sportsko Rekreativni Centar": "Accommodation - OlivElephant Sports & Recreation Center",
        "OlivElephant • Prenoćište": "OlivElephant • Accommodation",
        "u voćnoj avliji": "in the orchard courtyard",
        "Mirno prirodno okruženje, voćnjaci, zelenilo i udobni apartmani za odmor nakon aktivnosti ili nekoliko dana potpunog bijega od svakodnevnog ritma.": "A peaceful natural setting, orchards, greenery and comfortable apartments for relaxing after activities or spending a few days away from the everyday pace.",
        "Kapacitet": "Capacity",
        "3 apartmana": "3 apartments",
        "Okruženje": "Surroundings",
        "Priroda i voćnjaci": "Nature and orchards",
        "Za goste": "For guests",
        "Parking": "Parking",
        "Povezanost": "Connectivity",
        "Besplatan WiFi": "Free WiFi",
        "Odmor nakon doživljaja": "Rest after the experience",
        "Mjesto gdje dan završava sporije.": "A place where the day ends more slowly.",
        "Smještaj je namijenjen posjetiocima strelišta, ljubiteljima prirode, parovima, porodicama i gostima koji žele provesti nekoliko dana u mirnijem ambijentu.": "The accommodation is intended for range visitors, nature lovers, couples, families and guests who want to spend a few days in a calmer environment.",
        "Umjesto klasičnog gradskog smještaja, ovdje je fokus na tišini, zelenilu i osjećaju boravka u prirodi — uz udobnost potrebnu za kvalitetan odmor.": "Instead of typical city accommodation, the focus here is on peace, greenery and the feeling of staying in nature — with the comfort needed for quality rest.",
        "Šta vas očekuje": "What awaits you",
        "Jednostavno, mirno i funkcionalno.": "Simple, peaceful and functional.",
        "Tri apartmana": "Three apartments",
        "Komforan smještaj prilagođen pojedincima, parovima i porodicama koje žele ostati duže u centru.": "Comfortable accommodation for individuals, couples and families who want to stay longer at the center.",
        "Prirodno okruženje": "Natural surroundings",
        "Pogled na zelenilo i voćnjake, mirna atmosfera i prostor za predah izvan gradskog ritma.": "Views of greenery and orchards, a peaceful atmosphere and space to unwind away from the city's pace.",
        "Obezbijeđen parking za goste tokom kompletnog boravka.": "Parking is provided for guests throughout their stay.",
        "WiFi": "WiFi",
        "Besplatan pristup internetu u okviru smještajnog objekta.": "Free internet access is available within the accommodation.",
        "Od aktivnosti do potpunog mira.": "From activity to complete tranquility.",
        "Galerija smještaja": "Accommodation gallery",
        "Prostor, detalji i priroda.": "Space, details and nature.",
        "Kontakt - OlivElephant Sportsko Rekreativni Centar": "Contact - OlivElephant Sports & Recreation Center",
        "OlivElephant • Sanski Most": "OlivElephant • Sanski Most",
        "Za informacije o strelištu, obukama, smještaju, 4x4 turama ili rezervacijama javite nam se direktno ili nas posjetite u Kruharima kod Sanskog Mosta.": "For information about the shooting range, training, accommodation, 4x4 tours or reservations, contact us directly or visit us in Kruhari near Sanski Most.",
        "Telefon": "Phone",
        "E-mail": "E-mail",
        "Lokacija": "Location",
        "Kruhari, Sanski Most": "Kruhari, Sanski Most",
        "Radno vrijeme": "Opening hours",
        "Četvrtak – nedjelja": "Thursday – Sunday",
        "Ponedjeljak": "Monday",
        "Zatvoreno": "Closed",
        "Utorak": "Tuesday",
        "Srijeda": "Wednesday",
        "Četvrtak": "Thursday",
        "Petak": "Friday",
        "Subota": "Saturday",
        "Nedjelja": "Sunday",
        "Pratite Oliv Elephant": "Follow Oliv Elephant",
        "Novosti, događaji i trenutci iz centra — pratite nas na društvenim mrežama.": "News, events and moments from the center — follow us on social media.",
        "Oliv Elephant Sportsko Rekreativni Centar": "Oliv Elephant Sports & Recreation Center"
},
        de: {
        "Početna": "Startseite",
        "O strelištu": "Schießstand",
        "Klubhaus": "Klubhaus",
        "4x4 Rent & Tours": "4x4 Verleih & Touren",
        "Prenoćište": "Unterkunft",
        "Kontakt": "Kontakt",
        "OlivElephant Sportsko Rekreativni Centar": "OlivElephant Sport- und Freizeitzentrum",
        "Sportsko Rekreativni Centar": "Sport- und Freizeitzentrum",
        "Strelište • Avantura • Priroda • Odmor": "Schießsport • Abenteuer • Natur • Erholung",
        "© 2026 OlivElephant Sportsko Rekreativni Centar. Sva prava zadržana.": "© 2026 OlivElephant Sport- und Freizeitzentrum. Alle Rechte vorbehalten.",
        "📍 Kruhari, Sanski Most": "📍 Kruhari, Sanski Most",
        "Stvoreno za one koji žele nešto drugačije.": "Geschaffen für alle, die etwas Besonderes suchen.",
        "Mjesto gdje se sportsko streljaštvo, edukacija, off-road iskustvo, domaća atmosfera i odmor u prirodi spajaju u jedan potpuno drugačiji doživljaj.": "Ein Ort, an dem Sportschießen, Ausbildung, Offroad-Erlebnisse, herzliche Atmosphäre und Erholung in der Natur zu einem besonderen Gesamterlebnis werden.",
        "Istražite priču centra": "Entdecken Sie die Geschichte des Zentrums",
        "SPORTSKO": "SPORT",
        "REKREATIVNI": "FREIZEIT",
        "CENTAR": "ZENTRUM",
        "SANSKI MOST": "SANSKI MOST",
        "Jedno mjesto. Više doživljaja.": "Ein Ort. Viele Erlebnisse.",
        "Nije samo mjesto": "Mehr als nur ein Ort",
        "na koje dolazite.": "den Sie besuchen.",
        "OlivElephant spaja sport, prirodu, sigurnost, edukaciju i avanturu u prostor osmišljen za potpuno drugačiji doživljaj. Od prvog dolaska do posljednjeg trenutka, svaki dio centra ima svoju svrhu.": "OlivElephant verbindet Sport, Natur, Sicherheit, Ausbildung und Abenteuer in einem Raum für ein besonderes Erlebnis. Von der Ankunft bis zum letzten Moment hat jeder Bereich des Zentrums seinen Sinn.",
        "Aktuelni događaj": "Aktuelle Veranstaltung",
        "Tactical Medical Kurs": "Tactical-Medical-Kurs",
        "Prijave su u toku": "Anmeldung läuft",
        "Tokom cijele godine organizujemo kurseve, turnire, obuke i posebne događaje. Broj mjesta je ograničen, a prijave se vrše unaprijed.": "Das ganze Jahr über organisieren wir Kurse, Turniere, Trainings und besondere Veranstaltungen. Die Plätze sind begrenzt, eine vorherige Anmeldung ist erforderlich.",
        "Ograničen broj učesnika": "Begrenzte Teilnehmerzahl",
        "Teorijski i praktični dio": "Theorie und Praxis",
        "Prijava i informacije →": "Anmeldung & Informationen →",
        "Ono što nas izdvaja": "Was uns auszeichnet",
        "Svaki detalj ima svoju svrhu.": "Jedes Detail hat seinen Zweck.",
        "Sigurnost i stručni nadzor": "Sicherheit und fachkundige Betreuung",
        "Aktivnosti se odvijaju u kontrolisanom okruženju, uz jasna pravila i odgovoran pristup.": "Alle Aktivitäten finden in einer kontrollierten Umgebung mit klaren Regeln und verantwortungsvollem Umgang statt.",
        "Programi za različita iskustva": "Programme für unterschiedliche Erfahrungsstufen",
        "Sadržaj je prilagođen početnicima, iskusnim strijelcima, pojedincima, grupama i posjetiocima željnim avanture.": "Die Angebote richten sich an Anfänger, erfahrene Schützen, Einzelpersonen, Gruppen und abenteuerlustige Besucher.",
        "Sport, priroda i odmor": "Sport, Natur und Erholung",
        "Na jednom mjestu povezujemo streljaštvo, off-road ture, domaću atmosferu i boravak u prirodi.": "An einem Ort verbinden wir Schießsport, Offroad-Touren, herzliche Atmosphäre und Aufenthalt in der Natur.",
        "Događaji koji okupljaju ljude": "Veranstaltungen, die Menschen zusammenbringen",
        "Redovni turniri, obuke i kursevi stvaraju živ centar u kojem se uvijek dešava nešto novo.": "Regelmäßige Turniere, Trainings und Kurse schaffen ein lebendiges Zentrum, in dem immer etwas Neues passiert.",
        "Strelište - OlivElephant Sportsko Rekreativni Centar": "Schießstand - OlivElephant Sport- und Freizeitzentrum",
        "OlivElephant • Strelište": "OlivElephant • Schießstand",
        "Strelište": "Schießstand",
        "Profesionalno okruženje za sportsko, rekreativno i edukativno streljaštvo. Sigurnost, kontrola i kvalitetno iskustvo nalaze se u osnovi svakog treninga, obuke i posjete.": "Professionelles Umfeld für sportliches, freizeitliches und lehrreiches Schießen. Sicherheit, Kontrolle und ein hochwertiges Erlebnis stehen bei jedem Training, Kurs und Besuch im Mittelpunkt.",
        "Temelj svakog dolaska": "Grundlage jedes Besuchs",
        "Sigurnost": "Sicherheit",
        "Svaka aktivnost počinje jasnim pravilima, stručnim nadzorom i odgovornim pristupom. Prije prvog pucnja učesnik se upoznaje sa prostorom, opremom i pravilima ponašanja na strelištu.": "Jede Aktivität beginnt mit klaren Regeln, fachkundiger Betreuung und verantwortungsvollem Umgang. Vor dem ersten Schuss werden Teilnehmer mit Anlage, Ausrüstung und Sicherheitsregeln vertraut gemacht.",
        "Cilj nije samo pogoditi metu, već razviti pravilne navike, kontrolu i sigurnost koja se podrazumijeva u svakom trenutku.": "Ziel ist nicht nur das Treffen der Scheibe, sondern die Entwicklung richtiger Gewohnheiten, Kontrolle und konsequenter Sicherheit.",
        "Razvoj tehnike": "Technikentwicklung",
        "Sportsko streljaštvo": "Sportschießen",
        "Trening je usmjeren na preciznost, brzinu, kontrolu i pravilnu tehniku. Svaki program se prilagođava iskustvu učesnika i cilju koji želi postići.": "Das Training konzentriert sich auf Präzision, Geschwindigkeit, Kontrolle und saubere Technik. Jedes Programm wird an Erfahrung und Ziel des Teilnehmers angepasst.",
        "Kroz kontinuiran rad razvijaju se sigurnost u izvođenju, pravilno rukovanje i sposobnost donošenja mirnih odluka pod pritiskom.": "Kontinuierliches Training entwickelt Handlungssicherheit, korrektes Handling und die Fähigkeit, auch unter Druck ruhig zu entscheiden.",
        "Iskustvo za posjetioce": "Erlebnis für Besucher",
        "Rekreacija": "Freizeit",
        "Strelište je pogodno i za pojedince, grupe i goste koji se prvi put susreću sa streljaštvom i žele ga upoznati u kontrolisanom okruženju.": "Der Schießstand eignet sich auch für Einzelpersonen, Gruppen und Gäste, die zum ersten Mal mit dem Schießsport in Kontakt kommen und ihn in kontrollierter Umgebung kennenlernen möchten.",
        "Uz stručnu podršku, posjeta postaje zanimljivo i edukativno iskustvo koje spaja koncentraciju, disciplinu i osjećaj ličnog napretka.": "Mit fachkundiger Unterstützung wird der Besuch zu einem interessanten und lehrreichen Erlebnis aus Konzentration, Disziplin und persönlichem Fortschritt.",
        "Programi strelišta": "Programme des Schießstands",
        "Dva pravca.": "Zwei Wege.",
        "Jedan standard.": "Ein Standard.",
        "Sportski razvoj kroz klub ili strukturirana edukacija kroz akademiju. Sve ostaje na jednoj stranici — bez nepotrebnog otvaranja dodatnih podstranica.": "Sportliche Entwicklung im Club oder strukturierte Ausbildung in der Akademie. Alles bleibt auf einer Seite — ohne unnötige zusätzliche Unterseiten.",
        "KLUB": "CLUB",
        "Klub praktičnog streljaštva": "Club für praktisches Schießen",
        "Obuka • Trening • PIRO • Turniri": "Ausbildung • Training • PIRO • Turniere",
        "Klub okuplja zaljubljenike u praktično streljaštvo kroz obuke, redovne treninge, napredne programe i takmičenja.": "Der Club vereint Liebhaber des praktischen Schießens durch Ausbildung, regelmäßiges Training, fortgeschrittene Programme und Wettkämpfe.",
        "Obuka": "Ausbildung",
        "Osnove praktičnog streljaštva i sigurno rukovanje.": "Grundlagen des praktischen Schießens und sicherer Umgang.",
        "Trening": "Training",
        "Redovni treninzi za preciznost, brzinu i tehniku.": "Regelmäßiges Training für Präzision, Geschwindigkeit und Technik.",
        "Napredni programi i specijalizovane vježbe.": "Fortgeschrittene Programme und spezialisierte Übungen.",
        "Turniri": "Turniere",
        "Organizacija i učešće na turnirima.": "Organisation und Teilnahme an Turnieren.",
        "AKADEMIJA": "AKADEMIE",
        "Akademija oružja Oliv Elephant": "Oliv Elephant Waffenakademie",
        "Edukacija • Sigurnost • Obuke i kursevi": "Ausbildung • Sicherheit • Trainings & Kurse",
        "Akademija pruža edukaciju iz oblasti sigurnog rukovanja oružjem, teorijske nastave i praktične obuke.": "Die Akademie vermittelt sicheren Umgang mit Waffen, Theorie und praktische Ausbildung.",
        "Akademija oružja": "Waffenakademie",
        "Edukacija o vrstama oružja, sigurnosti i pravilnoj upotrebi.": "Ausbildung zu Waffenarten, Sicherheit und korrekter Anwendung.",
        "OlivElephant programi": "OlivElephant Programme",
        "Specijalizovani programi, obuke i kursevi.": "Spezialisierte Programme, Trainings und Kurse.",
        "Galerija": "Galerie",
        "Strelište kroz detalje.": "Der Schießstand im Detail.",
        "Kliknite na fotografiju za pregled preko cijelog ekrana i listanje kompletne galerije.": "Klicken Sie auf ein Foto für die Vollbildansicht und zum Durchblättern der gesamten Galerie.",
        "Klubhaus - OlivElephant Sportsko Rekreativni Centar": "Klubhaus - OlivElephant Sport- und Freizeitzentrum",
        "OlivElephant • Klubhaus": "OlivElephant • Klubhaus",
        "Mjesto gdje završava tempo aktivnosti, a počinje druženje. Klubhaus okuplja članove, posjetioce i goste centra u opuštenom i domaćem ambijentu.": "Ein Ort, an dem das Tempo der Aktivitäten endet und das Zusammensein beginnt. Das Klubhaus bringt Mitglieder, Besucher und Gäste in entspannter, herzlicher Atmosphäre zusammen.",
        "Nije zamišljen kao običan caffe, već kao prostor koji povezuje cijeli doživljaj OlivElephanta — od terena do stola.": "Es ist nicht als gewöhnliches Café gedacht, sondern als Ort, der das gesamte OlivElephant-Erlebnis verbindet — vom Gelände bis zum Tisch.",
        "Neka mjesta služe da prođe vrijeme.": "Manche Orte lassen die Zeit einfach vergehen.",
        "Klubhaus je napravljen da ga poželite produžiti.": "Das Klubhaus ist dafür gemacht, dass man länger bleiben möchte.",
        "Jedan dolazak": "Ein Besuch",
        "Četiri trenutka koja čine atmosferu.": "Vier Momente, die die Atmosphäre prägen.",
        "Stani": "Ankommen",
        "Nakon treninga, ture ili boravka u prirodi, prvi trenutak je jednostavan — sjesti, usporiti i promijeniti ritam.": "Nach Training, Tour oder Zeit in der Natur ist der erste Moment ganz einfach — hinsetzen, entschleunigen und den Rhythmus wechseln.",
        "Prvi utisak": "Erster Eindruck",
        "Udahni": "Durchatmen",
        "Miran ambijent i otvoren prostor stvaraju mjesto gdje se razgovor vraća u prvi plan, bez žurbe i buke.": "Ruhige Atmosphäre und offener Raum schaffen einen Ort, an dem Gespräche wieder im Mittelpunkt stehen — ohne Hektik und Lärm.",
        "Predah": "Pause",
        "Probaj": "Probieren",
        "Domaći kolači, prirodni sokovi, kafa i proizvodi lokalnog porijekla upotpunjuju osjećaj autentičnog domaćeg mjesta.": "Hausgemachte Kuchen, natürliche Säfte, Kaffee und regionale Produkte vervollständigen das Gefühl eines authentischen, gastfreundlichen Ortes.",
        "Domaći ukus": "Regionaler Geschmack",
        "Ostani": "Bleiben",
        "Klubhaus nije samo stanica između aktivnosti, već prostor u kojem se iskustvo centra nastavlja kroz druženje.": "Das Klubhaus ist nicht nur eine Station zwischen Aktivitäten, sondern ein Ort, an dem das Erlebnis des Zentrums beim Zusammensein weitergeht.",
        "Dobra atmosfera": "Gute Atmosphäre",
        "Caffe Mozambik": "Caffe Mozambik",
        "Identitet unutar centra.": "Ein eigener Charakter im Zentrum.",
        "Caffe Mozambik je srce Klubhausa i mjesto gdje se sastaju posjetioci različitih interesa — strijelci, gosti, porodice, ljubitelji prirode i avanture.": "Caffe Mozambik ist das Herz des Klubhauses und Treffpunkt für Schützen, Gäste, Familien sowie Natur- und Abenteuerliebhaber.",
        "Upravo ta mješavina ljudi, aktivnosti i domaće ponude daje prostoru karakter koji se ne može svesti samo na kafu, kolače ili odmor.": "Gerade diese Mischung aus Menschen, Aktivitäten und regionalem Angebot verleiht dem Ort einen Charakter, der weit über Kaffee, Kuchen oder Erholung hinausgeht.",
        "Detalji koji grade atmosferu.": "Details, die Atmosphäre schaffen.",
        "Kliknite fotografiju za pregled preko cijelog ekrana i listanje galerije.": "Klicken Sie auf ein Foto für die Vollbildansicht und zum Durchblättern der Galerie.",
        "4x4 Rent & Tours - OlivElephant Sportsko Rekreativni Centar": "4x4 Verleih & Touren - OlivElephant Sport- und Freizeitzentrum",
        "OlivElephant • Off-road iskustvo": "OlivElephant • Offroad-Erlebnis",
        "Quadovi, buggy vozila i terenska vozila za vožnju kroz prirodu, šumske puteve i okolinu centra — sa vodičem ili bez vodiča, u zavisnosti od iskustva i odabrane rute.": "Quads, Buggys und Geländefahrzeuge für Fahrten durch Natur, Waldwege und die Umgebung des Zentrums — mit oder ohne Guide, je nach Erfahrung und gewählter Route.",
        "Način vožnje": "Fahrweise",
        "Sa vodičem ili samostalno": "Mit Guide oder selbstständig",
        "Za koga": "Für wen",
        "Pojedinci, parovi i grupe": "Einzelpersonen, Paare und Gruppen",
        "Ambijent": "Umgebung",
        "Šuma, makadam i priroda": "Wald, Schotterwege und Natur",
        "Izaberi vozilo": "Fahrzeug wählen",
        "Tri načina da doživiš teren.": "Drei Arten, das Gelände zu erleben.",
        "Brzo i direktno": "Schnell und direkt",
        "Quad": "Quad",
        "Dinamična vožnja za ljubitelje adrenalina, prirode i kraćih off-road tura. Idealan izbor za solo vožnju i istraživanje terena.": "Dynamisches Fahren für Adrenalin- und Naturfans sowie kürzere Offroad-Touren. Ideal für Solofahrten und das Erkunden des Geländes.",
        "Stabilno i atraktivno": "Stabil und aufregend",
        "Buggy": "Buggy",
        "Kombinacija stabilnosti, kontrole i atraktivne vožnje. Pogodan za avanturističke ture kroz različite tipove terena.": "Eine Kombination aus Stabilität, Kontrolle und aufregendem Fahrgefühl. Geeignet für Abenteuertouren auf unterschiedlichen Untergründen.",
        "Snaga i komfor": "Kraft und Komfort",
        "G-Class": "G-Klasse",
        "Terensko iskustvo u snažnom vozilu, idealno za zahtjevnije rute, grupne vožnje i goste koji žele više komfora bez odricanja od avanture.": "Offroad-Erlebnis in einem kraftvollen Fahrzeug, ideal für anspruchsvollere Routen, Gruppenfahrten und Gäste, die mehr Komfort ohne Verzicht auf Abenteuer möchten.",
        "Opcija 01": "Option 01",
        "Tura sa vodičem": "Geführte Tour",
        "Organizovana ruta, podrška tokom vožnje i sigurnije upoznavanje terena za goste koji prvi put dolaze ili žele vođeno iskustvo.": "Organisierte Route, Begleitung während der Fahrt und ein sicherer Einstieg ins Gelände für Erstbesucher oder Gäste, die eine geführte Tour wünschen.",
        "Opcija 02": "Option 02",
        "Vožnja bez vodiča": "Fahrt ohne Guide",
        "Za iskusnije vozače i goste koji žele slobodniji tempo, u skladu sa dogovorom, pravilima centra i izabranom rutom.": "Für erfahrenere Fahrer und Gäste, die ein freieres Tempo wünschen — nach Absprache, gemäß den Regeln des Zentrums und der gewählten Route.",
        "Ponuda vozila": "Fahrzeugangebot",
        "Teren kroz objektiv.": "Das Gelände durch die Linse.",
        "Prenoćište - OlivElephant Sportsko Rekreativni Centar": "Unterkunft - OlivElephant Sport- und Freizeitzentrum",
        "OlivElephant • Prenoćište": "OlivElephant • Unterkunft",
        "u voćnoj avliji": "im Obstgarten",
        "Mirno prirodno okruženje, voćnjaci, zelenilo i udobni apartmani za odmor nakon aktivnosti ili nekoliko dana potpunog bijega od svakodnevnog ritma.": "Ruhige Natur, Obstgärten, viel Grün und komfortable Apartments zur Erholung nach Aktivitäten oder für einige Tage Auszeit vom Alltag.",
        "Kapacitet": "Kapazität",
        "3 apartmana": "3 Apartments",
        "Okruženje": "Umgebung",
        "Priroda i voćnjaci": "Natur und Obstgärten",
        "Za goste": "Für Gäste",
        "Parking": "Parkplatz",
        "Povezanost": "Verbindung",
        "Besplatan WiFi": "Kostenloses WLAN",
        "Odmor nakon doživljaja": "Erholung nach dem Erlebnis",
        "Mjesto gdje dan završava sporije.": "Ein Ort, an dem der Tag langsamer ausklingt.",
        "Smještaj je namijenjen posjetiocima strelišta, ljubiteljima prirode, parovima, porodicama i gostima koji žele provesti nekoliko dana u mirnijem ambijentu.": "Die Unterkunft ist für Besucher des Schießstands, Naturliebhaber, Paare, Familien und Gäste gedacht, die einige Tage in ruhiger Umgebung verbringen möchten.",
        "Umjesto klasičnog gradskog smještaja, ovdje je fokus na tišini, zelenilu i osjećaju boravka u prirodi — uz udobnost potrebnu za kvalitetan odmor.": "Statt klassischer Stadtunterkunft stehen hier Ruhe, Grün und das Gefühl eines Aufenthalts in der Natur im Mittelpunkt — mit dem Komfort für echte Erholung.",
        "Šta vas očekuje": "Was Sie erwartet",
        "Jednostavno, mirno i funkcionalno.": "Einfach, ruhig und funktional.",
        "Tri apartmana": "Drei Apartments",
        "Komforan smještaj prilagođen pojedincima, parovima i porodicama koje žele ostati duže u centru.": "Komfortable Unterkunft für Einzelpersonen, Paare und Familien, die länger im Zentrum bleiben möchten.",
        "Prirodno okruženje": "Natürliche Umgebung",
        "Pogled na zelenilo i voćnjake, mirna atmosfera i prostor za predah izvan gradskog ritma.": "Blick ins Grüne und auf Obstgärten, ruhige Atmosphäre und Raum zum Abschalten fern vom Stadtrhythmus.",
        "Obezbijeđen parking za goste tokom kompletnog boravka.": "Für Gäste steht während des gesamten Aufenthalts ein Parkplatz zur Verfügung.",
        "WiFi": "WLAN",
        "Besplatan pristup internetu u okviru smještajnog objekta.": "Kostenloser Internetzugang in der Unterkunft.",
        "Od aktivnosti do potpunog mira.": "Von Aktivität zu völliger Ruhe.",
        "Galerija smještaja": "Galerie der Unterkunft",
        "Prostor, detalji i priroda.": "Raum, Details und Natur.",
        "Kontakt - OlivElephant Sportsko Rekreativni Centar": "Kontakt - OlivElephant Sport- und Freizeitzentrum",
        "OlivElephant • Sanski Most": "OlivElephant • Sanski Most",
        "Za informacije o strelištu, obukama, smještaju, 4x4 turama ili rezervacijama javite nam se direktno ili nas posjetite u Kruharima kod Sanskog Mosta.": "Für Informationen zum Schießstand, zu Trainings, Unterkunft, 4x4-Touren oder Reservierungen kontaktieren Sie uns direkt oder besuchen Sie uns in Kruhari bei Sanski Most.",
        "Telefon": "Telefon",
        "E-mail": "E-Mail",
        "Lokacija": "Standort",
        "Kruhari, Sanski Most": "Kruhari, Sanski Most",
        "Radno vrijeme": "Öffnungszeiten",
        "Četvrtak – nedjelja": "Donnerstag – Sonntag",
        "Ponedjeljak": "Montag",
        "Zatvoreno": "Geschlossen",
        "Utorak": "Dienstag",
        "Srijeda": "Mittwoch",
        "Četvrtak": "Donnerstag",
        "Petak": "Freitag",
        "Subota": "Samstag",
        "Nedjelja": "Sonntag",
        "Pratite Oliv Elephant": "Folgen Sie Oliv Elephant",
        "Novosti, događaji i trenutci iz centra — pratite nas na društvenim mrežama.": "Neuigkeiten, Veranstaltungen und Eindrücke aus dem Zentrum — folgen Sie uns in den sozialen Medien.",
        "Oliv Elephant Sportsko Rekreativni Centar": "Oliv Elephant Sport- und Freizeitzentrum"
}
    };

    const LANG_LABELS = {
        bs: "BA",
        de: "DE",
        en: "EN"
    };

    function normalizeText(value) {
        return String(value || "").replace(/\s+/g, " ").trim();
    }

    function getSavedLanguage() {
        const saved = localStorage.getItem("oeLanguage");
        return ["bs", "de", "en"].includes(saved) ? saved : "bs";
    }

    function translateTextNodes(lang) {
        const dictionary = OE_TRANSLATIONS[lang] || {};

        const walker = document.createTreeWalker(
            document.documentElement,
            NodeFilter.SHOW_TEXT,
            {
                acceptNode(node) {
                    const parent = node.parentElement;
                    if (!parent) return NodeFilter.FILTER_REJECT;

                    // Loading / glitch intro ostaje potpuno netaknut.
                    if (parent.closest("#intro")) return NodeFilter.FILTER_REJECT;

                    if (["SCRIPT", "STYLE", "NOSCRIPT"].includes(parent.tagName)) {
                        return NodeFilter.FILTER_REJECT;
                    }

                    if (parent.closest(".oe-language-ui")) {
                        return NodeFilter.FILTER_REJECT;
                    }

                    return normalizeText(node.nodeValue)
                        ? NodeFilter.FILTER_ACCEPT
                        : NodeFilter.FILTER_REJECT;
                }
            }
        );

        const nodes = [];
        while (walker.nextNode()) nodes.push(walker.currentNode);

        nodes.forEach((node) => {
            if (typeof node.__oeOriginalText === "undefined") {
                node.__oeOriginalText = node.nodeValue;
            }

            const original = node.__oeOriginalText;
            const key = normalizeText(original);

            if (lang === "bs") {
                node.nodeValue = original;
                return;
            }

            const translated = dictionary[key];
            if (!translated) {
                node.nodeValue = original;
                return;
            }

            const leading = (original.match(/^\s*/) || [""])[0];
            const trailing = (original.match(/\s*$/) || [""])[0];
            node.nodeValue = leading + translated + trailing;
        });

        // Accessiblity / UI attributes
        document.querySelectorAll("[aria-label], [title], [placeholder]").forEach((el) => {
            ["aria-label", "title", "placeholder"].forEach((attr) => {
                if (!el.hasAttribute(attr)) return;

                const storageKey = "__oeOriginalAttr_" + attr;
                if (typeof el[storageKey] === "undefined") {
                    el[storageKey] = el.getAttribute(attr);
                }

                const original = el[storageKey];
                const key = normalizeText(original);

                if (lang === "bs") {
                    el.setAttribute(attr, original);
                } else if (dictionary[key]) {
                    el.setAttribute(attr, dictionary[key]);
                }
            });
        });
    }

    function updateLanguageUI(lang) {
        document.documentElement.lang = lang === "bs" ? "bs" : lang;

        document.querySelectorAll(".oe-lang-btn").forEach((button) => {
            const active = button.dataset.lang === lang;
            button.classList.toggle("active", active);
            button.setAttribute("aria-pressed", active ? "true" : "false");
        });

        const promptTitle = document.querySelector(".oe-language-toast-title");
        const promptText = document.querySelector(".oe-language-toast-text");

        if (promptTitle && promptText) {
            if (lang === "de") {
                promptTitle.textContent = "Sprache auswählen";
                promptText.textContent = "Wählen Sie die Sprache der Website.";
            } else if (lang === "en") {
                promptTitle.textContent = "Choose language";
                promptText.textContent = "Select the website language.";
            } else {
                promptTitle.textContent = "Odaberite jezik";
                promptText.textContent = "Izaberite jezik prikaza stranice.";
            }
        }
    }

    function setLanguage(lang, save = true) {
        if (!["bs", "de", "en"].includes(lang)) lang = "bs";

        if (save) {
            localStorage.setItem("oeLanguage", lang);
        }

        translateTextNodes(lang);
        updateLanguageUI(lang);
        hideLanguageToast();
    }

    function injectLanguageStyles() {
        if (document.getElementById("oe-language-styles")) return;

        const style = document.createElement("style");
        style.id = "oe-language-styles";
        style.textContent = `
            .oe-language-ui {
                font-family: inherit;
            }

            .oe-inline-languages {
                display: inline-flex;
                align-items: center;
                gap: 5px;
                margin-left: 8px;
                padding-left: 10px;
                border-left: 1px solid rgba(194,163,107,.18);
            }

            .oe-lang-btn {
                appearance: none;
                border: 1px solid rgba(194,163,107,.22);
                background: transparent;
                color: rgba(232,223,200,.58);
                min-width: 35px;
                height: 31px;
                padding: 0 8px;
                border-radius: 999px;
                font: inherit;
                font-size: 10px;
                line-height: 1;
                font-weight: 850;
                letter-spacing: .08em;
                cursor: pointer;
                transition: .22s ease;
            }

            .oe-lang-btn:hover,
            .oe-lang-btn.active {
                color: #0a0e09;
                background: var(--sand, #c2a36b);
                border-color: var(--sand, #c2a36b);
            }

            .oe-language-toast {
                position: fixed;
                right: 24px;
                bottom: 24px;
                z-index: 999999;
                width: min(360px, calc(100vw - 32px));
                padding: 20px;
                border: 1px solid rgba(194,163,107,.28);
                border-radius: 18px;
                background: rgba(10,15,10,.94);
                box-shadow: 0 25px 70px rgba(0,0,0,.48);
                backdrop-filter: blur(16px);
                -webkit-backdrop-filter: blur(16px);
                opacity: 0;
                visibility: hidden;
                transform: translateY(24px) scale(.98);
                transition: opacity .35s ease, transform .35s ease, visibility .35s ease;
            }

            .oe-language-toast.show {
                opacity: 1;
                visibility: visible;
                transform: translateY(0) scale(1);
            }

            .oe-language-toast-top {
                display: flex;
                justify-content: space-between;
                gap: 18px;
                align-items: flex-start;
            }

            .oe-language-toast-kicker {
                display: block;
                margin-bottom: 7px;
                color: var(--sand, #c2a36b);
                font-size: 9px;
                font-weight: 900;
                letter-spacing: .22em;
                text-transform: uppercase;
            }

            .oe-language-toast-title {
                margin: 0;
                color: var(--cream, #e8dfc8);
                font-size: 20px;
                font-weight: 900;
                line-height: 1.05;
                text-transform: uppercase;
            }

            .oe-language-toast-text {
                margin: 8px 0 0;
                color: rgba(232,223,200,.58);
                font-size: 13px;
                line-height: 1.55;
            }

            .oe-language-toast-close {
                appearance: none;
                border: 0;
                background: transparent;
                color: rgba(232,223,200,.45);
                font-size: 20px;
                line-height: 1;
                cursor: pointer;
            }

            .oe-language-toast-actions {
                display: grid;
                grid-template-columns: repeat(3, 1fr);
                gap: 8px;
                margin-top: 18px;
            }

            .oe-language-toast-actions .oe-lang-btn {
                width: 100%;
                height: 42px;
                border-radius: 10px;
                font-size: 12px;
            }

            @media (max-width: 900px) {
                .oe-inline-languages {
                    width: 100%;
                    margin: 12px 0 0;
                    padding: 16px 0 0;
                    border-left: 0;
                    border-top: 1px solid rgba(194,163,107,.15);
                }

                .oe-inline-languages .oe-lang-btn {
                    flex: 1;
                    height: 40px;
                }

                .oe-language-toast {
                    left: 16px;
                    right: 16px;
                    bottom: 16px;
                    width: auto;
                }
            }
        `;
        document.head.appendChild(style);
    }

    function createLanguageButtons(containerClass) {
        const wrap = document.createElement("div");
        wrap.className = "oe-language-ui " + containerClass;

        [
            ["bs", "BA"],
            ["de", "DE"],
            ["en", "EN"]
        ].forEach(([lang, label]) => {
            const button = document.createElement("button");
            button.type = "button";
            button.className = "oe-lang-btn";
            button.dataset.lang = lang;
            button.textContent = label;
            button.setAttribute("aria-label", "Language " + label);
            button.addEventListener("click", () => setLanguage(lang, true));
            wrap.appendChild(button);
        });

        return wrap;
    }

    function injectInlineLanguageSwitcher() {
        if (document.querySelector(".oe-inline-languages")) return;

        const nav = document.getElementById("mobileMenu");
        if (!nav) return;

        nav.appendChild(createLanguageButtons("oe-inline-languages"));
    }

    function injectLanguageToast() {
        if (document.querySelector(".oe-language-toast")) return;

        const toast = document.createElement("div");
        toast.className = "oe-language-ui oe-language-toast";
        toast.innerHTML = `
            <div class="oe-language-toast-top">
                <div>
                    <span class="oe-language-toast-kicker">OLIV ELEPHANT</span>
                    <h3 class="oe-language-toast-title">Odaberite jezik</h3>
                    <p class="oe-language-toast-text">Izaberite jezik prikaza stranice.</p>
                </div>
                <button class="oe-language-toast-close" type="button" aria-label="Zatvori">×</button>
            </div>
            <div class="oe-language-toast-actions"></div>
        `;

        const actions = toast.querySelector(".oe-language-toast-actions");
        [
            ["bs", "BA"],
            ["de", "DE"],
            ["en", "EN"]
        ].forEach(([lang, label]) => {
            const button = document.createElement("button");
            button.type = "button";
            button.className = "oe-lang-btn";
            button.dataset.lang = lang;
            button.textContent = label;
            button.addEventListener("click", () => setLanguage(lang, true));
            actions.appendChild(button);
        });

        toast.querySelector(".oe-language-toast-close").addEventListener("click", () => {
            sessionStorage.setItem("oeLangPromptDismissed", "true");
            hideLanguageToast();
        });

        document.body.appendChild(toast);
    }

    function showLanguageToast() {
        if (localStorage.getItem("oeLanguage")) return;
        if (sessionStorage.getItem("oeLangPromptDismissed")) return;

        injectLanguageToast();
        updateLanguageUI(getSavedLanguage());

        requestAnimationFrame(() => {
            requestAnimationFrame(() => {
                const toast = document.querySelector(".oe-language-toast");
                if (toast) toast.classList.add("show");
            });
        });
    }

    function hideLanguageToast() {
        const toast = document.querySelector(".oe-language-toast");
        if (toast) toast.classList.remove("show");
    }

    function showPromptWhenReady() {
        if (localStorage.getItem("oeLanguage")) return;
        if (sessionStorage.getItem("oeLangPromptDismissed")) return;

        const waitForIntro = () => {
            const intro = document.getElementById("intro");

            if (intro) {
                setTimeout(waitForIntro, 180);
                return;
            }

            setTimeout(showLanguageToast, 650);
        };

        waitForIntro();
    }

    function initLanguageSystem() {
        injectLanguageStyles();
        injectInlineLanguageSwitcher();

        const lang = getSavedLanguage();

        // Ako je jezik već izabran, stranica se odmah prevodi.
        setLanguage(lang, false);

        // Ako nije, notifikacija se pojavljuje tek nakon loading introa.
        if (!localStorage.getItem("oeLanguage")) {
            showPromptWhenReady();
        }
    }

    if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", initLanguageSystem, { once: true });
    } else {
        initLanguageSystem();
    }
})();

