"use strict";
console.log("coucou");

import { gsap } from "gsap";

// Attendez que le DOM soit chargé avant d'exécuter l'animation
document.addEventListener("DOMContentLoaded", () => {
    // Sélectionnez les éléments que vous souhaitez animer
    const h1 = document.querySelector("h1");
    const h2s = document.querySelectorAll("h2");
    const picture = document.querySelector(".illustration");

    // Créez l'animation avec GSAP
    gsap.from([h1, ...h2s, picture], {
        duration: 1, // Durée de l'animation en secondes
        y: 50, // Déplace les éléments de 50 pixels vers le bas
        opacity: 0, // Partir d'une opacité de 0 (éléments invisibles)
        stagger: 0.2, // Ajoute un délai entre les animations des éléments
        ease: "power2.out", // Utilisez une fonction d'assouplissement pour rendre l'animation plus fluide
    });
});

