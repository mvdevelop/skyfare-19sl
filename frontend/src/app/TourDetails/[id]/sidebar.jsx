
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
            <button type='button' className='btn text-white bg-[#193555] w-full font-bold py-4 rounded-md cursor-pointer transition-colors duration-300 mt-5' onClick={() => setShowForm(true)}>
                <Link href='#' className='text-sm xl:text-md uppercase transition-colors duration-300 tracking-wider'>Book Now</Link>
            </button>
            <h4 className='text-lg font-semibold mt-5 pb-2'>Recommendation Tours</h4>
            <Swiper spaceBetween={20} slidesPerView={1} pagination={{ clickable : true }} navigation className='travel-wrapper'>
                {toursData.map((tour) => (
                    <SwiperSlide key={tour.id}>
                        <Link href={`/TourDetails/${tour.id}`} key={tour.id}>
                            <div className='travel-item rounded-xl overflow-hidden relative group transition-all duration-300'>
                                <Image src={tour.image} width={400} height={300} alt={tour.title} className='w-full h-full object-cover group-hover:scale-110 transition-transform duration-500' />
                            
                                <div className='travel-content absolute bottom-0 left-0 flex justify-between items-center w-full p-3 z-10 text-white bg-gradient-to-t from-black/70 to-transparent'>
                                    <div>
                                        <h2 className='text-xl font-semibold unbounded-font pb-1'>
                                            {tour.title}
                                        </h2>
                                        <p className='text-[#ffffff91] text-xs flex items-center gap-1'>
                                            <FontAwesomeIcon icon={faLocationDot} />
                                            {tour.location}
                                        </p>
                                    </div>
                                    <h4 className='text-xl font-semibold unbounded-font text-right'>
                                        <span className='text-[#ffffff91] text-xs font-normal'>
                                            Start From
                                        </span> {" "}
                                        <br />
                                        {tour.price}
                                    </h4>
                                </div>
                            </div>
                        </Link>
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>

        {/* Booking Form */}
        {/* {showForm && ()} */}
    </>
    )
}
