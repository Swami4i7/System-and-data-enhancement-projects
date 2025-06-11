import React from 'react';
import SignUpForm from '../../components/signup-form'; 

const SignUpPage: React.FC = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <SignUpForm /> 
    </div>
  );
};

export default SignUpPage;
