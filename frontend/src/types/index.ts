export interface ToggleContextType {
  toggle: {
    sidebar: {
      workspace: boolean;
      profile: boolean;
      notification: boolean;
    };
    pages: {
      settings: {
        status: boolean;
      };
    };
  };
  handleWorkspace: (value?: boolean) => void;
  handleProfile: (value?: boolean) => void;
  handleNotification: (value?: boolean) => void;
  handleProfileStatus: (value?: boolean) => void;
}
