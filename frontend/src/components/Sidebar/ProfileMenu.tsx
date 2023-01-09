import { Avatar, Badge, Box, MenuItem, Typography } from "@mui/material";
import { AnimatePresence, motion } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useOnClickOutSide, useToggle } from "src/hooks";
import { logout, updateProfileStatus } from "src/redux/slicers/userSlice";
import { AppDispatch, RootState } from "src/redux/store";
import {
  getBackendURL,
  getFirstOrTwoLettersFromName,
  statuses,
} from "src/utils/helper";

function ProfileMenu() {
  const { toggle, handleProfile } = useToggle();

  const ref = useOnClickOutSide(() => {
    if (toggle.sidebar.profile) {
      handleProfile();
    }
  });

  const { user } = useSelector((state: RootState) => state.userState);
  const dispatch: AppDispatch = useDispatch();

  const getStatusColor = (status: string) => {
    for (let i = 0; i < statuses.length; i++) {
      if (statuses[i].title === status) return statuses[i].color;
    }
    return {};
  };

  const navigator = useNavigate();

  return (
    <Box
      ref={ref}
      sx={(theme) => ({
        width: "100%",
        display: "flex",
        alignItems: "flex-end",
        justifyContent: "center",
        [theme.breakpoints.down(991)]: {
          // display: "none",
        },
      })}
    >
      <Avatar
        id="profile-button"
        onClick={() => handleProfile()}
        src={getBackendURL(`public/images/${user.profilePic}`)}
        sx={{
          width: "2rem",
          cursor: "pointer",
          height: "2rem",
        }}
        children={getFirstOrTwoLettersFromName(
          user.fName + user.lName ? " " + user.lName : ""
        )}
      />
      <AnimatePresence>
        {toggle.sidebar.profile && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
            className="fixed left-[calc(25px+60px)] bottom-[32px] w-[265px] h-[140px] bg-white shadow-lg"
          >
            <Box
              sx={{ display: "flex", flexDirection: "column", p: "8px 18px" }}
            >
              <Box
                sx={{
                  width: "100%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <Typography noWrap>{user.fName}</Typography>
                <Box
                  className="shadow"
                  sx={{
                    width: "80px",
                    display: "flex",
                    justifyContent: "flex-start",
                    alignItems: "center",
                    gap: "6px",
                    padding: "2px 16px",
                    borderRadius: "28px",
                    backgroundColor: "#f5f5f5",
                  }}
                >
                  <Badge
                    sx={{
                      ".MuiBadge-dot": {
                        backgroundColor: getStatusColor(user.status),
                      },
                    }}
                    variant="dot"
                  />
                  <Typography>{user.status}</Typography>
                </Box>
              </Box>
              <Typography noWrap sx={{ color: "gray" }}>
                {user.email}
              </Typography>
            </Box>
            <MenuItem
              onClick={() => {
                dispatch(
                  updateProfileStatus(
                    user.status === "Online" ? "Busy" : "Online"
                  )
                );
              }}
            >
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <Typography>Set myself as</Typography>
                <Typography component={"h1"} sx={{ ml: "5px" }}>
                  {user.status === "Online" ? "Busy" : "Online"}
                </Typography>
              </Box>
            </MenuItem>
            {/* <MenuItem onClick={() => history.push("/settings/notification")}>
            Notification
          </MenuItem> */}

            <MenuItem
              onClick={(e) => {
                //   handleProfileClick(e);
                handleProfile(false);
                dispatch(logout());
                navigator("/login");
              }}
            >
              <Typography component={"h1"} sx={{ ml: "5px" }}>
                Logout
              </Typography>
            </MenuItem>
          </motion.div>
        )}
      </AnimatePresence>
    </Box>
  );
}

export default ProfileMenu;
