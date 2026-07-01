import {makeProject} from '@motion-canvas/core';

import intro from './scenes/intro?scene';
import pain from './scenes/pain?scene';

export default makeProject({
  scenes: [intro, pain],
});
