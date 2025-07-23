'use client'
import React, { useState, useEffect, useRef } from 'react'

const CustomSelectWithSearch = ({
  options = [],
  value,
  onChange,
  placeholder = 'Select...',
  searchPlaceholder = 'Search...',
  isLoading = false,
  isClearable = true,
  isDisabled = false,
  noOptionsMessage = 'No options available',
  renderOption,
  className = '',
  style = {},
}) => {
  const [isOpen, setIsOpen] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')
  const [highlightedIndex, setHighlightedIndex] = useState(-1)
  const wrapperRef = useRef(null)
  const searchInputRef = useRef(null)

  // Filter options based on search term
  const filteredOptions = options.filter(option =>
    option.label.toLowerCase().includes(searchTerm.toLowerCase())
  )

  // Handle click outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
        setIsOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  // Focus search input when dropdown opens
  useEffect(() => {
    if (isOpen && searchInputRef.current) {
      searchInputRef.current.focus()
    }
  }, [isOpen])

  // Handle keyboard navigation
  const handleKeyDown = (e) => {
    if (!isOpen) {
      if (e.key === 'Enter' || e.key === ' ') {
        setIsOpen(true)
      }
      return
    }

    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault()
        setHighlightedIndex(prev =>
          Math.min(prev + 1, filteredOptions.length - 1)
        )
        break
      case 'ArrowUp':
        e.preventDefault()
        setHighlightedIndex(prev => Math.max(prev - 1, -1))
        break
      case 'Enter':
        if (highlightedIndex >= 0) {
          handleSelect(filteredOptions[highlightedIndex])
        }
        break
      case 'Escape':
        setIsOpen(false)
        break
      case 'Tab':
        setIsOpen(false)
        break
    }
  }

  const handleSelect = (option) => {
    onChange(option)
    setIsOpen(false)
    setSearchTerm('')
  }

  const handleClear = (e) => {
    e.stopPropagation()
    onChange(null)
  }

  const defaultRenderOption = (option, isSelected, isHighlighted) => (
    <div
      className={`px-3 py-2 cursor-pointer ${
        isSelected ? 'bg-blue-500 text-white' :
        isHighlighted ? 'bg-gray-100' : 'hover:bg-gray-50'
      }`}
    >
      {option.label}
    </div>
  )

  return (
    <div
      ref={wrapperRef}
      className={`relative ${className}`}
      style={style}
    >
      {/* Select control */}
      <div
        className={`flex items-center justify-between p-2 border rounded-md cursor-pointer ${
          isDisabled ? 'bg-gray-100 cursor-not-allowed' : 'bg-white'
        } ${isOpen ? 'border-blue-500' : 'border-gray-300'}`}
        onClick={() => !isDisabled && setIsOpen(!isOpen)}
        onKeyDown={handleKeyDown}
        tabIndex={isDisabled ? -1 : 0}
        role="combobox"
        aria-expanded={isOpen}
        aria-haspopup="listbox"
        aria-disabled={isDisabled}
      >
        <div className="truncate">
          {value ? (
            <span>{value.label}</span>
          ) : (
            <span className="text-gray-400">{placeholder}</span>
          )}
        </div>
        <div className="flex items-center space-x-2">
          {isClearable && value && (
            <button
              onClick={handleClear}
              className="text-gray-400 hover:text-gray-600"
              aria-label="Clear selection"
            >
              ×
            </button>
          )}
          <span className="text-gray-400">▼</span>
        </div>
      </div>

      {/* Dropdown menu */}
      {isOpen && !isDisabled && (
        <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg">
          {/* Search input */}
          <div className="p-2 border-b">
            <input
              ref={searchInputRef}
              type="text"
              placeholder={searchPlaceholder}
              className="w-full p-1 border rounded"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onKeyDown={handleKeyDown}
            />
          </div>

          {/* Options list */}
          <div
            className="max-h-60 overflow-y-auto"
            role="listbox"
          >
            {isLoading ? (
              <div className="p-3 text-center text-gray-500">Loading...</div>
            ) : filteredOptions.length === 0 ? (
              <div className="p-3 text-center text-gray-500">
                {noOptionsMessage}
              </div>
            ) : (
              filteredOptions.map((option, index) => {
                const isSelected = value && value.value === option.value
                const isHighlighted = highlightedIndex === index
                return (
                  <div
                    key={option.value}
                    onClick={() => handleSelect(option)}
                    onMouseEnter={() => setHighlightedIndex(index)}
                    className={`${isSelected ? 'bg-blue-100' : ''} ${
                      isHighlighted ? 'bg-gray-100' : ''
                    }`}
                    role="option"
                    aria-selected={isSelected}
                  >
                    {renderOption
                      ? renderOption(option, isSelected, isHighlighted)
                      : defaultRenderOption(option, isSelected, isHighlighted)}
                  </div>
                )
              })
            )}
          </div>
        </div>
      )}
    </div>
  )
}

export default CustomSelectWithSearch