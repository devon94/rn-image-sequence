import * as React from 'react';
import { findNodeHandle, Image, NativeMethods, requireNativeComponent, UIManager, View, ViewStyle, StyleSheet } from 'react-native';

interface RNImageSequenceProps {
  hasLoopInfo: boolean
  startFrame: number
  loopFrom?: number
  loopTo?: number
  images: any[]
  framesPerSecond: number
  loop: boolean
}

const RNImageSequence = requireNativeComponent<RNImageSequenceProps>("RNImageSequence")

export interface LoopInfo {
  /** Frame to play animation from. */
  startFrame?: number
  /** Frame to start loop. */
  loopFrom: number;
  /** Frame to start loop. */
  loopTo: number;
}

export interface ImageSequenceProps {
  autoPlay?: boolean
  /** An array of source images. Each element of the array should be the result of a call to require(imagePath). */
  images: any[];
  /** Which index of the images array should the sequence start at. Default: 0 */
  startFrameIndex?: number;
  /** Playback speed of the image sequence. Default: 24 */
  framesPerSecond?: number;
  /** Should the sequence loop. Default: false */
  loop?: boolean;
  /** Customise loop */
  loopInfo?: LoopInfo;
  /** Width of animation */
  width: number
  /** Height of animation */
  height: number
  /** Style of the container */
  style?: ViewStyle
}

type RefType = React.Component<RNImageSequenceProps, {}, any> & Readonly<NativeMethods>

class ImageSequence extends React.PureComponent<ImageSequenceProps> {
  private ref: RefType | null = null

  constructor(props: ImageSequenceProps) {
    super(props);
  }

  play = () => {
    UIManager.dispatchViewManagerCommand(
      this.getHandle(),
      UIManager.getViewManagerConfig("RNImageSequence").Commands.startAnimating,
      []
    )
  }

  stop = () => {
    UIManager.dispatchViewManagerCommand(
      this.getHandle(),
      UIManager.getViewManagerConfig("RNImageSequence").Commands.stopAnimating,
      []
    )
  }

  getHandle = () => {
    return findNodeHandle(this.ref);
  }

  setRef(ref: RefType) {
    this.ref = ref
    // if (this.props.autoPlay) {
    //   this.play()
    // }
  }

  render() {
    const { startFrameIndex, images, width, height, loopInfo, framesPerSecond = 30, loop = false, style = {} } = this.props

    let normalized = images.map(Image.resolveAssetSource)

    if (startFrameIndex !== 0) {
      normalized = [...normalized.slice(startFrameIndex), ...normalized.slice(0, startFrameIndex)]
    }

    const startFrame = loopInfo?.startFrame ?? 0
    const loopFrom = loopInfo?.loopFrom
    const loopTo = loopInfo?.loopTo
    const hasLoopInfo = !!loopInfo

    return (
      <View style={[styles.container, { ...style, width, height }]}>
        <RNImageSequence
          hasLoopInfo={hasLoopInfo}
          startFrame={startFrame}
          loopFrom={loopFrom}
          loopTo={loopTo}
          images={normalized}
          framesPerSecond={framesPerSecond}
          loop={loop}
          ref={this.setRef}
        />
      </View>
    )
  }
}


const styles = StyleSheet.create({
  container: {
    marginTop: 'auto',
    marginBottom: 'auto',
    marginLeft: 'auto',
    marginRight: 'auto',
    display: 'flex'
  }
})


export default ImageSequence;
