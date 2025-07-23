"use client";

import { useState } from "react";
import CustomSelectWithSearch from "../components/CustomSelectWithSearch";

const Page = () => {
  const [selected, setSelected] = useState(null);
  const [options, setOptions] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleSearch = async (searchTerm) => {
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      setOptions([
        { value: "1", label: "Apple" },
        { value: "2", label: "Banana" },
        { value: "3", label: "Orange" },
      ]);
      setIsLoading(false);
    }, 500);
  };

  return (
    <CustomSelectWithSearch
      options={options}
      value={selected}
      onChange={setSelected}
      placeholder="Select a fruit"
      searchPlaceholder="Search fruits..."
      isLoading={isLoading}
      onSearch={handleSearch}
      className="w-64"
    />
  );
};

export default Page;