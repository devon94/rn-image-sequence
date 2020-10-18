//
// Created by Devon Deonarine on 10/18/20.
//

#import <UIKit/UIKit.h>

typedef void (^Block)(BOOL success);

@interface UIImageView (AnimationCompletion)

-(void)startAnimatingWithCompletionBlock:(Block)block;

@end
