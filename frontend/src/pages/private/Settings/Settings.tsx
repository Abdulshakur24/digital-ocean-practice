import React from "react";
import { Outlet } from "react-router-dom";
import SettingLinks from "./components/SettingLinks";

function Settings() {
  return (
    <div className="flex">
      <SettingLinks />
      <div className="min-h-screen w-full bg-white shadow-lg">
        <Outlet />
      </div>
    </div>
  );
}

export default Settings;
