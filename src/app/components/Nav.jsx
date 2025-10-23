
"use client";
import React, { useEffect, useState } from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faUser, faBars, faTimes, faPhone } from '@fortawesome/free-solid-svg-icons';
import { faFacebook, faFlickr } from '@fortawesome/free-brands-svg-icons';
import { faXTwitter } from '@fortawesome/free-brands-svg-icons/faXTwitter';

export default function Nav() {

    const [ isOpen, setIsOpen ] = useState(false);
    const [ isScrolled, setIsScrolled ] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 80);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <>
            <nav className={`navbar fixed top-0 left-0 w-full z-50 transition-all duration-500 ease-in-out ${isScrolled ? "shadow-md bg-white py-3 scrolled" : "py-0"}`}>
                {/* Nav Top (hidden on scroll with transition) */}
                <div className={`nav-top w-full flex justify-between items-center gap-3 px-[2%] sm:px-[8%] lg:px-[12%] overflow-hidden transition-all duration-500 ease-in-out ${isScrolled ? "max-h-0 opacity-0 py-0" : "max-h-[200px] opacity-100 py-3"}`}>
                    <ul className='hidden lg:flex items-center gap-3 text-[#727272]'>
                        <li className='text-sm'>
                            <FontAwesomeIcon icon={faPhone} className='pr-1 text-[#8192a0]' />
                            <span>+55 54 0352 3524</span>
                        </li>
                        <li className='text-sm'>
                            <FontAwesomeIcon icon={faEnvelope} className='pr-1 text-[#8192a0]' />
                            <span>booking@skyfare.com</span>
                        </li>
                    </ul>

                    <div className='flex items-center justify-between lg:justify-center gap-3 text-[#727272] w-full lg:w-auto'>
                        <ul className='flex items-center gap-3'>
                            <li><FontAwesomeIcon icon={faFacebook} className='text-[#8192a0]'/></li>
                            <li><FontAwesomeIcon icon={faFlickr} className='text-[#8192a0]'/></li>
                            <li><FontAwesomeIcon icon={faXTwitter} className='text-[#8192a0]'/></li>
                        </ul>
                        <ul className='flex items-center gap-4 ps-3'>
                            <li className='lg:text-md text-sm cursor-pointer'>
                                <i className="ri-lock-line pr-1 text-[#8192a0]"></i>
                                <span>Login</span>
                            </li>
                            <li className='lg:text-md text-sm cursor-pointer'>
                                <FontAwesomeIcon icon={faUser} className='text-[#8192a0]'/>
                                <span>Sign Up</span>
                            </li>
                        </ul>
                    </div>
                </div>

                {/* Main Nav Menu */}
                <div className={`w-full px-[2%] sm:px-[8%] lg:px-[12%]`}>
                    
                </div>
            </nav>
        </>
    )
}
