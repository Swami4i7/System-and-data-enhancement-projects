'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import DepartmentTable from '@/components/department-table';
import AddDepartmentModal from '@/components/department-modal';
import { Button } from '@/components/ui/button';
import Layout from './layout';
import { getCookie } from 'cookies-next';
import { motion } from 'framer-motion';
import { checkAuth } from '@/utils/auth';

interface Department {
  department_id: number;
  department_name: string;
  location: string;
  doctors: Doctor[];
}

interface Doctor {
  doctor_id: number;
  first_name: string;
  last_name: string;
}

const DepartmentPage = () => {
  const [departments, setDepartments] = useState<Department[]>([]);
  const [selectedDepartment, setSelectedDepartment] = useState<Department | null>(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const router = useRouter();

  // useEffect(() => {
  //   if (!checkAuth()) {
  //     router.push('/login'); 
  //   }
  // }, [router]);
 
  useEffect(() => {
    fetchDepartments();
  }, []);

  const fetchDepartments = async () => {
    try {
      const token = getCookie('authToken');
      const response = await axios.get('http://localhost:3001/api/departments', {
        headers: { Authorization: `Bearer ${token}` },
        withCredentials: true,
      });
      setDepartments(response.data as Department[]);
    } catch (error) {
      console.error("Error fetching departments:", error);
    }
  };

  const handleViewDepartment = (departmentId: number) => {
    router.push(`/app/dashboard/department/${departmentId}`);
  };

  const handleAddDepartment = async (newDepartment: { department_name: string; location: string }) => {
    try {
      const token = getCookie('authToken');
      await axios.post('http://localhost:3001/api/departments', newDepartment, {
        headers: { Authorization: `Bearer ${token}` },
        withCredentials: true,
      });
      fetchDepartments();
      setIsAddModalOpen(false);
    } catch (error) {
      console.error("Error adding department:", error);
    }
  };

  const handleDeleteDepartment = async () => {
    if (selectedDepartment) {
      try {
        const token = getCookie('authToken');
        await axios.delete(`http://localhost:3001/api/departments/${selectedDepartment.department_id}`, {
          headers: { Authorization: `Bearer ${token}` },
          withCredentials: true,
        });
        fetchDepartments();
        setIsDeleteModalOpen(false);
      } catch (error) {
        console.error("Error deleting department:", error);
      }
    }
  };

  return (
    <Layout>
      <div className="p-6">
        <div className="flex justify-end mb-4">
          <Button onClick={() => setIsAddModalOpen(true)} className="bg-blue-900 text-white">
            Add Department
          </Button>
        </div>

        {/* Department Table */}
        <DepartmentTable
          departments={departments}
          onView={(department) => handleViewDepartment(department.department_id)}
          onDelete={(department) => {
            setSelectedDepartment(department);
            setIsDeleteModalOpen(true);
          }}
        />

        {/* Add Department Modal */}
        <AddDepartmentModal
          isOpen={isAddModalOpen}
          onClose={() => setIsAddModalOpen(false)}
          onSubmit={(data) => handleAddDepartment({ department_name: data.department_name, location: data.location })}
        />

        {/* Delete Confirmation Modal */}
        {isDeleteModalOpen && (
          <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50 z-50">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3 }}
              className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md"
            >
              <h2 className="text-lg font-semibold mb-4 text-gray-800">Delete Department</h2>
              <p className="mb-4 text-gray-600">
                Are you sure you want to delete the department{' '}
                <span className="font-semibold">{selectedDepartment?.department_name}</span>?
              </p>
              <div className="flex justify-end space-x-4">
                <Button variant="ghost" onClick={() => setIsDeleteModalOpen(false)} className="text-gray-700">
                  Cancel
                </Button>
                <Button onClick={handleDeleteDepartment} className="bg-red-600 text-white hover:bg-red-700">
                  Delete
                </Button>
              </div>
            </motion.div>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default DepartmentPage;
