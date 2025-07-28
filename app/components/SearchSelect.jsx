import React, { useState, useEffect, useRef } from 'react';
import { FiSearch, FiChevronDown, FiX } from 'react-icons/fi';

const SearchSelect = ({
  data: propData,
  fetchData,
  onSelect,
  placeholder = 'Search users...',
  className = '',
}) => {
  const [inputValue, setInputValue] = useState('');
  const [filteredData, setFilteredData] = useState([]);
  const [allData, setAllData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const loadData = async () => {
      if (propData) {
        setAllData(propData);
        setFilteredData(propData);
      } else if (fetchData) {
        setIsLoading(true);
        try {
          const data = await fetchData();
          setAllData(data);
          setFilteredData(data);
        } catch (error) {
          console.error('Error fetching data:', error);
        } finally {
          setIsLoading(false);
        }
      }
    };

    loadData();
  }, [propData, fetchData]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleInputChange = (e) => {
    const value = e.target.value;
    setInputValue(value);

    if (value === '') {
      setFilteredData(allData);
    } else {
      const filtered = allData.filter(
        (user) =>
          user.firstName.toLowerCase().includes(value.toLowerCase()) ||
          user.middleName.toLowerCase().includes(value.toLowerCase()) ||
          user.lastName.toLowerCase().includes(value.toLowerCase()) ||
          user.username.toLowerCase().includes(value.toLowerCase())
      );
      setFilteredData(filtered);
    }
  };

  const handleSelect = (user) => {
    setSelectedUser(user);
    onSelect(user);
    setIsOpen(false);
    setInputValue('');
  };

  const clearSelection = () => {
    setSelectedUser(null);
    setInputValue('');
    setIsOpen(true);
  };

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className={`relative ${className}`} ref={dropdownRef}>
      {selectedUser ? (
        <div className="flex items-center justify-between p-3 border border-gray-200 rounded-lg shadow-sm">
          <div className="flex items-center space-x-3">
            <img
              src={selectedUser.image}
              alt={selectedUser.username}
              className="w-10 h-10 rounded-full object-cover"
            />
            <div>
              <p className="font-medium text-gray-900">
                {selectedUser.firstName} {selectedUser.middleName} {selectedUser.lastName}
              </p>
              <p className="text-sm text-gray-500">@{selectedUser.username}</p>
            </div>
          </div>
          <button
            onClick={clearSelection}
            className="text-gray-400 hover:text-gray-500 transition-colors"
          >
            <FiX size={18} />
          </button>
        </div>
      ) : (
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <FiSearch className="text-gray-400" />
          </div>
          <input
            type="text"
            value={inputValue}
            onChange={handleInputChange}
            onClick={() => setIsOpen(true)}
            placeholder={placeholder}
            className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg"
          />
          <button
            onClick={toggleDropdown}
            className="absolute inset-y-0 right-0 pr-3 flex items-center"
          >
            <FiChevronDown
              className={`text-gray-400 transition-transform ${isOpen ? 'transform rotate-180' : ''}`}
            />
          </button>
        </div>
      )}

      {isOpen && (
        <div className="absolute z-10 mt-1 w-full bg-white border border-gray-200 rounded-lg shadow-lg overflow-hidden">
          {isLoading ? (
            <div className="p-4 text-center text-gray-500">Loading...</div>
          ) : filteredData.length === 0 ? (
            <div className="p-4 text-center text-gray-500">No users found</div>
          ) : (
            <ul className="max-h-60 overflow-auto">
              {filteredData.map((user) => (
                <li
                  key={user.userId}
                  onClick={() => handleSelect(user)}
                  className="px-4 py-3 hover:bg-gray-50 cursor-pointer transition-colors flex items-center space-x-3"
                >
                  <img
                    src={user.image}
                    alt={user.username}
                    className="w-8 h-8 rounded-full object-cover"
                  />
                  <div>
                    <p className="font-medium text-gray-900">
                      {user.firstName} {user.middleName} {user.lastName}
                    </p>
                    <p className="text-sm text-gray-500">@{user.username}</p>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  );
};

export default SearchSelect;