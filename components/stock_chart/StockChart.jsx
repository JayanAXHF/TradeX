import { useAppContext } from "@/context/context";
// import React from "react";
// import {
//   StockChartComponent,
//   StockChartSeriesCollectionDirective,
//   StockChartSeriesDirective,
//   Inject,
//   ITooltipRenderEventArgs,
//   IStockChartEventArgs,
//   ChartTheme,
//   DateTime,
//   Tooltip,
//   RangeTooltip,
//   Crosshair,
//   LineSeries,
//   SplineSeries,
//   CandleSeries,
//   HiloOpenCloseSeries,
//   HiloSeries,
//   RangeAreaSeries,
//   Trendlines,
// } from "@syncfusion/ej2-react-charts";
// import {
//   EmaIndicator,
//   RsiIndicator,
//   BollingerBands,
//   TmaIndicator,
//   MomentumIndicator,
//   SmaIndicator,
//   AtrIndicator,
//   AccumulationDistributionIndicator,
//   MacdIndicator,
//   StochasticIndicator,
//   Export,
// } from "@syncfusion/ej2-react-charts";

// const StockChart = () => {

//   if (stockData) {
//     const data = stockData[0].values.map((item: any) => {
//       const { open, close, high, low, volume } = item;

//       return {
//         x: new Date(item.datetime),
//         open: Number(open),
//         close: Number(close),
//         high: Number(high),
//         low: Number(low),
//         volume: Number(volume),
//       };
//     });

//     const newOptions = { style: "currency", currency: "USD" };
//     const numberFormat = new Intl.NumberFormat("en-US", newOptions);
//     console.log(`JSC ~ file: StockChart.tsx:19 ~ StockChart ~ data:`, data);

//     const options = {
//       title: `${stockData[0].meta.symbol} Stock`,
//       backgroundColor: "transparent",
//       annotations: {
//         textStyle: {
//           fontName: "Times-Roman",
//           fontSize: 18,
//           bold: true,
//           italic: true,
//           color: "#871b47",
//           auraColor: "#d799ae",
//           opacity: 0.8,
//         },
//       },
//     };

//     return (
//       <div className="h-96 mt-36 !text-white bg-secondary w-max">
//         <StockChartComponent
//           id="stockchart"
//           primaryXAxis={{
//             valueType: "DateTime",
//             majorGridLines: { width: 0 },
//             majorTickLines: { color: "transparent" },
//             crosshairTooltip: { enable: true },
//           }}
//           primaryYAxis={{
//             labelFormat: "n0",
//             lineStyle: { width: 0 },
//             rangePadding: "None",
//             majorTickLines: { width: 0 },
//           }}
//           height="350"
//         >
//           <Inject
//             services={[
//               DateTime,
//               Tooltip,
//               RangeTooltip,
//               Crosshair,
//               LineSeries,
//               SplineSeries,
//               CandleSeries,
//               HiloOpenCloseSeries,
//               HiloSeries,
//               RangeAreaSeries,
//               Trendlines,
//               EmaIndicator,
//               RsiIndicator,
//               BollingerBands,
//               TmaIndicator,
//               MomentumIndicator,
//               SmaIndicator,
//               AtrIndicator,
//               Export,
//               AccumulationDistributionIndicator,
//               MacdIndicator,
//               StochasticIndicator,
//             ]}
//           />
//           <StockChartSeriesCollectionDirective>
//             <StockChartSeriesDirective
//               dataSource={data}
//               type="Candle"
//             ></StockChartSeriesDirective>
//           </StockChartSeriesCollectionDirective>
//         </StockChartComponent>
//       </div>
//     );
//   }
// };
// export default StockChart;

// TradingViewWidget.jsx

import React, { useEffect, useRef } from "react";
import StockList from "../stockList/StockList";

let tvScriptLoadingPromise;

export default function TradingViewWidget() {
  const onLoadScriptRef = useRef();
  const { stockData, userData } = useAppContext();
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
          theme: "dark",
          style: "1",
          locale: "in",
          toolbar_bg: "#27292F",
          enable_publishing: false,
          save_image: true,
          container_id: "tradingview_32309",
          backgroundColor: "rgba(39, 41, 47, 1)",
          // watchlist: watchList,
          details: true,
          details_bg: "#27292F",
        });
      }
    }
  }, [userData.stockList]);

  return (
    <div className="tradingview-widget-container  h-auto block">
      <div id="tradingview_32309" className="h-[60vh] block" />
      <div className="tradingview-widget-copyright">
        <a
          href="https://in.tradingview.com/"
          rel="noopener nofollow"
          target="_blank"
        >
          <span className="blue-text">Track all markets on TradingView</span>
        </a>
      </div>
    </div>
  );
}
