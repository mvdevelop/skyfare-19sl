
"use client";
import React, { useState, useRef, useEffect } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAngleRight,
  faAngleDown,
  faAngleUp,
} from "@fortawesome/free-solid-svg-icons";
import Image from "next/image";
import Link from "next/link";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";

import user from "../../assets/user.png";

export default function Faq() {
  const [openIndex, setOpenIndex] = useState(null);
  const [heights, setHeights] = useState([]);
  const contentRefs = useRef([]);

  const toggle = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  }

  const faqData = [
    {
      question: "1. What to prepare trip to Asia?",
      answer:
        "Start by researching your destinations, booking flights and accommodations in advance, and checking the weather to pack suitable clothes. Don’t forget essentials like travel insurance and local currency.",
    },
    {
      question: "2. What document you need before go to Asia?",
      answer:
        "You will need a valid passport, and depending on your nationality, a visa for certain countries. It’s also wise to carry copies of travel insurance, flight tickets, and hotel reservations.",
    },
    {
      question: "3. How to scheduling Asia trip itinerary?",
      answer:
        "Plan your itinerary by selecting key cities or attractions, then arrange them logically based on location and travel time. Include rest days and be flexible for unexpected adventures.",
    },
    {
      question: "4. 8 Website must read before your trip?",
      answer:
        "Check popular travel resources like TripAdvisor, Lonely Planet, Skyscanner, Booking.com, Expedia, Travel.state.gov, Culture Trip, and local tourism websites for updated tips and information.",
    },
    {
      question: "5. This is the best budget you need to prepare?",
      answer:
        "Your budget will depend on the countries you visit, but a moderate daily estimate ranges from $50 to $150, covering accommodation, food, transportation, and basic entertainment.",
    },
    {
      question: "6. This site give you the information about travel to Asia?",
      answer:
        "Our site provides detailed guides, travel tips, and recommendations to help you plan your journey to Asia with confidence and ease.",
    },
  ];

  useEffect(() => {
    const newHeights = contentRefs.current.map((ref) =>
      ref ? ref.scrollHeight : 0
    );
    setHeights(newHeights);
  }, []);

  return (
    <>
      {/* Page Title */}
      <div className="section-banner px-[2%] sm:px-[8%] lg:px-[12%] py-[50px] lg:py-[90px] min-h-[450px] lg:min-h-[500px] z-20 relative">
        <h2 className="text-6xl font-normal z-10 relative text-white text-center w-full unbounded-font">
          Faq's
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
              Faq's
            </Link>
          </li>
        </ul>
      </div>

      {/* Testimonial */}
      <div className="testimonials bg-[#0e0700] px-[2%] sm:px-[8%] lg:px-[12%] py-[50px] lg:py-[90px]">
        <div className="pb-10 testimonials-content flex justify-between lg:flex-row gap-3 lg:gap-0 items-start w-full">
          <h2 className="xl:w-[50%] w-full text-white text-4xl leading-tight unbounded-font">
            Discover A Mesmerizing Nature Landscape & Stunning Culture
          </h2>
          <div className="xl:w-[50%] w-full">
            <p className="text-[#ffffff91] pb-5 text-sm">
              Explore breathtaking natural landscapes and immerse yourself in
              the vibrant, captivating cultures that make every moment
              unforgettable.
            </p>
            <button className="btn bg-white group text-[#193555] hover:bg-[#193555] font-bold px-6 w-auto py-4 rounded-full cursor-pointer transition-colors duration-300">
              <Link
                href="#"
                className="unbounded-font text-sm xl:text-md uppercase group-hover:text-white transition-colors duration-300 tracking-wider"
              >
                Learn More
              </Link>
            </button>
          </div>
        </div>

        <Swiper
          spaceBetween={20}
          slidesPerView={3}
          breakpoints={{
            1199: { slidesPerView: 3 },
            767: { slidesPerView: 2 },
            575: { slidesPerView: 1 },
          }}
          loop={true}
        >
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
            <div className="tst-item bg-[#191919] h-[250px] flex flex-col justify-center p-5 rounded-2xl shadow-lg">
              <p className="text-[#ffffff91] italic">
                “This was one of the best travel experiences I’ve ever had. The
                team was professional, the destinations were stunning, and
                everything was perfectly organized.”
              </p>
              <div className="tst-user flex items-center gap-3 mt-4">
                <Image
                  src={user}
                  width={50}
                  height={50}
                  className="rounded-full"
                  alt="User"
                />
                <div>
                  <h4 className="unbounded-font text-white font-semibold">
                    Sarah Williams
                  </h4>
                  <p className="text-[#ffffff91] text-sm">Travel Enthusiast</p>
                </div>
              </div>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="tst-item bg-[#191919] h-[250px] flex flex-col justify-center p-5 rounded-2xl shadow-lg">
              <p className="text-[#ffffff91] italic">
                “The trip was absolutely incredible! From breathtaking
                landscapes to delicious local food, every moment felt magical
                and well-planned.”
              </p>
              <div className="tst-user flex items-center gap-3 mt-4">
                <Image
                  src={user}
                  width={50}
                  height={50}
                  className="rounded-full"
                  alt="User"
                />
                <div>
                  <h4 className="unbounded-font text-white font-semibold">
                    Michael Carter
                  </h4>
                  <p className="text-[#ffffff91] text-sm">Adventure Traveler</p>
                </div>
              </div>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="tst-item bg-[#191919] h-[250px] flex flex-col justify-center p-5 rounded-2xl shadow-lg">
              <p className="text-[#ffffff91] italic">
                “I was amazed by how seamless the entire experience was. The
                guides were friendly, the destinations were stunning, and the
                memories will last forever.”
              </p>
              <div className="tst-user flex items-center gap-3 mt-4">
                <Image
                  src={user}
                  width={50}
                  height={50}
                  className="rounded-full"
                  alt="User"
                />
                <div>
                  <h4 className="unbounded-font text-white font-semibold">
                    Emily Johnson
                  </h4>
                  <p className="text-[#ffffff91] text-sm">Globetrotter</p>
                </div>
              </div>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="tst-item bg-[#191919] h-[250px] flex flex-col justify-center p-5 rounded-2xl shadow-lg">
              <p className="text-[#ffffff91] italic">
                “A truly unforgettable journey! I met wonderful people, explored
                hidden gems, and discovered cultures I had only dreamed of
                before.”
              </p>
              <div className="tst-user flex items-center gap-3 mt-4">
                <Image
                  src={user}
                  width={50}
                  height={50}
                  className="rounded-full"
                  alt="User"
                />
                <div>
                  <h4 className="unbounded-font text-white font-semibold">
                    Daniel Lee
                  </h4>
                  <p className="text-[#ffffff91] text-sm">Photographer</p>
                </div>
              </div>
            </div>
          </SwiperSlide>
        </Swiper>
      </div>

      {/* Experience (FAQ) */}
      <div className="experience px-[2%] sm:px-[8%] lg:px-[12%] py-[50px] lg:py-[90px]">
        <div className="experience-content flex justify-between lg:flex-row flex-col gap-3 lg:gap-0 items-start w-full text-black">
          <h2 className="xl:w-[50%] w-full text-2xl md:text-5xl leading-tight unbounded-font">
            Enjoy Our Best Quality Tour & Experience
          </h2>
          <div className="xl:w-[40%] w-full">
            <p className="text-[#000000b3] pb-5 text-sm">
              Discover unforgettable moments with our premium tours, designed to
              give you comfort, adventure, and authentic experiences every step
              of the way.
            </p>
            <button className="btn bg-[#193555] group text-white hover:bg-white hover:text-[#193555] font-bold px-6 w-auto py-4 rounded-full cursor-pointer transition-colors duration-300">
              <Link
                href="#"
                className="unbounded-font text-sm xl:text-md uppercase group-hover:text-[#193555] transition-colors duration-300 tracking-wider"
              >
                Learn More
              </Link>
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-8 mt-10 mx-auto w-[100%] lg:mx-auto lg:w-[80%]">
          {faqData.map((item, index) => {
            const isOpen = openIndex === index;
            const contentRef = useRef(null);
            const [height, setHeight] = useState(0);

            useEffect(() => {
              if (isOpen && contentRef.current) {
                setHeight(contentRef.current.scrollHeight);
              } else {
                setHeight(0);
              }
            }, [isOpen]);

            return (
              <div key={index} className="border-b border-gray-300">
                <button
                  onClick={() => toggle(index)}
                  className="w-full cursor-pointer text-left flex justify-between items-center py-4 font-semibold text-black"
                >
                  <span>{item.question}</span>
                  <FontAwesomeIcon
                    icon={isOpen ? faAngleUp : faAngleDown}
                    className="ml-2"
                  />
                </button>
                <div
                  style={{ maxHeight: `${height}px` }}
                  className="transition-all duration-500 ease-in-out overflow-hidden"
                >
                  <div ref={contentRef}>
                    <p className="text-gray-700 px-2 pb-4">{item.answer}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}
