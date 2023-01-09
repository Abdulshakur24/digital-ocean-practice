import { useLocation, useNavigate } from "react-router-dom";
import { Box } from "@mui/material";

import {
  RiDashboardLine,
  RiMessage3Line,
  RiContactsLine,
  // RiBroadcastLine,
  // RiFlowChart,
  // RiBarChartFill,
  RiSettings2Line,
} from "react-icons/ri";
import WorkSpaceMenu from "./WorkSpaceMenu";
import ProfileMenu from "./ProfileMenu";
import { isRouteMatched } from "src/utils/helper";

const links = [
  { id: 1, name: "Dashboard", href: "/", icon: RiDashboardLine },
  { id: 2, name: "Messages", href: "/messages", icon: RiMessage3Line },
  { id: 3, name: "Contacts", href: "/contacts", icon: RiContactsLine },
  // { id: 4, name: "Broadcast", href: "/broadcast", icon: RiBroadcastLine },
  // { id: 5, name: "Workflow", href: "/workflows", icon: RiFlowChart },
  // { id: 6, name: "Reports", href: "/reports", icon: RiBarChartFill },
  { id: 7, name: "Settings", href: "/settings", icon: RiSettings2Line },
];

function Sidebar() {
  const location = useLocation();
  const navigator = useNavigate();

  return (
    <Box
      sx={{
        "&::-webkit-scrollbar": {
          display: "none",
        },
      }}
      className={`max-w-[75px] overflow-y-auto transition-all duration-300 w-full shadow-lg hidden sm:block fixed top-0 left-0 bottom-0 z-40 bg-white select-none `}
    >
      <div className="flex flex-col justify-between h-full gap-[3rem]">
        <header
          className={` transition-all pt-[2.125rem]  pb-0 flex items-center`}
        >
          <WorkSpaceMenu />
        </header>
        <div className="flex flex-col justify-between flex-grow gap-6 ">
          <div>
            {links.map(({ id, icon: Icon, href }) => {
              return (
                <Box
                  key={id}
                  className={`border-r-[0px] pt-[20px] pb-[25px] flex items-center justify-center transition-all  duration-300 px-2  cursor-pointer ${
                    isRouteMatched(location.pathname, href)
                      ? "bg-[#7269ef]"
                      : ""
                  } `}
                  onClick={() => navigator(href)}
                >
                  <Icon
                    fontSize={"1.5rem"}
                    className={` ${
                      isRouteMatched(location.pathname, href)
                        ? "fill-[white]"
                        : "fill-[#878a92]"
                    }`}
                  />
                </Box>
              );
            })}
          </div>
        </div>
        <div>
          <div className="px-2 justify-self-end pb-[34px]">
            <ProfileMenu />
          </div>
        </div>
      </div>
    </Box>
  );
}

export default Sidebar;
