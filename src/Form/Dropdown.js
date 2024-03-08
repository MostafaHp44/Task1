// components/Dropdown.jsx
import React from 'react';
import Select from 'react-select';

const Dropdown = ({ label, options, value, onChange, isLoading }) => {
  return (
    <div>
      <label>{label}</label>
      <Select
        options={options}
        value={value}
        onChange={onChange}
        isSearchable
        isLoading={isLoading}
      />
    </div>
  );
};

export default Dropdown;
