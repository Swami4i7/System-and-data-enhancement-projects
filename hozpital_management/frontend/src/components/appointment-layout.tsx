'use client';

import { useState, useEffect } from 'react';
import axios from 'axios';
import AppointmentTable from '@/components/appointment-table';
import AppointmentModal from '@/components/appointnment-modal';
import { Button } from '@/components/ui/button';
import api from '@/app/utils/axios';
import Layout from './layout';
import { getCookie } from 'cookies-next';
import { useRouter } from 'next/dist/client/components/navigation';
import { checkAuth } from '@/utils/auth';

interface Appointment {
  appointment_id: number;
  appointment_date: Date;
  status: string;
  doctor: { doctor_id: number; first_name: string; last_name: string };
  patient: { patient_id: number; first_name: string; last_name: string };
}

interface Doctor {
  doctor_id: number;
  first_name: string;
  last_name: string;
}

interface Patient {
  patient_id: number;
  first_name: string;
  last_name: string;
}

const AppointmentsPage = () => {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [patients, setPatients] = useState<Patient[]>([]);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  useEffect(() => {
    fetchAppointments();
    fetchDoctors();
    fetchPatients();
  }, []);
  
  // const router= useRouter();
  // useEffect(() => {
  //   if (!checkAuth()) {
  //     router.push('/login'); 
  //   }
  // }, [router]);

const fetchAppointments = async () => {
  try {
    const token = getCookie('authToken');
    const response = await api.get('/appointments/', {
      headers: { Authorization: `Bearer ${token}` },
      withCredentials: true,
    });
    console.log(response.data);
    const appointmentsData = response.data as Appointment[];
    console.log(appointmentsData);
    setAppointments(appointmentsData); 
  } catch (error) {
    console.error("Error fetching appointments:", error);
  }
};
const fetchDoctors = async () => {
  try {
    const token = getCookie('authToken');
    const response = await axios.get('http://localhost:3001/api/doctors', {
      headers: { Authorization: `Bearer ${token}` },
      withCredentials: true,
    });
    const doctorsData = response.data as Doctor[];
    console.log(doctorsData);
    setDoctors(doctorsData); 
  } catch (error) {
    console.error("Error fetching doctors:", error);
  }
};


const fetchPatients = async () => {
  try {
    const token = getCookie('authToken');
    const response = await api.get('/patients', {
      headers: { Authorization: `Bearer ${token}` },
      withCredentials: true,
    });
    const patientsData = response.data as Patient[];
    console.log(patientsData);
    setPatients(patientsData); 
  } catch (error) {
    console.error("Error fetching patients:", error);
  }
};


const handleAddAppointment = async (appointmentData:{ appointment_date: Date; doctor_id: number; patient_id: number }) => {
  try {
    const token = getCookie('authToken');
    const response = await api.post('/appointments', appointmentData, {
      headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
      withCredentials: true,
    });
    if (response.status === 201) {
      console.log("Appointment added:", response.data);
      fetchAppointments(); 
    }
  } catch (error) {
    console.error("Error adding appointment:", error);
  }
};



const handleApproveAppointment = async (appointmentdata:{ appointment_id: number; status: string }) => {
  try {
    const token = getCookie('authToken');
    const response = await api.put(`/appointments/${appointmentdata.appointment_id}`,{ status: 'Approved' },{
      headers: { Authorization: `Bearer ${token}` },
      withCredentials: true,
    });
    if (response.status === 200) {
      console.log("Appointment approved:", response.data);
      fetchAppointments(); 
    }
  } catch (error) {
    console.error("Error approving appointment:", error);
  }
};


const handleRejectAppointment = async (appointment: { appointment_id: number; status: string }) => {
  try {
    const token = getCookie('authToken');
    const response = await api.put(`/appointments/${appointment.appointment_id}`, { status: 'Rejected' }, {
      headers: { Authorization: `Bearer ${token}` },
      withCredentials: true,
    });
    if (response.status === 200) {
      console.log("Appointment rejected:", response.data);
      fetchAppointments();      
    }
  } catch (error) {
    console.error("Error rejecting appointment:", error);
  }
};


  return (
    <Layout>
    <div className="p-6">
      {/* Add Appointment Button */}
      <div className="flex justify-end mb-4">
        <Button onClick={() => setIsAddModalOpen(true)} className="bg-blue-900 text-white">
          Add Appointment
        </Button>
      </div>

      {/* Appointment Table */}
      <AppointmentTable
        appointments={appointments}
        onApprove={handleApproveAppointment}
        onReject={handleRejectAppointment}
      />

      {/* Add Appointment Modal */}
      <AppointmentModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onSubmit={handleAddAppointment}
        doctors={doctors}
        patients={patients}
      />
    </div>
    </Layout>
  );
};

export default AppointmentsPage;
