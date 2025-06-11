'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import PatientTable from '@/components/patient-table';
import AddPatientModal from '@/components/patient-modal';
import ViewPatientDetailsModal from '@/components/patient-view';
import DeletePatientModal from '@/components/patient-delete';
import { Button } from '@/components/ui/button';
import Layout from './layout';
import api from '@/app/utils/axios';
import { getCookie } from 'cookies-next';
import { checkAuth } from '@/utils/auth';
import EditPatientDialog from './patient-edit';

interface Patient {
  patient_id: number;
  first_name: string;
  last_name: string;
  email: string;
  doctor: {
    first_name: string;
    last_name: string;
  };
  MedicalRecords?: MedicalRecord[];
}

interface Doctor {
  doctor_id: number;
  first_name: string;
  last_name: string;
}

interface MedicalRecord {
  record_id: number;
  description: string;
  created_at: string;
}

const PatientPage = () => {
  const [patients, setPatients] = useState<Patient[]>([]);
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [selectedPatient, setSelectedPatient] = useState<Patient | null>(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const router = useRouter();

  useEffect(() => {
    fetchPatients();
    fetchDoctors();
  }, []);

  // useEffect(() => {
  //   if (!checkAuth()) {
  //     router.push('/login'); 
  //   }
  // }, [router]);

  const fetchPatients = async () => {
    try {
      const token = getCookie('authToken');
      const response = await axios.get('http://localhost:3001/api/patients', {
        headers: { Authorization: `Bearer ${token}` },
        withCredentials: true,
      });
      setPatients(response.data as Patient[]);
    } catch (error) {
      console.error("Error fetching patients:", error);
    }
  };

  const fetchDoctors = async () => {
    try {
      const token = getCookie('authToken');
      const response = await axios.get('http://localhost:3001/api/doctors', {
        headers: { Authorization: `Bearer ${token}` },
        withCredentials: true,
      });
      setDoctors(response.data as Doctor[]);
    } catch (error) {
      console.error("Error fetching doctors:", error);
    }
  };

  const handleViewPatient = (patientId: number) => {
    router.push(`/dashboard/patients/${patientId}`);
  };

  const handleAddPatient = async (newPatient: { first_name: string; last_name: string; email: string; doctor_id: number }) => {
    try {
      const token = getCookie('authToken');
      await axios.post('http://localhost:3001/api/patients', newPatient, {
        headers: { Authorization: `Bearer ${token}` },
        withCredentials: true,
      });
      fetchPatients();
    } catch (error) {
      console.error("Error adding patient:", error);
    }
  };

  const handleEditPatient = async (updatedPatient: Patient) => {
    try {
      const token = getCookie('authToken');
      await api.put(`http://localhost:3001/api/patients/${updatedPatient.patient_id}`, updatedPatient, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        withCredentials: true,
      });
      fetchPatients(); 
      setIsEditModalOpen(false); // Close the edit modal after updating
    } catch (error) {
      console.error('Error updating patient:', error);
    }
  };

  const handleDeletePatient = async () => {
    if (selectedPatient) {
      try {
        const token = getCookie('authToken');
        await axios.delete(`http://localhost:3001/api/patients/${selectedPatient.patient_id}`, {
          headers: { Authorization: `Bearer ${token}` },
          withCredentials: true,
        });
        fetchPatients();
        setIsDeleteModalOpen(false);
      } catch (error) {
        console.error("Error deleting patient:", error);
      }
    }
  };

  return (
    <Layout>
      <div className="p-6">
        <div className="flex justify-end mb-4">
          <Button onClick={() => setIsAddModalOpen(true)} className="bg-blue-900 text-white">
            Add Patient
          </Button>
        </div>

        {/* Patient Table */}
        <PatientTable
          patients={patients}
          onView={(patient) => handleViewPatient(patient.patient_id)}
          onDelete={(patient) => {
            setSelectedPatient(patient);
            setIsDeleteModalOpen(true);
          }}
          onEdit={(patient) => {
            setSelectedPatient(patient);
            setIsEditModalOpen(true);
          }}
        />

        {/* Modals */}
        <AddPatientModal
          isOpen={isAddModalOpen}
          onClose={() => setIsAddModalOpen(false)}
          onSubmit={handleAddPatient}
          doctors={doctors}
        />
        <EditPatientDialog
          isOpen={isEditModalOpen}
          onClose={() => setIsEditModalOpen(false)}
          patient={selectedPatient || { patient_id: 0, first_name: '', last_name: '', email: '', doctor_id: 0 }}
          onSubmit={handleEditPatient}
          doctors={doctors}
        />
        <DeletePatientModal
          isOpen={isDeleteModalOpen}
          onClose={() => setIsDeleteModalOpen(false)}
          onDelete={handleDeletePatient}
        />
      </div>
    </Layout>
  );
};

export default PatientPage;
