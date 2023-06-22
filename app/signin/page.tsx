"use client";
import {
  Autocomplete,
  Button,
  Loader,
  PasswordInput,
  rem,
} from "@mantine/core";

import Image from "next/image";
import React, { useRef, useState } from "react";
import Logo from "../../assets/Logo.svg";
import { Alert } from "@mantine/core";
import { IconAlertCircle } from "@tabler/icons-react";
import Link from "next/link";
import { useAppContext } from "@/context/context";
import "./signin.css";
import { useRouter } from "next/navigation";
import Head from "next/head";

interface FormData {
  email: string;
  password: string;
}

type AlertDetails = {
  message: string;
  show: boolean;
  title?: string;
};

const Login = () => {
  const timeoutRef = useRef<number>(-1);
  const [alertDetails, setAlertDetails] = useState<AlertDetails>({
    message: "",
    title: "",
    show: false,
  });
  const [formData, setFormData] = useState<FormData>();
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<string[]>([]);

  const { signInUser } = useAppContext();

  const handleEmailChange = (val: string) => {
    window.clearTimeout(timeoutRef.current);
    setFormData((prevState) => {
      return { ...prevState, email: val } as FormData;
    });
    setData([]);

    if (val.trim().length === 0 || val.includes("@")) {
      setLoading(false);
    } else {
      setLoading(true);
      timeoutRef.current = window.setTimeout(() => {
        setLoading(false);
        setData(
          ["gmail.com", "outlook.com", "yahoo.com"].map(
            (provider) => `${val}@${provider}`
          )
        );
      }, 1000);
    }
  };
  const router = useRouter();
  function handleLogin(event: React.SyntheticEvent): void {
    event.preventDefault();
    const emailRegex =
      /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    if (!formData?.email.match(emailRegex)) {
      setAlertDetails({
        message: "Please enter a valid email address",
        show: true,
      });
      return;
    }

    try {
      signInUser(formData?.email, formData?.password);
    } catch (error: any) {
      setAlertDetails({
        show: true,
        message: error.message,
        title: `Error ${error.code}`,
      });
      return;
    }
    router.push("/");
  }

  return (
    <div>
      <Head>
        <title>TradeX | Login</title>
      </Head>
      <section className="bg-white dark:bg-[#27292f]">
        <div className="lg:grid lg:min-h-screen lg:grid-cols-12">
          <aside className="signin__pattern relative block h-full lg:order-last lg:col-span-5 lg:h-full xl:col-span-6">
            <div className="h-full w-full "></div>
          </aside>

          <main className="flex items-center justify-center px-8 py-8 sm:px-12 lg:col-span-7 lg:px-16 lg:py-12 xl:col-span-6">
            <div className="max-w-xl lg:max-w-3xl">
              <a className="block text-blue-600" href="/">
                <span className="sr-only">Home</span>
                <Image src={Logo} alt="Logo" width={50} height={50} />
              </a>

              <h1 className="mt-6 text-2xl font-bold text-gray-900 dark:text-white sm:text-3xl md:text-4xl">
                Welcome Back!
              </h1>

              <p className="mt-4 leading-relaxed text-gray-500 dark:text-gray-400"></p>

              {alertDetails?.show ? (
                <Alert
                  icon={<IconAlertCircle size="1rem" />}
                  title={alertDetails?.title || "Error"}
                  color="red"
                  withCloseButton
                  closeButtonLabel="Close alert"
                  onClose={() => {
                    setAlertDetails({ message: "", show: false });
                  }}
                >
                  {alertDetails?.message}
                </Alert>
              ) : null}
              <form className="mt-8 grid grid-cols-6 gap-6">
                <div className="col-span-6">
                  <Autocomplete
                    value={formData?.email}
                    data={data}
                    onChange={handleEmailChange}
                    rightSection={loading ? <Loader size="1rem" /> : null}
                    label="Email"
                    placeholder="Your email"
                    type="email"
                    styles={(theme) => ({
                      label: {
                        marginBottom: rem(6),
                      },
                    })}
                    withAsterisk
                  />
                </div>

                <div className="col-span-12 sm:col-span-6">
                  <PasswordInput
                    placeholder="Password"
                    label="Password"
                    description="Password must 6 characters long."
                    withAsterisk
                    value={formData?.password}
                    onChange={(e) => {
                      setFormData((prevState) => {
                        return {
                          ...prevState,
                          password: e.target.value,
                        } as FormData;
                      });
                    }}
                  />
                </div>

                <div className="col-span-6 sm:flex sm:items-center sm:gap-4">
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
                    onClick={handleLogin}
                    type="submit"
                  >
                    Login
                  </Button>

                  <p className="mt-4 text-sm text-gray-500 dark:text-gray-400 sm:mt-0">
                    Don{"'"}t have an account?
                    <Link
                      href="/signup"
                      className="text-gray-700 underline dark:text-gray-200"
                    >
                      Sign Up
                    </Link>
                    .
                  </p>
                </div>
              </form>
            </div>
          </main>
        </div>
      </section>
    </div>
  );
};

export default Login;
