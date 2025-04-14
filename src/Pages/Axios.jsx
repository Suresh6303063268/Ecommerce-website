import React, {useEffect, useState}from 'react'

import axios  from 'axios';

import '../Css/Axios.css'

function Axios() {

    const [data, setData] =useState([]);

useEffect(() =>{

axios.get("https://fakestoreapi.com/products").then(
    response => setData(response.data)
)
},[])

  return (
    <div className='product'>
      {data.map(item => <li key={item.id}>{item.title}</li>)}
    </div>
  )
}

export default Axios;
