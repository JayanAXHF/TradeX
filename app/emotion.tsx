"use client";
import { useAppContext } from "@/context/context";
import { CacheProvider } from "@emotion/react";
import {
  useEmotionCache,
  MantineProvider,
  useMantineTheme,
} from "@mantine/core";
import { useServerInsertedHTML } from "next/navigation";

export default function RootStyleRegistry({
  children,
}: {
  children: React.ReactNode;
}) {
  const cache = useEmotionCache();
  cache.compat = true;
  const { darkMode } = useAppContext();
  const theme = useMantineTheme();
  theme.colors.dark[7] = "#141518";
  useServerInsertedHTML(() => (
    <style
      data-emotion={`${cache.key} ${Object.keys(cache.inserted).join(" ")}`}
      dangerouslySetInnerHTML={{
        __html: Object.values(cache.inserted).join(" "),
      }}
    />
  ));

  return (
    <CacheProvider value={cache}>
      <MantineProvider
        withGlobalStyles
        withNormalizeCSS
        theme={{
          /** Put your mantine theme override here */
          colorScheme: darkMode ? "dark" : "light",
          colors: { dark: [...theme.colors.dark] },
        }}
      >
        {children}
      </MantineProvider>
    </CacheProvider>
  );
}
