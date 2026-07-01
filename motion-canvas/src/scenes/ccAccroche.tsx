import { makeScene2D, Txt, Rect, Circle, Line, Node } from '@motion-canvas/2d';
import {
  createRef,
  all,
  waitFor,
  easeOutCubic,
  easeInOutCubic,
  easeOutBack,
} from '@motion-canvas/core';

import { COULEURS, POLICES, MARQUE, FORMATS } from '../charte-bdm';

/**
 * CLICK & COLLECT — ACCROCHE (~4,5 s).
 * Le problème en une image : une horloge dont l'aiguille file (le temps
 * perdu à attendre), barrée d'un trait or, puis la promesse en toutes
 * lettres : « Sans faire la queue ».
 */
export default makeScene2D(function* (view) {
  const format = FORMATS.vertical;

  const surTitre = createRef<Txt>();
  const horloge = createRef<Circle>();
  const aiguilles = createRef<Node>();
  const barre = createRef<Line>();
  const titre1 = createRef<Txt>();
  const titre2 = createRef<Txt>();

  view.fill(COULEURS.sauge);

  view.add(
    <>
      <Txt
        ref={surTitre}
        text={MARQUE.toUpperCase()}
        fontFamily={POLICES.legende}
        fontWeight={600}
        fontSize={28}
        letterSpacing={6}
        fill={COULEURS.chocolat}
        opacity={0}
        y={-format.y * 0.28}
      />

      {/* Horloge : cadran crème, aiguilles chocolat pivotées via un Node */}
      <Circle
        ref={horloge}
        size={340}
        fill={COULEURS.creme}
        lineWidth={10}
        stroke={COULEURS.chocolat}
        y={-60}
        scale={0}
      >
        <Node ref={aiguilles}>
          <Line
            points={[
              [0, 0],
              [0, -110],
            ]}
            stroke={COULEURS.chocolat}
            lineWidth={12}
            lineCap={'round'}
          />
          <Line
            points={[
              [0, 0],
              [55, 40],
            ]}
            stroke={COULEURS.chocolat}
            lineWidth={12}
            lineCap={'round'}
          />
        </Node>
        <Circle size={24} fill={COULEURS.or} />
      </Circle>

      {/* La barre or qui « annule » l'attente */}
      <Line
        ref={barre}
        points={[
          [-210, 90],
          [210, -210],
        ]}
        stroke={COULEURS.or}
        lineWidth={18}
        lineCap={'round'}
        y={-60}
        end={0}
      />

      <Txt
        ref={titre1}
        text={'Vos produits préférés,'}
        fontFamily={POLICES.titre}
        fontStyle={'italic'}
        fontSize={58}
        fill={COULEURS.chocolat}
        opacity={0}
        y={280}
      />
      <Txt
        ref={titre2}
        text={'sans faire la queue.'}
        fontFamily={POLICES.titre}
        fontWeight={700}
        fontStyle={'italic'}
        fontSize={74}
        fill={COULEURS.chocolat}
        opacity={0}
        y={380}
      />
    </>,
  );

  // Budget temps : 0,5 + 0,6 + 1,0 + 0,45 + 0,6 + 0,5 + 0,85 = 4,5 s
  yield* surTitre().opacity(1, 0.5);
  yield* horloge().scale(1, 0.6, easeOutBack);
  // Le temps file : un tour complet d'aiguilles.
  yield* aiguilles().rotation(360, 1.0, easeInOutCubic);
  yield* barre().end(1, 0.45, easeOutCubic);
  yield* all(titre1().opacity(1, 0.6, easeOutCubic), titre1().y(270, 0.6, easeOutCubic));
  yield* all(titre2().opacity(1, 0.5, easeOutCubic), titre2().y(370, 0.5, easeOutCubic));
  yield* waitFor(0.85);
});
