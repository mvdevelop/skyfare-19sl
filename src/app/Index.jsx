
"use client";
import React, { useState } from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLocationDot } from '@fortawesome/free-solid-svg-icons';

import Image from 'next/image';
import Link from 'next/link';
import toursData from './ToursData.json';

import about01 from '../../public/images/about-01.webp';
import about02 from '../../public/images/about-02.webp';
import about03 from '../../public/images/about-03.webp';
import author01 from '../../public/images/author-01.webp';
import author02 from '../../public/images/author-02.webp';
import author03 from '../../public/images/author-03.webp';
import author04 from '../../public/images/author-04.webp';
import blogPage01 from '../assets/Blog-Page-01.webp';
import blogPage02 from '../assets/Blog-Page-02.webp';
import blogPage03 from '../assets/Blog-Page-03.webp';

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
                <h1 className='text-2xl xl:text-4xl font-bold mb-4'>Begin Your New Life Experience With Exploring New Destination</h1>
                <p className='mb-3 w-[90%] text-[#7a7a7a] text-sm'>Beginning a new life experience often starts with the courage to explore new destinations. Traveling allows you to step out of your comfort zone and discover different cultures, traditions, and perspectives.</p>
                <p className='w-[90%] text-[#7a7a7a] text-sm'>Each journey introduces you to new people, unique landscapes, and unforgettable memories that help shape who you are. Exploring new places can be a transformative experience that broadens your understanding of the world and yourself, inspiring personal growth and a deeper appreciation for diversity.</p>
              </div>
              <div className='about-image mt-8 hidden lg:flex'>
                <Image src={about01} alt='About01' className='rounded-r-2xl w-[45%] h-[600px] object-cover absolute left-0' />
              </div>
            </div>
          </div>
          <div className='lg:w-[50%]'>
            <div className='bg-[#000] text-white p-6 rounded-2xl flex md:flex-row justify-between md:gap-20'>
              <div className='autor-sec'>
                <div className='flex -space-x-3'>
                  <Image src={author01} alt='Author01' className='w-12 h-12 rounded-full border-2 border-black' />
                  <Image src={author02} alt='Author02' className='w-12 h-12 rounded-full border-2 border-black' />
                  <Image src={author03} alt='Author03' className='w-12 h-12 rounded-full border-2 border-black' />
                  <Image src={author04} alt='Author04' className='w-12 h-12 rounded-full border-2 border-black' />
                </div>
                <h2 className='text-white mt-5 text-3xl'>1234 &nbsp; +</h2>
              </div>
              <div className='customers'>
                <h1 className='text-white text-2xl mt-2 mb-3'>Customer Love The Tour Experience</h1>
                <p className='text-[#7a7a7a]'>Customers are thrilled with the unforgettable tour experience and the exceptional service from start to finish.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
