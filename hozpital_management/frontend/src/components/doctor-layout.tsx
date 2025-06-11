'use client';

import { useState, useEffect } from 'react';
import DoctorTable from '@/components/doctor-table';
import AddDoctorModal from '@/components/doctor-modal';
import DeleteDoctorModal from '@/components/doctor-delete';
import { Button } from '@/components/ui/button';
import Layout from '@/components/layout';
import api from '@/app/utils/axios';
import { getCookie } from 'cookies-next';
import { useRouter } from 'next/navigation';
import { checkAuth } from '@/utils/auth';
import EditDoctorDialog from './doctor-edit';

interface Doctor {
  doctor_id: number;
  first_name: string;
  last_name: string;
  email: string;
  department: {
    department_name: string;
  };
  appointments?: Appointment[];
}

interface Department {
  department_id: number;
  department_name: string;
}

interface Appointment {
  appointment_id: number;
  appointment_date: string;
  patient: any;
}

const DoctorPage = () => {
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [departments, setDepartments] = useState<Department[]>([]);
  const [selectedDoctor, setSelectedDoctor] = useState<Doctor | null>(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const router = useRouter();

  useEffect(() => {
    fetchDoctors();
    fetchDepartments();
  }, []);

  // useEffect(() => {
  //   if (!checkAuth()) {
  //     router.push('/login'); 
  //   }
  // }, [router]);

  const fetchDoctors = async () => {
    try {
      const token = getCookie('authToken');
      const response = await api.get('http://localhost:3001/api/doctors', {
        headers: { Authorization: `Bearer ${token}` },
        withCredentials: true,
      });
      setDoctors(response.data as Doctor[]);
    } catch (error) {
      console.error('Error fetching doctors:', error);
    }
  };

  const fetchDepartments = async () => {
    try {
      const token = getCookie('authToken');
      const response = await api.get('http://localhost:3001/api/departments', {
        headers: { Authorization: `Bearer ${token}` },
        withCredentials: true,
      });
      setDepartments(response.data as Department[]);
    } catch (error) {
      console.error('Error fetching departments:', error);
    }
  };

  const handleAddDoctor = async (doctorData: { first_name: string; last_name: string; email: string; department_id: string }) => {
    try {
      const token = getCookie('authToken');
      await api.post('http://localhost:3001/api/doctors', doctorData, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        withCredentials: true,
      });
      fetchDoctors();
    } catch (error) {
      console.error('Error adding doctor:', error);
    }
  };

  const handleEditDoctor = async (
    doctorId: number,
    doctorData: { first_name: string; last_name: string; email: string; department_id: string }
  ) => {
    try {
      const token = getCookie('authToken');
      await api.put(`http://localhost:3001/api/doctors/${doctorId}`, doctorData, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        withCredentials: true,
      });
      fetchDoctors();
    } catch (error) {
      console.error('Error updating doctor:', error);
    }
  };

  const handleDeleteDoctor = async () => {
    if (selectedDoctor) {
      try {
        const token = getCookie('authToken');
        await api.delete(`http://localhost:3001/api/doctors/${selectedDoctor.doctor_id}`, {
          headers: { Authorization: `Bearer ${token}` },
          withCredentials: true,
        });
        fetchDoctors();
        setIsDeleteModalOpen(false);
      } catch (error) {
        console.error('Error deleting doctor:', error);
      }
    }
  };

  const handleViewDoctor = (doctor_id: number) => {
    router.push(`/dashboard/doctor/${doctor_id}`);
  };

  return (
    <Layout>
      <div className="p-6">
        <div className="flex justify-end mb-4">
          <Button onClick={() => setIsAddModalOpen(true)} className="bg-blue-900 text-white">
            Add Doctor
          </Button>
        </div>

        <DoctorTable
          doctors={doctors}
          onView={(doctor) => handleViewDoctor(doctor.doctor_id)}
          onDelete={(doctor) => {
            setSelectedDoctor(doctor);
            setIsDeleteModalOpen(true);
          }}
          onEdit={(doctor) => {
            setSelectedDoctor(doctor);
            setIsEditModalOpen(true);
          }}
        />

        {/* Modals */}
        <AddDoctorModal
          isOpen={isAddModalOpen}
          onClose={() => setIsAddModalOpen(false)}
          onSubmit={handleAddDoctor}
          departments={departments}
        />
        <EditDoctorDialog
          isOpen={isEditModalOpen}
          onClose={() => setIsEditModalOpen(false)}
          onSubmit={handleEditDoctor}
          departments={departments}
          doctor={selectedDoctor || { doctor_id: 0, first_name: '', last_name: '', email: '', department_id: 0 }}
        />


        <DeleteDoctorModal
          isOpen={isDeleteModalOpen}
          onClose={() => setIsDeleteModalOpen(false)}
          onDelete={handleDeleteDoctor}
        />
      </div>
    </Layout>
  );
};

export default DoctorPage;
