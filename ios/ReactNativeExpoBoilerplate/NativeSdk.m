#import <React/RCTBridgeModule.h>

@interface RCT_EXTERN_MODULE(NativeSdk, NSObject)

RCT_EXTERN_METHOD(getSdkProfile:(RCTPromiseResolveBlock)resolve
                  rejecter:(RCTPromiseRejectBlock)reject)

RCT_EXTERN_METHOD(createSessionToken:(NSString *)seed
                  resolver:(RCTPromiseResolveBlock)resolve
                  rejecter:(RCTPromiseRejectBlock)reject)

+ (BOOL)requiresMainQueueSetup
{
  return NO;
}

@end
