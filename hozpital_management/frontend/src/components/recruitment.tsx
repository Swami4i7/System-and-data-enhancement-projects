import { motion } from 'framer-motion';

const recruitments = [
    { position: 'Nurse', openings: 5 },
    { position: 'Surgeon', openings: 2 },
  ];

const Recruitments = () => {
    return (
      <motion.div
        className="w-full lg:w-1/2 bg-white p-6 rounded-lg shadow-md"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
      >
        <h2 className="text-xl font-bold text-gray-800">Recruitments</h2>
        <div className="mt-4 space-y-4">
          {recruitments.map((job, index) => (
            <div key={index} className="text-gray-600">
              <strong>{job.position}:</strong> {job.openings} Openings
            </div>
          ))}
        </div>
      </motion.div>
    );
  };
  
  export default Recruitments;
  