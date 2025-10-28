
"use client";
import React, { useState, useRef, useEffect } from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleDown, faAngleUp, faLocationDot } from '@fortawesome/free-solid-svg-icons';

import Image from 'next/image';
import Link from 'next/link';
import toursData from '../ToursData.json';

import about01 from '../../../public/images/about-01.webp';
import about02 from '../../../public/images/about-02.webp';
import about03 from '../../../public/images/about-03.webp';
import author01 from '../../../public/images/author-01.webp';
import author02 from '../../../public/images/author-02.webp';
import author03 from '../../../public/images/author-03.webp';
import author04 from '../../../public/images/author-04.webp';

import blogPage01 from '../../assets/Blog-Page-01.webp';
import blogPage02 from '../../assets/Blog-Page-02.webp';
import blogPage03 from '../../assets/Blog-Page-03.webp';

import user from '../../assets/user.png';

import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';

export default function Index() {

  const [ selectedTour, setSelectedTour ] = useState(null);

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
              <div className='autor-sec p-2'>
                <div className='flex -space-x-3'>
                  <Image src={author01} alt='Author01' className='w-12 h-12 rounded-full border-2 border-black' />
                  <Image src={author02} alt='Author02' className='w-12 h-12 rounded-full border-2 border-black' />
                  <Image src={author03} alt='Author03' className='w-12 h-12 rounded-full border-2 border-black' />
                  <Image src={author04} alt='Author04' className='w-12 h-12 rounded-full border-2 border-black' />
                </div>
                <h2 className='text-white mt-5 text-3xl'>1234 &nbsp; +</h2>
              </div>
              <div className='customers p-2'>
                <h1 className='text-white text-2xl mt-2 mb-3'>Customer Love The Tour Experience</h1>
                <p className='text-[#7a7a7a]'>Customers are thrilled with the unforgettable tour experience and the exceptional service from start to finish.</p>
              </div>
            </div>
            <div className='about-travel'>
              <Image src={about02} alt='About02' className='rounded-2xl mt-10 object-cover' />
            </div>
            <div className='about-place flex sm:flex-row flex-col items-start gap-5 mt-10'>
              <Image src={about03} alt='About03' className='rounded-2xl h-[350px] sm:w-[50%] w-full object-cover' />
              <div className='bg-[#000] text-white p-6 rounded-2xl flex justify-between gap-20 sm:w-[300px] w-full'>
                <div className='customers'>
                  <h1 className='text-white text-2xl mt-2 mb-3'>Join Our Asian Travel Trip</h1>
                  <p className='text-[#7a7a7a]'>Embark on an unforgettable journey across Asia and discover breathtaking destinations, rich culture, and amazing adventures.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Testimonial */}
      <div className='testimonials bg-[#0e0700] px-[2%] sm:px-[8%] lg:px-[12%] py-[50px] lg:py-[90px]'>
        <div className='pb-10 testimonials-content flex justify-between lg:flex-row gap-3 lg:gap-0 items-start w-full'>
          <h2 className='xl:w-[50%] w-full text-white text-4xl leading-tight unbounded-font'>Discover A Mesmerizing Nature Landscape & Stunning Culture</h2>
          <div className='xl:w-[50%] w-full'>
            <p className='text-[#ffffff91] pb-5 text-sm'>
              Explore breathtaking natural landscapes and immerse yourself in the vibrant, captivating cultures that make every moment unforgettable.
            </p>
            <button className='btn bg-white group text-[#193555] hover:bg-[#193555] font-bold px-6 w-auto py-4 rounded-full cursor-pointer transition-colors duration-300'>
              <Link href='#' className='unbounded-font text-sm xl:text-md uppercase group-hover:text-white transition-colors duration-300 tracking-wider'>
                Learn More
              </Link>
            </button>
          </div>
        </div>

        <Swiper spaceBetween={20} slidesPerView={3} breakpoints={{
          1199: { slidesPerView: 3 }, 767: { slidesPerView: 2 }, 575: { slidesPerView: 1 } 
        }} loop={true} >
          {/* <SwiperSlide>
            <div className='tst-item bg-[#191919] h-[250px] flex justify-center'>
              <p className='text-[#ffffff91]'>

              </p>
              <div className='tst-user flex items-start gap-3 mt-4'>
                <Image src={user} width={50} height={50} className='rounded-full' alt='User' />
                <div>
                  <h4 className='unbounded-font text-white font-semibold'></h4>
                  <p className='text-[#ffffff91] text-sm'>Designation</p>
                </div>
              </div>
            </div>
          </SwiperSlide> */}
          <SwiperSlide>
            <div className='tst-item bg-[#191919] h-[250px] flex flex-col justify-center p-5 rounded-2xl shadow-lg'>
              <p className='text-[#ffffff91] italic'>
              “This was one of the best travel experiences I’ve ever had. The team was professional, the destinations were stunning, and everything was perfectly organized.”
              </p>
              <div className='tst-user flex items-center gap-3 mt-4'>
                <Image src={user} width={50} height={50} className='rounded-full' alt='User' />
                <div>
                  <h4 className='unbounded-font text-white font-semibold'>Sarah Williams</h4>
                  <p className='text-[#ffffff91] text-sm'>Travel Enthusiast</p>
                </div>
              </div>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className='tst-item bg-[#191919] h-[250px] flex flex-col justify-center p-5 rounded-2xl shadow-lg'>
              <p className='text-[#ffffff91] italic'>
                “The trip was absolutely incredible! From breathtaking landscapes to delicious local food, every moment felt magical and well-planned.”
              </p>
              <div className='tst-user flex items-center gap-3 mt-4'>
                <Image src={user} width={50} height={50} className='rounded-full' alt='User' />
                <div>
                  <h4 className='unbounded-font text-white font-semibold'>Michael Carter</h4>
                  <p className='text-[#ffffff91] text-sm'>Adventure Traveler</p>
                </div>
              </div>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className='tst-item bg-[#191919] h-[250px] flex flex-col justify-center p-5 rounded-2xl shadow-lg'>
              <p className='text-[#ffffff91] italic'>
                “I was amazed by how seamless the entire experience was. The guides were friendly, the destinations were stunning, and the memories will last forever.”
              </p>
              <div className='tst-user flex items-center gap-3 mt-4'>
                <Image src={user} width={50} height={50} className='rounded-full' alt='User' />
                <div>
                  <h4 className='unbounded-font text-white font-semibold'>Emily Johnson</h4>
                  <p className='text-[#ffffff91] text-sm'>Globetrotter</p>
                </div>
              </div>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className='tst-item bg-[#191919] h-[250px] flex flex-col justify-center p-5 rounded-2xl shadow-lg'>
              <p className='text-[#ffffff91] italic'>
                “A truly unforgettable journey! I met wonderful people, explored hidden gems, and discovered cultures I had only dreamed of before.”
              </p>
              <div className='tst-user flex items-center gap-3 mt-4'>
                <Image src={user} width={50} height={50} className='rounded-full' alt='User' />
                <div>
                  <h4 className='unbounded-font text-white font-semibold'>Daniel Lee</h4>
                  <p className='text-[#ffffff91] text-sm'>Photographer</p>
                </div>
              </div>
            </div>
          </SwiperSlide>
        </Swiper>
      </div>

      {/* Blog */}
      <div className='blog px-[2%] sm:px-[8%] lg:px-[12%] py-[50px] lg:py-[90px]'>
        <div className='w-full pb-5'>
          <h1 className='unbounded-font text-4xl font-semibold pb-3'>Our Latest Blog</h1>
          <p className='text-[#193555]'>
            Read our latest blog posts and stay inspired with travel tips, destination guides, and exciting stories from around the world.
          </p>
        </div>

        <div className='blog-wrapper grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8'>
          <div className='blog-card'>
            <Image src={blogPage01} alt='BlogPage01' className='rounded-[20px]' />
            <h2 className='font-semibold text-lg sm:text-xl mt-6 unbounded-font mb-2'>Tropical Bliss: Rejuvenate in Asia's Idyllic Beaches</h2>
            <p className='text-[#7a7a7a] text-sm'>Escape to Asia’s most breathtaking beaches, where turquoise waters meet golden sands and gentle breezes calm your soul. Whether you’re lounging under palm trees, snorkeling through coral reefs, or watching the sunset over the ocean, these tropical paradises offer the perfect retreat for relaxation and renewal.</p>
          </div>
          <div className='blog-card'>
            <Image src={blogPage02} alt='BlogPage02' className='rounded-[20px]' />
            <h2 className='font-semibold text-lg sm:text-xl mt-6 unbounded-font mb-2'>Asia's Thrilling Adventures: Hiking, Trekking, and More</h2>
            <p className='text-[#7a7a7a] text-sm'>For those seeking excitement and challenge, Asia offers endless adventures across its majestic landscapes. From trekking through the Himalayas to exploring jungle trails and volcanic peaks, every journey promises unforgettable thrills, cultural encounters, and breathtaking views that reward every step you take.</p>
          </div>
          <div className='blog-card'>
            <Image src={blogPage03} alt='BlogPage03' className='rounded-[20px]' />
            <h2 className='font-semibold text-lg sm:text-xl mt-6 unbounded-font mb-2'>Unforgettable Experiences: Asia's Must-Visit Destinations</h2>
            <p className='text-[#7a7a7a] text-sm'>Discover Asia’s most iconic destinations that blend rich traditions, vibrant cities, and stunning natural beauty. Wander through ancient temples, savor authentic cuisine, and immerse yourself in the cultures that make each destination unique — creating memories that will stay with you forever.</p>
          </div>
        </div>
      </div>

      {/* Experience (FAQ) */}
      <div className='experience px-[2%] sm:px-[8%] lg:px-[12%] py-[50px] lg:py-[90px] bg-[#0e0700]'>
        <div className="experience-content flex justify-between lg:flex-row flex-col gap-3 lg:gap-0 items-start w-full">
          <h2 className='xl:w-[50%] w-full text-white text-2xl md:text-5xl leading-tight unbounded-font'>Enjoy Our Best Quality Tour & Experience</h2>
          <div className='xl:w-[40%] w-full'>
            <p className='text-[#ffffff91] pb-5 text-sm'>Discover unforgettable moments with our premium tours, designed to give you comfort, adventure, and authentic experiences every step of the way.</p>
            <button className="btn bg-white group text-[#193555] hover:bg-[#193555] font-bold px-6 w-auto py-4 rounded-full cursor-pointer transition-colors duration-300">
              <Link href='#' className='unbounded-font text-sm xl:text-md uppercase group-hover:text-white transition-colors duration-300 tracking-wider'>Learn More</Link>
            </button>
          </div>
        </div>
        
        <div className='grid grid-cols-1 gap-8 mt-10 mx-auto w-[100%] lg:mx-auto lg:w-[80%]'>
          {faqData.map((item, index) => {
            const isOpen = openIndex === index;
            const contentRef = useRef(null);
            const [ height, setHeight ] = useState(0);
            
            useEffect(() => {
              if (isOpen && contentRef.current) {
                setHeight(contentRef.current.scrollHeight);
              } else {
                setHeight(0);
              }
            }, [isOpen]);
            return (
              <div key={index} className='border-b border-gray-700'>
                <button onClick={() => toggle(index)} className='w-full cursor-pointer text-left flex justify-between items-center py-4 font-semibold text-white'> 
                  <span>{item.question}</span>
                  <FontAwesomeIcon icon={ isOpen ? faAngleUp : faAngleDown } className='ml-2' />
                </button>
                <div style={{ maxHeight: `${height}px` }} className='transition-all duration-500 ease-in-out overflow-hidden'>
                  <div ref={contentRef}>
                    <p className='text-gray-400 px-2 pb-4'>{item.answer}</p>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
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
