import Foundation
import React
import UIKit

@objc(NativeSdk)
final class NativeSdk: NSObject {
    @objc
    func getSdkProfile(_ resolve: RCTPromiseResolveBlock, rejecter reject: RCTPromiseRejectBlock) {
        let device = UIDevice.current
        let payload: [String: String] = [
            "appId": Bundle.main.bundleIdentifier ?? "",
            "appName": Self.appName,
            "deviceModel": device.model,
            "nativeSdkName": "SampleNativeSdk",
            "nativeSdkVersion": "1.0.0",
            "platformName": device.systemName,
            "platformVersion": device.systemVersion
        ]

        resolve(payload)
    }

    @objc
    func createSessionToken(
        _ seed: String,
        resolver resolve: RCTPromiseResolveBlock,
        rejecter reject: RCTPromiseRejectBlock
    ) {
        let normalizedSeed = normalizedSeed(from: seed)
        let milliseconds = UInt64(Date().timeIntervalSince1970 * 1000.0)
        let timestamp = String(milliseconds, radix: 16)

        resolve("ios-\(normalizedSeed)-\(timestamp)")
    }

    @objc
    static func requiresMainQueueSetup() -> Bool {
        false
    }

    private static var appName: String {
        let displayName = Bundle.main.object(forInfoDictionaryKey: "CFBundleDisplayName") as? String
        let bundleName = Bundle.main.object(forInfoDictionaryKey: "CFBundleName") as? String

        if let displayName, !displayName.isEmpty {
            return displayName
        }

        if let bundleName, !bundleName.isEmpty {
            return bundleName
        }

        return "React Native Expo Boilerplate"
    }

    private func normalizedSeed(from seed: String) -> String {
        let trimmedSeed = seed.trimmingCharacters(in: .whitespacesAndNewlines)
        let rawSeed = trimmedSeed.isEmpty ? "guest" : trimmedSeed.lowercased()
        let parts = rawSeed.components(separatedBy: CharacterSet.alphanumerics.inverted)
        let normalized = parts.filter { !$0.isEmpty }.joined(separator: "-")

        return normalized.isEmpty ? "guest" : normalized
    }
}
