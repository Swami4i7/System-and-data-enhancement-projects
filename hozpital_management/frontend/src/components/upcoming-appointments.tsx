import { motion } from 'framer-motion';

const appointments = [
  { time: '09:00 AM', patient: 'John Doe', type: 'Consultation' },
  { time: '10:30 AM', patient: 'Alice Smith', type: 'Check-up' },
  { time: '12:00 PM', patient: 'Mike Johnson', type: 'Surgery' },
];

const UpcomingAppointments = () => {
  return (
    <motion.div
      className="w-full lg:w-1/3 bg-white p-6 rounded-lg shadow-md"
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
    >
      <h2 className="text-xl font-bold text-gray-800">Today's Appointments</h2>
      <div className="mt-4 space-y-4">
        {appointments.map((appointment, index) => (
          <div key={index} className="flex items-center space-x-4">
            <span className="text-gray-500">{appointment.time}</span>
            <span className="text-gray-800">{appointment.patient}</span>
            <span className="text-gray-600">{appointment.type}</span>
          </div>
        ))}
      </div>
    </motion.div>
  );
};

export default UpcomingAppointments;
