import Box from "@mui/material/Box";
import { ListItemText, MenuItem, Typography } from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";

const personalSettings = [
  {
    id: 1,
    primary: "Profile",
    href: "profile",
  },
  // {
  //   id: 2,
  //   primary: "Notification",
  //   href: "notification",
  // },
];

const workspaceSettings = [
  {
    id: 1,
    primary: "General",
    href: "general",
  },
  {
    id: 2,
    primary: "Users",
    href: "users",
  },
  // {
  //   id: 3,
  //   primary: "Teams",
  //   href: "teams",
  // },
  {
    id: 4,
    primary: "Channels",
    href: "channels",
  },
  {
    id: 5,
    primary: "Closing Notes",
    href: "closing-notes",
  },
  // {
  //   id: 6,
  //   primary: "Files",
  //   href: "files",
  // },
  {
    id: 7,
    primary: "Quick Answers",
    href: "quick-answers",
  },
];

const organizationSettings = [
  {
    id: 1,
    primary: "General",
    href: "organizationGeneral",
  },
  // {
  //   id: 2,
  //   primary: "Users",
  //   href: "organization-users",
  // },
  // {
  //   id: 3,
  //   primary: "Workspace",
  //   href: "organization-spaces",
  // },
];

const isRouteMatched = (path1: string, path2: string) => {
  return path1.includes(path2);
};

function SettingLinks() {
  let { pathname } = useLocation();
  const navigator = useNavigate();

  return (
    <Box
      sx={(theme) => ({
        width: "100%",
        maxWidth: "240px",
        height: "100vh",
        overflowY: "auto",
        [theme.breakpoints.down(991)]: {
          height: "calc(100vh - 60px)",
        },
        scrollbarWidth: "thin",
        "&::-webkit-scrollbar": {
          width: "0.4em",
        },
        "&::-webkit-scrollbar-track": {
          background: "#f1f1f1",
        },
        "&::-webkit-scrollbar-thumb": {
          backgroundColor: "#CBCBCB",
        },
        "&::-webkit-scrollbar-thumb:hover": {
          background: "#c1c1c1",
        },
      })}
    >
      <>
        <Typography
          noWrap
          sx={(theme) => ({
            fontWeight: "600",
            padding: "2rem 2rem 0 2rem",
            [theme.breakpoints.down(991)]: {
              padding: "1rem 1rem 0 1rem",
            },
          })}
          component="h1"
        >
          Personal Settings
        </Typography>
        <Box sx={{ py: "8px" }}>
          {personalSettings.map(({ id, primary, href }) => (
            <MenuItem
              key={id}
              sx={(theme) => ({
                py: "12px",
                px: "2rem",
                [theme.breakpoints.down(991)]: {
                  px: "1rem",
                },
                "&.active": {
                  backgroundColor: "#e6ebf5",
                  color: "#7269ef",
                },
              })}
              onClick={() => navigator(href)}
              className={isRouteMatched(pathname, href) ? "active" : ""}
            >
              <ListItemText primary={primary} />
            </MenuItem>
          ))}
        </Box>
      </>
      <>
        <Typography
          noWrap
          sx={(theme) => ({
            fontWeight: "600",
            padding: "0 2rem",
            [theme.breakpoints.down(991)]: {
              padding: "0 1rem",
            },
          })}
          component="h1"
        >
          Workspace Settings
        </Typography>
        <Box sx={{ py: "8px" }}>
          {workspaceSettings.map(({ id, primary, href }) => {
            return (
              <MenuItem
                key={id}
                sx={(theme) => ({
                  py: "12px",
                  px: "2rem",
                  [theme.breakpoints.down(991)]: {
                    px: "1rem",
                  },
                  "&.active": {
                    backgroundColor: "#e6ebf5",
                    color: "#7269ef",
                  },
                })}
                onClick={() => navigator(href)}
                className={isRouteMatched(pathname, href) ? "active" : ""}
              >
                <ListItemText primary={primary} />
              </MenuItem>
            );
          })}
        </Box>
      </>
      <>
        <Typography
          noWrap
          sx={(theme) => ({
            fontWeight: "600",
            padding: "0 2rem",
            [theme.breakpoints.down(991)]: {
              padding: "0 1rem",
            },
          })}
          component="h1"
        >
          Organization Settings
        </Typography>
        <Box sx={{ py: "8px" }}>
          {organizationSettings.map(({ id, primary, href }) => (
            <MenuItem
              key={id}
              sx={(theme) => ({
                py: "12px",
                px: "2rem",
                [theme.breakpoints.down(991)]: {
                  px: "1rem",
                },
                "&.active": {
                  backgroundColor: "#e6ebf5",
                  color: "#7269ef",
                },
              })}
              onClick={() => navigator(href)}
              className={isRouteMatched(pathname, href) ? "active" : ""}
            >
              <ListItemText primary={primary} />
            </MenuItem>
          ))}
        </Box>
      </>
    </Box>
  );
}

export default SettingLinks;
