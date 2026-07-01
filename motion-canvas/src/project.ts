import {makeProject} from '@motion-canvas/core';
import './global.css';

// Scènes — le suffixe ?scene est OBLIGATOIRE. L'ordre = l'ordre de lecture.
import introVegetale from './scenes/introVegetale?scene';
import defileProduits from './scenes/defileProduits?scene';
import carteAdresse from './scenes/carteAdresse?scene';
import annonce from './scenes/annonce?scene'; // carte Retrait / Click & Collect
import formuleSandwich from './scenes/formuleSandwich?scene'; // carte Formule Sandwich 9€

// --- FORMAT DE SORTIE ---
// Le format (taille), le fond et le fps sont pilotés par src/project.meta
// (généré/édité par l'onglet "Video Settings" de l'éditeur), pas ici : la
// version installée de @motion-canvas/core n'accepte pas de "settings" dans
// makeProject. Garder src/project.meta aligné sur FORMATS.vertical /
// COULEURS.vertAnis / FPS de charte-bdm.ts en cas de changement de format.
export default makeProject({
  // Vidéo type : intro végétale → défilé produits → carte adresse.
  // scenes: [introVegetale, defileProduits, carteAdresse],
  // Vidéo promo Click & Collect + Formule Sandwich (actuellement active) :
  scenes: [annonce, formuleSandwich],
});
