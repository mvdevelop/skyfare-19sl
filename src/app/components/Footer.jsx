
import React from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInstagram, faFacebook, faFlickr, faXTwitter, faYoutube } from '@fortawesome/free-brands-svg-icons';

import Link from 'next/link';

export default function Footer() {
  return (
    <>
      <div className='footer bg-black px-[2%] sm:px-[8%] pt-[50px] lg:pt-[90px]'>
        <div className='footer-content pb-5'>
          <div className='grid grid-cols-1 lg:grid-cols-12 gap-10'>
            <div className='lg:col-span-3'>
              <div className='text-white logo text-2xl uppercase font-semibold'>
                <Link href='#' className='unbounded-font'>
                  Sky<span className='unbounded-font'>Fare</span>
                </Link>
              </div>
              <p className='mt-4 text-[#ffffffb3]'>
                Rio De Janeiro, RJ - Brazil. R. Alameda Santos, 9983 - 15th Floor
              </p>

              <div className='footer-icons flex gap-3 mt-5'>
                <FontAwesomeIcon icon={faInstagram} className='text-[#ffffffb3] text-[20px] hover:text-white transition cursor-pointer' />
                <FontAwesomeIcon icon={faXTwitter} className='text-[#ffffffb3] text-[20px] hover:text-white transition cursor-pointer' />
                <FontAwesomeIcon icon={faFacebook} className='text-[#ffffffb3] text-[20px] hover:text-white transition cursor-pointer' />
                <FontAwesomeIcon icon={faYoutube} className='text-[#ffffffb3] text-[20px] hover:text-white transition cursor-pointer' />
              </div>
            </div>

            <div className='lg:col-span-9 grid grid-cols-1 md:grid-cols-12 gap-10'>

              <div className='md:col-span-3 space-y-3'>
                <h2 className='text-white text-2xl unbounded-font mb-6'>Page</h2>
                <ul className='space-y-2 list-none'>
                  <li><Link href='#' className='text-[#ffffffb3] hover:text-white transition-colors duration-300'>About Us</Link></li>
                  <li><Link href='#' className='text-[#ffffffb3] hover:text-white transition-colors duration-300'>Services</Link></li>
                  <li><Link href='#' className='text-[#ffffffb3] hover:text-white transition-colors duration-300'>FAQ</Link></li>
                  <li><Link href='#' className='text-[#ffffffb3] hover:text-white transition-colors duration-300'>Contact Us</Link></li>
                </ul>
              </div>
              <div className='md:col-span-3 space-y-3'>
                <h2 className='text-white text-2xl unbounded-font mb-6'>Links</h2>
                <ul className='space-y-2 list-none'>
                  <li><Link href='#' className='text-[#ffffffb3] hover:text-white transition-colors duration-300'>Privacy Policy</Link></li>
                  <li><Link href='#' className='text-[#ffffffb3] hover:text-white transition-colors duration-300'>Career</Link></li>
                  <li><Link href='#' className='text-[#ffffffb3] hover:text-white transition-colors duration-300'>Blog</Link></li>
                  <li><Link href='#' className='text-[#ffffffb3] hover:text-white transition-colors duration-300'>Term & Condition</Link></li>
                </ul>
              </div>

              <div className='md:col-span-6 space-y-3 max-w-md'>
                <h2 className='text-white text-2xl unbounded-font mb-6'>Our Newsletter</h2>
                <p className='text-[#ffffffb3] text-sm'>
                  Subscribe to our newsletter for the latest updates and offers.
                </p>
                <form className='flex items-center border border-[#ffffff4d] rounded-full mt-4 overflow-hidden'>
                  <input type="email" placeholder="Your Email Address" className="flex-1 w-full px-4 py-3 text-sm bg-transparent text-white placeholder-white/70 font-semibold focus:outline-none focus:ring-2 focus:ring-white/60" />
                  <button className="w-full sm:w-auto bg-white cursor-pointer text-black font-semibold px-6 py-3 hover:bg-gray-200 transition-all duration-200"> SIGN UP </button>
                </form>
              </div>
            </div>
          </div>
        </div>
        <div className='border-t border-[#ffffff33] mt-12 py-8'>
          <p className='mt-3 md:mt-0 text-[#ffffff99] text-center'>
            © Copyright 2025 SkyFare. All Rights Reserved by <Link href='#' className='font-bold text-white'>19SL</Link>
          </p>
        </div>
      </div>
    </>
  )
}
