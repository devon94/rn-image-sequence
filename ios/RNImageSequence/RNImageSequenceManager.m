//
// Created by Devon Deonarine on 10/02/20.
//


#import "RNImageSequenceManager.h"
#import "RNImageSequenceView.h"
#import "RCTUIManager.h"

@implementation RNImageSequenceManager {
}

RCT_EXPORT_MODULE();
RCT_EXPORT_VIEW_PROPERTY(images, NSArray);
RCT_EXPORT_VIEW_PROPERTY(framesPerSecond, NSUInteger);
RCT_EXPORT_VIEW_PROPERTY(loop, BOOL);
RCT_EXPORT_VIEW_PROPERTY(loopFrom, NSUInteger);
RCT_EXPORT_VIEW_PROPERTY(loopTo, NSUInteger);
RCT_EXPORT_VIEW_PROPERTY(isPlaying, BOOL);

- (UIView *)view {
    return [RNImageSequenceView new];
}

@end
