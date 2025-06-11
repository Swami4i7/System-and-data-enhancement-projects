import { motion } from 'framer-motion';

const departments = [
    { name: 'Patients', count: 120 },
    { name: 'Departments', count: 8 },
    { name: 'Appointments', count: 34 },
  ];
  
  const DepartmentOverview = () => {
    return (
      <motion.div
        className="w-full bg-white p-6 rounded-lg shadow-md"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
      >
        <h2 className="text-xl font-bold text-gray-800">Department Overview</h2>
        <div className="mt-4 grid grid-cols-3 gap-4">
          {departments.map((department, index) => (
            <div key={index} className="text-center">
              <h3 className="text-lg font-bold text-gray-700">{department.name}</h3>
              <p className="text-gray-500">{department.count} Entries</p>
            </div>
          ))}
        </div>
      </motion.div>
    );
  };
  
  export default DepartmentOverview;
  