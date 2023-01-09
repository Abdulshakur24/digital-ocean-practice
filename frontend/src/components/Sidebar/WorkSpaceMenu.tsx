import {
  Box,
  IconButton,
  MenuItem,
  TextField,
  Typography,
} from "@mui/material";
import {
  RiSearchLine,
  RiOrganizationChart,
  RiSettings3Fill,
} from "react-icons/ri";
import { useNavigate } from "react-router-dom";
import { useToggle, useOnClickOutSide } from "src/hooks";
import { AnimatePresence, motion } from "framer-motion";

function WorkSpaceMenu() {
  const { toggle, handleWorkspace } = useToggle();
  const navigator = useNavigate();

  const ref = useOnClickOutSide(() => {
    if (toggle.sidebar.workspace) {
      handleWorkspace();
    }
  });

  const organization: any[] = [
    {
      id: 1,
      name: "Organization 1",
    },
  ];

  const workspace: any[] = [
    {
      id: 1,
      name: "Workspace 1",
    },
  ];

  return (
    <Box
      ref={ref}
      sx={(theme) => ({
        width: "100%",
        display: "flex",
        alignItems: "flex-end",
        justifyContent: "center",
        position: "relative",
        [theme.breakpoints.down(991)]: {
          // display: "none",
        },
      })}
    >
      <Box
        onClick={() => handleWorkspace()}
        sx={{
          width: "33px",
          height: "33px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#7269ef",
          borderRadius: "100%",
          cursor: "pointer",
          color: "white",
        }}
      >
        <Typography fontSize={"1.2rem"} align="center" sx={{ color: "white" }}>
          {"-"}
        </Typography>
      </Box>
      <AnimatePresence>
        {toggle.sidebar.workspace && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
            className="fixed left-[calc(25px+60px)] top-[32px] w-[265px] h-[140px] bg-white shadow-lg"
          >
            <Box
              sx={{
                overflowY: "auto",
                height: "100%",
                scrollbarWidth: "thin",
                "&::-webkit-scrollbar": {
                  width: "8px",
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
              }}
            >
              <Box
                key={1}
                sx={{
                  display: "flex",
                  alignItems: "center",
                  flexDirection: "column",
                  padding: "12px",
                  height: "100%",
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: "0.5rem",
                    background: "rgba(0,0,0,.06)",
                    borderRadius: "4px 4px 0 0",
                  }}
                >
                  <TextField
                    variant="standard"
                    placeholder="Search Workspace"
                    sx={{
                      ".MuiInputBase-root": {
                        padding: "0 12px",
                      },
                      ".css-ye1uxp-MuiInputBase-root-MuiInput-root:after": {
                        borderBottom: "3px solid #7269ef",
                      },
                    }}
                    InputProps={{
                      endAdornment: (
                        <RiSearchLine style={{ color: "#9e9e9e" }} />
                      ),
                    }}
                  />
                </Box>

                {organization.map((org) => (
                  <Box
                    key={org.id}
                    sx={{
                      height: "100%",
                      display: "flex",
                      justifyContent: "center",
                      flexDirection: "column",
                      alignItems: "center",
                      width: "100%",
                    }}
                  >
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        width: "100%",
                        height: "100%",
                        justifyContent: "space-between",
                      }}
                    >
                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          gap: "8px",
                          justifyContent: "center",
                        }}
                      >
                        <RiOrganizationChart
                          color="#7269ef"
                          fontSize={"24px"}
                        />
                        <Typography
                          noWrap
                          component={"h1"}
                          sx={{ maxWidth: "144px" }}
                        >
                          {org.name}
                        </Typography>
                      </Box>
                      <IconButton
                        onClick={() => {
                          navigator("/settings/organization/general");
                          handleWorkspace();
                        }}
                      >
                        <RiSettings3Fill size={"18px"} />
                      </IconButton>
                    </Box>
                    {workspace.map((space) =>
                      org.id === space.id ? (
                        <MenuItem
                          key={space.id}
                          sx={{ width: "100%" }}
                          onClick={() => handleWorkspace()}
                        >
                          <Box
                            key={space.id}
                            sx={{
                              width: "100%",
                              display: "flex",
                              gap: "8px",
                              justifyContent: "flex-start",
                              alignItems: "center",
                            }}
                          >
                            <Typography
                              noWrap
                              component={"h2"}
                              sx={{ maxWidth: "144px", color: "#32325d" }}
                            >
                              {space.name}
                            </Typography>
                            {space.isDefault ? (
                              <Box
                                key={space.id}
                                sx={{
                                  width: "9px",
                                  height: "9px",
                                  backgroundColor: "#7269ef",
                                  borderRadius: "100%",
                                }}
                              />
                            ) : null}
                          </Box>
                        </MenuItem>
                      ) : null
                    )}
                  </Box>
                ))}
              </Box>
            </Box>
          </motion.div>
        )}
      </AnimatePresence>
    </Box>
  );
}

export default WorkSpaceMenu;
