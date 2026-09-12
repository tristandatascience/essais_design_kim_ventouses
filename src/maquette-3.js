/* Maquette 3 — Lenis (défilement fluide) + GSAP (révélations) */
import Lenis from "lenis";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const doux = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

if (!doux) {
  const lenis = new Lenis({ duration: 1.15, smoothWheel: true });
  lenis.on("scroll", ScrollTrigger.update);
  gsap.ticker.add((t) => lenis.raf(t * 1000));
  gsap.ticker.lagSmoothing(0);
} else {
  document.documentElement.classList.add("sans-js");
}

/* Révélations au défilement */
document.addEventListener("DOMContentLoaded", () => {
  const cibles = document.querySelectorAll(".rev");
  if (doux || !("IntersectionObserver" in window)) {
    cibles.forEach((el) => el.classList.add("vue"));
    return;
  }
  cibles.forEach((el) => {
    gsap.set(el, { y: 34, opacity: 0 }); // état initial (avant la création du tween)
    const delai = parseFloat(el.dataset.delai || "0");
    gsap.to(el, {
      opacity: 1,
      y: 0,
      duration: 1.05,
      delay: delai,
      ease: "power3.out",
      scrollTrigger: { trigger: el, start: "top 88%", once: true },
    });
  });
});
