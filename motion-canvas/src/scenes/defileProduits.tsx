import { makeScene2D, Img, Txt, Rect } from '@motion-canvas/2d';
import {
  createRef,
  all,
  waitFor,
  easeOutCubic,
  easeOutBack,
  easeInOutCubic,
} from '@motion-canvas/core';

import { COULEURS, POLICES, FORMATS, zonesSures } from '../charte-bdm';
import { PRODUITS, DUREE_PAR_PRODUIT } from './contenu';

/**
 * DÉFILÉ PRODUITS — le cœur des vidéos de la boulangerie.
 * Fond vert anis, photo détourée flottante au centre, légende en bandeau bas
 * (style Reel/TikTok), badge prix optionnel. Boucle sur la liste PRODUITS de
 * contenu.ts : 1 produit = 1 vidéo simple, 3-4 produits = un défilé.
 *
 * Rythme volontairement serré (~3 s / produit) : au-delà, l'attention décroche
 * et le call-to-action de fin n'est jamais vu.
 */
export default makeScene2D(function* (view) {
  const format = FORMATS.vertical; // aligner avec project.ts
  const zone = zonesSures(format);

  const photo = createRef<Img>();
  const bandeau = createRef<Rect>();
  const legende = createRef<Txt>();
  const badge = createRef<Rect>();
  const prix = createRef<Txt>();

  const photoY = -120; // photo un peu au-dessus du centre, place pour la légende

  view.fill(COULEURS.vertAnis);

  view.add(
    <>
      <Img ref={photo} width={format.x * 0.8} y={photoY} opacity={0} scale={0.9} />

      {/* Bandeau de légende (translucide) — le Txt est séparé pour rester net */}
      <Rect
        ref={bandeau}
        width={format.x}
        height={150}
        y={zone.basLegende}
        fill={COULEURS.chocolat}
        opacity={0}
      />
      <Txt
        ref={legende}
        text={''}
        fontFamily={POLICES.legende}
        fontWeight={700}
        fontSize={46}
        fill={COULEURS.creme}
        opacity={0}
        y={zone.basLegende}
        width={format.x - 80}
        textWrap
        textAlign={'center'}
      />

      {/* Badge prix (auto-dimensionné), au-dessus du bandeau */}
      <Rect
        ref={badge}
        fill={COULEURS.or}
        radius={14}
        padding={[14, 30]}
        y={zone.basLegende - 140}
        scale={0}
      >
        <Txt
          ref={prix}
          text={''}
          fontFamily={POLICES.titre}
          fontWeight={700}
          fontSize={64}
          fill={COULEURS.chocolat}
        />
      </Rect>
    </>,
  );

  const entree = 0.5;
  const sortie = 0.35;

  for (const p of PRODUITS) {
    // Préparer le contenu du produit courant.
    photo().src(p.photo);
    legende().text(p.legende);
    prix().text(p.prix ?? '');

    // Reset visuel avant l'entrée.
    photo().opacity(0).scale(0.9).position.y(photoY + 30);
    badge().scale(0);

    // Entrée simultanée : photo, bandeau, légende, badge.
    yield* all(
      photo().opacity(1, entree, easeOutCubic),
      photo().scale(1, entree, easeOutCubic),
      photo().position.y(photoY, entree, easeOutCubic),
      bandeau().opacity(0.72, entree),
      legende().opacity(1, entree),
      p.prix ? badge().scale(1, entree, easeOutBack) : waitFor(0),
    );

    // Maintien avec un léger flottement (non bloquant).
    const hold = Math.max(0.6, DUREE_PAR_PRODUIT - entree - sortie);
    photo().position.y(photoY - 18, hold, easeInOutCubic);
    yield* waitFor(hold);

    // Sortie : tout s'efface.
    yield* all(
      photo().opacity(0, sortie),
      bandeau().opacity(0, sortie),
      legende().opacity(0, sortie),
      badge().scale(0, sortie),
    );
  }
});
