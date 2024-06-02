import React from 'react';
import { Oval } from 'react-loader-spinner';

const Loader = () => {
  return (
    <div className="flex justify-center items-center h-screen bg-gray-900">
      <Oval color="#00BFFF" height={80} width={80} />
    </div>
  );
};

export default Loader;
