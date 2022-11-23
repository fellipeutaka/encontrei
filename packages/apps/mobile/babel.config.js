module.exports = function (api) {
  api.cache(true);
  return {
    presets: ["babel-preset-expo"],
    plugins: [
      "inline-dotenv",
      "react-native-reanimated/plugin",
      [
        "nativewind/babel",
        { allowModuleTransform: ["@expo/vector-icons, moti"] },
      ],
      [
        "module-resolver",
        {
          root: ["."],
          extensions: [".ts", ".tsx", ".json"],
          alias: {
            "@encontrei/components": "./src/components",
            "@encontrei/screens": "./src/screens",
            "@encontrei/routes": "./src/routes",
            "@encontrei/@types": "./src/@types",
            "@encontrei/contexts": "./src/contexts",
            "@encontrei/hooks": "./src/hooks",
            "@encontrei/utils": "./src/utils",
            "@encontrei/lib": "./src/lib",
            "@encontrei/assets": "./src/assets",
          },
        },
      ],
    ],
  };
};
