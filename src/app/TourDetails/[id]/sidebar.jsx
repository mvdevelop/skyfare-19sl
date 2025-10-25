
"use client";
import React, { useState } from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleRight, faClose, faLocationDot, faUser, faUsers } from '@fortawesome/free-solid-svg-icons';
import Link from 'next/link';
import Image from 'next/image';

import toursData from '../../ToursData.json';

import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';

export default function sidebar({ tour }) {

    const [ showForm, setShowForm ] = useState(false);

    return (
    <>
        <div className='xl:w-[30%] lg:w-[40%] w-full h-full sticky top-0 right-0 border-2 border-gray-100 rounded-md py-5 px-3'>
            <h4 className='text-lg font-semibold pb-1'>Date:</h4>
            <form method='post'>
                <div className='flex items-center gap-2 mt-5'>
                    <label className='text-md font-[500]'>Adult:</label>
                    <div className='relative w-full'>
                        <FontAwesomeIcon icon={faUser} className='absolute top-3.5 left-2' />
                        <input type="number" placeholder='5' className='border-2 border-gray-100 outline-0 rounded-md' />
                    </div>
                </div>
                <div className='flex items-center gap-2 mt-5'>
                    <label className='text-md font-[500]'>Child:</label>
                    <div className='relative w-full'>
                        <FontAwesomeIcon icon={faUsers} className='absolute top-3.5 left-2' />
                        <input type="number" placeholder='1' className='border-2 border-gray-100 outline-0 rounded-md' />
                    </div>
                </div>
            </form>
            <button type='button' className='btn text-white bg-[#193555] font-bold py-4 rounded-md cursor-pointer transition-colors duration-300 mt-5' onClick={() => setShowForm(true)}>
                <Link href='#' className='text-sm xl:text-md uppercase transition-colors duration-300 tracking-wider'>Book Now</Link>
            </button>
        </div>
    </>
    )
}
