package com.devon94.RNImageSequence;

import com.facebook.react.bridge.ReadableArray;
import com.facebook.react.bridge.ReadableMap;
import com.facebook.react.uimanager.SimpleViewManager;
import com.facebook.react.uimanager.ThemedReactContext;
import com.facebook.react.uimanager.annotations.ReactProp;

import java.util.ArrayList;


public class RNImageSequenceManager extends SimpleViewManager<RNImageSequenceView> {
    @Override
    public String getName() {
        return "RNImageSequence";
    }

    @Override
    protected RNImageSequenceView createViewInstance(ThemedReactContext reactContext) {
        return new RNImageSequenceView(reactContext);
    }

    /**
     * sets the speed of the animation.
     *
     * @param view
     * @param framesPerSecond
     */
    @ReactProp(name = "framesPerSecond")
    public void setFramesPerSecond(final RNImageSequenceView view, Integer framesPerSecond) {
        view.setFramesPerSecond(framesPerSecond);
    }


    /**
     * sets whether or not loop info was passed in.
     *
     * @param view
     * @param loopFrom
     */
    @ReactProp(name = "hasLoopInfo")
    public void setHasLoopInfo(final RNImageSequenceView view, Boolean hasLoopInfo) {
        view.setHasLoopInfo(hasLoopInfo);
    }


    /**
     * sets the beginning of the animation when looping.
     *
     * @param view
     * @param loopFrom
     */
    @ReactProp(name = "startFrame")
    public void setStartFrame(final RNImageSequenceView view, Integer startFrame) {
        view.setStartFrame(startFrame);
    }

    /**
     * sets the beginning of the loop.
     *
     * @param view
     * @param loopFrom
     */
    @ReactProp(name = "loopFrom")
    public void setLoopFrom(final RNImageSequenceView view, Integer loopFrom) {
        view.setLoopFrom(loopFrom);
    }


    /**
     * sets the end of the loop.
     *
     * @param view
     * @param loopTo
     */
    @ReactProp(name = "loopTo")
    public void setLoopTo(final RNImageSequenceView view, Integer loopTo) {
        view.setLoopTo(loopTo);
    }


    /**
     * @param view
     * @param images an array of ReadableMap's {uri: "http://...."} return value of the resolveAssetSource(....)
     */
    @ReactProp(name = "images")
    public void setImages(final RNImageSequenceView view, ReadableArray images) {
        ArrayList<String> uris = new ArrayList<>();
        for (int index = 0; index < images.size(); index++) {
            ReadableMap map = images.getMap(index);
            uris.add(map.getString("uri"));
        }

        view.setImages(uris);
    }

    /**
     * sets if animations is looped indefinitely.
     *
     * @param view
     * @param loop
     */
    @ReactProp(name = "loop")
    public void setLoop(final RNImageSequenceView view, Boolean loop) {
        view.setLoop(loop);
    }
}
