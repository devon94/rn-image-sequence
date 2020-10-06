# rn-image-sequence
A package that uses native modules for creating image sequence animations.

## Installation

1. `yarn add rn-image-sequence`

## Examples

```javascript
import ImageSequence from 'rn-image-sequence';

const images = [
  require('1.jpg'),
  require('2.jpg'),
  require('3.jpg'),
];

<ImageSequence
  images={images}
  framesPerSecond={30}
  loop={false}
  />
```
