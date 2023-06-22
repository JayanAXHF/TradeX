"use client";

import { SideNav, TopNavbar } from "@/components";
import Details from "@/components/details/Details";
import StockList from "@/components/stockList/StockList";
import StockChart from "@/components/stock_chart/StockChart";
import { useAppContext } from "@/context/context";
import { AppShell, Grid, MediaQuery } from "@mantine/core";

export default function Home() {
  const { loggedIn, userData } = useAppContext();

  return (
    <AppShell padding="md" header={<TopNavbar />} navbar={<SideNav />}>
      <div>
        {loggedIn && (userData?.stockList?.length || -1) > 0 && (
          <>
            {/* <div className="grid grid-flow-col ">
              <div className="col-span-6">
                <div className=" h-max text-left">
                  <StockChart />
                </div>
                <div>
                </div>
              </div>
            </div> */}
            <Grid>
              <MediaQuery smallerThan={"xl"} styles={{ display: "none" }}>
                <Grid.Col span={10} className="h-96" sx={{ height: "500px" }}>
                  <div className="relative">
                    <StockChart />
                  </div>
                </Grid.Col>
              </MediaQuery>
              <MediaQuery largerThan={"xl"} styles={{ display: "none" }}>
                <Grid.Col span={12}>
                  <StockChart />
                </Grid.Col>
              </MediaQuery>
              <MediaQuery smallerThan="xl" styles={{ display: "none" }}>
                <Grid.Col span={2}>
                  <StockList />
                </Grid.Col>
              </MediaQuery>
              <Grid.Col span={10}>
                <Details />
              </Grid.Col>
            </Grid>
          </>
        )}
      </div>
    </AppShell>
  );
}
