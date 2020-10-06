import { Component } from 'react';


interface LoopInfo {
    /** Frame to play animation from. */
    startFrame?: number
    /** Frame to start loop. */
    loopFrom: number;
    /** Frame to start loop. */
    loopTo: number;
  }

interface ImageSequenceProps {
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
}

declare class ImageSequence extends Component<ImageSequenceProps> {
}

export default ImageSequence;
