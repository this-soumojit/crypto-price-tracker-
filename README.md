

Crypto Price Tracker

A real-time crypto tracker made using React, Redux Toolkit, and WebSocket (Binance API). It shows live prices, 7-day mini charts, and stable tables that can scroll without fluctuating.

Demo

https://drive.google.com/file/d/1QxHelJNRNeX452F-uRv5J7XTqSlE9pqw/view?usp=sharing

🛠 Tech Stack

React

Redux Toolkit

Binance WebSocket API

CSS (or TailwindCSS if used)

Optional sparkline chart images

Project Structure

crypto-tracker/
├── public/
│   └── index.html
├── src/
│   ├── components/
│   │   └── CryptoTable.js
│   ├── redux/
│   │   └── cryptoSlice.js
│   ├── utils/
│   │   └── RealTimeAPI.js
│   ├── App.js
│   ├── index.js
│   └── styles.css
├── .gitignore
├── README.md
└── package.json

How to Run It

Clone the repo

git clone https://github.com/this-soumojit/crypto-price-tracker-.git

Install dependencies

npm install

Start the project

npm start
