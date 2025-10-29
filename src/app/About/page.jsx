
"use client";
import React, { useState } from "react";

import about01 from "../../../public/images/about-01.webp";
import about02 from "../../../public/images/about-02.webp";
import about03 from "../../../public/images/about-03.webp";
import author01 from "../../../public/images/author-01.webp";
import author02 from "../../../public/images/author-02.webp";
import author03 from "../../../public/images/author-03.webp";
import author04 from "../../../public/images/author-04.webp";

import tourCompany01 from "../../../public/images/Tour-Company-01.webp";
import tourCompany02 from "../../../public/images/Tour-Company-02.webp";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDoorClosed, faMoneyBillWave, faShieldHalved, faAngleRight, faAngleDown, faAngleUp, faPlay } from "@fortawesome/free-solid-svg-icons";

import adventure01 from "../../../public/images/adventure-01.webp";
import Link from "next/link";
import Image from "next/image";

export default function About() {
  const [openIndex, setOpenIndex] = useState(null);

  const toggle = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

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

  return (
    <>
      <div className="section-banner px-[2%] sm:px-[8%] lg:px-[12%] py-[50px] lg:py-[90px] min-h-[450px] lg:min-h-[500px] z-20 relative">
        <h2 className="text-4xl font-normal z-10 relative text-white text-center w-full unbounded-font">
          About Us
        </h2>
        <ul className="text-white z-10 flex items-center gap-8 section-list">
          <li className="text-sm relative">
            <Link href="#">Home</Link>
          </li>
          <li className="text-sm relative">
            <FontAwesomeIcon
              icon={faAngleRight}
              className="absolute -left-6 top-0.5"
            />
            <Link href="#" className="">
              About
            </Link>
          </li>
        </ul>
      </div>

      {/* About Page */}
      <div className="about py-[50px] lg:py-[90px] px-[2%] sm:px-[8%] lg:px-[12%]">
        <div className="flex flex-col lg:flex-row w-full gap-5 lg:gap-0">
          <div className="lg:w-[50%]">
            <div className="about-section flex flex-col">
              <div className="about-heading lg:px-[12%]">
                <h1 className="text-2xl xl:text-4xl font-bold mb-4">
                  Begin Your New Life Experience With Exploring New Destination
                </h1>
                <p className="mb-3 w-[90%] text-[#7a7a7a] text-sm">
                  Beginning a new life experience often starts with the courage
                  to explore new destinations. Traveling allows you to step out
                  of your comfort zone and discover different cultures,
                  traditions, and perspectives.
                </p>
                <p className="w-[90%] text-[#7a7a7a] text-sm">
                  Each journey introduces you to new people, unique landscapes,
                  and unforgettable memories that help shape who you are.
                  Exploring new places can be a transformative experience that
                  broadens your understanding of the world and yourself,
                  inspiring personal growth and a deeper appreciation for
                  diversity.
                </p>
              </div>
              <div className="about-image mt-8 hidden lg:flex">
                <Image
                  src={about01}
                  alt="About01"
                  className="rounded-r-2xl w-[45%] h-[600px] object-cover absolute left-0"
                />
              </div>
            </div>
          </div>
          <div className="lg:w-[50%]">
            <div className="bg-[#000] text-white p-6 rounded-2xl flex md:flex-row justify-between md:gap-20">
              <div className="autor-sec p-2">
                <div className="flex -space-x-3">
                  <Image
                    src={author01}
                    alt="Author01"
                    className="w-12 h-12 rounded-full border-2 border-black"
                  />
                  <Image
                    src={author02}
                    alt="Author02"
                    className="w-12 h-12 rounded-full border-2 border-black"
                  />
                  <Image
                    src={author03}
                    alt="Author03"
                    className="w-12 h-12 rounded-full border-2 border-black"
                  />
                  <Image
                    src={author04}
                    alt="Author04"
                    className="w-12 h-12 rounded-full border-2 border-black"
                  />
                </div>
                <h2 className="text-white mt-5 text-3xl">1234 &nbsp; +</h2>
              </div>
              <div className="customers p-2">
                <h1 className="text-white text-2xl mt-2 mb-3">
                  Customer Love The Tour Experience
                </h1>
                <p className="text-[#7a7a7a]">
                  Customers are thrilled with the unforgettable tour experience
                  and the exceptional service from start to finish.
                </p>
              </div>
            </div>
            <div className="about-travel">
              <Image
                src={about02}
                alt="About02"
                className="rounded-2xl mt-10 object-cover"
              />
            </div>
            <div className="about-place flex sm:flex-row flex-col items-start gap-5 mt-10">
              <Image
                src={about03}
                alt="About03"
                className="rounded-2xl h-[350px] sm:w-[50%] w-full object-cover"
              />
              <div className="bg-[#000] text-white p-6 rounded-2xl flex justify-between gap-20 sm:w-[300px] w-full">
                <div className="customers">
                  <h1 className="text-white text-2xl mt-2 mb-3">
                    Join Our Asian Travel Trip
                  </h1>
                  <p className="text-[#7a7a7a]">
                    Embark on an unforgettable journey across Asia and discover
                    breathtaking destinations, rich culture, and amazing
                    adventures.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Tour Company */}
      <div className='tour-company px-[2%] sm:px-[8%] lg:px-[12%] py-[50px] lg:py-[90px] flex flex-col items-center justify-center'>
        <div className='tour-content'>
          <h1 className='text-3xl lg:text-5xl text-center font-semibold mb-5'>We Are The Most popular <br /> Travel & Tour Company</h1>
          <p className='text-[#7a7a7a] text-center text-[15px]'>We take pride in offering exceptional travel experiences that create lasting memories for our customers. And we are committed to continuously improving our services to meet their evolving needs.</p>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 mt-15">
          <div className="flex gap-6 p-[20px] border-1 border-[#ececec] rounded-2xl">
            <div className='tour-icon'>
              <i className='ri-map-2-line text-white text-2xl'></i>
            </div>
            <div className='tour-text'>
              <h2 className='font-semibold text-2xl'>928 +</h2>
              <span className='text-[#7a7a7a]'>Travel Destination</span>
            </div>
          </div>
          <div className="flex gap-6 p-[20px] border-1 border-[#ececec] rounded-2xl">
            <div className='tour-icon'>
              <i className='ri-map-2-line text-white text-2xl'></i>
            </div>
            <div className='tour-text'>
              <h2 className='font-semibold text-2xl'>1020 +</h2>
              <span className='text-[#7a7a7a]'>Tour Partner</span>
            </div>
          </div>
          <div className="flex gap-6 p-[20px] border-1 border-[#ececec] rounded-2xl">
            <div className='tour-icon'>
              <i className='ri-map-2-line text-white text-2xl'></i>
            </div>
            <div className='tour-text'>
              <h2 className='font-semibold text-2xl'>540 +</h2>
              <span className='text-[#7a7a7a]'>Hotel & Accommodation</span>
            </div>
          </div>
        </div>
        <div className='flex flex-col lg:flex-row gap-4 mt-10'>
          <div className="w-full lg:w-2/3">
            <Image src={tourCompany01} alt='tour-company-01' className="rounded-2xl" />
          </div>
          <div className="w-full lg:w-2/3">
            <Image src={tourCompany02} alt='tour-company-02' className="rounded-2xl" />
          </div>
        </div>
      </div>
    </>
  );
}
