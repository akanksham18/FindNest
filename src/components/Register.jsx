import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Register = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate(); // Use this hook for navigation

    const submitForm = (e) => {
        e.preventDefault();
        console.log("Hello");

        fetch('http://localhost:8080/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, password }), // Send actual email and password
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                return response.json();
            })
            .then((data) => {
                console.log(data);
                navigate('/home'); // Corrected usage of navigate
                setEmail('');
                setPassword('');
            })
            .catch((err) => console.error(err)); // Log any errors
    };

    return (
        <div className='flex justify-center items-center h-screen'>
            <form onSubmit={submitForm} className='flex tracking-wider text-white rounded-lg bg-[#202122] flex-col gap-[25px] p-8 text-center'>
                <h1 className='text-3xl text-center'>Register</h1>
                <input
                    type='email'
                    className='outline-none p-2 bg-gray-700 rounded-md text-white placeholder:text-white'
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder='Enter Email'
                    value={email}
                />
                <input
                    type='password'
                    className='outline-none p-2 bg-gray-700 rounded-md text-white placeholder:text-white'
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder='Enter Password'
                    value={password}
                />
                <span>
                    Have an account?{' '}
                    <button
                        type='button'
                        className='outline-none hover:bg-[#2c323c] text-white bg-[#24272d] py-1 px-2 rounded-md'
                    >
                        <Link to='/login'>Login</Link>
                    </button>
                </span>
                <button type='submit'
                    className='flex hover:bg-[#2c323c] flex-row justify-center items-center text-white outline-none bg-gray-700 p-1 rounded-md'>
                    REGISTER
                </button>
            </form>
        </div>
    );
};

export default Register;
