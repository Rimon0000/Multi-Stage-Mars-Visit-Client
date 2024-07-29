"use client";

import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@nextui-org/react";
import { CircleUserRound, Heart, Radar } from "lucide-react";
import moment from "moment";
import React, { useEffect, useState } from "react";

// Define TypeScript types
type TUser = {
  _id: string;
  name: string;
  birthOfDate: string;
  nationality: string;
  email: string;
};

type THealthInfo = {
  trueCount: number;
  falseCount: number;
};

type TApiResponse<T> = {
  data: T;
};

const Home = () => {
  const [users, setUsers] = useState<TUser[] | null>(null);
  const [healthInfo, setHealthInfo] = useState<THealthInfo | null>(null);
  const [lastUser, setLastUser] = useState<TUser | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch all users
        const res = await fetch(
          "https://multi-stage-mars-visit-server.vercel.app/api/users"
        );
        const userData: TApiResponse<TUser[]> = await res.json();
        setUsers(userData?.data);

        // Fetch health info
        const healthRes = await fetch(
          "https://multi-stage-mars-visit-server.vercel.app/api/users/health"
        );
        const healthData: THealthInfo = await healthRes.json();
        setHealthInfo(healthData);

        // Fetch last inserted user
        const lastUserRes = await fetch(
          "https://multi-stage-mars-visit-server.vercel.app/api/lastUser"
        );
        const lastUserData: TApiResponse<TUser> = await lastUserRes.json();
        setLastUser(lastUserData?.data);
      } catch (error) {
        console.error("Failed to fetch data:", error);
      }
    };
    fetchData();
  }, []);

  if (!users) {
    return (
      <Button color="primary" isLoading>
        Loading
      </Button>
    );
  }

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mb-5 mt-2">
        <div>
          <Card className="">
            <CardHeader></CardHeader>
            <CardBody className="flex items-center justify-between gap-5 px-10">
              <CircleUserRound className="p-3 w-[60px] h-[60px] border-2 rounded-full shadow-2xl"></CircleUserRound>
              <div className="text-xl font-semibold">
                <h2 className="mb-2">Total Users Info</h2>
                <p className="text-center">{users?.length}</p>
              </div>
            </CardBody>
            <CardFooter className="">
              <p>Thank you all for showing your interest!</p>
            </CardFooter>
          </Card>
        </div>
        <div>
          <Card className="">
            <CardHeader></CardHeader>
            <CardBody className="flex items-center justify-between gap-5 px-10">
              <Radar className="p-3 w-[60px] h-[60px] border-2 rounded-full shadow-2xl"></Radar>
              <div className="text-xl font-semibold">
                <h2 className="mb-2">Users with health issues</h2>
                <p className="text-center">{healthInfo?.trueCount}</p>
              </div>
            </CardBody>
            <CardFooter className="">
              <p className="text-center">Your well-being is our priority</p>
            </CardFooter>
          </Card>
        </div>
        <div>
          <Card className="">
            <CardHeader></CardHeader>
            <CardBody className="flex items-center justify-between gap-5 px-10">
              <Heart className="p-3 w-[60px] h-[60px] border-2 rounded-full shadow-2xl"></Heart>
              <div className="text-xl font-semibold">
                <h2 className="mb-2">Users with no health issues</h2>
                <p className="text-center">{healthInfo?.falseCount}</p>
              </div>
            </CardBody>
            <CardFooter className="">
              <p>Keep maintaining your good health.</p>
            </CardFooter>
          </Card>
        </div>
      </div>

      <div className="mt-12">
        <h1 className="font-semibold mb-5">Last Applicant Info</h1>
        <Table aria-label="Our all users">
          <TableHeader>
            <TableColumn>#</TableColumn>
            <TableColumn>NAME</TableColumn>
            <TableColumn>BIRTH DATE</TableColumn>
            <TableColumn>NATIONALITY</TableColumn>
            <TableColumn>NATIONALITY</TableColumn>
          </TableHeader>
          <TableBody>
            <TableRow key={lastUser?._id}>
              <TableCell>1</TableCell>
              <TableCell className="font-semibold">{lastUser?.name}</TableCell>
              <TableCell className="font-semibold">
                <p>
                  {moment(new Date(`${lastUser?.birthOfDate}`)).format(
                    "DD MMMM YYYY"
                  )}
                </p>
              </TableCell>
              <TableCell className="font-semibold">
                {lastUser?.nationality}
              </TableCell>
              <TableCell className="font-semibold">{lastUser?.email}</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default Home;
