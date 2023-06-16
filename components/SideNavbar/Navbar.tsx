"use client";

import { useState } from "react";
import {
  Navbar,
  Tooltip,
  UnstyledButton,
  createStyles,
  Stack,
  rem,
  Center,
} from "@mantine/core";
import {
  IconUser,
  IconSettings,
  IconLogout,
  IconHome,
} from "@tabler/icons-react";
import Logo from "../../assets/Logo.svg";
import Image from "next/image";
import { useAppContext } from "@/context/context";
import { usePathname, useRouter } from "next/navigation";

const useStyles = createStyles((theme) => ({
  link: {
    width: rem(50),
    height: rem(50),
    borderRadius: theme.radius.md,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color:
      theme.colorScheme === "dark"
        ? theme.colors.dark[0]
        : theme.colors.gray[7],

    "&:hover": {
      backgroundColor:
        theme.colorScheme === "dark"
          ? theme.colors.dark[5]
          : theme.colors.gray[0],
    },
  },

  active: {
    "&, &:hover": {
      backgroundColor: theme.fn.variant({
        variant: "light",
        color: theme.primaryColor,
      }).background,
      color: theme.fn.variant({ variant: "light", color: theme.primaryColor })
        .color,
    },
  },
}));

interface NavbarLinkProps {
  icon: React.FC<any>;
  label: string;
  active?: boolean;
  onClick?(): void;
}

function NavbarLink({ icon: Icon, label, active, onClick }: NavbarLinkProps) {
  const { classes, cx } = useStyles();
  return (
    <Tooltip label={label} position="right" transitionProps={{ duration: 0 }}>
      <UnstyledButton
        onClick={onClick}
        className={cx(classes.link, { [classes.active]: active })}
      >
        <Icon size="1.2rem" stroke={1.5} />
      </UnstyledButton>
    </Tooltip>
  );
}

const mockdata = [
  { icon: IconHome, label: "Home", href: "/" },
  { icon: IconUser, label: "About Us", href: "/about" },
];

export function SideNav() {
  const router = useRouter();
  const pathname = usePathname();

  const [active, setActive] = useState(0);
  const { sideNav } = useAppContext();
  const links = mockdata.map((link, index) => (
    <NavbarLink
      {...link}
      key={link.label}
      active={index === active}
      onClick={() => {
        setActive(index);
        router.push(link.href);
      }}
    />
  ));

  return sideNav && pathname !== "/signin" && pathname !== "/signup" ? (
    <Navbar
      height={"100%"}
      width={{ base: 80 }}
      p="md"
      sx={{ position: "fixed", right: 0 }}
      className="transition-all duration-300 ease-in-out"
    >
      <Navbar.Section grow mt={50}>
        <Stack justify="center" spacing={10}>
          {links}
        </Stack>
      </Navbar.Section>
      <Navbar.Section>
        <Stack justify="center" spacing={10} mb={75}>
          <NavbarLink icon={IconSettings} label="Settings" />
          <NavbarLink icon={IconLogout} label="Logout" />
        </Stack>
      </Navbar.Section>
    </Navbar>
  ) : null;
}
