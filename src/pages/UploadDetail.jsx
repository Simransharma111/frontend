import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { FaUpload } from 'react-icons/fa'; // React upload icon
import '../styles/Upload.css';

const UploadDetail = () => {
    const [formData, setFormData] = useState({
        name: '',
        mobileNumber: '',
        typeOfRooms: [],
        singleRoomRange: '',
        doubleRoomRange: '',
        facilities: [],
        near: '',
        // distanceFromRoad: '',
        availableFor: '',
        currentlyAvailable: false, // Boolean value for checkbox
        description: '',
        images: []
    });

    const [previewImages, setPreviewImages] = useState([]);
    const [step, setStep] = useState(1);
    const [errors, setErrors] = useState({});
    const navigate = useNavigate(); 

    const handleChange = (e) => {
        const { name, value, type, checked, files } = e.target;

        if (type === 'checkbox') {
            if (name === 'typeOfRooms') {
                // Manage array of selected room types
                setFormData(prevFormData => ({
                    ...prevFormData,
                    typeOfRooms: checked
                        ? [...prevFormData.typeOfRooms, value]
                        : prevFormData.typeOfRooms.filter(room => room !== value)
                }));
            } else if (name === 'facilities') {
                // Manage array of selected facilities
                setFormData(prevFormData => ({
                    ...prevFormData,
                    facilities: checked
                        ? [...prevFormData.facilities, value]
                        : prevFormData.facilities.filter(facility => facility !== value)
                }));
            } else if (name === 'currentlyAvailable') {
                // Manage currentlyAvailable boolean value
                setFormData(prevFormData => ({
                    ...prevFormData,
                    currentlyAvailable: checked
                }));
            }
        } else if (type === 'file') {
            // Handle file uploads
            setFormData(prevFormData => ({
                ...prevFormData,
                [name]: files
            }));

            // Generate previews for selected images
            const fileArray = Array.from(files);
            const previewUrls = fileArray.map(file => URL.createObjectURL(file));
            setPreviewImages(previewUrls);
        } else {
            // Handle other input types
            setFormData(prevFormData => ({
                ...prevFormData,
                [name]: value
            }));
        }
    };

    const validate = () => {
        let tempErrors = {};

        if (step === 1) {
            if (!formData.name) tempErrors.name = "Name is required";
            if (!formData.mobileNumber) {
                tempErrors.mobileNumber = "Mobile number is required";
            } else if (!/^\d{10}$/.test(formData.mobileNumber)) {
                tempErrors.mobileNumber = "Mobile number should be 10 digits";
            }
            if (formData.typeOfRooms.length === 0) tempErrors.typeOfRooms = "Select at least one type of room";
        } else if (step === 3) {
            if (!formData.near) tempErrors.near = "Near is required";
        }

        setErrors(tempErrors);
        return Object.keys(tempErrors).length === 0;
    };

    const handleNext = () => {
        if (validate()) {
            setStep(step + 1);
        }
    };

    const handlePrevious = () => {
        setStep(step - 1);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formDataToSend = new FormData();

        // Append form fields
        for (const key in formData) {
            if (key === 'images' && formData[key].length > 0) {
                for (const image of formData.images) {
                    formDataToSend.append('images', image);
                }
            } else if (Array.isArray(formData[key])) {
                formDataToSend.append(key, JSON.stringify(formData[key]));
            } else {
                formDataToSend.append(key, formData[key]);
            }
        }

        try {
            const response = await axios.post('https://backendofroomrent.onrender.com/api/rent-card', formDataToSend, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'x-auth-token': localStorage.getItem('authToken'), // Add token if required
                },
            });

            if (response.status === 201) {
                alert('Form submitted successfully!');
                // Reset form and preview images
                setFormData({
                    name: '',
                    mobileNumber: '',
                    typeOfRooms: [],
                    singleRoomRange: '',
                    doubleRoomRange: '',
                    facilities: [],
                    near: '',
                    distanceFromRoad: '',
                    availableFor: '',
                    currentlyAvailable:[],
                    description: '',
                    images: []
                });
                setPreviewImages([]);
            } else {
                throw new Error(`Unexpected response status: ${response.status}`);
            }
        } catch (error) {
            console.error('There was an error submitting the form!', error);
            alert('Error submitting form: ' + error.message);
        }
    };
    const handleBackToDashboard = () => {
        navigate('/dashboard'); // Redirect to the dashboard
    };
    
    return (
        <>
            <div className='bgimg'>
                <img src="\assets\slide3.jpg" alt="" />
                <div className="rent-card-form">
                    <h3>Add Details</h3>
                    <form onSubmit={handleSubmit}>
                        {step === 1 && (
                            <>
                                <div className="form-group">
                                    <label htmlFor="name">Name:</label>
                                    <input
                                        type="text"
                                        id="name"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleChange}
                                    />
                                    {errors.name && <p className="error">{errors.name}</p>}
                                </div>
                                <div className="form-group">
                                    <label htmlFor="mobileNumber">Mobile Number:</label>
                                    <input
                                        type="text"
                                        id="mobileNumber"
                                        name="mobileNumber"
                                        value={formData.mobileNumber}
                                        onChange={handleChange}
                                    />
                                    {errors.mobileNumber && <p className="error">{errors.mobileNumber}</p>}
                                </div>
                                <div className="form-group">
                                    <label>Types of Rooms:</label>
                                    <div className="checkbox-group">
                                        <label>
                                            <input
                                                type="checkbox"
                                                name="typeOfRooms"
                                                value="single"
                                                checked={formData.typeOfRooms.includes('single')}
                                                onChange={handleChange}
                                            />
                                            Single Room
                                        </label>
                                        <label>
                                            <input
                                                type="checkbox"
                                                name="typeOfRooms"
                                                value="double"
                                                checked={formData.typeOfRooms.includes('double')}
                                                onChange={handleChange}
                                            />
                                            Double Room
                                        </label>
                                        <label>
                                            <input
                                                type="checkbox"
                                                name="typeOfRooms"
                                                value="pg"
                                                checked={formData.typeOfRooms.includes('pg')}
                                                onChange={handleChange}
                                            />
                                            PG
                                        </label>
                                        <label>
                                            <input
                                                type="checkbox"
                                                name="typeOfRooms"
                                                value="luxurious"
                                                checked={formData.typeOfRooms.includes('luxurious')}
                                                onChange={handleChange}
                                            />
                                            Luxurious Room
                                        </label>
                                    </div>
                                    {errors.typeOfRooms && <p className="error">{errors.typeOfRooms}</p>}
                                </div>
                            </>
                        )}
                        {step === 2 && (
                            <>
                                <div className="form-group">
                                    <label>Range of Single Room:</label>
                                    <div>
                                        <label>
                                            <input
                                                type="radio"
                                                name="singleRoomRange"
                                                value="Less than 1500"
                                                checked={formData.singleRoomRange === 'Less than 1500'}
                                                onChange={handleChange}
                                            />
                                            Less than 1500
                                        </label>
                                        <label>
                                            <input
                                                type="radio"
                                                name="singleRoomRange"
                                                value="1500 - 5000"
                                                checked={formData.singleRoomRange === '1500 - 5000'}
                                                onChange={handleChange}
                                            />
                                            1500 - 5000
                                        </label>
                                        <label>
                                            <input
                                                type="radio"
                                                name="singleRoomRange"
                                                value="5000 - 10000"
                                                checked={formData.singleRoomRange === '5000 - 10000'}
                                                onChange={handleChange}
                                            />
                                            5000 - 10000
                                        </label>
                                        <label>
                                            <input
                                                type="radio"
                                                name="singleRoomRange"
                                                value="10000 - 20000"
                                                checked={formData.singleRoomRange === '10000 - 20000'}
                                                onChange={handleChange}
                                            />
                                            10000 - 20000
                                        </label>
                                        <label>
                                            <input
                                                type="radio"
                                                name="singleRoomRange"
                                                value="More than 20000"
                                                checked={formData.singleRoomRange === 'More than 20000'}
                                                onChange={handleChange}
                                            />
                                            More than 20000
                                        </label>
                                    </div>
                                </div>
                                <div className="form-group">
                                    <label>Range of Double Room:</label>
                                    <div>
                                        <label>
                                            <input
                                                type="radio"
                                                name="doubleRoomRange"
                                                value="Less than 1500"
                                                checked={formData.doubleRoomRange === 'Less than 1500'}
                                                onChange={handleChange}
                                            />
                                            Less than 1500
                                        </label>
                                        <label>
                                            <input
                                                type="radio"
                                                name="doubleRoomRange"
                                                value="1500 - 5000"
                                                checked={formData.doubleRoomRange === '1500 - 5000'}
                                                onChange={handleChange}
                                            />
                                            1500 - 5000
                                        </label>
                                        <label>
                                            <input
                                                type="radio"
                                                name="doubleRoomRange"
                                                value="5000 - 10000"
                                                checked={formData.doubleRoomRange === '5000 - 10000'}
                                                onChange={handleChange}
                                            />
                                            5000 - 10000
                                        </label>
                                        <label>
                                            <input
                                                type="radio"
                                                name="doubleRoomRange"
                                                value="10000 - 20000"
                                                checked={formData.doubleRoomRange === '10000 - 20000'}
                                                onChange={handleChange}
                                            />
                                            10000 - 20000
                                        </label>
                                        <label>
                                            <input
                                                type="radio"
                                                name="doubleRoomRange"
                                                value="More than 20000"
                                                checked={formData.doubleRoomRange === 'More than 20000'}
                                                onChange={handleChange}
                                            />
                                            More than 20000
                                        </label>
                                    </div>
                                </div>
                            </>
                        )}
                        {step === 3 && (
                            <>
                                 <div className="form-group">
                                    <label>Facilities:</label>
                                    <div className="checkbox-group">
                                        <label>
                                            <input
                                                type="checkbox"
                                                name="facilities"
                                                value="Almirah"
                                                checked={formData.facilities.includes('Almirah')}
                                                onChange={handleChange}
                                            />
                                            Almirah
                                        </label>
                                        <label>
                                            <input
                                                type="checkbox"
                                                name="facilities"
                                                value="Fan"
                                                checked={formData.facilities.includes('Fan')}
                                                onChange={handleChange}
                                            />
                                            Fan
                                        </label>
                                        <label>
                                            <input
                                                type="checkbox"
                                                name="facilities"
                                                value="Water"
                                                checked={formData.facilities.includes('Water')}
                                                onChange={handleChange}
                                            />
                                            Regular regularWaterSupply
                                        </label>
                                        <label>
                                            <input
                                                type="checkbox"
                                                name="facilities"
                                                value="Washroom"
                                                checked={formData.facilities.includes('Washroom')}
                                                onChange={handleChange}
                                            />
                                            Attach Washroom
                                        </label>
                                        <label>
                                            <input
                                                type="checkbox"
                                                name="facilities"
                                                value="Kitchen"
                                                checked={formData.facilities.includes('Kitchen')}
                                                onChange={handleChange}
                                            />
                                            Attach Kitchen
                                        </label>
                                        <label>
                                            <input
                                                type="checkbox"
                                                name="facilities"
                                                value="Geyser"
                                                checked={formData.facilities.includes('Geyser')}
                                                onChange={handleChange}
                                            />
                                            Geyser
                                        </label>
                                        <label>
                                            <input
                                                type="checkbox"
                                                name="facilities"
                                                value="Wifi"
                                                checked={formData.facilities.includes('Wifi')}
                                                onChange={handleChange}
                                            />
                                            Wifi
                                        </label>
                                        <label>
                                            <input
                                                type="checkbox"
                                                name="facilities"
                                                value="Balcony"
                                                checked={formData.facilities.includes('Balcony')}
                                                onChange={handleChange}
                                            />
                                            Balcony
                                        </label>
                                        <label>
                                            <input
                                                type="checkbox"
                                                name="facilities"
                                                value="Furniture"
                                                checked={formData.facilities.includes('Furniture')}
                                                onChange={handleChange}
                                            />
                                            Furniture
                                        </label>
                                        <label>
                                            <input
                                                type="checkbox"
                                                name="facilities"
                                                value="AC"
                                                checked={formData.facilities.includes('AC')}
                                                onChange={handleChange}
                                            />
                                            AC
                                        </label>
                                        <label>
                                            <input
                                                type="checkbox"
                                                name="facilities"
                                                value="Parking"
                                                checked={formData.facilities.includes('Parking')}
                                                onChange={handleChange}
                                            />
                                            Parking
                                        </label>
                                    </div>
                                </div>
                            <div className="form-group">
                        <label htmlFor="near">Near:</label>
                        <input
                            type="text"
                            id="near"
                            name="near"
                            value={formData.near}
                            onChange={handleChange}
                        />
                        {errors.near && <div className="error">{errors.near}</div>}
                        </div>
                                <div className="form-group">
                                    <label>Available For:</label>
                                    <div>
                                        <label>
                                            <input
                                                type="radio"
                                                name="availableFor"
                                                value="Girls"
                                                checked={formData.availableFor === 'Girls'}
                                                onChange={handleChange}
                                            />
                                            Girls
                                        </label>
                                        <label>
                                            <input
                                                type="radio"
                                                name="availableFor"
                                                value="Boys"
                                                checked={formData.availableFor === 'Boys'}
                                                onChange={handleChange}
                                            />
                                            Boys
                                        </label>
                                        <label>
                                            <input
                                                type="radio"
                                                name="availableFor"
                                                value="Family"
                                                checked={formData.availableFor === 'Family'}
                                                onChange={handleChange}
                                            />
                                            Family
                                        </label>
                                        <label>
                                            <input
                                                type="radio"
                                                name="availableFor"
                                                value="All"
                                                checked={formData.availableFor === 'All'}
                                                onChange={handleChange}
                                            />
                                            All
                                        </label>
                                    </div>
                                </div>
                            </>
                        )}
                        
                        {step === 4 && (
                            <>
       {/* <div className="form-group">
        <label htmlFor="location">Location:</label>
        <input
            type="text"
            id="location"
            name="location"
            value={formData.location}
            onChange={handleChange}
            className="form-control"
        />
    </div> */}

    <div className="form-group">
        <label>
            <input
                type="checkbox"
                name="currentlyAvailable"
                checked={formData.currentlyAvailable}
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
                                        value={formData.description}
                                        onChange={handleChange}
                                    />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="images">Upload Images:</label>
                                    <div className="upload-button-wrapper">
                                        <FaUpload />
                                        <input
                                            type="file"
                                            id="images"
                                            name="images"
                                            accept="image/*"
                                            multiple
                                            onChange={handleChange}
                                        />
                                    </div>
                                    <div className="image-preview-container">
                                    {previewImages.map((image, index) => (
                                        <img
                                            key={index}
                                            src={image}
                                            alt={`Preview ${index}`}
                                            className="image-preview"
                                        />
                                    ))}
                                </div>
                                </div>
                            </>
                        )}
                        <br />
                        <br />
                        <div className="form-navigation">
                            {step > 1 && <button type="button" onClick={handlePrevious}>Previous</button>}
                            {step < 4 && <button type="button" onClick={handleNext}>Next</button>}
                            {step === 4 && <button type="submit">Submit</button>}
                        </div>
                        <button className="back-to-dashboard-btn" onClick={handleBackToDashboard}>
                    Back to Dashboard
                </button>
                    </form>
                </div>
            </div>
        </>
    );
};

export default UploadDetail;
