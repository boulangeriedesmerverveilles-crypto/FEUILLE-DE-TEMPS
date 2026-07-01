import { makeScene2D, Txt, Rect, Layout } from '@motion-canvas/2d';
import {
  createRef,
  all,
  sequence,
  waitFor,
  easeOutCubic,
} from '@motion-canvas/core';

import { COULEURS, POLICES, FORMATS } from '../charte-bdm';

/**
 * CLICK & COLLECT — LA GAMME (~6,5 s).
 * Ce qu'on peut commander en ligne : la vraie carte (chevalet sandwichs,
 * affiches Le Pavot / Le Végé / Le Poulet, flyer barbajuan) déroulée en
 * cascade façon menu, prix en pastille or.
 */
const CARTE: { nom: string; prix: string }[] = [
  { nom: 'Pain de campagne', prix: '3,20 €' },
  { nom: 'Le Pavot · jambon cru, mozzarella', prix: '5 €' },
  { nom: 'Le Végé · aubergines, poivrons', prix: '5 €' },
  { nom: 'Le Poulet · croustillant, tomates', prix: '5 €' },
  { nom: 'Formule boisson + sandwich + dessert', prix: '9 €' },
  { nom: 'Barbajuans · spécialité locale', prix: '28 €/kg' },
];

export default makeScene2D(function* (view) {
  const format = FORMATS.vertical;

  const titre = createRef<Txt>();
  const filet = createRef<Rect>();
  const lignes = CARTE.map(() => createRef<Layout>());
  const pied = createRef<Txt>();

  view.fill(COULEURS.sauge);

  view.add(
    <>
      <Layout layout direction={'column'} alignItems={'center'} gap={20} y={-format.y * 0.30}>
        <Txt
          ref={titre}
          text={'Toute la carte, en ligne'}
          fontFamily={POLICES.titre}
          fontWeight={700}
          fontStyle={'italic'}
          fontSize={72}
          fill={COULEURS.chocolat}
          opacity={0}
        />
        <Rect ref={filet} width={0} height={3} fill={COULEURS.or} />
      </Layout>

      <Layout layout direction={'column'} gap={30} y={70} width={format.x - 200}>
        {CARTE.map((item, i) => (
          <Layout
            ref={lignes[i]}
            layout
            direction={'row'}
            alignItems={'center'}
            justifyContent={'space-between'}
            gap={24}
            opacity={0}
          >
            <Txt
              text={item.nom}
              fontFamily={POLICES.titre}
              fontStyle={'italic'}
              fontSize={38}
              fill={COULEURS.chocolat}
              textWrap
            />
            <Rect layout fill={COULEURS.or} radius={999} padding={[10, 24]}>
              <Txt
                text={item.prix}
                fontFamily={POLICES.titre}
                fontWeight={700}
                fontSize={34}
                fill={COULEURS.chocolat}
              />
            </Rect>
          </Layout>
        ))}
      </Layout>

      <Txt
        ref={pied}
        text={'… et bien plus sur boulangeriedesmerverveilles.fr'}
        fontFamily={POLICES.legende}
        fontStyle={'italic'}
        fontSize={28}
        fill={COULEURS.chocolat}
        opacity={0}
        y={format.y * 0.36}
      />
    </>,
  );

  // Budget temps : 0,6 + 0,4 + (5×0,12 + 0,4) + 0,4 + 4,1 hold ≈ 6,5 s
  yield* titre().opacity(1, 0.6, easeOutCubic);
  yield* filet().width(260, 0.4, easeOutCubic);
  yield* sequence(0.12, ...lignes.map(l => l().opacity(1, 0.4, easeOutCubic)));
  yield* pied().opacity(1, 0.4);
  yield* waitFor(4.1);
});
