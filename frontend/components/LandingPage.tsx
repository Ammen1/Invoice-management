"use client"; // Add this line

import Link from 'next/link';
import Image from 'next/image';

const LandingPage = () => {
  return (
    <div>
      {/* Hero Section */}
      <section className="text-white h-screen  flex flex-col justify-center items-center text-center">
        <div className="mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-bold mb-20 ">Manage Your Invoices Effortlessly</h1>
          <Link href="/invoices" className="  bg-gradient-to-r from-indigo-500 to-pink-600 via-orange-700 text-white px-6 py-3 rounded-lg text-lg hover:bg-blue-600">
            Get Your Invoices
          </Link>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 text-white">
        <div className=" mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-8">Features</h2>
          <div className="flex flex-wrap -mx-4">
            <div className="w-full md:w-1/3 px-4 mb-8">
              <div className="p-6  rounded-lg shadow-md">
                <Image
                  src="/assets/gifs/success.gif"
                  height={50}
                  width={50}
                  alt="Feature 1"
                  className="mb-4"
                />
                <h3 className="text-xl font-semibold mb-2">Easy Invoicing</h3>
                <p>Create and send invoices with a few clicks. Customize templates to match your brand.</p>
              </div>
            </div>
            <div className="w-full md:w-1/3 px-4 mb-8">
              <div className="p-6 rounded-lg shadow-md">
                <Image
                  src="/assets/gifs/success.gif"
                  height={50}
                  width={50}
                  alt="Feature 2"
                  className="mb-4"
                />
                <h3 className="text-xl font-semibold mb-2">Real-time Tracking</h3>
                <p>Keep track of invoice statuses and get notified when they’re viewed or paid.</p>
              </div>
            </div>
            <div className="w-full md:w-1/3 px-4 mb-8">
              <div className="p-6 rounded-lg shadow-md">
                <Image
                  src="/assets/gifs/success.gif"
                  height={50}
                  width={50}
                  alt="Feature 3"
                  className="mb-4"
                />
                <h3 className="text-xl font-semibold mb-2">Secure and Reliable</h3>
                <p>Your data is protected with top-notch security measures. Access your invoices anytime, anywhere.</p>
              </div>
            </div>
          </div>
        </div>
      </section> 
    </div>
  );
};

export default LandingPage;
