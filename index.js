import React, { Component } from 'react';
import {
  View,
  requireNativeComponent,
  ViewPropTypes
} from 'react-native';
import { bool, string, number, array, shape, arrayOf } from 'prop-types';
import resolveAssetSource from 'react-native/Libraries/Image/resolveAssetSource';

class ImageSequence extends Component {
  render() {
    let normalized = this.props.images.map(resolveAssetSource);

    // reorder elements if start-index is different from 0 (beginning)
    if (this.props.startFrameIndex !== 0) {
      normalized = [...normalized.slice(this.props.startFrameIndex), ...normalized.slice(0, this.props.startFrameIndex)]
    }

    const { width, height, loopInfo, ...rest } = this.props

    const startFrame = loopInfo && loopInfo.startFrame
    const loopFrom = loopInfo && loopInfo.loopFrom
    const loopTo = loopInfo && loopInfo.loopTo
    const hasLoopInfo = !!loopInfo

    return (
      <View style={{ width, height, marginTop: 'auto', marginBottom: 'auto', marginLeft: 'auto', marginRight: 'auto', display: 'flex' }}>
        <RNImageSequence
          style={{ width, height }}
          hasLoopInfo={hasLoopInfo}
          startFrame={startFrame}
          loopFrom={loopFrom}
          loopTo={loopTo}
          {...rest}
          images={normalized}
        />
      </View>

    )
  }
}

ImageSequence.defaultProps = {
  startFrameIndex: 0,
  framesPerSecond: 24,
  loop: true
};

ImageSequence.propTypes = {
  startFrameIndex: number,
  images: array.isRequired,
  framesPerSecond: number,
  loop: bool
};

const RNImageSequence = requireNativeComponent('RNImageSequence', {
  propTypes: {
    ...ViewPropTypes,
    images: arrayOf(shape({
      uri: string.isRequired
    })).isRequired,
    framesPerSecond: number,
    loop: bool,
    loopFrom: number,
    loopTo: number,
    hasLoopInfo: bool
  },
});

export default ImageSequence;
