"use client";

import {Navbar, NavbarBrand, NavbarMenuToggle, NavbarMenu, NavbarContent, NavbarItem, Link, Button, Input, Dropdown, DropdownTrigger, DropdownMenu, DropdownItem} from "@nextui-org/react";
import Image from 'next/image';
import { useEffect, useState } from "react";



const Topbar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [currentPath, setCurrentPath] = useState("");

  useEffect(() => {
    setCurrentPath(window.location.pathname);
  }, []);
  
  

    return (
        <div className="lg:flex justify-between p-3">
          <div className="">
            <h1 className="font-semibold text-xl">Welcome Dear!</h1>
            <p className="text-sm">Here’s what’s happening with your activity today.</p>
          </div>

            <div className="flex w-full max-w-sm items-center space-x-2 lg:my-1 md:my-1 my-5">
              <Input type="email" placeholder="Email" />
              <Button type="submit">Search</Button>
            </div>
          
            <div>
            <Navbar>
            <NavbarContent justify="end" className="hidden sm:flex gap-4">

            <Dropdown>
              <DropdownTrigger>
                <Button 
                  variant="bordered" 
                >
                  Open Menu
                </Button>
              </DropdownTrigger>
              <DropdownMenu aria-label="Static Actions">
                <DropdownItem key="new">New file</DropdownItem>
                <DropdownItem key="delete" className="text-danger" color="danger">
                  Delete file
                </DropdownItem>
              </DropdownMenu>
            </Dropdown>

            <NavbarItem isActive={currentPath === "/dashboard/all-products"}>
                <Link href="/dashboard/all-products" color="foreground">Dashboard</Link>
            </NavbarItem>
          </NavbarContent>
            </Navbar>
            </div>
     
            
        </div>
    );
};

export default Topbar;