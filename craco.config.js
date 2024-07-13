const path = require("path");

module.exports = {
  webpack: {
    alias: {
      "@components": path.resolve(__dirname, "src/components/"),
      "@formValidation": path.resolve(__dirname, "src/formValidation/"),
      "@hooks": path.resolve(__dirname, "src/hooks/"),
      "@pages": path.resolve(__dirname, "src/pages/"),
      "@state": path.resolve(__dirname, "src/state/"),
      "@styles": path.resolve(__dirname, "src/styles/"),
      "@translation": path.resolve(__dirname, "src/translation/"),
      "@assets": path.resolve(__dirname, "src/assets/"),
      "@utils": path.resolve(__dirname, "src/utils/"),
    },
  },
};
