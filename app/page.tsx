"use client";

import { SideNav, TopNavbar } from "@/components";
import Details from "@/components/details/Details";
import SettingsModal from "@/components/settingsModal/SettingsModal";
import StockList from "@/components/stockList/StockList";
import StockChart from "@/components/stock_chart/StockChart";
import { useAppContext } from "@/context/context";
import { AppShell, Grid, Loader, MediaQuery } from "@mantine/core";
import { Suspense } from "react";

export default function Home() {
  const { loggedIn, userData, darkMode } = useAppContext();

  return (
    <Suspense fallback={<Loader variant="bars" />}>
      <div className={`${darkMode && "dark"} dark:bg-[#141518]`}>
        <AppShell
          padding="md"
          header={<TopNavbar />}
          navbar={<SideNav />}
          className={`${darkMode && "dark"} dark:bg-[#141518]`}
        >
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
                {/* <MediaQuery smallerThan={"xl"} styles={{ display: "none" }}> */}
                <Grid.Col span={10} className="h-96" sx={{ height: "500px" }}>
                  <div className="relative">
                    <StockChart />
                  </div>
                </Grid.Col>
                {/* </MediaQuery> */}
                {/* <MediaQuery largerThan={"xl"} styles={{ display: "none" }}>
                  <Grid.Col span={12}>
                    <StockChart />
                  </Grid.Col>
                </MediaQuery> */}
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
          <SettingsModal />
        </AppShell>
      </div>
    </Suspense>
  );
}
