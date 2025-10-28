
import React from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInstagram, faFacebook, faFlickr, faXTwitter, faYoutube } from '@fortawesome/free-brands-svg-icons';

import Link from 'next/link';

export default function Footer() {
  return (
    <>
      <div className='footer bg-black px-[2%] sm:px-[8%] pt-[50px] lg:pt-[90px]'>
        <div className='footer-content'>
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
          </div>
        </div>
      </div>
    </>
  )
}
