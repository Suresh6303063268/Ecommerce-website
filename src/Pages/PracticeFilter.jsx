import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../Css/product.css';


function PracticeFilter() {
  const [data, setData] = useState([]);
  const [filter, setFilter] = useState('');
  const [filteredData, setFilteredData] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [editFields, setEditFields] = useState({ title: '', category: '', price: '', rating: '' });
    const [showAddForm, setShowAddForm] = useState(false);
    const [newProduct, setNewProduct] = useState({
      title: '',
      category: '',
      price: '',
      image: '',
      rating: ''
    });


 


  // Fetch product data
  useEffect(() => {
    axios.get('https://fakestoreapi.com/products')
      .then(res => {
        console.log(res.data);
        setData(res.data);
        setFilteredData(res.data);  
      })
      .catch(err => console.error(err));
  }, []);

  // Filter products based on the filter input
  useEffect(() => {
    if (filter.trim() === '') {
      setFilteredData(data);  
    } else {
      const lowercasedFilter = filter.toLowerCase();
      const filtered = data.filter(product =>
        product.category.toLowerCase().includes(lowercasedFilter) ||
        product.title.toLowerCase().includes(lowercasedFilter)
      );
      setFilteredData(filtered);
    }
  }, [filter, data]);

  

  // Handle Edit
  const handleEdit = (product) => {
    setEditingId(product.id);
    setEditFields({ title: product.title, category: product.category, price: product.price, rating: product.rating?.rate });
  };

  // Handle Save
  const handleSave = (id) => {
    const updatedData = data.map(product =>
      product.id === id ? { ...product, ...editFields } : product
    );
    setData(updatedData);
    setEditingId(null);
  };

  // Handle Field Change
  const handleFieldChange = (e) => {
    const { name, value } = e.target;
    setEditFields(prev => ({ ...prev, [name]: value }));
  };

  // Handle Delete
  const handleDelete = (id) => {
    const newData = data.filter(product => product.id !== id);
    setData(newData);
  };



// Handle Add Product
const handleAddProduct = (e) => {
  e.preventDefault();
  const newProductObj = {
    id: Date.now(),
    title: newProduct.title,
    category: newProduct.category,
    price: parseFloat(newProduct.price),
    image: newProduct.image || 'https://via.placeholder.com/150',
    rating: { rate: parseFloat(newProduct.rating), count: 0 }
  };
  setData([newProductObj, ...data]);
  setShowAddForm(false);
  setNewProduct({ title: '', category: '', price: '', image: '', rating: '' });
};

const handleNewProductChange = (e) => {
  const { name, value } = e.target;
  setNewProduct(prev => ({ ...prev, [name]: value }));
};













   return (
      <div className="product">
        <h1>WELCOME PRODUCTS</h1>
  
        <input
          type="text"
          placeholder="Filter by Category or Title"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="filter-input"
        />
  
        <button onClick={() => setShowAddForm(true)} className="handleinput">
          + Add Product
        </button>
  
        {showAddForm && (
          <form onSubmit={handleAddProduct} className="add-product-form">
            <h2>Add New Product</h2>
            <input
              type="text"
              name="title"
              value={newProduct.title}
              onChange={handleNewProductChange}
              placeholder="Title"
              required
            />
            <input
              type="text"
              name="category"
              value={newProduct.category}
              onChange={handleNewProductChange}
              placeholder="Category"
              required
            />
            <input
              type="text"
              name="image"
              value={newProduct.image}
              onChange={handleNewProductChange}
              placeholder="Image URL"
              required
            />
            <input
              type="number"
              name="price"
              value={newProduct.price}
              onChange={handleNewProductChange}
              placeholder="Price"
              required
            />
            <input
              type="number"
              name="rating"
              value={newProduct.rating}
              onChange={handleNewProductChange}
              placeholder="Rating"
              required
            />
            <button type="submit">Submit</button>
            <button type="button" onClick={() => setShowAddForm(false)}>Cancel</button>
          </form>
        )}
  
        <div className="product-container">
          {filteredData.length === 0 ? (
            <p>No products found.</p>
          ) : (
            filteredData.map(product => (
              <div key={product.id} className="product-card">
                <p>Category: 
                  {editingId === product.id ? (
                    <input 
                      name="category"
                      value={editFields.category}
                      onChange={handleFieldChange}
                    />
                  ) : (
                    product.category
                  )}
                </p>
  
                <img src={product.image} alt={product.title} />
  
                <h3>
                  Title: 
                  {editingId === product.id ? (
                    <input
                      name="title"
                      value={editFields.title}
                      onChange={handleFieldChange}
                    />
                  ) : (
                    product.title
                  )}
                </h3>
  
                <p>Price: 
                  {editingId === product.id ? (
                    <input 
                      name="price"
                      value={editFields.price}
                      onChange={handleFieldChange}
                    />
                  ) : (
                    `$${product.price}`
                  )}
                </p>
  
                <h4>
                  Rating: 
                  {editingId === product.id ? (
                    <input
                      name="rating"
                      value={editFields.rating}
                      onChange={handleFieldChange}
                    />
                  ) : (
                    <span>{product.rating?.rate ? `${product.rating.rate} ⭐` : 'No Rating'}</span>
                  )}
                </h4>
  
                {editingId === product.id ? (
                  <button onClick={() => handleSave(product.id)} className="save-button">Save</button>
                ) : (
                  <button onClick={() => handleEdit(product)} className="edit-button">Edit</button>
                )}
  
                <button onClick={() => handleDelete(product.id)} className="delete-button">Delete</button>
              </div>
            ))
          )}
        </div>
  
       
  
      </div>
    );
}

export default PracticeFilter;
