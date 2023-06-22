import { Avatar, UnstyledButton } from "@mantine/core";
import React from "react";
import stockApi from "../../api/twelwedata";
import { useAppContext } from "@/context/context";

const Item = (data: any) => {
  return (
    <UnstyledButton>
      <Avatar src={data.logo} />
    </UnstyledButton>
  );
};

const StockList = () => {
  const { userData } = useAppContext();

  const fetchData = async (symbol: string) => {
    const stockLogoRes = await stockApi.get("/logo", {
      params: { symbol },
    });
    const stockDataRes = await stockApi.get("/quote", { params: { symbol } });

    const stockData = await stockDataRes.data;
    const stockLogo = await stockLogoRes.data;

    const data = await {
      ...stockData,
      logo: stockLogo.url,
    };
    console.log(`JSC ~ file: StockList.tsx:27 ~ fetchData ~ data:`, data);
    return await data;
  };

  if (userData?.stockList) {
    const dataList = userData?.stockList.map(async (stock) => {
      const data = fetchData(stock.symbol).then((data) => {
        return data;
      });
      console.log(`JSC ~ file: StockList.tsx:34 ~ dataList ~ dataList:`, data);
    });
  }

  return <div>{/* <Item /> */}</div>;
};

export default StockList;
