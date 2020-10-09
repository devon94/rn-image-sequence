import * as React from 'react';
import { NativeMethods, ViewStyle } from 'react-native';
interface RNImageSequenceProps {
    hasLoopInfo: boolean;
    startFrame: number;
    loopFrom?: number;
    loopTo?: number;
    images: any[];
    framesPerSecond: number;
    loop: boolean;
    style: ViewStyle;
    isPlaying: boolean;
}
export interface LoopInfo {
    startFrame?: number;
    loopFrom: number;
    loopTo: number;
}
export interface ImageSequenceProps {
    autoPlay?: boolean;
    images: any[];
    startFrameIndex?: number;
    framesPerSecond?: number;
    loop?: boolean;
    loopInfo?: LoopInfo;
    width: number;
    height: number;
    style?: ViewStyle;
}
declare type RefType = React.Component<RNImageSequenceProps, {}, any> & Readonly<NativeMethods>;
interface State {
    isPlaying: boolean;
}
declare class ImageSequence extends React.PureComponent<ImageSequenceProps, State> {
    private ref;
    constructor(props: ImageSequenceProps);
    runCommand: (commandName: string, args?: never[]) => void | null;
    play: () => void;
    stop: () => void;
    getHandle: () => number | null;
    setRef: (ref: RefType) => void;
    render(): JSX.Element;
}
export default ImageSequence;
