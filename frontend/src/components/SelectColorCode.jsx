import React, { useState } from 'react';
import './SelectColorCode.css';

const SelectColorCode = ({ options, modelValue, onUpdateModelValue }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const selectedItem = modelValue;

  const getItemName = (id) => {
    const option = options.find(opt => opt.ROWID === id);
    return option ? option.name : 'Select Status';
  };

  const getSelectedColor = (id) => {
    const option = options.find(opt => opt.ROWID === id);
    return option ? option.color : '#ccc';
  };

  const filteredOptions = options.filter(opt =>
    opt.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const selectOption = (id) => {
    onUpdateModelValue(id);
    setIsDropdownOpen(false);
  };

  return (
    <div className="custom-select">
      <div className="selected-box" onClick={toggleDropdown}>
        <span className="dot" style={{ backgroundColor: getSelectedColor(selectedItem) }}></span>
        <span className="selected-text">{getItemName(selectedItem)}</span>
        <svg className={`arrow ${isDropdownOpen ? 'open' : ''}`} xmlns="http://www.w3.org/2000/svg" width="15" height="15" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
        </svg>
      </div>

      {isDropdownOpen && (
        <div className="dropdown-box">
          <input
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search..."
            className="search-bar"
          />

          <ul className="option-list">
            {filteredOptions.map(option => (
              <li
                key={option.ROWID}
                onClick={() => selectOption(option.ROWID)}
                className={selectedItem === option.ROWID ? 'selected' : ''}
              >
                <span className="dot mr-4" style={{ backgroundColor: option.color || '#ccc' }}></span>
                <span className="ms-2">{option.name}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default SelectColorCode;
