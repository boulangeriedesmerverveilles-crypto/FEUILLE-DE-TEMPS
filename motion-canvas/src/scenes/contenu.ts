/**
 * CONTENU DE LA VIDÉO — le seul fichier à toucher pour changer une vidéo produit.
 *
 * Chaque produit : une photo DÉTOURÉE (PNG à fond transparent) posée dans
 * src/images/, importée ci-dessous, + une légende + un prix (optionnel).
 * Le détourage se fait en amont (Photoshop, remove.bg, ou l'app photo du Mac) :
 * Motion Canvas ne détoure pas, il compose des PNG déjà détourés.
 */

import pain from '../images/produit-pain.png';
// import croissant from '../images/croissant.png';
// import tarte from '../images/tarte-myrtille.png';

export const PRODUITS: { photo: string; legende: string; prix?: string }[] = [
  { photo: pain, legende: 'Le pain de campagne qui régale', prix: '3,20 €' },
  // Ajouter ici d'autres produits (2 à 5 idéalement) :
  // { photo: croissant, legende: 'Croissants pur beurre, tournés maison', prix: '1,20 €' },
  // { photo: tarte, legende: 'Tarte aux myrtilles de la vallée', prix: '4,50 €' },
];

// Réglages du défilé
export const DUREE_PAR_PRODUIT = 3.2; // secondes à l'écran par produit (entrée + hold + sortie)
