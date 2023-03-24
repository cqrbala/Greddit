import AccountBoxIcon from '@mui/icons-material/AccountBox';
import LogoutIcon from '@mui/icons-material/Logout';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import ConnectWithoutContactIcon from '@mui/icons-material/ConnectWithoutContact';
import BookmarkAddedIcon from '@mui/icons-material/BookmarkAdded';
import React from 'react';
import { useNavigate, NavLink, Outlet } from 'react-router-dom';

function Navbar() {
    return (
        <div>
            <div className='nav'>
                <NavLink to={'/logout'}><LogoutIcon className='icon' /></NavLink>
                <NavLink to={'/profile'}><AccountBoxIcon className='icon' /></NavLink>
                <NavLink to={'/SubGreddits'}><ConnectWithoutContactIcon className='icon' /></NavLink>
                <NavLink to={'/mySubGreddits'}><MenuBookIcon className='icon' /></NavLink>
                <NavLink to={'/savedposts'}><BookmarkAddedIcon className='icon' /></NavLink>
            </div>
            <main>
                <Outlet />
            </main>
        </div >

    )
}

export default Navbar
