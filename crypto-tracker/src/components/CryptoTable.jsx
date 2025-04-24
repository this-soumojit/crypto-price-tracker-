import React from "react";
import { useSelector } from "react-redux";
import { selectAssets } from "../redux/cryptoSlice";
import { useBinanceWebSocket } from "../utils/RealTimeAPI";
// import "./CryptoTable.css"; // Import external CSS file

const formatNumber = (num, isCurrency = false) => {
  if (!num) return "-"; // Return a dash for empty or null values

  // If isCurrency is true, display the value as a dollar amount
  if (isCurrency) {
    return "$" + num.toLocaleString();
  }

  // Format for large numbers (Million or Billion)
  if (num >= 1_000_000_000) {
    return (num / 1_000_000_000).toFixed(2) + " B"; // Convert to Billion
  }

  if (num >= 1_000_000) {
    return (num / 1_000_000).toFixed(2) + " M"; // Convert to Million
  }

  return num.toLocaleString(); // Default formatting for smaller numbers
};

const CryptoTable = () => {
  useBinanceWebSocket(); // Set up the WebSocket for real-time data

  const assets = useSelector(selectAssets); // Get the assets from Redux store

  return (
    <div className="table-container">
      <table className="crypto-table">
        <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Price</th>
            <th>1h %</th>
            <th>24h %</th>
            <th>7d %</th>
            <th>Market Cap</th>
            <th>Volume(24h)</th>
            <th>Circulating Supply</th>
            <th>7-Day Chart</th>
          </tr>
        </thead>
        <tbody>
          {assets.map((asset, index) => (
            <tr key={asset.id}>
              <td>{index + 1}</td>
              <td>
                <img
                  src={asset.logo} // Display asset logo
                  alt={asset.name}
                  style={{
                    width: "20px", // Adjust size of the logo
                    height: "20px",
                    marginRight: "8px",
                    verticalAlign: "middle",
                  }}
                />
                {asset.name}
              </td>
              <td>{formatNumber(asset.price, true)}</td>
              <td style={{ color: asset.percent1h > 0 ? "green" : "red" }}>
                {asset.percent1h}%
              </td>
              <td style={{ color: asset.percent24h > 0 ? "green" : "red" }}>
                {asset.percent24h}%
              </td>
              <td style={{ color: asset.percent7d > 0 ? "green" : "red" }}>
                {asset.percent7d}%
              </td>
              <td>{formatNumber(asset.marketCap * asset.price, true)}</td>
              <td>{formatNumber(asset.volume24h * asset.price, true)}</td>
              <td>{formatNumber(asset.circulatingSupply)}</td>
              <td>
                {asset.chart ? (
                  <img
                    src={asset.chart}
                    alt={`${asset.name} 7d chart`}
                    style={{ width: "100px", height: "50px" }}
                    onError={(e) => {
                      console.error("Image load error:", e.target.src);
                      e.target.style.display = "none";
                    }}
                  />
                ) : (
                  "Chart not available"
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CryptoTable;
