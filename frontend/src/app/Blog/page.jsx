
"use client";
import React from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleRight } from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";

import Image from "next/image";
import blogPage01 from '../../assets/Blog-Page-01.webp';
import blogPage02 from '../../assets/Blog-Page-02.webp';
import blogPage03 from '../../assets/Blog-Page-03.webp';
import blogPage04 from '../../assets/Blog-Page-04.webp';
import blogPage05 from '../../assets/Blog-Page-05.webp';
import blogPage06 from '../../assets/Blog-Page-06.webp';

export default function Blog() {
  return (
    <>
      {/* Page Title */}
      <div className="section-banner px-[2%] sm:px-[8%] lg:px-[12%] py-[50px] lg:py-[90px] min-h-[450px] lg:min-h-[500px] z-20 relative">
        <h2 className="text-6xl font-normal z-10 relative text-white text-center w-full unbounded-font">
          Blog
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
              Blog
            </Link>
          </li>
        </ul>
      </div>

      {/* Blog */}
      <div className="blog px-[2%] sm:px-[8%] lg:px-[12%] py-[50px] lg:py-[90px]">
        {/* <div className="w-full pb-5">
          <h1 className="unbounded-font text-4xl font-semibold pb-3">
            Our Latest Blog
          </h1>
          <p className="text-[#193555]">
            Read our latest blog posts and stay inspired with travel tips,
            destination guides, and exciting stories from around the world.
          </p>
        </div> */}

        <div className="blog-wrapper grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8">
          <div className="blog-card">
            <Image
              src={blogPage01}
              alt="BlogPage01"
              className="rounded-[20px]"
            />
            <h2 className="font-semibold text-lg sm:text-xl mt-6 unbounded-font mb-2">
              Tropical Bliss: Rejuvenate in Asia's Idyllic Beaches
            </h2>
            <p className="text-[#7a7a7a] text-sm">
              Escape to Asia’s most breathtaking beaches, where turquoise waters
              meet golden sands and gentle breezes calm your soul. Whether
              you’re lounging under palm trees, snorkeling through coral reefs,
              or watching the sunset over the ocean, these tropical paradises
              offer the perfect retreat for relaxation and renewal.
            </p>
          </div>
          <div className="blog-card">
            <Image
              src={blogPage02}
              alt="BlogPage02"
              className="rounded-[20px]"
            />
            <h2 className="font-semibold text-lg sm:text-xl mt-6 unbounded-font mb-2">
              Asia's Thrilling Adventures: Hiking, Trekking, and More
            </h2>
            <p className="text-[#7a7a7a] text-sm">
              For those seeking excitement and challenge, Asia offers endless
              adventures across its majestic landscapes. From trekking through
              the Himalayas to exploring jungle trails and volcanic peaks, every
              journey promises unforgettable thrills, cultural encounters, and
              breathtaking views that reward every step you take.
            </p>
          </div>
          <div className="blog-card">
            <Image
              src={blogPage03}
              alt="BlogPage03"
              className="rounded-[20px]"
            />
            <h2 className="font-semibold text-lg sm:text-xl mt-6 unbounded-font mb-2">
              Unforgettable Experiences: Asia's Must-Visit Destinations
            </h2>
            <p className="text-[#7a7a7a] text-sm">
              Discover Asia’s most iconic destinations that blend rich
              traditions, vibrant cities, and stunning natural beauty. Wander
              through ancient temples, savor authentic cuisine, and immerse
              yourself in the cultures that make each destination unique —
              creating memories that will stay with you forever.
            </p>
          </div>
          <div className="blog-card">
            <Image
              src={blogPage04}
              alt="BlogPage04"
              className="rounded-[20px]"
            />
            <h2 className="font-semibold text-lg sm:text-xl mt-6 unbounded-font mb-2">
              Timeless Journeys: Discover the Spirit of Asia
            </h2>
            <p className="text-[#7a7a7a] text-sm">
              Experience the soul of Asia through breathtaking landscapes, ancient heritage, and modern wonders. From serene temples to bustling markets, each journey unveils the region’s charm and invites you to connect deeply with its people and traditions. Are you ready to embark on a timeless adventure?
            </p>
          </div>
          <div className="blog-card">
            <Image
              src={blogPage05}
              alt="BlogPage05"
              className="rounded-[20px]"
            />
            <h2 className="font-semibold text-lg sm:text-xl mt-6 unbounded-font mb-2">
              Hidden Treasures: Explore Asia’s Secret Escapes
            </h2>
            <p className="text-[#7a7a7a] text-sm">
              Step off the beaten path and uncover Asia’s best-kept secrets. Discover tranquil islands, misty mountains, and vibrant local cultures where authenticity thrives — offering a travel experience that feels personal, peaceful, and truly unforgettable. We invite you to explore these hidden gems and create your own unique adventure.
            </p>
          </div>
          <div className="blog-card">
            <Image
              src={blogPage06}
              alt="BlogPage06"
              className="rounded-[20px]"
            />
            <h2 className="font-semibold text-lg sm:text-xl mt-6 unbounded-font mb-2">
              Cultural Wonders: Embrace Asia’s Timeless Beauty
            </h2>
            <p className="text-[#7a7a7a] text-sm">
              Immerse yourself in Asia’s rich cultural tapestry, where ancient traditions coexist with modern life. From the intricate art of tea ceremonies to the vibrant celebrations of local festivals, each experience invites you to appreciate the region’s diverse heritage and artistic expressions.
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
