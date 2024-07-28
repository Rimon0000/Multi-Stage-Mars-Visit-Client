// Define the type for form data
export type TFormData = {
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

  export type TUser = {
    data: any;
    _id: string;
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
  }

  export type TUserId = {
    _id: string;
  }


export  type TPropsUserId = {
    UserId: any;
    params: {
      UserId: string;
    }
  }