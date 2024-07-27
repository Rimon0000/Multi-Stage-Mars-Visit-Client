"use client";

import { Image } from '@nextui-org/image';
import { Button, Checkbox, DatePicker, Input, Select, SelectItem, Textarea } from '@nextui-org/react';
import { MoveLeft, MoveRight } from 'lucide-react';
import React, { useState, useEffect } from 'react';
import axios from 'axios';

// Accommodation data
export const accommodationPreferences = [
  {key: "Martian Base", label: "Martian Base"},
  {key: "Space Hotel", label: "Space Hotel"},
];

// Define the type for form data
type TFormData = {
  name: string;
  birthOfDate: string;
  nationality: string;
  email: string;
  phone: string;
  departureDate: string;
  returnDate: string;
  accommodation: string;
  specialRequests: string;
  isHealthDeclaration: boolean;
  emergencyContact: string;
  medicalConditions: string;
};

const ApplicationForm = () => {
   // Step
   const [step, setStep] = useState(() => {
    const savedStep = localStorage.getItem('currentStep'); // Read saved step from localStorage
    return savedStep ? parseInt(savedStep, 10) : 1;
  });

   // Date states
  const [birthOfDate, setBirthOfDate] = useState(null);
   const [departureDate, setDepartureDate] = useState(null);
   const [returnDate, setReturnDate] = useState(null);

   // Error state
  const [errors, setErrors] = useState<Partial<TFormData>>({});
 
   // Select state
   const [value, setValue] = useState<string>("");
   // Form state
   const [formData, setFormData] = useState<TFormData>({
     name: "",
     birthOfDate: "",
     nationality: "",
     email: "",
     phone: "",
     departureDate: "",
     returnDate: "",
     accommodation: value,
     specialRequests: "",
     isHealthDeclaration: false,
     emergencyContact: "",
     medicalConditions: "",
   });
 
   // Save step in localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('currentStep', step.toString()); // Save step to localStorage
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
 
     // Update localStorage separately to avoid circular reference
     const updatedFormData = {
       ...formData,
       [name]: jsDate,
     };
     localStorage.setItem(`formDataStage${step}`, JSON.stringify(updatedFormData));
   };


   // Validate fields
  const validateFields = () => {
    let errors: Partial<TFormData> = {};
    if (step === 1) {
      if (!formData.name) errors.name = "Name is required";
      if (!formData.birthOfDate) errors.birthOfDate = "Birth date is required";
      if (!formData.nationality) errors.nationality = "Nationality is required";
      if (!formData.email) {
        errors.email = "Email is required";
      } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
        errors.email = "Please enter a valid email";
      }
      if (!formData.phone) {
        errors.phone = "Phone is required";
      } else if (!/^\d+$/.test(formData.phone)) {
        errors.phone = "Please enter a valid phone number";
      }
    } else if (step === 2) {
      if (!formData.departureDate) errors.departureDate = "Departure date is required";
      if (!formData.returnDate) errors.returnDate = "Return date is required";
      if (!formData.accommodation) errors.accommodation = "Accommodation is required";
      if (!formData.specialRequests) errors.specialRequests = "Special Requests is required";
    } else if (step === 3) {
      // Changed error message to boolean false instead of string
      if (!formData.isHealthDeclaration) errors.isHealthDeclaration = false;
      if (!formData.emergencyContact) errors.emergencyContact = "Emergency contact is required";
      if (!formData.medicalConditions) errors.medicalConditions = "Medical conditions are required";
    }

    setErrors(errors);
    return Object.keys(errors).length === 0;
  };
 
   // Handle next stage
   const handleNext = () => {
     if(validateFields()){
      // Save current stage data to localStorage
     localStorage.setItem(`formDataStage${step}`, JSON.stringify(formData));
     // Move to the next step
     setStep(step + 1);
     }
   };
 
   // Handle previous stage
   const handlePrevious = () => {
     // Save current stage data to localStorage
     localStorage.setItem(`formDataStage${step}`, JSON.stringify(formData));
     // Move to the previous step
     setStep(step - 1);
   };
 
   // Handle form submission
   const handleSubmit = async () => {
     if(validateFields()){
      try {
        // Save current stage data to localStorage before collecting all stages' data
        localStorage.setItem(`formDataStage${step}`, JSON.stringify(formData));
  
        let allFormData = {};
  
        // Collect all stages of form data
        for (let i = 1; i <= 3; i++) {
          const savedFormData = JSON.parse(localStorage.getItem(`formDataStage${i}`) || '{}');
          allFormData = { ...allFormData, ...savedFormData };
        }
  
        // Debug: Log allFormData before sending
        console.log('All Form Data:', allFormData);
  
        // Send all Form Data to your server
        await axios.post('http://localhost:5000/api/user', allFormData);
  
        // Alert success message
        alert('Application submitted successfully');
      } catch (error) {
        // If error
        alert('Error submitting application');
      }
     }
   };

  return (
    <div className='lg:flex md:flex justify-between gap-10 px-10'>
      <div className='lg:w-[40%]'>
        <Image
          width={400}
          className='h-[470px]'
          alt="NextUI hero Image"
          src="https://i.ibb.co/h9vmXNp/form-image.jpg"
        />
      </div>
      <div className='lg:w-[60%] border p-10 shadow-2xl rounded-md'>
        {step === 1 && (
          <form>
            <h2 className='text-2xl font-semibold mt-5'>Personal Information</h2>
            <div className="mb-3 mt-5">
              <Input type="text" label="Name" name="name" className='text-slate-950' placeholder="Write your Name" value={formData.name} onChange={handleInputChange} required />
              {errors.name && <span className='text-red-600'>{errors.name}</span>}
            </div>
            <div className="mb-3">
              <DatePicker
                label="Birth date"
                value={birthOfDate}
                // defaultValue={(birthOfDate) => localStorage.getItem('birthOfDate', birthOfDate)}
                onChange={(date: any) => {
                  setBirthOfDate(date);
                  handleDateChange('birthOfDate', date);
                }}
                className="text-slate-950"
              />
              {errors.birthOfDate && <span className='text-red-600'>{errors.birthOfDate}</span>}
            </div>
            <div className="mb-3">
              <Input type="text" label="Nationality" name='nationality' className='text-slate-950' placeholder="Nationality" onChange={handleInputChange} value={formData.nationality} required />
              {errors.nationality && <span className='text-red-600'>{errors.nationality}</span>}
            </div>
            <div className='flex gap-5'>
              <div className="w-[50%]">
                <Input isRequired type="email" label="Email" isInvalid={true}
      errorMessage="Please enter a valid email" name="email" className='text-slate-950' placeholder="Enter your email" onChange={handleInputChange} value={formData.email} required />
              </div>
              <div className="w-[50%]">
                <Input type="number" label="Phone" name="phone" className='text-slate-950' placeholder="Enter your Phone" onChange={handleInputChange} value={formData.phone} required />
                {errors.phone && <span className='text-red-600'>{errors.phone}</span>}
              </div>
            </div>
            <div className='flex flex-end place-content-end mt-8'>
              <Button color="primary" variant="bordered" onClick={handleNext}>Next Step <MoveRight /></Button>
            </div>
          </form>
        )}

        {step === 2 && (
          <form>
            <h2 className='text-2xl font-semibold mt-5'>Travel Preferences</h2>
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
              {errors.departureDate && <span className='text-red-600'>{errors.departureDate}</span>}
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
              {errors.returnDate && <span className='text-red-600'>{errors.returnDate}</span>}
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
            {errors.accommodation && <span className='text-red-600'>{errors.accommodation}</span>}

            <div className="my-3">
              <Textarea name="specialRequests" label="Special Requests" placeholder="Special Requests or Preferences" className='text-slate-950' onChange={handleInputChange} value={formData.specialRequests} required />
              {errors.specialRequests && <span className='text-red-600'>{errors.specialRequests}</span>}
            </div>
            <div className='flex justify-between mt-8'>
              <Button onClick={handlePrevious} color="primary" variant="bordered">Previous Step <MoveLeft /></Button>
              <Button color="primary" variant="bordered" onClick={handleNext}>Next Step <MoveRight /></Button>
            </div>
          </form>
        )}

        {step === 3 && (
          <form>
            <h2 className='text-2xl font-semibold mt-5'>Health and Safety</h2>
            <div className="mb-3 mt-5 border p-3 rounded-2xl bg-slate-100">
              <Checkbox name="isHealthDeclaration" isSelected={formData.isHealthDeclaration} onChange={handleInputChange}>Health Declaration</Checkbox>
              {errors.isHealthDeclaration && <span className='text-red-600'>{errors.isHealthDeclaration}</span>}
            </div>
            <div className="mb-3">
              <Input type="number" name="emergencyContact" label="Emergency Contact" className='text-slate-950' placeholder="Enter your Emergency Contact" onChange={handleInputChange} value={formData.emergencyContact} required />
              {errors.emergencyContact && <span className='text-red-600'>{errors.emergencyContact}</span>}
            </div>
            <div className="my-3">
              <Textarea name="medicalConditions" label="Medical Conditions" placeholder="Any Medical Conditions" className='text-slate-950' onChange={handleInputChange} value={formData.medicalConditions} required />
              {errors.medicalConditions && <span className='text-red-600'>{errors.medicalConditions}</span>}
            </div>
            <div className='flex justify-between mt-8'>
              <Button onClick={handlePrevious} color="primary" variant="bordered">Previous Step <MoveLeft /></Button>
              <Button type='button' color="primary" variant="bordered" onClick={handleSubmit}>Submit</Button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default ApplicationForm;
