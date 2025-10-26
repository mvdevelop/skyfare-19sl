
//"use client";
import React from 'react';

import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleRight, faClose, faLocationDot, faUser, faUsers } from '@fortawesome/free-solid-svg-icons';
import Image from 'next/image';

import toursData from '../../ToursData.json';
import { notFound } from 'next/navigation';
import BookingSidebar from './sidebar';  

export default async function ToursDetails({params}) {

  const { id } = await params;
  const tour = toursData.find((t) => t.id.toString() === id);

  if (!tour) return notFound();

  return (
    <>
      <div className='section-banner px-[2%] sm:px-[8%] lg:px-[12%] py-[50px] lg:py-[90px] min-h-[450px] lg:min-h-[500px] z-20 relative'>
        <h2 className='text-4xl font-normal z-10 relative text-white text-center w-full unbounded-font'>
          {tour.title}
        </h2>
        <ul className="text-white z-10 flex items-center gap-8 section-list">
          <li className='text-sm relative'>
            <Link href='#'>Home</Link>
          </li>
          <li className='text-sm relative'>
            <FontAwesomeIcon icon={faAngleRight} className='absolute -left-6 top-0.5'/>
            <Link href='#' className=''>TourDetails</Link>
          </li>
        </ul>
      </div>

      <div className='tour-details-container w-full flex flex-col lg:flex-row justify-between items-start px-[2%] sm:px-[8%] lg:px-[12%] py-[50px] lg:py-[90px] gap-5 relative'>
        <div className='xl:w-[70%] lg:w-[60%] w-full relative'>
          <div className='relative w-full h-[400px]'>
            <Image src={tour.mainImage} alt={tour.title} fill className='object-cover rounded-xl' />
          </div>
          <div className='tour-details-content pt-4'>
            <div className='flex justify-between items-center'>
              <div>
                <h2 className='text-xl sm:text-3xl font-[500] pb-1'>{tour.title}</h2>
                <span className='text-[#94a3b8] text-sm'>
                  <FontAwesomeIcon icon={faLocationDot} />
                  {tour.location}
                </span>
              </div>
              <h4 className='text-xl font-semibold unbounded-font text-right'>
                <span className='text-gray-500 text-xs font-normal'>
                  Start from
                </span>
                <br />
                {tour.price}
              </h4>
            </div>

            <h4 className='text-lg sm:text-xl font-semibold pb-3 pt-4'>Tour Descriptions:</h4>
            <p className='text-[#94a3b8] text-sm pb-2'>
              This is a wonderful trip to {tour.title}, located in {tour.location}. Enjoy the culture, food, and breathtaking sights. Price starts from{" "}
              {tour.price}.
            </p>
            <p className='text-[#94a3b8] text-sm pb-2'>
              Experience an unforgettable adventure where every moment brings something new — from vibrant local traditions to stunning natural landscapes. Whether you’re seeking relaxation, excitement, or discovery, this destination has it all.
            </p>
            <h4 className='text-lg sm:text-xl font-semibold pb-4 pt-4'>Leave A Comment:</h4>
            <form className="contact-form w-full">
              <div className='w-full gap-3 flex items-center flex-col mb-5'>
                <div className='flex flex-col w-full'>
                  <label className='pb-1 text-md font-[500]'>Your Name:</label>
                  <input type="text" placeholder='Name :' className='border-2 border-gray-100 outline-0 rounded-md' required />
                </div>
                <div className='flex flex-col w-full'>
                  <label className='pb-1 text-md font-[500]'>Your Email:</label>
                  <input type="text" placeholder='Email :' className='border-2 border-gray-100 outline-0 rounded-md' required />
                </div>
                <div className='flex flex-col'>
                  <label className='pb-1 text-md font-[500]'>Your Comment:</label>
                  <textarea placeholder='Message :' className='border-2 border-gray-100 outline-0 rounded-md' required />
                </div>
                <button type='submit' className='btn text-white bg-[#193555] w-full font-bold px-6 py-4 rounded-md cursor-pointer transition-colors duration-300 mt-5'>
                  <Link href='#' className='text-sm xl:text-md uppercase transition-colors duration-300 tracking-wider'>Send Message</Link>
                </button>
              </div>
            </form>
          </div>
        </div>

        <BookingSidebar tour={tour} />
      </div>
    </>
  )
}
