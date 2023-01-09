import { LoadingButton } from "@mui/lab";
import {
  Avatar,
  Badge,
  Box,
  Button,
  Divider,
  MenuItem,
  TextField,
  Typography,
} from "@mui/material";
import { RiCameraFill } from "react-icons/ri";
import { useFormik } from "formik";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "src/redux/store";
import { AnimatePresence, motion } from "framer-motion";
import { useOnClickOutSide, useToggle } from "src/hooks";
import {
  updateProfileInfo,
  updateProfileStatus,
  updateProfilePic,
} from "src/redux/slicers/userSlice";
import * as Yup from "yup";
import moment from "moment";
import { getBackendURL, statuses } from "src/utils/helper";

function Profile() {
  const { user } = useSelector((state: RootState) => state.userState);
  const [showPhotoIcon, setShowPhotoIcon] = useState(false);
  const { toggle, handleProfileStatus } = useToggle();
  const dispatch: AppDispatch = useDispatch();

  const formik = useFormik({
    initialValues: {
      fName: user.fName,
      lName: user.lName,
      email: user.email,
    },
    onSubmit: async (values) => {
      dispatch(updateProfileInfo(values));
    },
    validationSchema: Yup.object({
      fName: Yup.string().min(2).required("required*"),
      lName: Yup.string().min(2),
      email: Yup.string().email("Invalid email address").required("required*"),
    }),
  });

  const ref = useOnClickOutSide(() => {
    if (toggle.pages.settings.status) {
      handleProfileStatus();
    }
  });

  const handleUpload = async (e: any) => {
    const formData = new FormData();
    formData.append("profileImage", e.target.files[0], e.target.files[0].name);
    dispatch(updateProfilePic(formData));
  };

  const getStatusColor = (status: string) => {
    for (let i = 0; i < statuses.length; i++) {
      if (statuses[i].title === status) return statuses[i].color;
    }
    return {};
  };

  const handleStatus = async (status: string) => {
    if (user.status === status) return;
    dispatch(updateProfileStatus(status));
    handleProfileStatus(false);
  };

  return (
    <Box
      sx={(theme) => ({
        padding: "24px",
        [theme.breakpoints.down(991)]: {
          padding: "16px",
        },
      })}
    >
      <Box className="flex items-center justify-between">
        <Box>
          <Typography
            width="100%"
            component={"h4"}
            fontSize="1.5rem"
            fontWeight={600}
          >
            Profile
          </Typography>
          <Typography
            color={"grey"}
            component={"h1"}
            fontSize="1"
            fontWeight={500}
          >
            Manage your profile and sign-in details.
          </Typography>
        </Box>
        <Typography
          className="self-end italic font-thin"
          color={"grey"}
          component={"h1"}
          fontSize="1"
        >
          Last update: {moment(user.updatedAt).fromNow()}
        </Typography>
      </Box>
      <Divider light sx={{ mt: "1rem" }} />

      <form onSubmit={formik.handleSubmit}>
        <Box
          sx={(theme) => ({
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-start",
            gap: "2rem",
            maxWidth: "740px",
            marginTop: "2em",
            ".MuiFormHelperText-root": {
              position: "absolute",
              right: 0,
              top: 0,
            },

            [theme.breakpoints.down(670)]: {
              alignItems: "center",
              flexDirection: "column",
            },
          })}
        >
          <Box
            sx={{
              width: "100%",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              gap: "20px",
            }}
          >
            <Box
              sx={{
                borderRadius: "100%",
                position: "relative",
                background: "white",
                overflow: "hidden",
              }}
              onMouseEnter={() => setShowPhotoIcon(() => true)}
              onMouseLeave={() => setShowPhotoIcon(() => false)}
            >
              <Avatar
                src={getBackendURL(`public/images/${user.profilePic}`)}
                alt={user.fName}
                sx={() => ({
                  width: "10rem",
                  height: "10rem",
                })}
                children={
                  <>
                    <Typography
                      sx={() => ({
                        fontSize: "7rem",
                        color: "white",
                      })}
                    >
                      {user.fName[0]}
                    </Typography>
                  </>
                }
              />
              <input
                style={{ display: "none" }}
                accept="image/*"
                onChange={handleUpload}
                id="contained-button-file"
                type="file"
              />
              <Box
                sx={(theme) => ({
                  height: "40px",
                  position: "absolute",
                  inset: "auto 0 0 0",
                  backgroundColor: "#00000066",
                  transition: "all 200ms ease-in-out",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  zIndex: showPhotoIcon ? "1" : "-1",
                  transform: showPhotoIcon
                    ? "translateY(0%)"
                    : "translateY(100%)",
                })}
              >
                <label
                  className="w-full h-full flex items-center justify-center"
                  style={{ cursor: "pointer" }}
                  htmlFor="contained-button-file"
                >
                  <RiCameraFill color="white" fontSize={"24px"} />
                </label>
              </Box>
            </Box>
            <Box
              ref={ref}
              sx={{
                position: "relative",
                width: "100%",
                maxWidth: "210px",
                backgroundColor: "#f0f0f0",
                gap: "1rem",
                color: "black",
              }}
            >
              <Button
                onClick={() => handleProfileStatus(true)}
                fullWidth
                sx={{
                  backgroundColor: "#f0f0f0",
                  gap: "1rem",
                  color: "black",
                }}
              >
                <Badge
                  variant="dot"
                  sx={{
                    ".MuiBadge-dot": {
                      backgroundColor: getStatusColor(user.status),
                    },
                  }}
                />
                {user.status}
              </Button>
              <AnimatePresence>
                {toggle.pages.settings.status && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.15 }}
                    className="shadow-lg absolute top-[36px] w-[210px]"
                  >
                    {statuses.map(({ id, title, color }) => (
                      <MenuItem key={id} onClick={() => handleStatus(title)}>
                        <Box
                          sx={{
                            display: "flex",
                            justifyContent: "flex-start",
                            alignItems: "center",
                            gap: "1rem",
                            padding: "0 0.5rem",
                          }}
                        >
                          <Badge
                            sx={{
                              ".MuiBadge-dot": {
                                backgroundColor: color,
                              },
                            }}
                            variant="dot"
                          />
                          <Typography>{title}</Typography>
                        </Box>
                      </MenuItem>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </Box>
          </Box>

          <Box
            sx={(theme) => ({
              display: "flex",
              flexDirection: "column",
              width: "100%",
              gap: "2rem",
            })}
          >
            <TextField
              fullWidth
              type="fName"
              variant="standard"
              id="fName"
              name="fName"
              label="First Name"
              value={formik.values.fName}
              onChange={formik.handleChange}
              error={formik.touched.fName && Boolean(formik.errors.fName)}
              // helperText={formik.touched.fName && formik.errors.fName}
            />

            <TextField
              fullWidth
              type="lName"
              variant="standard"
              id="lName"
              name="lName"
              label="Last Name"
              value={formik.values.lName}
              onChange={formik.handleChange}
              error={formik.touched.lName && Boolean(formik.errors.lName)}
              // helperText={formik.touched.lName && formik.errors.lName}
            />

            <TextField
              id="email"
              name="email"
              label="Email"
              variant="standard"
              value={formik.values.email}
              color="primary"
              onChange={formik.handleChange}
              error={formik.touched.email && Boolean(formik.errors.email)}
              // helperText={formik.touched.email && formik.errors.email}
            />

            <LoadingButton
              sx={{ maxWidth: "200px", alignSelf: "flex-end" }}
              type="submit"
              color="primary"
              variant="contained"
              size="small"
              // loading={isSubmitting}
              disabled={
                user.fName === formik.values.fName &&
                user.lName === formik.values.lName &&
                user.email === formik.values.email
              }
            >
              SAVE PROFILE
            </LoadingButton>
          </Box>
        </Box>
      </form>
    </Box>
  );
}

export default Profile;
