import React, { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { Button } from '@/components/ui/button';
import api from '@/app/utils/axios';
import { getCookie } from 'cookies-next';
import { motion } from 'framer-motion';

interface Department {
  department_name: string;
}

interface Appointment {
  appointment_id: number;
  appointment_date: string;
  status: string;
}

interface Doctor {
  doctor_id: number;
  first_name: string;
  last_name: string;
  email: string;
  department: Department;
  appointments: Appointment[];
}

const DoctorDetailPage = () => {
  const router = useRouter();
  const params = useParams();
  const doctor_id = params?.doctor_id as string;
  const [doctor, setDoctor] = useState<Doctor | null>(null);

  useEffect(() => {
    if (doctor_id) {
      fetchDoctorDetails(doctor_id);
    }
  }, [doctor_id]);

  const fetchDoctorDetails = async (id: string) => {
    try {
      const token = getCookie('authToken');
      const response = await api.get(`/api/doctors/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
        withCredentials: true,
      });
      setDoctor(response.data as Doctor);
    } catch (error) {
      console.error('Error fetching doctor details:', error);
    }
  };

  if (!doctor) {
    return <p>Loading...</p>;
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="w-full max-w-4xl mx-auto bg-white shadow-md rounded-lg p-6"
    >
      <div className="mb-6">
        <h1 className="text-2xl font-semibold">
          Dr. {doctor.first_name} {doctor.last_name}
        </h1>
        <p><strong>Email:</strong> {doctor.email}</p>
        <p><strong>Department:</strong> {doctor.department?.department_name || 'No Department Assigned'}</p>
      </div>

      <h2 className="text-xl font-semibold mb-4">Appointments</h2>
      {doctor.appointments.length > 0 ? (
        <table className="w-full table-auto border-collapse">
          <thead>
            <tr>
              <th className="border px-4 py-2">Appointment ID</th>
              <th className="border px-4 py-2">Date</th>
              <th className="border px-4 py-2">Status</th>
            </tr>
          </thead>
          <tbody>
            {doctor.appointments.map((appointment) => (
              <tr key={appointment.appointment_id}>
                <td className="border px-4 py-2">{appointment.appointment_id}</td>
                <td className="border px-4 py-2">{appointment.appointment_date}</td>
                <td className="border px-4 py-2">{appointment.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No Appointments Available</p>
      )}

      <div className="flex justify-end mt-6">
        <Button onClick={() => router.back()} variant="outline">
          Back
        </Button>
      </div>
    </motion.div>
  );
};

export default DoctorDetailPage;
