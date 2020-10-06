//
// Created by Devon Deonarineon 10/02/20.
// Copyright (c) 2016 Facebook. All rights reserved.
//

#import "RNImageSequenceManager.h"
#import "RNImageSequenceView.h"

@implementation RNImageSequenceManager {
}

RCT_EXPORT_MODULE();
RCT_EXPORT_VIEW_PROPERTY(images, NSArray);
RCT_EXPORT_VIEW_PROPERTY(framesPerSecond, NSUInteger);
RCT_EXPORT_VIEW_PROPERTY(loop, BOOL);

- (UIView *)view {
    return [RNImageSequenceView new];
}

@end
