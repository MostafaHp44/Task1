import React, { useState, useEffect } from 'react';
import PropertyDropdown from './PropertyDropdown';
import axios from 'axios';
import '../App.css'
import Drop from './Dropdown';

const FormComponent = () => {

  const apiKey ='3%o8i}_;3D4bF]G5@22r2)Et1&mLJ4?$@+16';
  
  const [mainCategories, setMainCategories] = useState([]);
  const [mainCategory, setMainCategory] = useState("");
  const [subcategories, setSubcategories] = useState([]);
  const [subcategory, setSubcategory] = useState("");
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [subprop,setsubprop]=useState("")


  useEffect(() => {
    // Fetch main categories
    axios.get('https://staging.mazaady.com/api/v1/get_all_cats', {
      headers: {
        'private-key': apiKey,
      },
      })
      .then(response => {
        setMainCategories(response.data.data.categories);
        setLoading(false);
      })
      .catch(error => console.error('Error fetching main categories:', error));
  }, []);


  

  const handleMainCategoryChange = (e) => {

     
    setMainCategory(e.target.value);


    axios.get(`https://staging.mazaady.com/api/v1/properties?cat=13(${e.target.value})`, {
      headers: {
        'private-key': apiKey,
      },
      })
      .then(response => {

        setSubcategories(response.data.data);
        setLoading(false);
      })
      .catch(error => console.error('Error fetching main categories:', error));

   
  }

  const handleSubcategoryChange = (e) => {

   let subcat=e.target.value

    setSubcategory(subcat);


    // Fetch properties based on the selected subcategory
    axios.get(`https://staging.mazaady.com/api/v1/properties?cat=13${subcat}`,{
      headers: {
        'private-key': apiKey,
      },
    })
    .then(response => {

      let NewData=response.data.data.find(cat=>(cat.name===subcat))
      let DataOptions=NewData.options
      setProperties(DataOptions);
      
    })
    .catch(error => console.error('Error fetching main categories:', error));


      

     
  };

  
  const handleprop = (e) => {
    setsubprop(e.target.value);
  };


  return (

    <div className='MainFrom'>


      <Drop 
        label="Main Category"
        options={mainCategories.map((cat)=>(cat.name))}
        value={mainCategory}
        onChange ={handleMainCategoryChange}
        isLoading={loading}
        index={mainCategories.map((cat)=>(cat.id))}
        />



      {
      mainCategory 
      ? 
        <Drop
          label="Subcategory"
          options={subcategories.map((cat)=>(cat.name))}
          value={subcategory}
          onChange={handleSubcategoryChange}
          isLoading={loading}
          
        />
      :
        <></>
      }




      {subcategory 
      ?
        <PropertyDropdown
          label={`Properties for ${subcategory} : `}
          options={properties}
          onChange={handleprop}
          value={subprop}
          
          
        />
      :
      <></>  
}


    
      



    





    </div>
  );
};

export default FormComponent;
