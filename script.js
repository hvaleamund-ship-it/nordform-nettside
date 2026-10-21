const menuToggle = document.querySelector(".menu-toggle");
const navigation = document.querySelector(".main-navigation");

if (menuToggle && navigation) {
  const closeMenu = () => {
    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.setAttribute("aria-label", "Åpne meny");
    navigation.classList.remove("is-open");
  };

  menuToggle.addEventListener("click", () => {
    const isOpen = menuToggle.getAttribute("aria-expanded") === "true";
    menuToggle.setAttribute("aria-expanded", String(!isOpen));
    menuToggle.setAttribute("aria-label", isOpen ? "Åpne meny" : "Lukk meny");
    navigation.classList.toggle("is-open", !isOpen);
  });

  navigation.addEventListener("click", (event) => {
    if (event.target instanceof Element && event.target.closest("a")) closeMenu();
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && menuToggle.getAttribute("aria-expanded") === "true") {
      closeMenu();
      menuToggle.focus();
    }
  });

  window.addEventListener("resize", () => {
    if (window.innerWidth > 650) closeMenu();
  });
}

const currentPage = window.location.pathname.split("/").pop() || "index.html";
document.querySelectorAll(".main-navigation a").forEach((link) => {
  if (link.getAttribute("href") === currentPage) link.setAttribute("aria-current", "page");
});

document.querySelectorAll("[data-year]").forEach((element) => {
  element.textContent = String(new Date().getFullYear());
});

const projects = {
  frisor: {
    name: "Studio Form",
    category: "Frisør · Konseptdesign",
    theme: "work-frisor",
    image: "https://images.unsplash.com/photo-1503951914875-452162b0f3f1?auto=format&fit=crop&w=900&q=85",
    eyebrow: "FRISØR & STYLING — OSLO",
    headline: "Form.",
    secondLine: "Følelse.",
    subline: "Et personlig uttrykk for salongen med bestilling i sentrum.",
    purpose: "En konseptside for en moderne frisørsalong. Designet skal speile den rolige, personlige opplevelsen i stolen og gjøre det enkelt å finne behandlinger og bestille time.",
    features: ["Behandlinger og priser med rask oversikt", "Tydelig vei til timebestilling", "Personlig presentasjon av salongen"],
  },
  kafe: {
    name: "Godt Brød & Kaffe",
    category: "Kafé · Konseptdesign",
    theme: "work-kafe",
    image: "https://images.unsplash.com/photo-1554118811-1e0d58224f6f?auto=format&fit=crop&w=900&q=85",
    eyebrow: "FERSKT HVER MORGEN",
    headline: "Kaffe.",
    secondLine: "Bakst.",
    subline: "Et lite sted å lande — midt i nabolaget.",
    purpose: "En fiktiv kaféidentitet med en varm, inviterende nettside. Meny, åpningstider og beliggenhet er prioritert slik at gjestene finner det de trenger før de kommer innom.",
    features: ["Meny og utvalgte favoritter", "Åpningstider og besøksinformasjon", "Et visuelt uttrykk som føles personlig"],
  },
  handverker: {
    name: "Linje Snekkeri",
    category: "Håndverker · Konseptdesign",
    theme: "work-handverker",
    image: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=900&q=85",
    eyebrow: "LOKAL SNEKKER — OSLO",
    headline: "Godt gjort.",
    secondLine: "For hånd.",
    subline: "Gjennomtenkte løsninger, bygd for å vare.",
    purpose: "En demo for en lokal snekkerbedrift. Prosjekter og tydelig faglig presentasjon bygger trygghet, mens en enkel kontaktvei senker terskelen for å be om et tilbud.",
    features: ["Prosjektgalleri med tydelige beskrivelser", "Oversikt over tjenester og fagområder", "Enkel forespørsel om befaring"],
  },
  bilpleie: {
    name: "Blank Bilpleie",
    category: "Bilpleie · Konseptdesign",
    theme: "work-bilpleie",
    image: "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?auto=format&fit=crop&w=900&q=85",
    eyebrow: "BILPLEIE & DETAILING",
    headline: "Ren bil.",
    secondLine: "Ny følelse.",
    subline: "Detaljer som merkes. Omsorg som synes.",
    purpose: "Et konsept for bilpleie og detailing. Besøkende skal raskt kunne sammenligne behandlinger, forstå hva som er inkludert og ta kontakt for å finne et passende tidspunkt.",
    features: ["Behandlinger presentert på en forståelig måte", "Før- og ettergalleri for demoformål", "Kontakt og forespørsel om time"],
  },
  butikk: {
    name: "Omigjen",
    category: "Butikk · Konseptdesign",
    theme: "work-butikk",
    image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=900&q=85",
    eyebrow: "GJENBRUK MED PERSONLIGHET",
    headline: "Fine funn.",
    secondLine: "Nye historier.",
    subline: "En liten butikk med sans for ting som varer.",
    purpose: "En fiktiv konseptbutikk for kuratert gjenbruk. En luftig presentasjon løfter frem varene og historiene bak dem uten å gjøre veien til butikken unødvendig komplisert.",
    features: ["Produkter presentert med god plass", "Historien bak butikkens utvalg", "Butikkinformasjon og besøksdetaljer"],
  },
};

