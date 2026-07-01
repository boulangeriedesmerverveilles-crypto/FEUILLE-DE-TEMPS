import { makeScene2D, Txt, Rect, Layout } from '@motion-canvas/2d';
import {
  createRef,
  all,
  sequence,
  waitFor,
  easeOutCubic,
  easeOutBack,
} from '@motion-canvas/core';

import { COULEURS, POLICES, FORMATS, zonesSures } from '../charte-bdm';

/**
 * FORMULE SANDWICH — carte promo sur fond sauge, à la suite de la carte
 * Retrait / Click & Collect (project.ts). Contenu repris du chevalet
 * "Toute la gamme Sandwichs" : 1 boisson + 1 sandwich au choix + 1 dessert.
 */
const FORMULE = {
  surTitre: 'La Formule',
  titre: 'Sandwich',
  prix: '9 €',
  items: [
    { label: '1 boisson', note: 'hors bière et boisson énergisante' },
    { label: '1 sandwich au choix', note: '' },
    { label: '1 dessert', note: 'hors tiramisu' },
  ],
  tagline: 'Le plaisir, en toute simplicité !',
};

export default makeScene2D(function* (view) {
  const format = FORMATS.vertical;
  const zone = zonesSures(format);

  const surTitre = createRef<Txt>();
  const filet = createRef<Rect>();
  const titre = createRef<Txt>();
  const prixBadge = createRef<Rect>();
  const itemRefs = FORMULE.items.map(() => createRef<Layout>());
  const tagline = createRef<Txt>();

  view.fill(COULEURS.sauge);

  view.add(
    <Layout layout direction={'column'} alignItems={'center'} gap={34} y={-140}>
      <Txt
        ref={surTitre}
        text={FORMULE.surTitre.toUpperCase()}
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
        text={FORMULE.titre}
        fontFamily={POLICES.titre}
        fontWeight={700}
        fontStyle={'italic'}
        fontSize={116}
        textAlign={'center'}
        fill={COULEURS.chocolat}
        opacity={0}
        y={40}
      />

      <Rect
        ref={prixBadge}
        layout
        fill={COULEURS.or}
        radius={20}
        padding={[18, 46]}
        scale={0}
      >
        <Txt
          text={FORMULE.prix}
          fontFamily={POLICES.titre}
          fontWeight={700}
          fontSize={68}
          fill={COULEURS.chocolat}
        />
      </Rect>

      <Layout layout direction={'row'} alignItems={'center'} gap={46}>
        {FORMULE.items.map((item, i) => (
          <Layout
            ref={itemRefs[i]}
            layout
            direction={'column'}
            alignItems={'center'}
            gap={10}
            opacity={0}
          >
            <Rect
              layout
              fill={COULEURS.or}
              radius={999}
              width={68}
              height={68}
              alignItems={'center'}
              justifyContent={'center'}
            >
              <Txt
                text={`${i + 1}`}
                fontFamily={POLICES.titre}
                fontWeight={700}
                fontSize={32}
                fill={COULEURS.chocolat}
              />
            </Rect>
            <Txt
              text={item.label}
              fontFamily={POLICES.legende}
              fontWeight={600}
              fontSize={24}
              fill={COULEURS.chocolat}
              textAlign={'center'}
              width={220}
              textWrap
            />
            {item.note ? (
              <Txt
                text={item.note}
                fontFamily={POLICES.titre}
                fontStyle={'italic'}
                fontSize={18}
                fill={COULEURS.chocolat}
                textAlign={'center'}
                width={220}
                textWrap
              />
            ) : null}
          </Layout>
        ))}
      </Layout>
    </Layout>,
  );

  view.add(
    <Txt
      ref={tagline}
      text={FORMULE.tagline}
      fontFamily={POLICES.titre}
      fontStyle={'italic'}
      fontSize={34}
      fill={COULEURS.chocolat}
      opacity={0}
      y={zone.basLegende + 160}
    />,
  );

  yield* surTitre().opacity(1, 0.5);
  yield* filet().width(220, 0.5, easeOutCubic);
  yield* all(titre().opacity(1, 0.7, easeOutCubic), titre().y(0, 0.7, easeOutCubic));
  yield* prixBadge().scale(1, 0.6, easeOutBack);
  yield* sequence(0.15, ...itemRefs.map(r => r().opacity(1, 0.4)));
  yield* tagline().opacity(1, 0.5);
  yield* waitFor(2.2);
});
