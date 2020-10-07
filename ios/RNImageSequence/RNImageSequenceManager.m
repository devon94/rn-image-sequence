//
// Created by Devon Deonarineon 10/02/20.
// Copyright (c) 2016 Facebook. All rights reserved.
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

RCT_EXPORT_METHOD(stopAnimating:(nonnull NSNumber *)reactTag){
    [self.bridge.uiManager addUIBlock:^(RCTUIManager *uiManager, NSDictionary<NSNumber *,UIView *> *viewRegistry) {
        RNImageSequenceView *view = viewRegistry[reactTag];
        if (!view || ![view isKindOfClass:[RNImageSequenceView class]]) {
            RCTLogError(@"Cannot find RNImageSequenceView with tag #%@", reactTag);
            return;
        }
        [view stopAnimating];
    }];
}

RCT_EXPORT_METHOD(startAnimating:(nonnull NSNumber *)reactTag){
    [self.bridge.uiManager addUIBlock:^(RCTUIManager *uiManager, NSDictionary<NSNumber *,UIView *> *viewRegistry) {
        RNImageSequenceView *view = viewRegistry[reactTag];
        if (!view || ![view isKindOfClass:[RNImageSequenceView class]]) {
            RCTLogError(@"Cannot find RNImageSequenceView with tag #%@", reactTag);
            return;
        }
        [view startAnimating];
    }];
}

- (UIView *)view {
    return [RNImageSequenceView new];
}

@end
