import { useAppContext } from "@/context/context";

import React, { useEffect, useRef } from "react";

let tvScriptLoadingPromise;

export default function TradingViewWidget() {
  const onLoadScriptRef = useRef();
  const { stockData, userData, darkMode } = useAppContext();
  console.log(
    `JSC ~ file: StockChart.jsx:139 ~ TradingViewWidget ~ stockData:`,
    stockData
  );
  const stockName = `${userData.stockList[0].exchange}:${userData.stockList[0].symbol}`;
  console.log(
    `JSC ~ file: StockChart.jsx:145 ~ TradingViewWidget ~ stockName:`,
    stockName
  );
  const watchList = userData?.stockList?.map((item) => {
    return `${item.exchange}:${item.symbol}`;
  });
  console.log(
    `JSC ~ file: StockChart.jsx:173 ~ watchList ~ watchList:`,
    watchList
  );
  useEffect(() => {
    onLoadScriptRef.current = createWidget;

    if (!tvScriptLoadingPromise) {
      tvScriptLoadingPromise = new Promise((resolve) => {
        const script = document.createElement("script");
        script.id = "tradingview-widget-loading-script";
        script.src = "https://s3.tradingview.com/tv.js";
        script.type = "text/javascript";
        script.onload = resolve;

        document.head.appendChild(script);
      });
    }

    tvScriptLoadingPromise.then(
      () => onLoadScriptRef.current && onLoadScriptRef.current()
    );

    return () => (onLoadScriptRef.current = null);

    function createWidget() {
      if (
        document.getElementById("tradingview_32309") &&
        "TradingView" in window
      ) {
        new window.TradingView.widget({
          autosize: true,
          symbol: stockName,
          interval: "D",
          timezone: "Etc/UTC",
          theme: darkMode ? "dark" : "light",
          style: "1",
          locale: "in",
          toolbar_bg: "#27292F",
          enable_publishing: false,
          save_image: true,
          container_id: "tradingview_32309",
          backgroundColor: !darkMode
            ? "rgba(255, 255, 255, 1)"
            : "rgba(39, 41, 47, 1)",
          // watchlist: watchList,
          details: true,
          details_bg: "#27292F",
        });
      }
    }
  }, [userData.stockList, darkMode]);

  return (
    <div className="tradingview-widget-container  h-auto block">
      <div id="tradingview_32309" className="h-[60vh] block" />
      <div className="tradingview-widget-copyright">
        <a
          href="https://in.tradingview.com/"
          rel="noopener nofollow"
          target="_blank"
        >
          <span className="blue-text">Chart Widget By TradingView</span>
        </a>
      </div>
    </div>
  );
}
