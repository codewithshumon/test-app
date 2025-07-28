'use client'

import React from 'react';
import SearchSelect from '../components/SearchSelect';

const users = [
  {
    userId: 10025,
    username: "1tjwct6ztk",
    firstName: "John",
    middleName: "Diddly",
    lastName: "Doe",
    image: 'https://plus.unsplash.com/premium_photo-1742321407558-cadb1de040cd?q=80&w=1171&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
  },
  {
    userId: 10015,
    username: "1tjwct4ztk",
    firstName: "John",
    middleName: "Diddly",
    lastName: "Doe",
    image: 'https://plus.unsplash.com/premium_photo-1661313655989-14cb976c4381?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
  },
  {
    userId: 10035,
    username: "1tjwc8tztk",
    firstName: "John",
    middleName: "Diddly",
    lastName: "Doe",
    image: 'https://plus.unsplash.com/premium_photo-1705019732183-80c19681fdba?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
  }
];

const Page = () => {
  const handleSelect = (user) => {
    console.log('Selected user:', user);
    // You can do more with the selected user here
  };

  return (
    <div className="max-w-md mx-auto mt-8">
      <h2 className="text-xl font-semibold mb-4">Search Users (Data as Props)</h2>
      <SearchSelect 
        data={users} 
        onSelect={handleSelect} 
        placeholder="Search by name or username..."
      />
    </div>
  );
};

export default Page;