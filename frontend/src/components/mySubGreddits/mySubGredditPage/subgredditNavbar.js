import AccountBoxIcon from '@mui/icons-material/AccountBox';
import LogoutIcon from '@mui/icons-material/Logout';
import PeopleIcon from '@mui/icons-material/People';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import QueryStatsIcon from '@mui/icons-material/QueryStats';
import RequestQuoteIcon from '@mui/icons-material/RequestQuote';
import HistoryIcon from '@mui/icons-material/History';
import ReportIcon from '@mui/icons-material/Report';
import React from 'react';
import { useNavigate, NavLink, Outlet, useParams } from 'react-router-dom';

function SubGredditNavbar() {
    const { name } = useParams()
    const SubGredditpage = "/mySubGreddits/" + name
    return (
        <div>
            <div className='nav'>
                <NavLink to={'/logout'}><LogoutIcon className='icon' /></NavLink>
                <NavLink to={'/profile'}><AccountBoxIcon className='icon' /></NavLink>
                <NavLink to={'/mySubGreddits'}><MenuBookIcon className='icon' /></NavLink>
                <NavLink to={SubGredditpage}><HistoryIcon className='icon' /></NavLink>
                <NavLink to={'users'}><PeopleIcon className='icon' /></NavLink>
                <NavLink to={'stats'}><QueryStatsIcon className='icon' /></NavLink>
                <NavLink to={'requests'}><RequestQuoteIcon className='icon' /></NavLink>
                <NavLink to={'reports'}><ReportIcon className='icon' /></NavLink>
            </div>
            <main>
                <Outlet />
            </main>
        </div >

    )
}

export default SubGredditNavbar
