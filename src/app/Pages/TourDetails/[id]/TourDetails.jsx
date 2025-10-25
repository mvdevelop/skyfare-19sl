
"use client";
import React from 'react';

import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleRight, faClose, faLocationDot, faUser, faUsers } from '@fortawesome/free-solid-svg-icons';
import Image from 'next/image';

import toursData from '../../../ToursData.json';
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
          Wildness of Paris
        </h2>
        <ul className="text-white z-10 flex items-center gap-8 section-list">
          <li className='text-sm relative'>
            <Link href='/'>Home</Link>
          </li>
          <li className='text-sm relative'>
            <FontAwesomeIcon icon={faAngleRight} className='absolute -left-6 top-0.5'/>
            <Link href='/'>Home</Link>
          </li>
        </ul>
      </div>
    </>
  )
}
