import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../Css/product.css';

function App() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios.get('https://fakestoreapi.com/products')
      .then(response => setProducts(response.data))
     
  }, []);

  return (
    <div className="product">
      <h1>Product List</h1>
      <div className="product-container">
        {products.map(product => (
          <div key={product.id} className="product-card"> 
        
           
            <img src={product.image} alt={product.title} />
            <p>Catagorey {product.category}
            </p>
            <h3>Title : &{product.title}</h3>
          
                        <p><strong>Price:</strong> ${product.price}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
