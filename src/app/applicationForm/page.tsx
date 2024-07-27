"use client";

import { Image } from '@nextui-org/image';
import { Button, Checkbox, DatePicker, Input, Select, SelectItem, Textarea } from '@nextui-org/react';
import { MoveLeft, MoveRight } from 'lucide-react';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import { TFormData } from '@/types';
import { validateFields } from '@/components/validate/validate';

// Accommodation data
export const accommodationPreferences = [
  {key: "Martian Base", label: "Martian Base"},
  {key: "Space Hotel", label: "Space Hotel"},
];

const ApplicationForm = () => {
   // Step
   const [step, setStep] = useState(() => {
    const savedStep = localStorage.getItem('currentStep');
    return savedStep ? parseInt(savedStep, 10) : 1;
  });

   // Initial form data state
   const initialFormData: TFormData = {
    name: "",
     birthOfDate: "",
     nationality: "",
     email: "",
     phone: "",
     departureDate: "",
     returnDate: "",
     accommodation: "",
     specialRequests: "",
     isHealthDeclaration: false,
     emergencyContact: "",
     medicalConditions: "",
  };

   // Date states
  const [birthOfDate, setBirthOfDate] = useState(null);
   const [departureDate, setDepartureDate] = useState(null);
   const [returnDate, setReturnDate] = useState(null);

   // Error state
  const [errors, setErrors] = useState<Partial<TFormData>>({});
   // Select or accommodation state
   const [value, setValue] = useState<string>("");
   // Form state
   const [formData, setFormData] = useState<TFormData>(initialFormData)
 
   // Save step in localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('currentStep', step.toString());
  }, [step])
 
   // Handle input change
   const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
     const { name, value, type, checked } = e.target;
     setFormData(prevState => ({
       ...prevState,
       [name]: type === 'checkbox' ? checked : value
     }));
   };
 
   // Handle select change
   const handleSelectionValueChange = (e: any) => {
     const value = e.target.value;
     setValue(value);
     setFormData(prevState => ({
       ...prevState,
       accommodation: value
     }));
   };
 
   // Get and update all data from local storage
   useEffect(() => {
     const savedFormData = JSON.parse(localStorage.getItem(`formDataStage${step}`) || '{}');
     setFormData(prevState => ({ ...prevState, ...savedFormData }));
   }, [step]);
 
   // Handle date field changes
   const handleDateChange = (name: string, date: any) => {
     const jsDate = new Date(date.year, date.month - 1, date.day);
     // Update formData state
     setFormData(prevState => ({
       ...prevState,
       [name]: jsDate,
     }));

     const updatedFormData = {
       ...formData,
       [name]: jsDate,
     };
     localStorage.setItem(`formDataStage${step}`, JSON.stringify(updatedFormData));
   };

 
   // Handle next stage
   const handleNext = () => {
     if(validateFields(step, formData, setErrors)){
     localStorage.setItem(`formDataStage${step}`, JSON.stringify(formData));
     setStep(step + 1);
     }
   };
 
   // Handle previous stage
   const handlePrevious = () => {
     localStorage.setItem(`formDataStage${step}`, JSON.stringify(formData));
     setStep(step - 1);
   };
 
   // Handle form submission
   const handleSubmit = async () => {
     if(validateFields(step, formData, setErrors)){
      try {
        // Save current stage data to localStorage before collecting all stages' data
        localStorage.setItem(`formDataStage${step}`, JSON.stringify(formData));
        let allFormData = {};
  
        // Collect all stages of form data
        for (let i = 1; i <= 3; i++) {
          const savedFormData = JSON.parse(localStorage.getItem(`formDataStage${i}`) || '{}');
          allFormData = { ...allFormData, ...savedFormData };
        }
        await axios.post('http://localhost:5000/api/user', allFormData);

        // Clear localStorage data, step and reset form data
        for (let i = 1; i <= 3; i++) {
          localStorage.removeItem(`formDataStage${i}`);
        }
        localStorage.removeItem('currentStep');
        setFormData(initialFormData);
        // Alert success message
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Your work has been saved",
          showConfirmButton: false,
          timer: 1500
        });
      } catch (error) {
        // If error
        alert('Error submitting application');
      }
     }
   };

  return (
    <div>
      <div className=' flex items-center justify-center mx-auto place-content-center mb-4'>
        <h1 className='rounded-full px-[14px] py-1 text-xl font-bold text-center border-1 bg-blue-500 text-white'>1</h1>
        <div className="h-2 w-1/5 rounded-lg bg-default-200"></div>
        <h1 className='rounded-full px-[12px] py-1 text-xl font-bold text-center border-1 bg-blue-500 text-white'>2</h1>
        <div className="h-2 w-1/5 rounded-lg bg-default-200"></div>
        <h1 className='rounded-full px-[12px] py-1 text-xl font-bold text-center border-1 bg-blue-500 text-white'>3</h1>
      </div>

      <div className='lg:flex md:flex justify-between gap-10 px-10'>
      <div className='lg:w-[40%] mt-1'>
        <Image
          width={400}
          className='max-h-[486px]'
          alt="NextUI hero Image"
          src="https://i.ibb.co/h9vmXNp/form-image.jpg"
        />
      </div>
      <div className='lg:w-[60%] border px-10 py-7 shadow-2xl rounded-md lg:mt-1 md:mt-1 mt-8'>
        {step === 1 && (
          <form>
            <h2 className='text-2xl font-semibold'>Personal Information</h2>
            <div className="mb-3 mt-5">
              <Input type="text" label="Name" name="name" className='text-slate-950' placeholder="Write your Name" value={formData.name} onChange={handleInputChange} required />
              {errors.name && <span className='text-red-600 text-xs'>{errors.name}</span>}
            </div>
            <div className="mb-3">
              <DatePicker
                label="Birth date"
                value={birthOfDate}
                onChange={(date: any) => {
                  setBirthOfDate(date);
                  handleDateChange('birthOfDate', date);
                }}
                className="text-slate-950"
              />
              {errors.birthOfDate && <span className='text-red-600 text-xs'>{errors.birthOfDate}</span>}
            </div>
            <div className="mb-3">
              <Input type="text" label="Nationality" name='nationality' className='text-slate-950' placeholder="Nationality" onChange={handleInputChange} value={formData.nationality} required />
              {errors.nationality && <span className='text-red-600 text-xs'>{errors.nationality}</span>}
            </div>
            <div className='flex gap-5'>
              <div className="w-[50%]">
                <Input type="email" label="Email" name="email" className='text-slate-950' placeholder="Enter your email" onChange={handleInputChange} value={formData.email} required />
                 {errors.email && <span className='text-red-600 text-xs'>{errors.email}</span>}
              </div>
              <div className="w-[50%]">
                <Input type="number" label="Phone" name="phone" className='text-slate-950' placeholder="Enter your Phone" onChange={handleInputChange} value={formData.phone} required />
                {errors.phone && <span className='text-red-600 text-xs'>{errors.phone}</span>}
              </div>
            </div>
            <div className='flex flex-end place-content-end mt-8'>
              <Button color="primary" variant="bordered" onClick={handleNext}>Next Step <MoveRight /></Button>
            </div>
          </form>
        )}

        {step === 2 && (
          <form>
            <h2 className='text-2xl font-semibold'>Travel Preferences</h2>
            <div className="mb-3 mt-5">
              <DatePicker
                label="Departure Date"
                value={departureDate}
                onChange={(date: any) => {
                  setDepartureDate(date);
                  handleDateChange('departureDate', date);
                }}
                className="text-slate-950"
              />
              {errors.departureDate && <span className='text-red-600 text-xs'>{errors.departureDate}</span>}
            </div>
            <div className="mb-3">
              <DatePicker
                label="Return Date"
                value={returnDate}
                onChange={(date: any) => {
                  setReturnDate(date);
                  handleDateChange('returnDate', date);
                }}
                className="text-slate-950"
              />
              {errors.returnDate && <span className='text-red-600 text-xs'>{errors.returnDate}</span>}
            </div>
            <Select
              label="Favorite Accommodation"
              variant="bordered"
              placeholder="Select an Accommodation"
              selectedKeys={[value]}
              className=""
              onChange={handleSelectionValueChange}
            >
              {accommodationPreferences.map((accommodationPreference) => (
                <SelectItem key={accommodationPreference.key}>
                  {accommodationPreference.label}
                </SelectItem>
              ))}
            </Select>
            {errors.accommodation && <span className='text-red-600 text-xs'>{errors.accommodation}</span>}

            <div className="my-3">
              <Textarea name="specialRequests" label="Special Requests" placeholder="Special Requests or Preferences" className='text-slate-950' onChange={handleInputChange} value={formData.specialRequests} required />
              {errors.specialRequests && <span className='text-red-600 text-xs'>{errors.specialRequests}</span>}
            </div>
            <div className='flex justify-between mt-8'>
              <Button onClick={handlePrevious} color="primary" variant="bordered">Previous Step <MoveLeft /></Button>
              <Button color="primary" variant="bordered" onClick={handleNext}>Next Step <MoveRight /></Button>
            </div>
          </form>
        )}

        {step === 3 && (
          <form>
            <h2 className='text-2xl font-semibold'>Health and Safety</h2>
            <div className="mb-3 mt-5 border p-3 rounded-2xl bg-slate-100">
              <Checkbox name="isHealthDeclaration" isSelected={formData.isHealthDeclaration} onChange={handleInputChange}>Health Declaration</Checkbox>
              {/* {errors.isHealthDeclaration && <span className='text-red-600 text-xs'>{errors.isHealthDeclaration}</span>} */}
            </div>
            <div className="mb-3">
              <Input type="number" name="emergencyContact" label="Emergency Contact" className='text-slate-950' placeholder="Enter your Emergency Contact" onChange={handleInputChange} value={formData.emergencyContact} required />
              {errors.emergencyContact && <span className='text-red-600 text-xs'>{errors.emergencyContact}</span>}
            </div>
            <div className="my-3">
              <Textarea name="medicalConditions" label="Medical Conditions" placeholder="Any Medical Conditions" className='text-slate-950' onChange={handleInputChange} value={formData.medicalConditions} required />
              {errors.medicalConditions && <span className='text-red-600 text-xs'>{errors.medicalConditions}</span>}
            </div>
            <div className='flex justify-between mt-8'>
              <Button onClick={handlePrevious} color="primary" variant="bordered">Previous Step <MoveLeft /></Button>
              <Button type='button' color="primary" variant="bordered" onClick={handleSubmit}>Submit</Button>
            </div>
          </form>
        )}
      </div>
    </div>

    </div>
  );
};

export default ApplicationForm;
