
"use client";
import React from 'react';

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleRight } from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";

export default function Contact() {
  return (
    <>
        {/* Page Title */}
      <div className="section-banner px-[2%] sm:px-[8%] lg:px-[12%] py-[50px] lg:py-[90px] min-h-[450px] lg:min-h-[500px] z-20 relative">
        <h2 className="text-6xl font-normal z-10 relative text-white text-center w-full unbounded-font">
          Contact
        </h2>
        <ul className="text-white z-10 flex items-center gap-8 section-list">
          <li className="text-sm relative">
            <Link href="/">Home</Link>
          </li>
          <li className="text-sm relative">
            <FontAwesomeIcon
              icon={faAngleRight}
              className="absolute -left-6 top-0.5"
            />
            <Link href="#" className="">
              Contact
            </Link>
          </li>
        </ul>
      </div>

      {/* Contact Banner */}
      <div className='contact-banner flex justify-center items-center'>
        <div className="contact-banner-content relative text-center">
          <h1 className='xl:text-5xl lg:text-7xl text-4xl unbounded-font font-bold text-white'>
            Get Closer With Us & <br /> Get Special promo
          </h1>
          <p className='pt-6 text-[#ffffffb3] pb-10 text-center'></p>
          <button className='btn bg-white group text-[#193555] hover:bg-[#193555] font-bold px-6 w-auto py-4 rounded-full cursor-pointer transition-colors duration-300'>
            <Link href='#' className='unbounded-font text-md xl:text-xl uppercase group-hover:text-white transition-colors duration-300 tracking-wider'>
              Contact Us
            </Link>
          </button>
        </div>
      </div>
    </>
  )
}
