import { makeScene2D, Img, Txt, Rect } from '@motion-canvas/2d';
import { createRef, all, waitFor, easeOutCubic, easeInOutCubic } from '@motion-canvas/core';

import { COULEURS, POLICES, SIGNATURE, ADRESSE, FORMATS, zonesSures } from '../charte-bdm';
import facade from '../images/facade.jpg';

/**
 * CARTE ADRESSE — clôture de la vidéo. Photo de la façade + où retirer.
 * C'est LE plan qui doit convertir : il arrive tôt (vidéo courte) pour que le
 * client voie l'adresse avant de scroller.
 */
export default makeScene2D(function* (view) {
  const format = FORMATS.vertical; // aligner avec project.ts
  const zone = zonesSures(format);

  const photo = createRef<Img>();
  const surTitre = createRef<Txt>();
  const bandeau = createRef<Rect>();
  const adresse = createRef<Txt>();
  const signature = createRef<Txt>();

  view.fill(COULEURS.vertAnis);

  view.add(
    <>
      <Img ref={photo} src={facade} width={format.x * 0.9} radius={18} opacity={0} scale={1.05} />

      <Txt
        ref={surTitre}
        text={'À RETIRER EN BOUTIQUE'}
        fontFamily={POLICES.legende}
        fontWeight={600}
        fontSize={34}
        letterSpacing={5}
        fill={COULEURS.creme}
        opacity={0}
        y={zone.basLegende - 190}
      />

      <Rect
        ref={bandeau}
        width={format.x}
        height={150}
        y={zone.basLegende}
        fill={COULEURS.chocolat}
        opacity={0}
      />
      <Txt
        ref={adresse}
        text={ADRESSE}
        fontFamily={POLICES.titre}
        fontWeight={700}
        fontSize={58}
        fill={COULEURS.creme}
        opacity={0}
        y={zone.basLegende}
        textAlign={'center'}
        width={format.x - 80}
        textWrap
      />

      <Txt
        ref={signature}
        text={SIGNATURE}
        fontFamily={POLICES.titre}
        fontStyle={'italic'}
        fontSize={34}
        fill={COULEURS.or}
        opacity={0}
        y={zone.basLegende + 120}
      />
    </>,
  );

  yield* all(photo().opacity(1, 0.8), photo().scale(1, 1.4, easeOutCubic));
  yield* surTitre().opacity(1, 0.5);
  yield* all(bandeau().opacity(0.72, 0.5), adresse().opacity(1, 0.5, easeOutCubic));
  yield* signature().opacity(1, 0.6);
  // léger zoom de la façade pendant la tenue finale
  photo().scale(1.06, 2.2, easeInOutCubic);
  yield* waitFor(2);
});
