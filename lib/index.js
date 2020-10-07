import * as React from 'react';
import { findNodeHandle, Image, UIManager, View, StyleSheet } from 'react-native';
import SafeModule from 'react-native-safe-modules';
const RNImageSequence = SafeModule.component({
    viewName: 'RNImageSequence',
    mockComponent: View,
});
class ImageSequence extends React.PureComponent {
    constructor(props) {
        super(props);
        this.ref = null;
        this.play = () => {
            UIManager.dispatchViewManagerCommand(this.getHandle(), UIManager.getViewManagerConfig("RNImageSequence").Commands.startAnimating, []);
        };
        this.stop = () => {
            UIManager.dispatchViewManagerCommand(this.getHandle(), UIManager.getViewManagerConfig("RNImageSequence").Commands.stopAnimating, []);
        };
        this.getHandle = () => {
            return findNodeHandle(this.ref);
        };
    }
    setRef(ref) {
        this.ref = ref;
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
        <RNImageSequence hasLoopInfo={hasLoopInfo} startFrame={startFrame} loopFrom={loopFrom} loopTo={loopTo} images={normalized} framesPerSecond={framesPerSecond} loop={loop} ref={this.setRef}/>
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
