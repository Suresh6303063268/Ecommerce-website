import React, { useState, useEffect } from 'react';

function Fetch() {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch("https://fakestoreapi.com/products")
      .then(response => response.json())
      .then(json => setData(json));
  }, []);

  return (
    <div>
      <h1>Welcome</h1>
      <div className='products'>
      <ul>
        {data.map(product => (
          <li key={product.id}>{product.title}</li>
        ))}
      </ul>
      </div>
     
    </div>
  );
}

export default Fetch;
