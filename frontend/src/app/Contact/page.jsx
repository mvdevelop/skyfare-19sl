
"use client";
import React from 'react';

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleRight } from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";
import { faFacebookSquare, faInstagram, faXTwitter, faYoutube } from '@fortawesome/free-brands-svg-icons';

export default function Contact() {
  return (
    <>
        {/* Page Title */}
      <div className="section-banner px-[2%] sm:px-[8%] lg:px-[12%] py-[50px] lg:py-[90px] min-h-[450px] lg:min-h-[500px] z-20 relative">
        <h2 className="text-4xl font-normal z-10 relative text-white text-center w-full unbounded-font">
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

      {/* Contact Page */}
      <div className='contact-page px-[2%] sm:px-[8%] lg:px-[12%] py-[50px] lg:py-[90px]'>
        <div className='contact-section p-[50px] rounded-[20px] bg-[#0e0700] flex flex-col lg:flex-row'>
          <div className='w-[40%]'>
            <div className='contact-content mb-6'>
              <span className='uppercase text-[#7a7a7a]'>Office Address</span>
              <p className='text-[#ffffffb3] mt-3 text-[24px]'>Rio De Janeiro, RJ - Brazil. R. Alameda Santos, 9983 - 15th Floor</p>
            </div>
            <div className='contact-content mb-6'>
              <span className='uppercase text-[#7a7a7a]'>Office Phone Number</span>
              <p className='text-[#ffffffb3] mt-3 text-[24px]'>(+55) 21 1234-5678</p>
            </div>
            <div className='contact-content mb-6'>
              <span className='uppercase text-[#7a7a7a]'>Email Address</span>
              <p className='text-[#ffffffb3] mt-3 text-[24px]'>booking@skyfare.com</p>
            </div>
            <div className='contact-content'>
              <p className='mt-3 text-[24px] text-[#fff]'>Follow Our Social Media</p>
              <div className='contact-icons flex gap-3 mt-3'>
                <FontAwesomeIcon icon={faInstagram} className='text-[#ffffffb3] text-[22px] hover:text-white transition cursor-pointer' />
                <FontAwesomeIcon icon={faXTwitter} className='text-[#ffffffb3] text-[22px] hover:text-white transition cursor-pointer' />
                <FontAwesomeIcon icon={faFacebookSquare} className='text-[#ffffffb3] text-[22px] hover:text-white transition cursor-pointer' />
                <FontAwesomeIcon icon={faYoutube} className='text-[#ffffffb3] text-[22px] hover:text-white transition cursor-pointer' />
              </div>
            </div>
          </div>
          <div className='w-[60%]'>
            <form>
              <div className='mb-5'>
                <label className='text-sm text-[#fff] mb-2 uppercase'>Comments / Questions</label>
                <textarea rows='5' placeholder='Your Message Here' className='w-full p-3 rounded-[10px] border border-[#ffffff80] focus:outline-none mt-2 text-[#7a7a7a]'></textarea>
              </div>
              <div className='flex flex-col md:flex-row md:space-x-6 mb-5'>
                <div className='flex-1 mb-5 md:mb-0'>
                  <label className='text-sm text-[#fff] mb-2 uppercase'>Name</label>
                  <input type="text" placeholder='Your Name' className='w-full p-3 rounded-[10px] border border-[#ffffff80] focus:outline-none mt-2 text-[#7a7a7a]' />
                </div>
                <div className='flex-1 mb-5 md:mb-0'>
                  <label className='text-sm text-[#fff] mb-2 uppercase'>Email</label>
                  <input type="email" placeholder='Your Email Address' className='w-full p-3 rounded-[10px] border border-[#ffffff80] focus:outline-none mt-2 text-[#7a7a7a]' />
                </div>
              </div>
              <button type='submit' className='mt-5 uppercase w-full px-6 py-3 bg-[#fff] rounded-[50px] font-semibold cursor-pointer'>Send Message</button>
            </form>
          </div>
        </div>
      </div>

      <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d235198.68142636976!2d-43.44598205!3d-22.91413075!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x9bde559108a05b%3A0x50dc426c672fd24e!2sRio%20de%20Janeiro%2C%20RJ!5e0!3m2!1spt-BR!2sbr!4v1761874017185!5m2!1spt-BR!2sbr" width="100%" height="500" loading="lazy"></iframe>
    </>
  )
}
