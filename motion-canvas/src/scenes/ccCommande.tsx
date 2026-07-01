import { makeScene2D, Txt, Rect, Circle, Line, Img, Layout } from '@motion-canvas/2d';
import {
  createRef,
  all,
  sequence,
  waitFor,
  easeOutCubic,
  easeOutBack,
  easeInOutSine,
  loop,
} from '@motion-canvas/core';

import { COULEURS, POLICES, FORMATS } from '../charte-bdm';
import qrClickCollect from '../images/qr-click-collect.png';

/**
 * CLICK & COLLECT — COMMANDE (~9,5 s).
 * Un smartphone vectoriel glisse à l'écran, le QR code s'affiche sur son
 * écran (et respire doucement), puis les 3 étapes se cochent une à une
 * avec un vrai tick animé. C'est LE plan à retenir de la vidéo.
 */
const ETAPES = [
  'Scannez le QR code',
  'Commandez avant 19h',
  'Récupérez dès 7h le lendemain',
];

export default makeScene2D(function* (view) {
  const format = FORMATS.vertical;

  const titre = createRef<Txt>();
  const telephone = createRef<Rect>();
  const qr = createRef<Img>();
  const ticks = ETAPES.map(() => createRef<Line>());
  const pastilles = ETAPES.map(() => createRef<Circle>());
  const lignes = ETAPES.map(() => createRef<Layout>());

  view.fill(COULEURS.sauge);

  view.add(
    <>
      <Txt
        ref={titre}
        text={'Commandez en 3 gestes'}
        fontFamily={POLICES.titre}
        fontWeight={700}
        fontStyle={'italic'}
        fontSize={72}
        fill={COULEURS.chocolat}
        opacity={0}
        y={-format.y * 0.36}
      />

      {/* Smartphone vectoriel : châssis chocolat, écran crème, encoche */}
      <Rect
        ref={telephone}
        width={460}
        height={780}
        radius={56}
        fill={COULEURS.chocolat}
        y={format.y}
        x={0}
      >
        <Rect width={412} height={730} radius={40} fill={COULEURS.creme}>
          <Img ref={qr} src={qrClickCollect} width={330} height={330} y={30} />
          <Txt
            text={'boulangeriedesmerverveilles.fr'}
            fontFamily={POLICES.legende}
            fontStyle={'italic'}
            fontSize={24}
            fill={COULEURS.chocolat}
            y={250}
          />
          <Txt
            text={'RETRAIT · CLICK & COLLECT'}
            fontFamily={POLICES.legende}
            fontWeight={700}
            fontSize={22}
            letterSpacing={3}
            fill={COULEURS.chocolat}
            y={-280}
          />
        </Rect>
        <Rect width={130} height={26} radius={13} fill={COULEURS.chocolat} y={-365} />
      </Rect>

      {/* Les 3 étapes, chacune avec sa pastille à cocher */}
      <Layout direction={'column'} gap={26} y={format.y * 0.31} layout alignItems={'start'}>
        {ETAPES.map((texte, i) => (
          <Layout ref={lignes[i]} layout direction={'row'} gap={20} alignItems={'center'} opacity={0}>
            <Circle
              ref={pastilles[i]}
              size={54}
              fill={COULEURS.creme}
              lineWidth={5}
              stroke={COULEURS.or}
            >
              <Line
                ref={ticks[i]}
                layout={false}
                points={[
                  [-12, 1],
                  [-3, 11],
                  [14, -10],
                ]}
                stroke={COULEURS.chocolat}
                lineWidth={6}
                lineCap={'round'}
                lineJoin={'round'}
                end={0}
              />
            </Circle>
            <Txt
              text={texte}
              fontFamily={POLICES.titre}
              fontStyle={'italic'}
              fontSize={40}
              fill={COULEURS.chocolat}
            />
          </Layout>
        ))}
      </Layout>
    </>,
  );

  // L'écran embarque une image : on attend son chargement avant d'animer.
  yield telephone().toPromise();

  // Budget temps : 0,6 + 0,9 + 3×(0,35+0,4) + 0,25×2 + 5,05 hold ≈ 9,5 s
  yield* titre().opacity(1, 0.6, easeOutCubic);
  yield* telephone().position.y(60, 0.9, easeOutCubic);

  // Le QR respire pendant tout le reste de la scène.
  yield loop(Infinity, function* () {
    yield* qr().scale(1.05, 0.8, easeInOutSine).to(1, 0.8, easeInOutSine);
  });

  // Chaque étape apparaît puis se coche.
  for (let i = 0; i < ETAPES.length; i++) {
    yield* lignes[i]().opacity(1, 0.35, easeOutCubic);
    yield* all(
      ticks[i]().end(1, 0.4, easeOutCubic),
      pastilles[i]().fill(COULEURS.or, 0.4),
    );
    if (i < ETAPES.length - 1) yield* waitFor(0.25);
  }

  yield* waitFor(5.05);
});
