/** @import { ConfigFunction } from '@babel/core' */

/**
 * @satisfies {ConfigFunction}
 */
const config = api => {
  api.cache.using(() => process.env.NODE_ENV)

  return {
    presets: [
      ["babel-preset-expo", { jsxImportSource: "nativewind" }],
      "nativewind/babel",
    ],
    plugins: [
      [
        "module-resolver",
        {
          alias: {
            "@": "./src",
          },
          extensions: [".ts", ".tsx", ".js", ".jsx", ".json"],
        },
      ],
    ],
  }
}

module.exports = config
