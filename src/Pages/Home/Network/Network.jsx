import React from 'react';
import { FaUsers } from 'react-icons/fa6';
import { FaLocationDot } from 'react-icons/fa6';
import { MdOutlineBloodtype } from 'react-icons/md';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';

const Network = () => {
  const axiosSecure = useAxiosSecure();

  const { data: users = [] } = useQuery({
    queryKey: ['allUsers'],
    queryFn: async () => {
      const res = await axiosSecure.get('/allUsers');
      return res.data;
    },
  });

  const { data: upozilas = [] } = useQuery({
    queryKey: ['upozilas'],
    queryFn: async () => {
      const res = await axiosSecure.get(`${import.meta.env.VITE_API_URL}/upozila`);
      return res.data;
    },
  });

  const { data: divisions = [] } = useQuery({
    queryKey: ['divisions'],
    queryFn: async () => {
      const res = await axiosSecure.get(`${import.meta.env.VITE_API_URL}/divisions`);
      return res.data;
    },
  });

  return (
    <div className="py-16">
      <div className="container mx-auto text-center">
        <h1 className="text-4xl font-bold text-[#1A237E] mb-10">We're a network of</h1>
        <div className="flex flex-wrap justify-around">
          <div className="flex flex-col items-center mb-8 w-full sm:w-1/2 md:w-1/3 lg:w-1/4">
            <FaUsers className="text-red-700" size={140} />
            <span className="mt-4 text-xl font-medium">{users.length} Donors</span>
          </div>
          <div className="flex flex-col items-center mb-8 w-full sm:w-1/2 md:w-1/3 lg:w-1/4">
            <FaLocationDot className="text-red-700" size={140} />
            <span className="mt-4 text-xl font-medium">
              {divisions.length} Divisions & <br /> {upozilas.length} Upazilas
            </span>
          </div>
          <div className="flex flex-col items-center mb-8 w-full sm:w-1/2 md:w-1/3 lg:w-1/4">
            <MdOutlineBloodtype className="text-red-700" size={140} />
            <span className="mt-4 text-xl font-medium">8 Blood Groups</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Network;
