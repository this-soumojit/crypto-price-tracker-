import { createSlice } from "@reduxjs/toolkit";

// Define your asset metadata (name and logo)
const assetMeta = {
  btcusdt: {
    name: "Bitcoin",
    logo: "/logos/btc.png",
    chart: "/charts/btc_chart.png",
  },
  ethusdt: {
    name: "Ethereum",
    logo: "/logos/eth.png",
    chart: "/charts/eth_chart.png",
  },
  usdtusdt: {
    name: "Tether",
    logo: "/logos/usdt.png",
    chart: "/charts/btc_chart.png",
  },
  xrpbtc: {
    name: "XRP",
    logo: "/logos/xrp.png",
    chart: "/charts/btc_chart.png",
  },
  bnbusdt: {
    name: "BNB",
    logo: "/logos/bnb.png",
    chart: "/charts/eth_chart.png",
  },
  solusdt: {
    name: "Solana",
    logo: "/logos/sol.png",
    chart: "/charts/eth_chart.png",
  },
};


const initialState = {
  assets: [],
};

const cryptoSlice = createSlice({
  name: "crypto",
  initialState,
  reducers: {
    // Update or add an asset
    updateAsset: (state, action) => {
      const assetIndex = state.assets.findIndex(
        (a) => a.id === action.payload.id
      );

      // If the asset exists, update it, else add a new one
      if (assetIndex >= 0) {
        state.assets[assetIndex] = {
          ...state.assets[assetIndex],
          ...action.payload,
        };
      } else {
        // Adding additional fields like name, logo, marketCap, circulatingSupply, and sevenDayChart when creating a new asset
        const asset = {
          ...action.payload,
          name: assetMeta[action.payload.id]?.name || action.payload.id,
          logo: assetMeta[action.payload.id]?.logo || "",
          chart: assetMeta[action.payload.id]?.chart || "",
        };
        state.assets.push(asset);
      }
    },
  },
});

export const { updateAsset } = cryptoSlice.actions;
export const selectAssets = (state) => state.crypto.assets;
export default cryptoSlice.reducer;
