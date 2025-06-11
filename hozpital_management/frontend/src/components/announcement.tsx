import { motion } from 'framer-motion';

const announcements = [
    'Hospital Policy Update: COVID-19 Guidelines',
    'New Department Opening: Oncology',
    'Staff Meeting at 3:00 PM Today',
  ];
  
  const RecentAnnouncements = () => {
    return (
      <motion.div
        className="w-full lg:w-1/3 bg-white p-6 rounded-lg shadow-md"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
      >
        <h2 className="text-xl font-bold text-gray-800">Recent Announcements</h2>
        <ul className="mt-4 space-y-2">
          {announcements.map((announcement, index) => (
            <li key={index} className="text-gray-600">
              {announcement}
            </li>
          ))}
        </ul>
      </motion.div>
    );
  };
  
  export default RecentAnnouncements;
  