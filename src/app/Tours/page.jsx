
import React from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleRight } from "@fortawesome/free-solid-svg-icons";

import Link from "next/link";

export default function Tours() {
  return (
    <>
      {/* Page Title */}
      <div className="section-banner px-[2%] sm:px-[8%] lg:px-[12%] py-[50px] lg:py-[90px] min-h-[450px] lg:min-h-[500px] z-20 relative">
        <h2 className="text-4xl font-normal z-10 relative text-white text-center w-full unbounded-font">
          Tours
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
              Tours
            </Link>
          </li>
        </ul>
      </div>
    </>
  );
}
