import { TFormData } from "@/types";

   // Validate fields
   export const validateFields = (step: number, formData: TFormData, setErrors: any) => {
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
      } else if (!/^01\d{9}$/.test(formData.phone)) {
        errors.phone = "Please enter a valid phone number, start with 01 and the digit is 11";
      }
    } else if (step === 2) {
      if (!formData.departureDate) errors.departureDate = "Departure date is required";
      if (!formData.returnDate) errors.returnDate = "Return date is required";
      if (!formData.accommodation) errors.accommodation = "Accommodation is required";
      if (!formData.specialRequests) errors.specialRequests = "Special Requests is required";
    } else if (step === 3) {
      // Changed error message to boolean false instead of string
      // if (!formData.isHealthDeclaration) errors.isHealthDeclaration = false;
      if (!formData.emergencyContact) {
        errors.emergencyContact = "Emergency Contact is required";
      } else if (!/^01\d{9}$/.test(formData.emergencyContact)) {
        errors.emergencyContact = "Please enter a valid number, start with 01 and the digit is 11";
      }
      if (!formData.medicalConditions) errors.medicalConditions = "Medical conditions are required";
    }

    setErrors(errors);
    return Object.keys(errors).length === 0;
  };