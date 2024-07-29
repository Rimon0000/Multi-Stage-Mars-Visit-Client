"use client";

import { TPropsUserId } from "@/types";
import { Button } from "@nextui-org/button";
import {
  Checkbox,
  DatePicker,
  Input,
  Select,
  SelectItem,
  Textarea,
} from "@nextui-org/react";
import React, { useEffect, useState } from "react";
import { parseDate, DateValue } from "@internationalized/date";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

// Accommodation data
export const accommodationPreferences = [
  { key: "Martian Base", label: "Martian Base" },
  { key: "Space Hotel", label: "Space Hotel" },
];

const EditForm = ({ params }: { params: TPropsUserId }) => {
  const [userData, setUserData] = useState<any>(null);
  const router = useRouter();

  //fetch updated data
  useEffect(() => {
    const fetchUserData = async () => {
      const res = await fetch(
        `https://multi-stage-mars-visit-server.vercel.app/api/user/${params?.UserId}`
      );
      const user = await res.json();
      setUserData(user.data);
    };
    fetchUserData();
  }, [params]);

  //handle update
  const handleUpdate = async (e: any) => {
    e.preventDefault();

    const form = e.target;
    const name = form.name.value;
    const birthOfDate = form.birthOfDate.value;
    const nationality = form.nationality.value;
    const email = form.email.value;
    const phone = form.phone.value;
    const departureDate = form.departureDate.value;
    const returnDate = form.returnDate.value;
    const accommodation = form.accommodation.value;
    const specialRequests = form.specialRequests.value;
    const isHealthDeclaration = form.isHealthDeclaration.checked;
    const emergencyContact = form.emergencyContact.value;
    const medicalConditions = form.medicalConditions.value;

    const formData = {
      name,
      birthOfDate,
      nationality,
      email,
      phone,
      departureDate,
      returnDate,
      accommodation,
      specialRequests,
      isHealthDeclaration,
      emergencyContact,
      medicalConditions,
    };

    try {
      await fetch(
        `https://multi-stage-mars-visit-server.vercel.app/api/user/${userData._id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );
      toast.success("Your user information is Updated!");
      router.push("/applicants");
    } catch (error) {
      // Handle error
      console.error("Error updating user:", error);
    }
  };

  // Convert a JavaScript Date to DateValue
  const convertToDateValue = (date: Date): DateValue => {
    return parseDate(date.toISOString().split("T")[0]);
  };

  if (!userData) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1 className="text-2xl font-bold text-center">Update Your Info</h1>

      <div className="px-10 py-5">
        <form onSubmit={handleUpdate}>
          <h2 className="text-xl font-semibold mb-3">
            -- Personal Information
          </h2>

          <div className="lg:flex md:flex items-center gap-5">
            <div className="lg:w-[50%] md:w-[50%]">
              <Input
                type="text"
                label="Name"
                name="name"
                className="text-slate-950"
                defaultValue={userData?.name}
                placeholder="Write your Name"
              />
            </div>
            <div className="lg:w-[50%] md:w-[50%] my-3">
              <DatePicker
                label="Birth date"
                name="birthOfDate"
                defaultValue={convertToDateValue(
                  new Date(userData?.birthOfDate)
                )}
                className="text-slate-950"
              />
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-3 mb-5">
            <div className="">
              <Input
                type="text"
                label="Nationality"
                name="nationality"
                className="text-slate-950"
                defaultValue={userData?.nationality}
                placeholder="Nationality"
              />
            </div>
            <div className="">
              <Input
                type="email"
                label="Email"
                name="email"
                className="text-slate-950"
                defaultValue={userData?.email}
                placeholder="Enter your email"
              />
            </div>
            <div className="">
              <Input
                type="number"
                label="Phone"
                name="phone"
                className="text-slate-950"
                defaultValue={userData?.phone}
                placeholder="Enter your Phone"
              />
            </div>
          </div>

          <h2 className="text-xl font-semibold mb-3">-- Travel Preferences</h2>
          <div className="lg:flex md:flex items-center gap-5">
            <div className="lg:w-[50%] md:w-[50%]">
              <DatePicker
                label="Departure Date"
                name="departureDate"
                defaultValue={convertToDateValue(
                  new Date(userData?.departureDate)
                )}
                className="text-slate-950"
              />
            </div>
            <div className="lg:w-[50%] md:w-[50%] my-3">
              <DatePicker
                label="Return Date"
                name="returnDate"
                defaultValue={convertToDateValue(
                  new Date(userData?.returnDate)
                )}
                className="text-slate-950"
              />
            </div>
          </div>

          <div className="lg:flex md:flex items-center gap-5">
            <Select
              className="lg:w-[50%] md:w-[50%]"
              label="Favorite Accommodation"
              variant="bordered"
              placeholder="Select an Accommodation"
              name="accommodation"
              selectedKeys={
                userData?.accommodation ? [userData.accommodation] : []
              }
            >
              {accommodationPreferences.map((accommodationPreference) => (
                <SelectItem
                  key={accommodationPreference.key}
                  value={accommodationPreference.key}
                >
                  {accommodationPreference.label}
                </SelectItem>
              ))}
            </Select>
            <div className="lg:w-[50%] md:w-[50%] my-3">
              <Textarea
                name="specialRequests"
                label="Special Requests"
                placeholder="Special Requests or Preferences"
                className="text-slate-950"
                defaultValue={userData?.specialRequests}
              />
            </div>
          </div>

          <h2 className="text-xl font-semibold mb-3">-- Health and Safety</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-3 mb-3">
            <div className="">
              <Checkbox
                name="isHealthDeclaration"
                defaultSelected={userData?.isHealthDeclaration}
              >
                Health Declaration
              </Checkbox>
            </div>
            <div className="">
              <Input
                type="number"
                name="emergencyContact"
                label="Emergency Contact"
                className="text-slate-950"
                defaultValue={userData?.emergencyContact}
                placeholder="Enter your Emergency Contact"
              />
            </div>
            <div className="">
              <Textarea
                name="medicalConditions"
                label="Medical Conditions"
                placeholder="Any Medical Conditions"
                className="text-slate-950"
                defaultValue={userData?.medicalConditions}
              />
            </div>
          </div>
          <div className="lg:flex md:flex justify-between mt-8">
            <Button type="submit" color="primary" variant="bordered">
              Submit
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditForm;
