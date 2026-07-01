/**
 * Charte de marque — La Boulangerie des Merveilles (Tende, depuis 2006)
 * Source unique de vérité pour toutes les vidéos Motion Canvas.
 * Ne jamais coder une couleur/police/format en dur dans une scène : importer d'ici.
 */

export const COULEURS = {
  chocolat: '#1A0F08', // texte sombre, bandeaux de légende
  vertAnis: '#8DB600', // FOND par défaut des cartes produit (charte officielle)
  sauge: '#B6BD83',    // fond doux/premium de la carte d'intro végétale
  creme: '#FAF6EE',    // texte clair
  or: '#C9A96E',       // signature, filets, prix
} as const;

export const POLICES = {
  // Titres de marque (intro, adresse) : élégance artisanale.
  titre: 'Cormorant Garamond',
  // Légendes produit facon TikTok/Reel : lisibles, punchy. Utiliser en bold.
  legende: 'Inter, system-ui, sans-serif',
} as const;

export const SIGNATURE = 'Merci pour votre fidélité depuis 2006.';
export const MARQUE = 'La Boulangerie des Merveilles';
export const ADRESSE = '5 Place de la République — Tende';

/**
 * Formats de sortie. Changer de format = pointer project.ts + les scènes sur
 * l'une de ces valeurs.
 *   vertical : Reels / Stories / TikTok (défaut)
 *   post45   : post feed Instagram/Facebook (le format de la vidéo « magnifique »)
 *   carre    : post carré
 *   paysage  : YouTube / écran magasin
 */
export const FORMATS = {
  vertical: { x: 1080, y: 1920 },
  post45: { x: 1080, y: 1350 },
  carre: { x: 1080, y: 1080 },
  paysage: { x: 1920, y: 1080 },
} as const;

export const FPS = 30;

/**
 * Zones sûres : marges pour que l'UI d'Instagram/TikTok ne recouvre pas le texte.
 * Origine Motion Canvas = centre ; y négatif vers le haut.
 */
export function zonesSures(format: { x: number; y: number }) {
  const demiH = format.y / 2;
  return {
    hautTexte: -demiH + 220,
    basLegende: demiH - 300, // bandeau de légende au-dessus des boutons de l'app
    margeLaterale: format.x * 0.08,
  };
}
