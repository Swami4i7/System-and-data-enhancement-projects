import { motion } from 'framer-motion';

const reviews = [
    { patient: 'John Doe', review: 'Excellent service!' },
    { patient: 'Alice Smith', review: 'Highly professional staff.' },
  ];
  
const PatientReviews = () => {
    return (
      <motion.div
        className="w-full lg:w-1/2 bg-white p-6 rounded-lg shadow-md"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
      >
        <h2 className="text-xl font-bold text-gray-800">Patient Reviews</h2>
        <div className="mt-4 space-y-4">
          {reviews.map((review, index) => (
            <div key={index} className="text-gray-600">
              <strong>{review.patient}:</strong> {review.review}
            </div>
          ))}
        </div>
      </motion.div>
    );
  };

export default PatientReviews;
