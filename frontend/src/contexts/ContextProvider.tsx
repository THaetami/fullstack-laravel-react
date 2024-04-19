import React, { createContext, useContext, useState, ReactNode, Dispatch, SetStateAction } from "react";
import Cookies from "js-cookie";


interface UserData {
  id: number,
  name: string;
  email: string;
  created_at: string;
}

interface NotifSetting {
  message: string,
  setting: string,
}

interface StateContextProps {
  user: null | UserData;
  token: null | string;
  notification: null | NotifSetting;
  openModal: boolean;
  setUser: Dispatch<SetStateAction<UserData>>;
  setToken: (token: string | null) => void;
  setNotification: (message: string | null, setting: string | null) => void;
  setOpenModal: (arg0: boolean) => void;
}

const StateContext = createContext<StateContextProps>({
  user: null,
  token: null,
  notification: null,
  openModal: false,
  setUser: () => {},
  setToken: () => { },
  setNotification: () => { },
  setOpenModal: () => {},
});

interface ContextProviderProps {
  children: ReactNode;
}

export const ContextProvider: React.FC<ContextProviderProps> = ({ children }) => {
  const [openModal, setOpenModal] = useState<boolean>(false)
  const [user, setUser] = useState<UserData>({
    id: 0,
    name: "",
    email: "",
    created_at: "",
  });
  const [token, _setToken] = useState<string | null>(Cookies.get("token") ?? null);
  const [notification, _setNotification] = useState<NotifSetting | null>({
    message: '',
    setting: '',
  })

  const setToken = (newToken: string | null) => {
    _setToken(newToken);

    if (newToken) {
      // Cookies.set("token", newToken, { expires: 5 / 1440 }); // 7 menit
      Cookies.set("token", newToken, { expires: 10080 }); // 1minggu
    } else {
      Cookies.remove("token");
    }
  };

  const setNotification = (message: string | null, setting: string | null) => {
    _setNotification({
      message: message || '',
      setting: setting || '',
    });
    setTimeout(() => {
      _setNotification(null)
    }, 5000)
  }

  return (
    <StateContext.Provider
      value={{
        user,
        token,
        notification,
        openModal,
        setUser,
        setToken,
        setNotification,
        setOpenModal
      }}
    >
      {children}
    </StateContext.Provider>
  );
};

export const useStateContext = () => useContext(StateContext);
