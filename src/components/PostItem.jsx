import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';

const PostItem = () => {
    const [formData, setFormData] = useState({
        option: '',
        itemName: '',
        date: '',
        location: '',
        photo: null,
        email: '',
        phoneNumber: '',
    });

    const [isSubmitting, setIsSubmitting] = useState(false);
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value, files } = e.target;
        setFormData({
            ...formData,
            [name]: files ? files[0] : value,
        });
    };

    const validateForm = () => {
        const phoneRegex = /^\d{10}$/;
        const emailRegex = /\S+@\S+\.\S+/;

        if (!phoneRegex.test(formData.phoneNumber)) {
            alert('Please enter a valid 10-digit phone number');
            return false;
        }

        if (!emailRegex.test(formData.email)) {
            alert('Please enter a valid email address');
            return false;
        }

        if (!formData.date) {
            alert('Please select a date');
            return false;
        }

        return true;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validateForm()) return;

        const formDataToSend = new FormData();
        Object.entries(formData).forEach(([key, value]) => {
            if (key !== 'photo' || value) {
                formDataToSend.append(key, value);
            }
        });

        setIsSubmitting(true);
        try {
            const response = await fetch('http://localhost:8080/postitem', {
                method: 'POST',
                body: formDataToSend,
            });

            if (response.ok) {
                alert('Item posted successfully');
                navigate('/home');
            } else {
                const error = await response.json();
                alert(`Error posting item: ${error.message}`);
            }
        } catch (error) {
            console.error('Error posting item:', error);
            alert('Error posting item');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="min-h-screen w-screen overflow-x-hidden bg-[#2d3137] flex flex-col">
            <Navbar />
            <div className="flex flex-col items-center justify-center px-4 py-8">
                <div className="w-full max-w-lg bg-gray-800 p-6 rounded-lg shadow-md">
                    <h2 className="text-white text-2xl font-bold mb-4 text-center">
                        Post Lost or Found Item
                    </h2>
                    <form
                        className="flex flex-col gap-4"
                        onSubmit={handleSubmit}
                    >
                        {/* Option Select */}
                        <div>
                            <label className="text-white text-sm font-medium">
                                Choose an option
                            </label>
                            <select
                                className="w-full mt-1 p-2 rounded-md text-gray-800 focus:ring-2 focus:ring-blue-500"
                                name="option"
                                value={formData.option}
                                onChange={handleChange}
                                required
                            >
                                <option value="">Select</option>
                                <option value="LOST">LOST</option>
                                <option value="FOUND">FOUND</option>
                            </select>
                        </div>

                        {/* Item Name */}
                        <div>
                            <label className="text-white text-sm font-medium">
                                Item Name
                            </label>
                            <input
                                type="text"
                                name="itemName"
                                placeholder="Enter Item Name"
                                value={formData.itemName}
                                onChange={handleChange}
                                className="w-full mt-1 p-2 rounded-md focus:ring-2 focus:ring-blue-500"
                                required
                            />
                        </div>

                        {/* Date */}
                        <div>
                            <label className="text-white text-sm font-medium">
                                Date Lost/Found
                            </label>
                            <input
                                type="date"
                                name="date"
                                value={formData.date}
                                onChange={handleChange}
                                className="w-full mt-1 p-2 rounded-md focus:ring-2 focus:ring-blue-500"
                                required
                            />
                        </div>

                        {/* Location */}
                        <div>
                            <label className="text-white text-sm font-medium">
                                Location
                            </label>
                            <input
                                type="text"
                                name="location"
                                placeholder="Enter Location"
                                value={formData.location}
                                onChange={handleChange}
                                className="w-full mt-1 p-2 rounded-md focus:ring-2 focus:ring-blue-500"
                                required
                            />
                        </div>

                        {/* Photo Upload */}
                        {formData.option === 'LOST' && (
                            <div>
                                <label className="text-white text-sm font-medium">
                                    Upload Photo (optional)
                                </label>
                                <input
                                    type="file"
                                    name="photo"
                                    onChange={handleChange}
                                    className="w-full mt-1 p-2"
                                />
                            </div>
                        )}

                        {/* Email */}
                        <div>
                            <label className="text-white text-sm font-medium">
                                Email
                            </label>
                            <input
                                type="email"
                                name="email"
                                placeholder="Enter your email"
                                value={formData.email}
                                onChange={handleChange}
                                className="w-full mt-1 p-2 rounded-md focus:ring-2 focus:ring-blue-500"
                                required
                            />
                        </div>

                        {/* Phone Number */}
                        <div>
                            <label className="text-white text-sm font-medium">
                                Phone Number
                            </label>
                            <input
                                type="text"
                                name="phoneNumber"
                                placeholder="Enter your phone number"
                                value={formData.phoneNumber}
                                onChange={handleChange}
                                className="w-full mt-1 p-2 rounded-md focus:ring-2 focus:ring-blue-500"
                                required
                            />
                        </div>

                        {/* Submit Button */}
                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className="w-full py-2 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50"
                        >
                            {isSubmitting ? 'Posting...' : 'Post Item'}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default PostItem;
