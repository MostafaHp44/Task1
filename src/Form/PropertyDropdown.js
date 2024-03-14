import React from 'react';
import '../App.css'


const PropertyDropdown = ({ label, options, onChange,value }) => {
  return (
    <div className='MainProp'>

      <label className='MainLabel'>{label}</label>

    <select onChange={onChange} value={value}>
  
     <option>Select ..</option>
    {
    options.map((item ,index)=>(
      <option key={index} value={item.name}> {item.name} </option>

  ))}
  
</select>
      <p className='Selected'>{`You selected : ${value}`}</p>

    </div>
  );

};

export default PropertyDropdown;
