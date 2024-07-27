"use client";

import {Navbar, NavbarContent, Button, Input, Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, User, NavbarItem} from "@nextui-org/react";
import { BellRing, CircleUserRound, LogOut } from "lucide-react";
import Image from 'next/image';
import { useEffect, useState } from "react";



const Topbar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [currentPath, setCurrentPath] = useState("");

  useEffect(() => {
    setCurrentPath(window.location.pathname);
  }, []);
  

    return (
        <div className="lg:flex gap-5 justify-between px-5 py-3">
          <div className="">
            <h1 className="font-semibold text-xl">Welcome Dear!</h1>
            <p className="text-sm">Here’s what’s happening with your activity today.</p>
          </div>

            <div className="flex w-full max-w-sm items-center space-x-2 lg:my-1 md:my-1 my-5">
              <Input type="email" placeholder="Email" />
              <Button type="submit">Search</Button>
            </div>

            <div className="flex items-center">
                  <Dropdown>
                    <DropdownTrigger>
                      <Button 
                        variant="bordered" 
                        className="border-none"
                      >
                        <BellRing className="h-[40px] w-[40px]"></BellRing>
                      </Button>
                    </DropdownTrigger>
                    <DropdownMenu aria-label="Static Actions">
                      <DropdownItem key="new" className="flex">
                        <h1 className="text-2xl mb-2 font-semibold">Notifications</h1>
                        <hr />
                      </DropdownItem>
                      <DropdownItem key="new" className="flex">
                      <div className="flex gap-1">
                      <CircleUserRound className="h-[35px] w-[35px]"></CircleUserRound>
                      <div>
                        <p className="px-2 font-semibold">New User: <span className="font-normal"> A new user has applied.</span></p>
                        <p className="pl-2 text-blue-900">11.22 AM</p>
                      </div>
                      </div>
                      </DropdownItem>
                      <DropdownItem key="delete" className="flex">
                      <div className="flex gap-1">
                      <CircleUserRound className="h-[35px] w-[35px]"></CircleUserRound>
                      <div>
                        <p className="px-2 font-semibold">New Info: <span className="font-normal"> A user has medical issues!.</span></p>
                        <p className="pl-2 text-blue-900">22 hours age</p>
                      </div>
                      </div>
                      </DropdownItem>
                    </DropdownMenu>
                  </Dropdown>
      
                  <Dropdown>
                      <DropdownTrigger>
                        <User   
                          name=""
                          description=""
                          avatarProps={{
                            src: "https://i.ibb.co/vqqBpX6/programmer.png"
                          }}
                        />                         
                      </DropdownTrigger>
                    <DropdownMenu aria-label="Static Actions" className="p-2">
                      <DropdownItem key="new">
                        <div className="flex gap-3">
                        <CircleUserRound className="h-[25px] w-[25px]"></CircleUserRound>
                        <p className="font-semibold">Profile</p>
                        </div>   
                      </DropdownItem>
                      <DropdownItem key="new">
                          <div className="flex gap-3 mt-2">
                          <LogOut className="h-[25px] w-[25px]"></LogOut>
                          <p className="font-semibold">Logout</p>
                          </div>
                      </DropdownItem>
                    </DropdownMenu>
                  </Dropdown>           
            </div>

        </div>
    );
};

export default Topbar;