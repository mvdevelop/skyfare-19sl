
"use client";
import React, { useState } from 'react';

import about01 from '../../../public/images/about-01.webp';
import about02 from '../../../public/images/about-02.webp';
import about03 from '../../../public/images/about-03.webp';
import author01 from '../../../public/images/author-01.webp';
import author02 from '../../../public/images/author-02.webp';
import author03 from '../../../public/images/author-03.webp';
import author04 from '../../../public/images/author-04.webp';

import tourCompany01 from '../../../public/images/Tour-Company-01.webp';
import tourCompany02 from '../../../public/images/Tour-Company-02.webp';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDoorClosed, faMoneyBillWave, faShieldHalved, faAngleRight, faAngleDown, faAngleUp, faPlay } from '@fortawesome/free-solid-svg-icons';

import adventure01 from '../../../public/images/adventure-01.webp';
import Link from 'next/link';

export default function About() {

  const [ openIndex, setOpenIndex ] = useState(null);

  const toggle = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  }

  const faqData = [
    { question: "1. What to prepare trip to Asia?", answer: "Start by researching your destinations, booking flights and accommodations in advance, and checking the weather to pack suitable clothes. Don’t forget essentials like travel insurance and local currency." },
    { question: "2. What document you need before go to Asia?", answer: "You will need a valid passport, and depending on your nationality, a visa for certain countries. It’s also wise to carry copies of travel insurance, flight tickets, and hotel reservations." },
    { question: "3. How to scheduling Asia trip itinerary?", answer: "Plan your itinerary by selecting key cities or attractions, then arrange them logically based on location and travel time. Include rest days and be flexible for unexpected adventures."},
    { question: "4. 8 Website must read before your trip?", answer: "Check popular travel resources like TripAdvisor, Lonely Planet, Skyscanner, Booking.com, Expedia, Travel.state.gov, Culture Trip, and local tourism websites for updated tips and information." },
    { question: "5. This is the best budget you need to prepare?", answer: "Your budget will depend on the countries you visit, but a moderate daily estimate ranges from $50 to $150, covering accommodation, food, transportation, and basic entertainment." },
    { question: "6. This site give you the information about travel to Asia?", answer: "Our site provides detailed guides, travel tips, and recommendations to help you plan your journey to Asia with confidence and ease." }
  ];

  return (
    <>
      <div className='section-banner px-[2%] sm:px-[8%] lg:px-[12%] py-[50px] lg:py-[90px] min-h-[450px] lg:min-h-[500px] z-20 relative'>
        <h2 className='text-4xl font-normal z-10 relative text-white text-center w-full unbounded-font'>
          {/* {tour.title} */}
        </h2>
        <ul className="text-white z-10 flex items-center gap-8 section-list">
          <li className='text-sm relative'>
            <Link href='#'>Home</Link>
          </li>
          <li className='text-sm relative'>
            <FontAwesomeIcon icon={faAngleRight} className='absolute -left-6 top-0.5'/>
            <Link href='#' className=''>About</Link>
          </li>
        </ul>
      </div>
    </>
  )
}
