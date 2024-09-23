import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../styles/MyData.css';

const MyData = () => {
  const [uploads, setUploads] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editMode, setEditMode] = useState(null);
  const [formData, setFormData] = useState({});
  const [originalData, setOriginalData] = useState({});
  const [successMessage, setSuccessMessage] = useState('');

  useEffect(() => {
    const fetchUploads = async () => {
      try {
        const token = localStorage.getItem('authToken');
        const userId = localStorage.getItem('userId');
        const email = localStorage.getItem('email');
 
        const response = await axios.get('http://localhost:5000/api/rent-card/user', {
          headers: { 'x-auth-token': token },
          params: { userId, email },
        });
        setUploads(response.data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchUploads();
  }, []);

  const handleEdit = (upload) => {
    setEditMode(upload._id);
    setOriginalData(upload);
    setFormData({
      name: upload.name || '',
      mobileNumber: upload.mobileNumber || '',
      typeOfRooms: upload.typeOfRooms || '',
      singleRoomRange: upload.singleRoomRange || '',
      doubleRoomRange: upload.doubleRoomRange || '',
      facilities: upload.facilities || '',
      near: upload.near || '',
      distanceFromRoad: upload.distanceFromRoad || '',
      availableFor: upload.availableFor || '',
      currentlyAvailable: upload.currentlyAvailable || false,
      description: upload.description || '',
      images: [], // Reset images
    });
  };

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    if (type === 'file') {
      setFormData(prev => ({ ...prev, [name]: files }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleUpdate = async () => {
    try {
      const token = localStorage.getItem('authToken');

      // Merge formData with originalData to keep previous values if not updated
      const updatedData = { ...originalData, ...formData };

      // Prepare FormData for file uploads
      const updatedFormData = new FormData();
      updatedFormData.append('userId', localStorage.getItem('userId'));
      Object.keys(updatedData).forEach(key => {
        if (key === 'images' && updatedData.images.length) {
          Array.from(updatedData.images).forEach(file => {
            updatedFormData.append('images', file);
          });
        } else {
          updatedFormData.append(key, updatedData[key]);
        }
      });

      await axios.put(`http://localhost:5000/api/rent-card/${editMode}`, updatedFormData, {
        headers: {
          'x-auth-token': token,
          'Content-Type': 'multipart/form-data'
        },
      });

      setUploads(uploads.map(upload => 
        upload._id === editMode ? { ...upload, ...updatedData } : upload
      ));
      setSuccessMessage('Details updated successfully!');
      setEditMode(null);
    } catch (err) {
      setError(err.message);
    }
  };

  const handleDelete = async (id) => {
    // Confirm deletion
    const confirmed = window.confirm('Are you sure you want to delete this upload?');
    
    if (!confirmed) {
      return; // Exit if the user cancels
    }
    
    try {
      const token = localStorage.getItem('authToken');
      await axios.delete(`https://backend-gamma-nine-69.vercel.app/api/rent-card/${id}`, {
        headers: {
          'x-auth-token': token,
        },
        data: {
          userId: localStorage.getItem('userId'),
        },
      });

      setUploads(uploads.filter(upload => upload._id !== id));
      setSuccessMessage('Upload deleted successfully!');
    } catch (err) {
      setError(err.message);
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="user-uploads">
      <h2>Your Uploads</h2>
      {successMessage && <p className="success-message">{successMessage}</p>}
      {uploads.length === 0 ? (
        <p>No uploads found</p>
      ) : (
        <ul>
          {uploads.map((upload) => (
            <li key={upload._id}>
              {editMode === upload._id ? (
                <div>
                  <input 
                    type="text" 
                    name="name" 
                    value={formData.name || ''} 
                    onChange={handleChange} 
                    placeholder="Name"
                  />
                  <input 
                    type="text" 
                    name="mobileNumber" 
                    value={formData.mobileNumber || ''} 
                    onChange={handleChange} 
                    placeholder="Mobile Number"
                  />
                  <input 
                    type="text" 
                    name="typeOfRooms" 
                    value={formData.typeOfRooms || ''} 
                    onChange={handleChange} 
                    placeholder="Type of Rooms (comma separated)"
                  />
                  <input 
                    type="text" 
                    name="singleRoomRange" 
                    value={formData.singleRoomRange || ''} 
                    onChange={handleChange} 
                    placeholder="Single Room Range"
                  />
                  <input 
                    type="text" 
                    name="doubleRoomRange" 
                    value={formData.doubleRoomRange || ''} 
                    onChange={handleChange} 
                    placeholder="Double Room Range"
                  />
                  <input 
                    type="text" 
                    name="facilities" 
                    value={formData.facilities || ''} 
                    onChange={handleChange} 
                    placeholder="Facilities (comma separated)"
                  />
                  <input 
                    type="text" 
                    name="near" 
                    value={formData.near || ''} 
                    onChange={handleChange} 
                    placeholder="Near"
                  />
                  <input 
                    type="text" 
                    name="availableFor" 
                    value={formData.availableFor || ''} 
                    onChange={handleChange} 
                    placeholder="Available For"
                  />
                  <div className="form-group">
                    <label>
                        <input
                            type="checkbox"
                            name="currentlyAvailable"
                            checked={formData.currentlyAvailable || false}
                            onChange={(e) => setFormData({
                                ...formData,
                                currentlyAvailable: e.target.checked
                            })}
                        />
                        Currently Available
                    </label>
                  </div>
                  <div className="form-group">
                    <label htmlFor="description">Description:</label>
                    <textarea
                      id="description"
                      name="description"
                      value={formData.description || ''}
                      onChange={handleChange}
                      placeholder="Description"
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="images">Upload Images:</label>
                    <input
                      type="file"
                      id="images"
                      name="images"
                      accept="image/*"
                      multiple
                      onChange={handleChange}
                    />
                  </div>
                  <button onClick={handleUpdate}>Save</button>
                  <button onClick={() => setEditMode(null)}>Cancel</button>
                </div>
              ) : (
                <div>
                  <h3>{upload.name}</h3>
                  <p>Mobile Number: {upload.mobileNumber}</p>
                  <p>Types of Rooms: {Array.isArray(upload.typeOfRooms) ? upload.typeOfRooms.join(', ') : upload.typeOfRooms}</p>
                  <p>Single Room Range: {upload.singleRoomRange}</p>
                  <p>Double Room Range: {upload.doubleRoomRange}</p>
                  <p>Facilities: {Array.isArray(upload.facilities) ? upload.facilities.join(', ') : upload.facilities}</p>
                  <p>Near: {upload.near}</p>
                  <p>Distance from Road: {upload.distanceFromRoad}</p>
                  <p>Available For: {upload.availableFor}</p>
                  <p>Description: {upload.description}</p>
                  <div className="image-preview-container">
                    {Array.isArray(upload.images) && upload.images.length > 0 ? (
                      upload.images.map((image, index) => (
                        <img
                          key={index}
                          src={`http://localhost:5000/uploads/${image}`}
                          alt={`Upload ${index}`}
                          className="image-preview"
                        />
                      ))
                    ) : (
                      <p>No images available</p>
                    )}
                  </div>
                  <button onClick={() => handleEdit(upload)}>Edit</button>
                  <button onClick={() => handleDelete(upload._id)}>Delete</button>
                </div>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default MyData;
