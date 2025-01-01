import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const navigate = useNavigate();

    const submitForm = async (e) => {
        e.preventDefault();
        setMessage('');

        try {
            const response = await fetch('http://localhost:8080/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            });

            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            const data = await response.json();
            setMessage(data.message || 'Login successful!');

            // Assuming successful login, navigate to the home page
            navigate('/home');
        } catch (error) {
            setMessage(`Error: ${error.message}`);
        }
    };

    return (
        <div className="flex justify-center items-center h-screen">
            <form
                onSubmit={submitForm}
                className="flex tracking-wider text-white rounded-lg bg-[#202122] flex-col gap-[25px] p-8 text-center"
            >
                <h1 className="text-3xl text-center">Login</h1>

                <input
                    type="text"
                    className="outline-none p-2 bg-gray-700 rounded-md text-white placeholder:text-white"
                    placeholder="Enter Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />

                <input
                    type="password"
                    className="outline-none p-2 bg-gray-700 rounded-md text-white placeholder:text-white"
                    placeholder="Enter Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />

                <span>
                    Don't have an account?{' '}
                    <button type="button" className="outline-none hover:bg-[#2c323c] text-white bg-gray-700 py-1 px-2 rounded-md">
                        <Link to="/">Register</Link>
                    </button>
                </span>

                <button
                    type="submit"
                    className="flex hover:bg-[#2c323c] flex-row justify-center items-center text-white outline-none bg-gray-700 p-1 rounded-md"
                >
                    LOGIN
                </button>

                {message && (
                    <p className="mt-4 text-sm text-red-500">{message}</p>
                )}
            </form>
        </div>
    );
};

export default Login;