"use client";

import StockChart from "@/components/stock_chart/StockChart";
import { useAppContext } from "@/context/context";

export default function Home() {
  const { loggedIn } = useAppContext();

  return (
    <div>
      {/* {loggedIn ? (
        <div className="h-96">
          <StockChart />
        </div>
      ) : null} */}
    </div>
  );
}
