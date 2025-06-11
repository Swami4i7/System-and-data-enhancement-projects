import { motion } from 'framer-motion';

const DoctorDetails = () => {
  return (
    <motion.div
      className="w-full lg:w-1/3 bg-white p-6 rounded-lg shadow-md"
      initial={{ opacity: 0, x: -50 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
    >
      <h2 className="text-2xl font-bold text-gray-800">Dr. Jane Doe</h2>
      <p className="text-gray-600">Cardiologist</p>
      <p className="text-gray-500">Phone: (123) 456-7890</p>
      <p className="text-gray-500">Email: janedoe@hospital.com</p>
      <p className="text-gray-500">Location: Wing B, Room 302</p>
    </motion.div>
  );
};

export default DoctorDetails;
