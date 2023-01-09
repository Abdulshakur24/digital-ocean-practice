import { useContext } from "react";
import { ToggleContext } from "src/contexts/ToggleProvider";

function useToggle() {
  const {
    toggle,
    handleNotification,
    handleProfile,
    handleWorkspace,
    handleProfileStatus,
  } = useContext(ToggleContext);
  return {
    toggle,
    handleWorkspace,
    handleProfile,
    handleNotification,
    handleProfileStatus,
  };
}

export default useToggle;
