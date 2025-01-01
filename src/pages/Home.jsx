import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';

const Home = () => {
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchItems = async () => {
            try {
                const response = await fetch('http://localhost:8080/items');
                if (response.ok) {
                    const data = await response.json();
                    setItems(data);
                } else {
                    setError('Failed to fetch items');
                }
            } catch (error) {
                setError('Error fetching items. Please try again later.');
            } finally {
                setLoading(false);
            }
        };

        fetchItems();
    }, []);

    return (
        <div className='relative min-h-screen overflow-hidden px-[50px]'>
            {/* Sticky Navbar */}
            <div className="absolute top-0 left-0 w-full z-50">
                <Navbar />
            </div>
            {/* Add padding to avoid overlap */}
            <div className="bg-[#2d3137] p-6 min-h-screen pt-20 overflow-hidden">
                <h1 className="text-white text-2xl mb-4 text-center">Posted Items</h1>
                {loading ? (
                    <p className="text-white text-center">Loading...</p>
                ) : error ? (
                    <p className="text-red-500 text-center">{error}</p>
                ) : items.length === 0 ? (
                    <p className="text-white text-center">No items found.</p>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 overflow-hidden">
                        {items.map((item, index) => (
                            <div
                                key={item._id || index}
                                className="p-4 bg-white rounded-md shadow-md flex flex-col"
                            >
                                <h2 className="text-lg font-bold">{item.itemName}</h2>
                                <p className="text-gray-700">{item.option}</p>
                                <p className="text-gray-700">{item.location}</p>
                                <p className="text-gray-500">
                                    {new Date(item.date).toLocaleDateString()}
                                </p>
                                {item.photo ? (
                                    <img
                                        src={item.photo} // Base64 string from the API
                                        alt={item.itemName}
                                        className="h-40 w-full object-cover rounded-md mt-2"
                                    />
                                ) : (
                                    <p className="italic text-gray-500">No image available</p>
                                )}

                                <p className="text-gray-700">Contact: {item.email}</p>
                                <p className="text-gray-700">Phone: {item.phoneNumber}</p>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Home;