const projectContent = document.querySelector("#project-content");
const selectedProject = new URLSearchParams(window.location.search).get("prosjekt");
const project = selectedProject ? projects[selectedProject] : null;

if (projectContent && project) {
  document.title = `${project.name} — Konseptdesign | Nordform`;
  const description = document.querySelector('meta[name="description"]');
  if (description) description.setAttribute("content", `${project.name}: fiktivt ${project.category.toLowerCase()} fra Nordform, vist med desktop- og mobilkonsept.`);

  const features = project.features.map((feature) => `<article><h3>${feature}</h3><p>Skissert som en sentral del av den digitale opplevelsen for denne konseptbedriften.</p></article>`).join("");

  projectContent.innerHTML = `
    <section class="project-hero page-width">
      <a class="text-link project-back" href="portefolje.html">← Til porteføljen</a>
      <div class="project-heading">
        <div><span class="project-label">DEMO · KONSEPTDESIGN</span><p class="eyebrow"><span></span> ${project.category}</p><h1>${project.name}</h1></div>
        <p class="page-lead">${project.subline}</p>
      </div>
    </section>
    <section class="project-preview page-width ${project.theme}" aria-label="Desktop-forhåndsvisning av ${project.name}">
      <div class="browser-frame">
        <div class="browser-bar"><span class="browser-dots"><i></i><i></i><i></i></span><span class="browser-address">${project.name.toLowerCase().replaceAll(" ", "")}.no — konsept</span><span class="browser-menu">•••</span></div>
        <div class="demo-site">
          <div class="demo-nav"><strong>${project.name.toUpperCase()}</strong><span>OM　 TJENESTER　 FINN OSS</span></div>
          <div class="demo-spa-content"><div><small>${project.eyebrow}</small><h2>${project.headline}<br /><i>${project.secondLine}</i></h2><p>${project.subline}</p><b>LES MER　↗</b></div><img src="${project.image}" alt="Visuell prøve for konseptet ${project.name}" /></div>
          <div class="demo-footer">${project.category.toUpperCase()} <span>DEMO / 2026</span></div>
        </div>
      </div>
      <div class="device-phone project-phone" aria-label="Mobilforhåndsvisning"><div class="phone-speaker"></div><div class="phone-screen"><span>${project.name.toUpperCase()}</span><img src="${project.image.replace("w=900&q=85", "w=400&q=80")}" alt="Mobilvisning av konseptet ${project.name}" /><small>${project.eyebrow}</small><strong>${project.headline}<br /><i>${project.secondLine}</i></strong><b>LES MER ↗</b></div></div>
    </section>
    <section class="project-details page-width">
      <div><p class="eyebrow"><span></span> ${project.category}</p><h2>En idé med<br /><em>et tydelig formål.</em></h2><p>${project.purpose}</p><p>Dette er et fiktivt demo-prosjekt — ikke en faktisk kunde, levert nettside eller dokumentert resultat.</p></div>
      <div class="project-facts">${features}</div>
    </section>
    <section class="page-cta"><h2>Din bedrift kan bli neste idé.</h2><p>Få en gratis, uforpliktende skisse med utgangspunkt i bedriften din.</p><a class="button button-light" href="kontakt.html">Be om gratis skisse <span aria-hidden="true">↗</span></a></section>`;
}
