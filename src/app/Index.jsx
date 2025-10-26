
"use client";
import React, { useState } from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLocationDot } from '@fortawesome/free-solid-svg-icons';

import Image from 'next/image';
import Link from 'next/link';
import toursData from './ToursData.json';

export default function Index() {

  const [ selectedTour, setSelectedTour ] = useState(null);

  return (
    <>
      {/* Hero */}
      <div className='hero h-screen min-h-screen flex justify-center items-center z-10'>
        <div className='hero-content relative text-center'>
          <h1 className='xl:text-8xl lg:text-7xl md:text-6xl text-4xl unbounded-font font-bold text-white'>Find Your Best <br /> travels Package</h1>
          <p className='pt-3 text-[#ffffffb3] md:pb-10 pb-5'>
            Planning for a trip ? We will organize your trip with the best places and within best budget!
          </p>
          <button className='btn bg-white group text-[#193555] hover:bg-[#193555] font-bold px-6 w-auto py-4 rounded-full cursor-pointer transition-colors duration-300'>
            <Link href="#" className='unbounded-font text-sm xl:text-md uppercase group-hover:text-white transition-colors duration-300 tracking-wider'>
              View All Tours
            </Link>
          </button>
        </div>
      </div>

      {/* Tours */}
      <div className='travel px-[2%] sm:px-[8%] lg:px-[12%] py-[80px] lg:py-[120px] flex flex-col gap-10 lg:gap-14'>
        <div className='travel-content text-center'>
          <h1 className='unbounded-font text-4xl font-semibold pb-3'>
            Find Out The Best Travel Choice in Asia
          </h1>
          <p className='w-[60%] mx-auto text-[#193555]'>
            Choosing the best travel spot depends on what kind of adventure you’re looking for. For culture and history lovers, places like Kyoto in Japan or Siem Reap in Cambodia reveal centuries of tradition and art.
          </p>
        </div>

        <div className='travel-wrapper grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6'>{toursData.map((tour) => (
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
        ))}</div>
      </div>

      {/* About */}
      <div className='about py-[50px] lg:py-[90px] px-[2%] sm:px-[8%] lg:px-[12%]'>
        <div className='flex flex-col lg:flex-row w-full gap-5 lg:gap-0'>
          <div className='lg:w-[50%]'>
            <div className='about-section flex flex-col'>
              <div className='about-heading lg:px-[12%]'>
                <h1 className='text-2xl xl:text-4xl font-bold mb-4'>Begin Your</h1>
                <p className='mb-3 w-[90%] text-[#7a7a7a] text-sm'>Lorem</p>
                <p className='w-[90%] text-[#7a7a7a] text-sm'>Lorem</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
