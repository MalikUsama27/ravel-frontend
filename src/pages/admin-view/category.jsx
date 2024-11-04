import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Category.css';

const Category = () => {
  const [title, setTitle] = useState('');
  const [image, setImage] = useState(null);
  const [categories, setCategories] = useState([]);
  const [editingCategoryId, setEditingCategoryId] = useState(null);
  const [message, setMessage] = useState('');

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await axios.get('https://ravel-be.vercel.app/api/admin/category/get');
      setCategories(response.data.data);
    } catch (error) {
      setMessage('Error fetching categories: ' + error.message);
    }
  };

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');

    const formData = new FormData();
    formData.append('my_file', image);

    try {
      const uploadResponse = await axios.post('https://ravel-be.vercel.app/api/admin/category/upload-image', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      if (uploadResponse.data.success) {
        const categoryData = {
          title,
          imageUrl: uploadResponse.data.imageUrl,
        };

        if (editingCategoryId) {
          await axios.put(`https://ravel-be.vercel.app/api/admin/category/edit/${editingCategoryId}`, categoryData);
          setMessage('Category updated successfully!');
        } else {
          await axios.post('https://ravel-be.vercel.app/api/admin/category/add', categoryData);
          setMessage('Category added successfully!');
        }

        resetForm();
        fetchCategories();
      }
    } catch (error) {
      setMessage('Error saving category: ' + error.message);
    }
  };

  const resetForm = () => {
    setTitle('');
    setImage(null);
    setEditingCategoryId(null);
  };

  const handleEdit = (category) => {
    setTitle(category.title);
    setEditingCategoryId(category._id);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/admin/category/delete/${id}`);
      setMessage('Category deleted successfully!');
      fetchCategories();
    } catch (error) {
      setMessage('Error deleting category: ' + error.message);
    }
  };

  return (
    <div className="category-container">
      <h1 className="title">{editingCategoryId ? 'Edit Category' : 'Add Category'}</h1>
      {message && <div className="alert">{message}</div>}
      <form className="category-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Title:</label>
          <input
            type="text"
            value={title}
            onChange={handleTitleChange}
            required
            className="form-control"
          />
        </div>
        <div className="form-group">
          <label>Image:</label>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            required={!editingCategoryId}
            className="form-control"
          />
        </div>
        <button type="submit" className="btn-submit">
          {editingCategoryId ? 'Update Category' : 'Submit'}
        </button>
      </form>
      <h2 className="subtitle">Categories</h2>
      <ul className="category-list">
        {categories.map(category => (
          <li key={category._id} className="category-item">
            <img src={category.image} alt={category.title} className="category-image" />
            <div className="category-info">
              <h3>{category.title}</h3>
              <button onClick={() => handleEdit(category)} className="btn-edit">Edit</button>
              <button onClick={() => handleDelete(category._id)} className="btn-delete">Delete</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Category;
