import * as React from 'react';
import { findNodeHandle, Image, requireNativeComponent, UIManager, View, StyleSheet } from 'react-native';
const RNImageSequence = requireNativeComponent("RNImageSequence");
class ImageSequence extends React.PureComponent {
    constructor(props) {
        super(props);
        this.ref = null;
        this.runCommand = (commandName, args = []) => {
            const handle = this.getHandle();
            if (!handle) {
                return null;
            }
            return UIManager.dispatchViewManagerCommand(handle, UIManager.getViewManagerConfig("RNImageSequence").Commands[commandName], args);
        };
        this.play = () => {
            this.runCommand("startAnimating");
        };
        this.stop = () => {
            this.runCommand("stopAnimating");
        };
        this.getHandle = () => {
            return findNodeHandle(this.ref);
        };
        this.setRef = (ref) => {
            const { autoPlay = true } = this.props;
            this.ref = ref;
            if (autoPlay === true) {
                this.play();
            }
        };
    }
    render() {
        var _a, _b, _c, _d;
        const { startFrameIndex, images, width, height, loopInfo, framesPerSecond = 30, loop = false, style = {} } = this.props;
        let normalized = images.map(Image.resolveAssetSource);
        if (startFrameIndex !== 0) {
            normalized = [...normalized.slice(startFrameIndex), ...normalized.slice(0, startFrameIndex)];
        }
        const startFrame = (_b = (_a = loopInfo) === null || _a === void 0 ? void 0 : _a.startFrame, (_b !== null && _b !== void 0 ? _b : 0));
        const loopFrom = (_c = loopInfo) === null || _c === void 0 ? void 0 : _c.loopFrom;
        const loopTo = (_d = loopInfo) === null || _d === void 0 ? void 0 : _d.loopTo;
        const hasLoopInfo = !!loopInfo;
        return (<View style={[styles.container, Object.assign(Object.assign({}, style), { width, height })]}>
        <RNImageSequence style={{ width, height }} hasLoopInfo={hasLoopInfo} startFrame={startFrame} loopFrom={loopFrom} loopTo={loopTo} images={normalized} framesPerSecond={framesPerSecond} loop={loop} ref={this.setRef}/>
      </View>);
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
});
export default ImageSequence;
