import * as React from 'react';
import { findNodeHandle, Image, NativeMethods, requireNativeComponent, UIManager, View, ViewStyle, StyleSheet, Platform } from 'react-native';

interface RNImageSequenceProps {
  hasLoopInfo: boolean
  startFrame: number
  loopFrom?: number
  loopTo?: number
  images: any[]
  framesPerSecond: number
  loop: boolean
  style: ViewStyle
  isPlaying: boolean
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

interface State {
  isPlaying: boolean
}

class ImageSequence extends React.PureComponent<ImageSequenceProps, State> {
  private ref: RefType | null = null

  constructor(props: ImageSequenceProps) {
    super(props);
    this.state = {
      isPlaying: false
    }
  }

  runCommand = (commandName: string, args = []) => {
    const handle = this.getHandle()

    if (!handle) {
      return null
    }

    return UIManager.dispatchViewManagerCommand(
      handle,
      UIManager.getViewManagerConfig("RNImageSequence").Commands[commandName],
      args
    )
  }

  play = () => {
    const action = Platform.select({
      ios: () => {
        this.setState({ isPlaying: true })
      },
      android: () => {
        this.setState({ isPlaying: true })
        // this.runCommand("startAnimating")
      }
    })!
    
    action()
  }

  stop = () => {
    this.runCommand("stopAnimating")
  }

  getHandle = () => {
    return findNodeHandle(this.ref);
  }

  setRef = (ref: RefType) => {
    const { autoPlay = true } = this.props
    this.ref = ref

    if (autoPlay === true) {
      this.play()
    }
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
          style={{ width, height }}
          hasLoopInfo={hasLoopInfo}
          startFrame={startFrame}
          loopFrom={loopFrom}
          loopTo={loopTo}
          images={normalized}
          framesPerSecond={framesPerSecond}
          loop={loop}
          isPlaying={this.state.isPlaying}
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
