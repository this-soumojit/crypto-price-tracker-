import { useDispatch } from "react-redux";
import { updateAsset } from "../redux/cryptoSlice";
import { useEffect } from "react";

// Binance WebSocket URLs for the required assets
const symbols = [
  "btcusdt",
  "ethusdt",
  "usdtusdt",
  "xrpbtc", // XRP
  "bnbusdt", // BNB
  "solusdt", // Solana
];

export const useBinanceWebSocket = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    // Create WebSocket connections for each symbol
    const sockets = symbols.map((symbol) => {
      const socket = new WebSocket(
        `wss://stream.binance.com:9443/ws/${symbol}@trade`
      );

      socket.onmessage = (event) => {
        const data = JSON.parse(event.data);

        const updatedAsset = {
          id: symbol,
          price: parseFloat(data.p),
          percent1h: Math.random() * 10 - 5, // Simulating 1h percentage change
          percent24h: Math.random() * 20 - 10, // Simulating 24h percentage change
          percent7d: Math.random() * 30 - 15, // Simulating 7d percentage change
          volume24h: parseFloat(data.q), // Simulating 24h volume
          marketCap: Math.random() * 1000000000, // Simulated market cap
          circulatingSupply: Math.random() * 100000000, // Simulated circulating supply
          sevenDayChart: "/charts/7day_chart.png", // Simulated static 7-day chart image
        };

        // Dispatch the action to update the asset in the store
        dispatch(updateAsset(updatedAsset));
      };

      return socket;
    });

    // Cleanup on unmount
    return () => {
      sockets.forEach((socket) => socket.close());
    };
  }, [dispatch]);
};
