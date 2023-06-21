"use client";

import Details from "@/components/details/Details";
import StockChart from "@/components/stock_chart/StockChart";
import { useAppContext } from "@/context/context";

export default function Home() {
  const { loggedIn, userData } = useAppContext();

  return (
    <div>
      {loggedIn && (userData?.stockList?.length || -1) > 0 && (
        <>
          <div className="grid grid-flow-col ml-48">
            <div className="col-span-6">
              <div className=" h-max">
                <StockChart />
              </div>
              <div>
                <Details />
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
