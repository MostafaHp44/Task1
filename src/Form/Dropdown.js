import '../App.css'

function Drop({ label, options, value, onChange, index}) {

  return (
  <div className='MainDrop'>

 
  <label className='MainLabel' >{label} : </label>

<select onChange={onChange} value={value}>
  
  <option>Select ..</option>
  {options.map((item ,index)=>(
      <option key={index} value={item} >{item}</option>

  ))}
  
</select>
      <p className='Selected'>{`You selected  :  ${value}`} </p>


  </div>
  );
}

export default Drop;