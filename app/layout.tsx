import RootStyleRegistry from "./emotion";
import "./globals.css";

import { SideNav, TopNavbar } from "@/components";
import { AppProvider } from "@/context/context";

export const metadata = {
  title: "TradeX | Home",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AppProvider>
      <html lang="en-US">
        <head />
        <body>
          <RootStyleRegistry>
            <SideNav />
            <TopNavbar />
            {children}
          </RootStyleRegistry>
        </body>
      </html>
    </AppProvider>
  );
}
