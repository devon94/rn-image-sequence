# rn-image-sequence
A package that uses native modules for creating animations from a sequence of images. 

Based off of the react-native-image-sequence package by Mads Jensen (https://github.com/madsleejensen/react-native-image-sequence)

## Installation

```
npm install rn-image-sequence --save

or

yarn add rn-image-sequence
```

### Install with autolinking (RN > 0.60) [iOS Only]

`cd ios && pod install && cd ..`

### Install with react-native link (RN < 0.60)

`react-native link rn-image-sequence`

## Examples

#### Basic Usage

```javascript
import ImageSequence from 'rn-image-sequence';

const images = [
  require('1.jpg'),
  require('2.jpg'),
  require('3.jpg')
]

const SomeComponent: React.FunctionComponent = (props) => {
  return (
    <View>
      <ImageSequence 
        images={images} 
        framesPerSecond={30} 
        loop={false}  
      />
    </View>
  )
}
```

#### Customizing loops
The ImageSequence component has a prop that takes two required arguments that correspond to the indicies of the frames you would like the loop to play. This example code below will loop from the first frame to the 2nd frame.

```javascript
import ImageSequence from 'rn-image-sequence';

const images = [
  require('1.jpg'),
  require('2.jpg'),
  require('3.jpg')
]

const SomeComponent: React.FunctionComponent = (props) => {
  return (
    <View>
      <ImageSequence
        images={images} 
        framesPerSecond={30} 
        loop={false}  
        loopInfo={{ loopFrom: 0, loopTo: 1 }}
      />
    </View>
  )
}
```
