// components/PropertyDropdown.jsx
import React from 'react';
import Select from 'react-select';

const PropertyDropdown = ({ label, options, onChange }) => {
  return (
    <div>
      <label>{label}</label>
      <Select
        options={options}
        onChange={onChange}
        isSearchable
      />
    </div>
  );
};

export default PropertyDropdown;
