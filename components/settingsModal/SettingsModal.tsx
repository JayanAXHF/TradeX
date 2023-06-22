import { useAppContext } from "@/context/context";
import { Divider, Drawer, Text, Title } from "@mantine/core";
import { createStyles, SegmentedControl, rem } from "@mantine/core";
import { useColorScheme } from "@mantine/hooks";
import React, { useEffect, useState } from "react";

const useStyles = createStyles((theme) => ({
  root: {
    backgroundColor:
      theme.colorScheme === "dark" ? theme.colors.dark[6] : theme.white,
    boxShadow: theme.shadows.md,
    border: `${rem(1)} solid ${
      theme.colorScheme === "dark" ? theme.colors.dark[4] : theme.colors.gray[1]
    }`,
    width: "100%",
  },

  indicator: {
    backgroundImage: theme.fn.gradient({ from: "green", to: "blue" }),
  },

  control: {
    border: "0 !important",
  },

  label: {
    "&, &:hover": {
      "&[data-active]": {
        color: theme.white,
      },
    },
  },
}));

const SettingsModal = () => {
  const { opened, close, setDarkMode } = useAppContext();
  const { classes } = useStyles();
  const [value, setValue] = useState<string>("3");

  const systemSetting = useColorScheme() === "dark" ? true : false;
  useEffect(() => {
    const val = Number(value);
    console.debug(val);

    setDarkMode(val === 1 ? false : val === 2 ? true : systemSetting);
    console.debug(val === 1 ? false : val === 2 ? true : systemSetting);
  }, [value]);

  return (
    <Drawer opened={opened} onClose={close} position="right">
      <Drawer.Title className="mb-2">
        <Title variant="h1">Settings</Title>
      </Drawer.Title>
      <Divider />
      <div id="darkMode" className="flex gap-y-4 flex-col mt-2">
        <Text fz="xl">Dark Mode</Text>{" "}
        <SegmentedControl
          radius="lg"
          size="md"
          data={[
            { label: "Light", value: "1" },
            { label: "Dark", value: "2" },
            { label: "System", value: "3" },
          ]}
          classNames={classes}
          value={value}
          onChange={setValue}
        />
      </div>
    </Drawer>
  );
};

export default SettingsModal;
