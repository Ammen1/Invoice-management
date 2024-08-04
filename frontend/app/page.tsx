"use client";

import Image from "next/image";
import Link from "next/link";
import LandingPage from '@/components/LandingPage';

const Home = ({ searchParams }: SearchParamProps) => {

  return (
    <div>
    <div className="flex  ">      
     <div className=" ">
        <LandingPage />

          <div className="text-14-regular mt-20 flex justify-between">
            <p className="justify-items-end text-dark-600 xl:text-left">
              © 2024 Lepton Games
            </p>
          </div>
        </div>
   
    </div>
    </div>
  );
};

export default Home;
