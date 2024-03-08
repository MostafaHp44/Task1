// components/FormComponent.jsx
import React, { useState, useEffect } from 'react';
import Dropdown from './Dropdown';
import PropertyDropdown from './PropertyDropdown';
import axios from 'axios';

const FormComponent = () => {
  const [mainCategories, setMainCategories] = useState([]);
  const [mainCategory, setMainCategory] = useState(null);
  const [subcategories, setSubcategories] = useState([]);
  const [subcategory, setSubcategory] = useState(null);
  const [properties, setProperties] = useState([]);
  const [selectedProperties, setSelectedProperties] = useState({});
  const [loading, setLoading] = useState(true);
  const apiKey = process.env.API_KEY;


  useEffect(() => {
    // Fetch main categories
    axios.get('https://staging.mazaady.com/api/v1/get_all_cats', {
        headers: {
          'Authorization': `Bearer ${apiKey}`,
        },
      })
      .then(response => {
        setMainCategories(response.data);
        setLoading(false);
      })
      .catch(error => console.error('Error fetching main categories:', error));
  }, []);

  const handleMainCategoryChange = (selectedCategory) => {
    setMainCategory(selectedCategory);

    // Fetch subcategories based on the selected main category
    axios.get(`https://staging.mazaady.com/api/v1/properties?cat=${selectedCategory.id}`)
      .then(response => setSubcategories(response.data))
      .catch(error => console.error('Error fetching subcategories:', error));
  };

  const handleSubcategoryChange = (selectedSubcategory) => {
    setSubcategory(selectedSubcategory);

    // Fetch properties based on the selected subcategory
    axios.get(`https://staging.mazaady.com/api/v1/get-options-child/${selectedSubcategory.id}`)
      .then(response => setProperties(response.data))
      .catch(error => console.error('Error fetching properties:', error));
  };

  const handlePropertyChange = (selectedProperty) => {
    // Handle logic for appending "other" and fetching child properties
    // ...

    setSelectedProperties(prevState => ({
      ...prevState,
      [selectedProperty.id]: selectedProperty,
    }));
  };

  const handleSubmit = () => {
    // Logic to submit selected values
    console.log('Selected Properties:', selectedProperties);
  };

  return (
    <div>
      <Dropdown
        label="Main Category"
        options={mainCategories}
        value={mainCategory}
        onChange={handleMainCategoryChange}
        isLoading={loading}
      />

      {mainCategory && (
        <Dropdown
          label="Subcategory"
          options={subcategories}
          value={subcategory}
          onChange={handleSubcategoryChange}
          isLoading={loading}
        />
      )}

      {subcategory && (
        <PropertyDropdown
          label={`Properties for ${subcategory.name}`}
          options={properties}
          onChange={handlePropertyChange}
        />
      )}

      <button onClick={handleSubmit}>Submit</button>
    </div>
  );
};

export default FormComponent;
