/* Animations partagées — Lenis (défilement fluide) + GSAP (révélations, parallaxe) */
import Lenis from "lenis";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const doux = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

if (!doux) {
  const lenis = new Lenis({ duration: 1.1, smoothWheel: true });
  lenis.on("scroll", ScrollTrigger.update);
  gsap.ticker.add((t) => lenis.raf(t * 1000));
  gsap.ticker.lagSmoothing(0);
}

window.addEventListener("load", () => {
  if (doux) return;

  /* Révélations au défilement */
  document.querySelectorAll(".rev").forEach((el) => {
    gsap.set(el, { y: 36, opacity: 0 });
    gsap.to(el, {
      y: 0,
      opacity: 1,
      duration: 1.05,
      delay: parseFloat(el.dataset.delai || "0"),
      ease: "power3.out",
      scrollTrigger: { trigger: el, start: "top 88%", once: true },
    });
  });

  /* Parallaxe douce sur la photo héro */
  document.querySelectorAll("[data-parallax]").forEach((el) => {
    const force = parseFloat(el.dataset.parallax || "60");
    gsap.fromTo(
      el,
      { yPercent: -force / 12 },
      {
        yPercent: force / 12,
        ease: "none",
        scrollTrigger: { trigger: el, start: "top bottom", end: "bottom top", scrub: 1 },
      }
    );
  });
});

if (doux) {
  document.querySelectorAll(".rev").forEach((el) => (el.style.opacity = 1));
}
