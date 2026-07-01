import {Circle, Img, Rect, Txt, makeScene2D} from '@motion-canvas/2d';
import {
  all,
  createRef,
  easeOutBack,
  loop,
  waitFor,
} from '@motion-canvas/core';
import {brand, fonts, palette} from '../theme/charte';
import pain from '../images/pain.svg';

export default makeScene2D(function* (view) {
  const background = createRef<Rect>();
  const bread = createRef<Img>();
  const steam1 = createRef<Circle>();
  const steam2 = createRef<Circle>();
  const steam3 = createRef<Circle>();
  const caption = createRef<Txt>();

  view.add(
    <Rect ref={background} size={['100%', '100%']} fill={palette.background} />,
  );

  view.add(
    <>
      <Circle
        ref={steam1}
        y={-160}
        x={-70}
        size={22}
        fill={palette.white}
        opacity={0}
      />
      <Circle
        ref={steam2}
        y={-170}
        x={0}
        size={26}
        fill={palette.white}
        opacity={0}
      />
      <Circle
        ref={steam3}
        y={-160}
        x={70}
        size={20}
        fill={palette.white}
        opacity={0}
      />
      <Img ref={bread} src={pain} width={560} y={40} scale={0} />
      <Txt
        ref={caption}
        y={330}
        text={brand.tagline}
        fontFamily={fonts.body}
        fontSize={30}
        fill={palette.text}
        opacity={0}
      />
    </>,
  );

  yield loop(Infinity, function* () {
    yield* all(
      steam1().position.y(-260, 1.6),
      steam1().opacity(0.5, 0.4).to(0, 1.2),
      steam2().position.y(-280, 1.8),
      steam2().opacity(0.5, 0.4).to(0, 1.4),
      steam3().position.y(-260, 1.6),
      steam3().opacity(0.5, 0.4).to(0, 1.2),
    );
  });

  yield* bread().scale(1, 0.9, easeOutBack);
  yield* caption().opacity(1, 0.6);
  yield* waitFor(2.2);
  yield* all(bread().scale(1.06, 0.6), caption().opacity(1, 0.1));
  yield* waitFor(0.6);
});
