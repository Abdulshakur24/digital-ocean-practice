import React, { useState, createContext } from "react";
import type { ReactNode } from "react";
import { ToggleContextType } from "src/types";

export const ToggleContext = createContext({} as ToggleContextType);

function ToggleProvider({ children }: { children: ReactNode }) {
  const [toggle, setToggle] = useState({
    sidebar: {
      workspace: false,
      profile: false,
      notification: false,
    },
    pages: {
      settings: {
        status: false,
      },
    },
  });

  const handleWorkspace = (value: boolean = false) => {
    setToggle((prev) => ({
      ...prev,
      sidebar: {
        ...prev.sidebar,
        workspace: value ? value : !prev.sidebar.workspace,
      },
    }));
  };

  const handleProfile = (value: boolean = false) => {
    setToggle((prev) => ({
      ...prev,
      sidebar: {
        ...prev.sidebar,
        profile: value ? value : !prev.sidebar.profile,
      },
    }));
  };

  const handleNotification = (value: boolean = false) => {
    setToggle((prev) => ({
      ...prev,
      sidebar: {
        ...prev.sidebar,
        notification: value ? value : !prev.sidebar.notification,
      },
    }));
  };

  const handleProfileStatus = (value: boolean = false) => {
    setToggle((prev) => ({
      ...prev,
      pages: {
        ...prev.pages,
        settings: {
          ...prev.pages.settings,
          status: value ? value : !prev.pages.settings.status,
        },
      },
    }));
  };

  return (
    <ToggleContext.Provider
      value={{
        toggle,
        handleWorkspace,
        handleProfile,
        handleNotification,
        handleProfileStatus,
      }}
    >
      {children}
    </ToggleContext.Provider>
  );
}

export { ToggleProvider };
