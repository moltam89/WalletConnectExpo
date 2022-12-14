module.exports = {
  name: "wallet-connect-expo",
  slug: "wallet-connect-expo",
  version: '1.0.0',
  extra: {
    "eas": {
      "projectId": "89f318bf-ccfc-43b4-aa1a-a62fde8099ea"
    },
    TENDERLY_USER: process.env.TENDERLY_USER,
    TENDERLY_PROJECT: process.env.TENDERLY_PROJECT,
    TENDERLY_ACCESS_KEY: process.env.TENDERLY_ACCESS_KEY,
  },
  "android": {
    "package": "com.moltam89.walletconnectexpo"
  },
  "ios": {
    "bundleIdentifier": "com.buidlguidl.scaffoldwallet"
  }
};