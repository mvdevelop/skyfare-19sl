
import React from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleRight, faLocationDot } from "@fortawesome/free-solid-svg-icons";

import Image from "next/image";
import Link from "next/link";

import toursData from "../ToursData.json";

export default function Tours() {
  return (
    <>
      {/* Page Title */}
      <div className="section-banner px-[2%] sm:px-[8%] lg:px-[12%] py-[50px] lg:py-[90px] min-h-[450px] lg:min-h-[500px] z-20 relative">
        <h2 className="text-6xl font-normal z-10 relative text-white text-center w-full unbounded-font">
          Tours
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
              Tours
            </Link>
          </li>
        </ul>
      </div>

      {/* Tours */}
      <div className="travel px-[2%] sm:px-[8%] lg:px-[12%] py-[80px] lg:py-[120px] flex flex-col gap-10 lg:gap-14">
        {/* <div className="travel-content text-center">
          <h1 className="unbounded-font text-4xl font-semibold pb-3">
            Find Out The Best Travel Choice in Asia
          </h1>
          <p className="w-[60%] mx-auto text-[#193555]">
            Choosing the best travel spot depends on what kind of adventure
            you’re looking for. For culture and history lovers, places like
            Kyoto in Japan or Siem Reap in Cambodia reveal centuries of
            tradition and art.
          </p>
        </div> */}

        <div className="travel-wrapper grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-3 gap-6">
          {toursData.map((tour) => (
            <Link href={`/TourDetails/${tour.id}`} key={tour.id}>
              <div className="travel-item rounded-xl overflow-hidden relative group transition-all duration-300">
                <Image
                  src={tour.image}
                  width={400}
                  height={300}
                  alt={tour.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />

                <div className="travel-content absolute bottom-0 left-0 flex justify-between items-center w-full p-3 z-10 text-white bg-gradient-to-t from-black/70 to-transparent">
                  <div>
                    <h2 className="text-xl font-semibold unbounded-font pb-1">
                      {tour.title}
                    </h2>
                    <p className="text-[#ffffff91] text-xs flex items-center gap-1">
                      <FontAwesomeIcon icon={faLocationDot} />
                      {tour.location}
                    </p>
                  </div>
                  <h4 className="text-xl font-semibold unbounded-font text-right">
                    <span className="text-[#ffffff91] text-xs font-normal">
                      Start From
                    </span>{" "}
                    <br />
                    {tour.price}
                  </h4>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </>
  );
}
