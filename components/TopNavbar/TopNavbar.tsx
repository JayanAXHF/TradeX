"use client";

import {
  createStyles,
  Header,
  Autocomplete,
  Group,
  rem,
  Title,
  Avatar,
  Button,
  ActionIcon,
  useMantineTheme,
  Modal,
  Menu,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import {
  IconArrowLeft,
  IconArrowRight,
  IconLogout,
  IconSearch,
  IconSettings,
  IconUser,
} from "@tabler/icons-react";
import Logo from "../../assets/Logo.svg";
import Image from "next/image";
import { Text } from "@mantine/core";
import { useAppContext } from "@/context/context";
import { useEffect, useState } from "react";
import Link from "next/link";
import React from "react";
import { usePathname } from "next/navigation";
import { Item } from "../stockListItem/Item";
import dataApi from "../../api/twelwedata";

/*AutoComplete Imports */
import { forwardRef } from "react";
import { MantineColor, SelectItemProps } from "@mantine/core";

const useStyles = createStyles((theme) => ({
  header: {
    paddingLeft: theme.spacing.md,
    paddingRight: theme.spacing.md,
  },

  inner: {
    height: rem(56),
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },

  links: {
    [theme.fn.smallerThan("md")]: {
      display: "none",
    },
  },

  search: {
    [theme.fn.smallerThan("xs")]: {
      display: "none",
    },
  },

  link: {
    display: "block",
    lineHeight: 1,
    padding: `${rem(8)} ${rem(12)}`,
    borderRadius: theme.radius.sm,
    textDecoration: "none",
    color:
      theme.colorScheme === "dark"
        ? theme.colors.dark[0]
        : theme.colors.gray[7],
    fontSize: theme.fontSizes.sm,
    fontWeight: 500,

    "&:hover": {
      backgroundColor:
        theme.colorScheme === "dark"
          ? theme.colors.dark[6]
          : theme.colors.gray[0],
    },
  },
}));

interface ItemProps extends SelectItemProps {
  color: MantineColor;
  description: string;
  country: string;
}

export const AutoCompleteItem = forwardRef<HTMLDivElement, ItemProps>(
  ({ description, value, country, ...others }: ItemProps, ref) => (
    <div ref={ref} {...others}>
      <Group noWrap>
        <div>
          <Text>{value}</Text>
          <Text size="xs" color="dimmed">
            {description} | {country}
          </Text>
        </div>
      </Group>
    </div>
  )
);

AutoCompleteItem.displayName = "AutoCompleteItem";
interface Stock {
  country: string;
  currency: string;
  exchange: string;
  exchange_timezone: string;
  instrument_name: string;
  instrument_type: string;
  mic_code: string;
  symbol: string;
}

export function TopNavbar() {
  const theme = useMantineTheme();
  const [isOpen, { open, close }] = useDisclosure(false);
  const [opened, { toggle }] = useDisclosure(false);
  const { classes } = useStyles();
  const { setSideNav, loggedIn, userData, setStockData, Logout, darkMode } =
    useAppContext();
  const [autoCompleteData, setAutoCompleteData] = useState<string[]>([]);
  const [completeList, setCompleteList] = useState<Stock[]>([]);
  const [searchValue, setSearchValue] = useState("");
  const [tempList, setTempList] = useState<Stock[]>();
  const pathname = usePathname();

  useEffect(() => {}, []);

  const fetchStocks = async (searchValue: string) => {
    const res = await Promise.resolve(
      dataApi.get("/symbol_search", {
        params: {
          symbol: searchValue,
          outputsize: 10,
        },
      })
    );

    const data = await res.data;
    console.debug(data.data);
    const nameArray: string[] = data.data.map((item: Stock) => {
      return {
        value: item.symbol,
        description: item.instrument_name,
        country: item.country,
      };
    });
    console.log(
      `JSC ~ file: TopNavbar.tsx:106 ~ constnameArray:string[]=data.data.map ~ nameArray:`,
      nameArray
    );

    setAutoCompleteData(nameArray);
  };

  const getStocks = async (stock: string) => {
    const res = await fetch(
      `https://api.twelvedata.com/symbol_search?symbol=${stock}&apikey=${process.env.NEXT_PUBLI_TWELWEDATA_API_KEY}`
    );
    setStockData((prevState: any) => {
      return [
        ...prevState,
        dataApi.get("/time_series", {
          params: {
            interval: "1month",
            symbol: stock,
            outputsize: 12,
          },
        }),
      ];
    });
    const data = await res.json();
    console.log(`JSC ~ file: TopNavbar.tsx:124 ~ getStocks ~ data:`, data);
    return data.data;
  };

  useEffect(() => {
    if (searchValue !== "") {
      fetchStocks(searchValue);
    }
  }, [searchValue]);

  return pathname !== "/signin" && pathname !== "/signup" ? (
    <React.Fragment>
      <Header
        height={68}
        className={`${classes.header} ${
          darkMode && "dark"
        } dark:bg-[#141518] dark:text-gray-50`}
        mb={120}
        pt={10 / 2}
        pb={10 / 2}
        px={20}
      >
        <Modal opened={isOpen} onClose={close} title="Add Stocks" centered>
          {tempList?.map((item: Stock, index: number) => {
            return (
              <Item
                title={item.symbol}
                description={item.instrument_name}
                key={index}
                stock={item}
                country={item.country}
              />
            );
          })}
        </Modal>
        <div className={classes.inner}>
          <Group>
            <Image
              src={Logo}
              alt="logo"
              height={40}
              width={40}
              onClick={() => {
                setSideNav((prevSate: boolean) => {
                  return !prevSate;
                });
              }}
              className="cursor-pointer"
            />
            <div>
              <Title order={3}>TradeX</Title>
              {loggedIn && <Text>Hiya, {userData.username}!</Text>}
            </div>
          </Group>
          <Group>
            {loggedIn ? (
              <>
                {" "}
                <Autocomplete
                  className={classes.search}
                  placeholder="Search"
                  icon={<IconSearch size="1rem" stroke={1.5} />}
                  value={searchValue}
                  onChange={setSearchValue}
                  data={autoCompleteData}
                  radius="xl"
                  itemComponent={AutoCompleteItem}
                  size="md"
                  filter={(value, item) =>
                    item.value
                      .toLowerCase()
                      .includes(value.toLowerCase().trim()) ||
                    item.description
                      .toLowerCase()
                      .includes(value.toLowerCase().trim())
                  }
                  rightSection={
                    <ActionIcon
                      size={32}
                      radius="xl"
                      color={theme.primaryColor}
                      variant="filled"
                      onClick={async () => {
                        const tempItem: Stock[] = await getStocks(searchValue);

                        setTempList(tempItem);
                        open();
                      }}
                    >
                      {theme.dir === "ltr" ? (
                        <IconArrowRight size="1.1rem" stroke={1.5} />
                      ) : (
                        <IconArrowLeft size="1.1rem" stroke={1.5} />
                      )}
                    </ActionIcon>
                  }
                />
                <Menu shadow="md" width={200}>
                  <Menu.Target>
                    <Avatar
                      src={userData.profilePicture}
                      alt="pfp"
                      className="h-10 w-auto cursor-pointer"
                    />
                  </Menu.Target>
                  <Menu.Dropdown>
                    <Menu.Label>Application</Menu.Label>
                    <Menu.Item icon={<IconUser size={14} />}>Profile</Menu.Item>
                    <Menu.Item icon={<IconSettings size={14} />}>
                      Settings
                    </Menu.Item>

                    <Menu.Item
                      icon={<IconSearch size={14} />}
                      className="sm:hidden"
                    >
                      Search
                    </Menu.Item>
                    <Menu.Divider />
                    <Menu.Item icon={<IconLogout size={14} />} onClick={Logout}>
                      Logout
                    </Menu.Item>
                  </Menu.Dropdown>
                </Menu>
              </>
            ) : (
              <Group>
                <Link href="/signup">
                  <Button
                    styles={(theme) => ({
                      root: {
                        backgroundColor: "#F3EF52",
                        color: "#141518",
                        border: 0,
                        height: rem(42),
                        paddingLeft: rem(20),
                        paddingRight: rem(20),
                        "&:not([data-disabled])": theme.fn.hover({
                          backgroundColor: theme.fn.darken("#F3EF52", 0.05),
                        }),
                      },
                    })}
                  >
                    SignUp
                  </Button>
                </Link>
                <Link href="/signin">
                  <Button
                    variant="default"
                    styles={(theme) => ({
                      root: {
                        height: rem(42),
                        paddingLeft: rem(20),
                        paddingRight: rem(20),
                        border: 0,
                      },
                    })}
                  >
                    Login
                  </Button>
                </Link>
              </Group>
            )}
          </Group>
        </div>
      </Header>
    </React.Fragment>
  ) : null;
}
