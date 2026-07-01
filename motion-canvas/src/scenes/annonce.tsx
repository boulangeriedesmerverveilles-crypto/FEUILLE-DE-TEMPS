import { makeScene2D, Txt, Rect, Layout } from '@motion-canvas/2d';
import { createRef, all, waitFor, easeOutCubic } from '@motion-canvas/core';

import { COULEURS, POLICES, SIGNATURE, FORMATS, zonesSures } from '../charte-bdm';

/**
 * ANNONCE — carte texte sur fond sauge (le fond premium de l'intro).
 * Pour : fermeture exceptionnelle, horaires, nouveauté, galette des rois…
 * Éditer l'objet ANNONCE ci-dessous.
 */
const ANNONCE = {
  surTitre: 'Information',
  titre: 'Fermeture les\n24 et 25 décembre',
  detail: 'Réouverture le 26 à 7h00',
};

export default makeScene2D(function* (view) {
  const format = FORMATS.vertical;
  const zone = zonesSures(format);

  const surTitre = createRef<Txt>();
  const filet = createRef<Rect>();
  const titre = createRef<Txt>();
  const detail = createRef<Txt>();
  const signature = createRef<Txt>();

  view.fill(COULEURS.sauge);

  view.add(
    <>
      <Layout direction={'column'} alignItems={'center'} gap={30}>
        <Txt ref={surTitre} text={ANNONCE.surTitre.toUpperCase()} fontFamily={POLICES.legende}
          fontWeight={600} fontSize={36} letterSpacing={8} fill={COULEURS.chocolat} opacity={0} />
        <Rect ref={filet} width={0} height={3} fill={COULEURS.or} />
        <Txt ref={titre} text={ANNONCE.titre} fontFamily={POLICES.titre} fontWeight={700}
          fontSize={118} textAlign={'center'} fill={COULEURS.chocolat} opacity={0} y={40} />
        <Txt ref={detail} text={ANNONCE.detail} fontFamily={POLICES.titre} fontStyle={'italic'}
          fontSize={52} fill={COULEURS.chocolat} opacity={0} />
      </Layout>
      <Txt ref={signature} text={SIGNATURE} fontFamily={POLICES.titre} fontStyle={'italic'}
        fontSize={32} fill={COULEURS.chocolat} opacity={0} y={zone.basLegende + 120} />
    </>,
  );

  yield* surTitre().opacity(1, 0.5);
  yield* filet().width(220, 0.5, easeOutCubic);
  yield* all(titre().opacity(1, 0.8, easeOutCubic), titre().y(0, 0.8, easeOutCubic));
  yield* detail().opacity(1, 0.5);
  yield* signature().opacity(1, 0.6);
  yield* waitFor(2);
});
