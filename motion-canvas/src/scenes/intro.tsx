import {Rect, Txt, makeScene2D} from '@motion-canvas/2d';
import {all, createRef, waitFor} from '@motion-canvas/core';
import {brand, fonts, palette} from '../theme/charte';

export default makeScene2D(function* (view) {
  const background = createRef<Rect>();
  const title = createRef<Txt>();
  const subtitle = createRef<Txt>();

  view.add(
    <Rect ref={background} size={['100%', '100%']} fill={palette.background} />,
  );

  view.add(
    <>
      <Txt
        ref={title}
        y={-40}
        text={brand.name}
        fontFamily={fonts.heading}
        fontSize={72}
        fill={palette.text}
        opacity={0}
      />
      <Txt
        ref={subtitle}
        y={40}
        text={brand.tagline}
        fontFamily={fonts.body}
        fontSize={34}
        fill={palette.textLight}
        opacity={0}
      />
    </>,
  );

  yield* title().opacity(1, 0.8);
  yield* subtitle().opacity(1, 0.6);
  yield* waitFor(0.8);

  yield* all(title().opacity(0, 0.5), subtitle().opacity(0, 0.5));
});
