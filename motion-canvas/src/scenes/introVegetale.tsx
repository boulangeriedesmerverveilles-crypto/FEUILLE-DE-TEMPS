import { makeScene2D, Img, Txt, Rect, Layout } from '@motion-canvas/2d';
import { createRef, all, waitFor, easeOutCubic } from '@motion-canvas/core';

import { COULEURS, POLICES, MARQUE, FORMATS } from '../charte-bdm';
import cadreVegetal from '../images/cadre-vegetal.png';

/**
 * INTRO VÉGÉTALE — carte d'ouverture (le style « magnifique »).
 * Cadre illustré blé/pomme/olive sur fond sauge, nom de marque qui apparaît.
 * Sert d'entrée avant le défilé produits.
 */
export default makeScene2D(function* (view) {
  const format = FORMATS.vertical; // aligner avec project.ts

  const cadre = createRef<Img>();
  const marqueLigne1 = createRef<Txt>();
  const marqueLigne2 = createRef<Txt>();
  const filet = createRef<Rect>();
  const depuis = createRef<Txt>();

  view.fill(COULEURS.vertAnis); // la bordure verte, comme dans la vidéo d'origine

  view.add(
    <>
      <Img
        ref={cadre}
        src={cadreVegetal}
        width={format.x * 0.92}
        opacity={0}
        scale={1.04}
      />
      <Layout direction={'column'} alignItems={'center'} gap={10} y={format.y * 0.06}>
        <Txt
          ref={marqueLigne1}
          text={'La Boulangerie'}
          fontFamily={POLICES.titre}
          fontWeight={700}
          fontSize={92}
          fill={COULEURS.chocolat}
          opacity={0}
          y={30}
        />
        <Txt
          ref={marqueLigne2}
          text={'des Merveilles'}
          fontFamily={POLICES.titre}
          fontWeight={700}
          fontSize={92}
          fill={COULEURS.chocolat}
          opacity={0}
          y={30}
        />
        <Rect ref={filet} width={0} height={3} fill={COULEURS.or} marginTop={14} />
        <Txt
          ref={depuis}
          text={'artisan boulanger depuis 2006'}
          fontFamily={POLICES.legende}
          fontSize={30}
          letterSpacing={4}
          fill={COULEURS.chocolat}
          opacity={0}
          marginTop={10}
        />
      </Layout>
    </>,
  );

  // Le cadre entre en fondu + très léger zoom arrière.
  yield* all(cadre().opacity(1, 0.9), cadre().scale(1, 1.2, easeOutCubic));
  yield* all(
    marqueLigne1().opacity(1, 0.6, easeOutCubic),
    marqueLigne1().y(0, 0.6, easeOutCubic),
  );
  yield* all(
    marqueLigne2().opacity(1, 0.6, easeOutCubic),
    marqueLigne2().y(0, 0.6, easeOutCubic),
  );
  yield* filet().width(300, 0.5, easeOutCubic);
  yield* depuis().opacity(1, 0.5);
  yield* waitFor(1.2);
});
