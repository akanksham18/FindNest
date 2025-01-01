import React from 'react'
import { Link } from 'react-router-dom';
import { CgProfile } from "react-icons/cg";
import { IoMdLogOut } from "react-icons/io";
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
    const navigate = useNavigate();
    const handleLogout = () => {
        localStorage.removeItem('userToken');
        console.log("Logout Successfully");
        navigate('/login')
    }
    return (
        <div className='flex items-center justify-between px-20 py-3'>
            <h1 className='text-2xl text-white font-bold cursor-pointer'>FindNest</h1>
            <nav className='flex text-md  justify-between items-center'>
                <ul className='flex flex-row gap-16 justify-center items-center'>
                    {/* <li><input type="text" name="" id="" className='border-[2px] rounded-md outline-none p-[1px]' placeholder='Search' /></li> */}
                    <li className='text-white cursor-pointer'><Link to="/postitem">Post Item </Link></li>
                    {/* <li className='cursor-pointer text-white'><CgProfile size={"20px"} /></li> */}
                    <li className='cursor-pointer text-white' onClick={handleLogout}><IoMdLogOut size={"20px"} /></li>
                </ul>
            </nav>
        </div>
    )
}

export default Navbar