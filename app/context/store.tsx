"use client";
import { getItem, setItem } from "@/lib/utils";
import {
  createContext,
  useContext,
  useEffect,
  useLayoutEffect,
  useState,
  Dispatch,
  SetStateAction,
} from "react";

interface ContextProps {
  username: string;
  setUsername: Dispatch<SetStateAction<string>>;
  isLogin: boolean;
  setIsLogin: Dispatch<SetStateAction<boolean>>;
}

const defaultValue = {
  username: "",
  setUsername: () => "",
  isLogin: false,
  setIsLogin: () => false,
};

const GlobalContext = createContext<ContextProps>(defaultValue);

export const GlobalContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const initIsLogin = getItem<boolean>("isLogin") || false;
  const initUsername = getItem<string>("username") || "";
  const [isLogin, setIsLogin] = useState(false);
  const [username, setUsername] = useState("");

  // useLayoutEffect(() => {
  //   const initIsLogin = getItem<boolean>("isLogin") || false;
  //   const initUsername = getItem<string>("username") || "";
  //   setIsLogin(initIsLogin);
  //   setUsername(initUsername);
  // }, []);

  useLayoutEffect(() => {
    const initIsLogin = getItem<boolean>("isLogin") || false;
    const initUsername = getItem<string>("username") || "";
    setIsLogin(initIsLogin);
    setUsername(initUsername);
  }, []);

  useEffect(() => {
    setItem("isLogin", isLogin);
    setItem("username", username);
  }, [isLogin, username]);

  return (
    <GlobalContext.Provider
      value={{ isLogin, setIsLogin, username, setUsername }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export const useGlobalContext = () => useContext(GlobalContext);
