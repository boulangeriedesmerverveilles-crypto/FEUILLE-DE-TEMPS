import { makeScene2D, Txt, Rect, Layout, Img } from '@motion-canvas/2d';
import {
  createRef,
  all,
  sequence,
  waitFor,
  easeOutCubic,
  easeOutBack,
} from '@motion-canvas/core';

import { COULEURS, POLICES, MARQUE, FORMATS, zonesSures } from '../charte-bdm';
import qrClickCollect from '../images/qr-click-collect.png';

/**
 * ANNONCE — carte texte sur fond sauge (le fond premium de l'intro).
 * Pour : fermeture exceptionnelle, horaires, nouveauté, retrait/Click & Collect…
 * Éditer l'objet ANNONCE ci-dessous. qr/etapes/note sont optionnels : les
 * omettre retombe sur une simple carte titre + détail.
 */
const ANNONCE = {
  surTitre: MARQUE,
  titre: 'Retrait',
  detail: 'Click & Collect',
  qr: qrClickCollect,
  qrLegende: 'boulangeriedesmerverveilles.fr',
  etapes: [
    'Scannez le QR code',
    'Commandez vos produits avant 19h',
    'Récupérez vos produits dès 7h00 le lendemain',
  ],
  note: 'Certains produits doivent respecter un délai de 48h',
};

export default makeScene2D(function* (view) {
  const format = FORMATS.vertical;
  const zone = zonesSures(format);

  const surTitre = createRef<Txt>();
  const filet = createRef<Rect>();
  const titre = createRef<Txt>();
  const detail = createRef<Txt>();
  const qrCarte = createRef<Rect>();
  const etapesRefs = ANNONCE.etapes.map(() => createRef<Txt>());
  const note = createRef<Txt>();

  view.fill(COULEURS.sauge);

  view.add(
    <Layout layout direction={'column'} alignItems={'center'} gap={26} y={-160}>
      <Txt
        ref={surTitre}
        text={ANNONCE.surTitre.toUpperCase()}
        fontFamily={POLICES.legende}
        fontWeight={600}
        fontSize={28}
        letterSpacing={6}
        fill={COULEURS.chocolat}
        opacity={0}
      />
      <Rect ref={filet} width={0} height={3} fill={COULEURS.or} />
      <Txt
        ref={titre}
        text={ANNONCE.titre}
        fontFamily={POLICES.titre}
        fontWeight={700}
        fontStyle={'italic'}
        fontSize={104}
        textAlign={'center'}
        fill={COULEURS.chocolat}
        opacity={0}
        y={40}
      />
      <Txt
        ref={detail}
        text={ANNONCE.detail}
        fontFamily={POLICES.titre}
        fontStyle={'italic'}
        fontSize={48}
        fill={COULEURS.chocolat}
        opacity={0}
      />

      <Rect
        ref={qrCarte}
        layout
        direction={'column'}
        alignItems={'center'}
        gap={16}
        fill={COULEURS.creme}
        radius={20}
        padding={[36, 46]}
        scale={0}
      >
        <Img src={ANNONCE.qr} width={340} height={340} />
        <Txt
          text={ANNONCE.qrLegende}
          fontFamily={POLICES.legende}
          fontStyle={'italic'}
          fontSize={26}
          fill={COULEURS.chocolat}
        />
      </Rect>

      <Layout layout direction={'column'} alignItems={'center'} gap={14}>
        {ANNONCE.etapes.map((texte, i) => (
          <Txt
            ref={etapesRefs[i]}
            text={`${i + 1} · ${texte}`}
            fontFamily={POLICES.titre}
            fontStyle={'italic'}
            fontSize={38}
            fill={COULEURS.chocolat}
            opacity={0}
            textAlign={'center'}
          />
        ))}
      </Layout>
    </Layout>,
  );

  view.add(
    <Txt
      ref={note}
      text={`* ${ANNONCE.note}`}
      fontFamily={POLICES.legende}
      fontSize={22}
      fill={COULEURS.chocolat}
      opacity={0}
      y={zone.basLegende + 220}
    />,
  );

  // Attendre le chargement du QR code avant tout calcul de mise en page
  // (sinon la carte, auto-dimensionnée autour de l'image, plante au 1er
  // passage de rendu : "asynchronous property before the node was ready").
  yield qrCarte().toPromise();

  yield* surTitre().opacity(1, 0.5);
  yield* filet().width(220, 0.5, easeOutCubic);
  yield* all(titre().opacity(1, 0.7, easeOutCubic), titre().y(0, 0.7, easeOutCubic));
  yield* detail().opacity(1, 0.5);
  yield* qrCarte().scale(1, 0.6, easeOutBack);
  yield* sequence(0.15, ...etapesRefs.map(r => r().opacity(1, 0.4)));
  yield* note().opacity(1, 0.4);
  yield* waitFor(2.2);
});
