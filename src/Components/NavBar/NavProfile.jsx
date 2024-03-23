import React, { createElement, useState } from "react";
import {
  Avatar,
  Button,
  Menu,
  MenuHandler,
  MenuItem,
  MenuList,
  Typography,
} from "@material-tailwind/react";
import { CgProfile } from "react-icons/cg";
import { LiaSignOutAltSolid } from "react-icons/lia";
import { MdOutlineDashboard } from "react-icons/md";
import { MdOutlineConnectWithoutContact } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import useAuth from "../../hooks/useAuth";
const NavProfile = ({ navbarColor }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const closeMenu = () => setIsMenuOpen(false);
  const { user, logOut } = useAuth();
  const navigate = useNavigate();
  const profileMenuItems = [
    {
      label: "Sign Out",
      icon: <LiaSignOutAltSolid />,
    },

  ];
  const handleAction = (input) => {
    if (input === "My Profile") {
      navigate("/dashboard/profile");
    } else if (input === "Dashboard") {
      navigate("/dashboard/profile");
    } else if (input === 'Connected With') {
      navigate("/dashboard/connected_with")
    } else if (input === "Sign Out") {
      const toastId = toast.loading("Logged Outing...");
      logOut()
        .then(() => {
          toast.success("Logged Out Successfully!", { id: toastId });
        })
        .catch((error) => {
          toast.error(error.code, { id: toastId });
        });
    }
    closeMenu();
  };
  return (
    <div className="">
      <Menu open={isMenuOpen} handler={setIsMenuOpen} placement="bottom-end">
        <MenuHandler>
          <Button
            variant="text"
            color="blue-gray"
            className="flex items-center gap-1 rounded-full overflow-hidden  py-0.5 pr-2 pl-0.5 lg:ml-auto">
            <Avatar
              variant="circular"
              size="sm"
              alt="tania andrew"
              className={`border ${isMenuOpen && "border-primary"
                } w-9 h-9 xs:w-12 xs:h-12 p-0.5 rounded-full`}
              src={user?.photoURL}
            />
          </Button>
        </MenuHandler>
        <MenuList className={`p-1 px-3 z-40 ${!navbarColor ? 'bg-white border-primary text-black' : 'bg-primary border-white text-white'} transition-all duration-300`}>
          <div className={`border  w-max rounded-full p-[2px] mx-auto mt-1 ${!navbarColor ? 'border-primary ' : ' border-white '}`}>
            <img
              className="w-10 h-10 rounded-full"
              src={user?.photoURL}
              alt=""
            />
          </div>
          <div>
            <p className="text-sm font-semibold text-center">
              {user?.displayName}
            </p>
          </div>
          <hr className={`${!navbarColor ? 'border-black' : ' border-white'} my-1 border-[1.3px]`} />
          {profileMenuItems.map(({ label, icon }, key) => {
            const isLastItem = key === profileMenuItems.length - 1;
            return (
              <MenuItem
                key={label}
                onClick={() => handleAction(label)}
                className={`flex items-center gap-2  rounded ${!navbarColor ? 'hover:bg-primary/30 focus:bg-primary/30 active:bg-primary/30' : 'hover:bg-white focus:bg-white active:bg-white'} ${isLastItem && `${navbarColor ?  "bg-white text-black" : "bg-primary/20 "}`}`}>
                <p className={`w-8 h-8 flex justify-center items-center text-xl  `}>
                  {icon}
                </p>
                <Typography
                  as="span"
                  variant="small"
                  className="font-normal"
                  color={isLastItem ? "red" : "inherit"}>
                  {label}
                </Typography>
              </MenuItem>
            );
          })}
        </MenuList>
      </Menu>
    </div>
  );
};

export default NavProfile;
