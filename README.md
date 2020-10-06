# rn-image-sequence
native modules for handling image sequence animations. (created because i had performance issues with a javascript only solution like: https://github.com/remobile/react-native-image-animation)

its a simple wrapper around **iOS** `UIImageView.animationImages` and **Android** `AnimationDrawable`

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
