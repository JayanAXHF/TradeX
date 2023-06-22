"use client";
import { auth, db } from "@/firebase";
import {
  User,
  UserCredential,
  browserLocalPersistence,
  createUserWithEmailAndPassword,
  setPersistence,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
} from "firebase/auth";
import { child, get, ref, set } from "firebase/database";
import {
  Dispatch,
  SetStateAction,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import stockApi from "../api/twelwedata";
import { useRouter } from "next/navigation";
import { useColorScheme, useDisclosure } from "@mantine/hooks";

interface AppContextInterface {
  sideNav: boolean;
  setSideNav: Dispatch<SetStateAction<boolean>>;
  loggedIn: boolean;
  setLoggedIn: Dispatch<SetStateAction<boolean>>;
  signUpUser: (
    email: string,
    password: string,
    username: string
  ) => Promise<{
    userCredentials: UserCredential;
  }>;
  signInUser: (email: string, password: string) => Promise<User>;
  userData: UserData;
  setUserData: Dispatch<SetStateAction<UserData | undefined>>;
  addStock: (stock: Stock) => Promise<void>;
  stockData: any;
  setStockData: Dispatch<any>;
  Logout: () => Promise<void>;
  opened: boolean;
  open: () => void;
  close: () => void;
  darkMode: boolean;
  setDarkMode: Dispatch<SetStateAction<boolean>>;
}

const AppContext = createContext<any>("");

interface UserData {
  email: string;
  uid: string;
  username: string;
  profilePicture: string;
  stockList?: Stock[];
}

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

export const AppProvider = ({ children }: any) => {
  const [sideNav, setSideNav] = useState(true);
  const [loggedIn, setLoggedIn] = useState(false);
  const [userData, setUserData] = useState<UserData | null>({
    stockList: [],
    uid: "",
    username: "",
    email: "",
    profilePicture: "",
  });
  const [stockData, setStockData] = useState<any>([]);
  const [opened, { open, close }] = useDisclosure(false);
  const [darkMode, setDarkMode] = useState<boolean>(
    useColorScheme() === "dark" ? true : false
  );
  const signUpUser = async (
    email: string,
    password: string,
    username: string
  ) => {
    const userCredentials = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );

    const user = { userCredentials };

    const profilePicture = `https://api.dicebear.com/6.x/identicon/svg?seed=${username.replace(
      " ",
      ""
    )}`;
    await updateProfile(auth.currentUser as User, {
      displayName: username,
      photoURL: `https://api.dicebear.com/6.x/identicon/svg?seed=${username.replace(
        " ",
        ""
      )}`,
    }).catch((err) => console.log(err));

    set(ref(db, "users/" + userCredentials.user.uid), {
      username,
      email,
      profilePicture,
    });
    setUserData({
      username,
      email,
      profilePicture,
      uid: userCredentials.user.uid,
      stockList: [],
    });
    setLoggedIn(true);
    return user;
  };
  const signInUser = async (email: string, password: string) => {
    try {
      const userCredentials = await setPersistence(
        auth,
        browserLocalPersistence
      ).then(() => {
        return signInWithEmailAndPassword(auth, email, password);
      });

      const user: User = auth.currentUser as User;

      const snapshot = await get(
        child(ref(db), `users/${userCredentials.user.uid}`)
      );
      if (snapshot.exists()) {
        setUserData({
          email: user.email as string,
          username: user.displayName as string,
          uid: user.uid as string,
          profilePicture: user.photoURL as string,
          stockList: snapshot.val().stockList || ([] as Stock[]),
        });
        console.debug(
          console.table({
            email: user.email as string,
            username: user.displayName as string,
            uid: user.uid as string,
            profilePicture: user.photoURL as string,
            stockList: snapshot.val().stockList || ([] as Stock[]),
          })
        );
      } else {
        console.log("No data available");
      }
      setLoggedIn(true);
      return user;
    } catch (error) {
      console.error(error);
      return;
    }
  };

  const Logout = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      useRouter().push("/");
      alert(error);
      return;
    }
    setLoggedIn(false);
    setUserData(null);
  };

  const addStock = async (stock: Stock) => {
    const oldStockList = userData?.stockList as Stock[];

    if (oldStockList) {
      set(ref(db, `users/${userData?.uid}/stockList`), [
        stock,
        ...oldStockList,
      ]);
    } else {
      set(ref(db, `users/${userData?.uid}/stockList`), [stock]);
    }

    if (userData?.stockList) {
      setUserData({
        ...userData,
        stockList: [stock, ...(userData?.stockList as Stock[])],
      });
    } else {
      setUserData({ ...userData, stockList: [stock] } as UserData);
    }
  };

  return (
    <AppContext.Provider
      value={
        {
          sideNav,
          setSideNav,
          loggedIn,
          setLoggedIn,
          signInUser,
          signUpUser,
          userData,
          setUserData,
          addStock,
          stockData,
          setStockData,
          Logout,
          opened,
          open,
          close,
          darkMode,
          setDarkMode,
        } as AppContextInterface
      }
    >
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  return useContext<AppContextInterface>(AppContext);
};
