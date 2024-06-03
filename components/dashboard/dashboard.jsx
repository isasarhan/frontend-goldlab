'use client'
import React, { useEffect, useState } from 'react'
import MainMenu from '../mainMenu'
import Link from 'next/link'
import Cookies from 'js-cookie'
import MenuIcon from '@mui/icons-material/Menu';
import { FaRegUserCircle } from 'react-icons/fa'
import './dashboard.css'
import { ClickAwayListener, IconButton } from '@mui/material'
import useWindowWidth from '@/hooks/useWindowWidth'
import { useRouter } from "next/navigation";
const Dashboard = ({ children }) => {
    const [showCanvas, setShowCanvas] = useState(false)
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [id, setId] = useState();
    const width = useWindowWidth()
    const router = useRouter()
    const logout = () => {
        Cookies.remove("currentUser");
        setIsLoggedIn(false);
        router.push("/auth/login");
        router.refresh();
    };
    const getUser = () => {
        const user = JSON.parse(Cookies.get("currentUser")).data;
        if (user)
            setId(user.id);
    };
    const toggleShowCnavas = () => {
        setShowCanvas(!showCanvas)
    }
    useEffect(() => {
        if (Cookies.get("currentUser")) {
            const user = JSON.parse(Cookies.get("currentUser")).data;
            setId(user.id);
            setIsLoggedIn(true)
        }
    }, [isLoggedIn, router.pathname])
    return (
        <div className='mainDashboard '>

            <nav className="navbar navbar-expand-lg bg-body-tertiary bg-common">
                <ClickAwayListener
                    onClickAway={() => {
                        setShowCanvas(false);
                    }}
                >
                    <div className="container-fluid">
                        <div className='d-flex align-items-center pt-2 pb-2' >
                            <button className="navbar-toggler me-2" type="button" onClick={toggleShowCnavas} data-bs-toggle="collapse"
                                data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false"
                                aria-label="Toggle navigation">
                                <span className="navbar-toggler-icon"></span>
                            </button>
                            {width < 768 ? <Link className='navbar-brand ' href={'/'}>GOLD LAB MANAGEMENT SYSTEM</Link> : ''}
                        </div>
                        <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
                            <div className="navbar-nav w-100  align-items-center">
                                <IconButton onClick={toggleShowCnavas}>
                                    <MenuIcon />
                                </IconButton>
                                <Link className='navbar-brand text-white' href={'/'}>GOLD LAB MANAGEMENT SYSTEM</Link>

                                <div className="d-flex  align-items-center w-100 ">
                                    <div className='ms-auto d-flex align-items-center'>
                                        <Link href={`/users/${id}`} className="nav-link active p-2">
                                            <FaRegUserCircle onClick={getUser} size="25px" color='white' />
                                        </Link>
                                        <button className="btn btn-dark ">
                                            <Link href="/auth/register" >
                                                Register
                                            </Link>
                                        </button>
                                        {isLoggedIn ? <button className="btn btn-danger " onClick={logout}>
                                            Logout
                                        </button> :
                                            <button className="btn btn-success ">
                                                <Link href="/auth/login" >
                                                    Sign In
                                                </Link>
                                            </button>
                                        }
                                    </div>

                                </div>
                            </div>
                        </div>
                    </div>
                </ClickAwayListener>
            </nav>
            <div className={`offcanvas offcanvas-start w-auto  ${showCanvas ? 'show' : ''}`} tabIndex="-1"
                id="offcanvasExample" aria-labelledby="offcanvasExampleLabel">
                <div className="offcanvas-header">
                    <h5 className="offcanvas-title" id="offcanvasScrollingLabel">Menu</h5>
                    <button type="button" className="btn-close" data-bs-dismiss="offcanvas" aria-label="Close" onClick={toggleShowCnavas}></button>
                </div>
                <div className="offcanvas-body">
                    <MainMenu />
                </div>
            </div>
        </div>
    )
}

export default Dashboard