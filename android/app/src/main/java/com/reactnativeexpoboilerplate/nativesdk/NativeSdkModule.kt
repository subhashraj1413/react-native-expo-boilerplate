package com.reactnativeexpoboilerplate.nativesdk

import android.os.Build
import com.facebook.react.bridge.Promise
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactContextBaseJavaModule
import com.facebook.react.bridge.ReactMethod
import com.facebook.react.bridge.WritableNativeMap
import java.util.Locale

class NativeSdkModule(
  reactContext: ReactApplicationContext
) : ReactContextBaseJavaModule(reactContext) {

  override fun getName(): String = NAME

  @ReactMethod
  fun getSdkProfile(promise: Promise) {
    try {
      val payload = WritableNativeMap().apply {
        putString("appId", reactApplicationContext.packageName)
        putString("appName", getAppName())
        putString("deviceModel", "${Build.MANUFACTURER} ${Build.MODEL}".trim())
        putString("nativeSdkName", "SampleNativeSdk")
        putString("nativeSdkVersion", "1.0.0")
        putString("platformName", "Android")
        putString(
          "platformVersion",
          Build.VERSION.RELEASE ?: Build.VERSION.SDK_INT.toString(),
        )
      }

      promise.resolve(payload)
    } catch (error: Exception) {
      promise.reject("native_sdk_profile_error", error.message, error)
    }
  }

  @ReactMethod
  fun createSessionToken(seed: String, promise: Promise) {
    try {
      val normalizedSeed = normalizeSeed(seed)
      val timestamp = java.lang.Long.toString(System.currentTimeMillis(), 36)
      promise.resolve("android-$normalizedSeed-$timestamp")
    } catch (error: Exception) {
      promise.reject("native_sdk_token_error", error.message, error)
    }
  }

  private fun getAppName(): String {
    val applicationInfo = reactApplicationContext.applicationInfo
    val packageManager = reactApplicationContext.packageManager
    val appLabel = packageManager.getApplicationLabel(applicationInfo)

    return appLabel?.toString() ?: "React Native Expo Boilerplate"
  }

  private fun normalizeSeed(seed: String): String {
    val lowered = seed
      .trim()
      .lowercase(Locale.ROOT)
      .replace(Regex("[^a-z0-9]+"), "-")
      .trim('-')

    return lowered.ifEmpty { "guest" }
  }

  companion object {
    const val NAME = "NativeSdk"
  }
}
