import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../Css/product.css';

function Axios2() {
  const [data, setData] = useState([]);
  const [filter, setFilter] = useState('');
  const [filteredData, setFilteredData] = useState([]);

  useEffect(() => {
    axios.get('https://fakestoreapi.com/products')
      .then(response => {
        setData(response.data);
        setFilteredData(response.data); // Initialize with full data
      });
  }, []);

  useEffect(() => {
    if (filter.trim() === '') {
      setFilteredData(data);
    } else {
      const lowercasedFilter = filter.toLowerCase();
      const filtered = data.filter(product =>
        product.category.toLowerCase().includes(lowercasedFilter)
      );
      setFilteredData(filtered);
    }
  }, [filter, data]);

  return (
    <div className='product'>
      <h1>Welcome</h1>

      <input
        type="text"
        placeholder="Filter by category"
        value={filter}
        onChange={(e) => setFilter(e.target.value)}
        className='filter-input'
      />

      <div className='product-container'>
        {filteredData.map(product => (
          <div key={product.id} className='product-card'>
            <p>Category: {product.category}</p>
            <img src={product.image} alt={product.title} />
            <h3>{product.title}</h3>
            <p>${product.price}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Axios2;
