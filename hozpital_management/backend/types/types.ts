// types/index.ts
export interface DoctorAttributes {
    doctor_id: number;
    first_name: string;
    last_name: string;
    email: string;
    department_id: number;
  }
  
  export interface PatientAttributes {
    patient_id: number;
    first_name: string;
    last_name: string;
    email: string;
    doctor_id: number;
  }
  
  export interface DepartmentAttributes {
    department_id: number;
    department_name: string;
    location: string;
  }
  
  export interface AppointmentAttributes {
    appointment_id: number;
    patient_id: number;
    doctor_id: number;
    appointment_date: Date;
    status: string;
  }
  
  export interface MedicalRecordAttributes {
    record_id: number;
    patient_id: number;
    description: string;
    created_at: Date;
  }
  
export interface UserCredentialsAttributes {
    user_id: number;
    username: string;
    email: string;
    password: string;
    role: string;
  }
  
  export interface TokenPayload {
    username: string;
    email: string;
    role: string;
    exp: number;  
  }
  
  export interface AuthToken {
    token: string;  
    expiresIn: number; 
  }