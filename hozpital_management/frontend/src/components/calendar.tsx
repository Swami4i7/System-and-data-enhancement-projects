import { Calendar } from '@/components/ui/calendar'; 
import { motion } from 'framer-motion';

const ScheduledMeetings = () => {
  return (
    <motion.div
      className="w-full lg:w-2/3 bg-white p-6 rounded-lg shadow-md"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
    >
      <h2 className="text-xl font-bold text-gray-800">Scheduled Meetings</h2>
      <Calendar className="mt-4" />
    </motion.div>
  );
};

export default ScheduledMeetings;
