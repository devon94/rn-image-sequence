//
// Created by Devon Deonarine on 10/02/20.
//

#import "RNImageSequenceView.h"

BOOL _animationReady = false;
BOOL _isPlaying = false;

@implementation RNImageSequenceView {
    NSUInteger _framesPerSecond;
    NSMutableDictionary *_activeTasks;
    NSMutableDictionary *_imagesLoaded;
    BOOL _loop;
    NSUInteger _loopFrom;
    NSUInteger _loopTo;
}

- (void)setImages:(NSArray *)images
{
    __weak RNImageSequenceView *weakSelf = self;

    self.animationImages = nil;

    _activeTasks = [NSMutableDictionary new];
    _imagesLoaded = [NSMutableDictionary new];

    for (NSUInteger index = 0; index < images.count; index++) {
        NSDictionary *item = images[index];

        #ifdef DEBUG
        NSString *url = item[@"uri"];
        #else
        NSString *url = [NSString stringWithFormat:@"file://%@", item[@"uri"]]; // when not in debug, the paths are "local paths" (because resources are bundled in app)
        #endif

        dispatch_async(dispatch_queue_create("com.devon94.RNImageSequence.Downloader", NULL), ^{
            UIImage *frameImage = [UIImage imageWithData:[NSData dataWithContentsOfURL:[NSURL URLWithString:url]]];
            // here is the code to pre-render the image
            UIGraphicsBeginImageContext(frameImage.size);
            CGRect rect = CGRectMake(0, 0, frameImage.size.width, frameImage.size.height);
            [frameImage drawInRect:rect];
            UIImage *renderedImage = UIGraphicsGetImageFromCurrentImageContext();
            UIGraphicsEndImageContext();

            dispatch_async(dispatch_get_main_queue(), ^{
                [weakSelf onImageLoadTaskAtIndex:index image:renderedImage];
            });
        });

        _activeTasks[@(index)] = url;
    }
}

- (void)onImageLoadTaskAtIndex:(NSUInteger)index image:(UIImage *)image
{
    if (index == 0) {
        self.image = image;
    }

    [_activeTasks removeObjectForKey:@(index)];

    _imagesLoaded[@(index)] = image;

    if (_activeTasks.allValues.count == 0) {
        [self onImagesLoaded];
    }
}

- (void)onImagesLoaded
{
    NSMutableArray *images = [NSMutableArray new];
    for (NSUInteger index = 0; index < _imagesLoaded.allValues.count; index++) {
        UIImage *image = _imagesLoaded[@(index)];
        [images addObject:image];
    }

    [_imagesLoaded removeAllObjects];

    self.animationDuration = images.count * (1.0f / _framesPerSecond);
    self.animationImages = images;
    self.animationRepeatCount = _loop ? 0 : 1;
    self.image = self.animationImages.firstObject;
    
    _animationReady = true;
}

- (void)setFramesPerSecond:(NSUInteger)framesPerSecond
{
    _framesPerSecond = framesPerSecond;

    if (self.animationImages.count > 0) {
        self.animationDuration = self.animationImages.count * (1.0f / _framesPerSecond);
    }
}

- (void)setLoop:(NSUInteger)loop
{
    _loop = loop;

    self.animationRepeatCount = _loop ? 0 : 1;
}


- (void)setLoopFrom:(NSUInteger)loopFrom
{
    _loopFrom = loopFrom;
}

- (void)setLoopTo:(NSUInteger)loopTo
{
    _loopTo = loopTo;
}

- (void) setIsPlaying:(BOOL)isPlaying
{
    if (!_animationReady) {
        dispatch_after(dispatch_time(DISPATCH_TIME_NOW, (int64_t)(0.25 * NSEC_PER_SEC)), dispatch_get_main_queue(), ^{
            [self setIsPlaying:isPlaying];
        });
        
        return;
    }
    
    if (!_isPlaying && isPlaying) {
        self.image = self.animationImages.lastObject;
        [self startAnimating];
    }
    
    if (_isPlaying && !isPlaying) {
        self.image = self.animationImages.firstObject;
        [self stopAnimating];
    }
    
    _isPlaying = isPlaying;
}

@end
