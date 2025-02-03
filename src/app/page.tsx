import React from "react";
import Image from "next/image";
import avatarImage from "@/images/avatar.png";
import Link from "next/link";
import { FaArrowRight, FaInstagram, FaLinkedin } from "react-icons/fa";
import { CiMail } from "react-icons/ci";
import { MapPin } from "lucide-react";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-white">
      <div className="max-w-4xl w-full p-8 space-y-8">
        <div className="flex flex-col items-start space-y-6">
          {/* Profile Image with hover effect */}
          <div className="relative group">
            <div className="absolute -inset-0.5 bg-gradient-to-r from-gray-200 to-gray-100 rounded-full opacity-75 group-hover:opacity-100 transition duration-300"></div>
            <div className="relative">
              <Image src={avatarImage} alt="avatar-image" width={120} height={120} className="rounded-full shadow-lg transform group-hover:scale-105 transition duration-300" />
            </div>
          </div>

          {/* Name with subtle animation */}
          <div className="space-y-2">
            <h1 className="text-4xl font-semibold text-gray-800 hover:text-gray-600 transition duration-300">Fikri Abdurrohim Ibnu Prabowo</h1>

            {/* Location with icon */}
            <div className="flex items-center space-x-2 text-gray-600">
              <MapPin className="w-5 h-5" />
              <a href="https://maps.app.goo.gl/rFHYJ6q2KHHhnE3H7" target="_blank" className="hover:text-gray-800 transition duration-200">
                Surakarta, Indonesia
              </a>
            </div>
          </div>

          {/* Introduction text */}
          <div className="prose prose-lg text-gray-700">
            <p className="leading-relaxed">Halo! 🖐🏻 anda bisa memanggil saya Abe, dan ini adalah situs pribadi saya, situs ini akan menampilkan beberapa pengalaman saya di bidang teknologi, terutama pemrograman.</p>
          </div>

          {/* Social media links with enhanced hover effects */}
          <div className="flex items-center space-x-6">
            <Link href="https://www.instagram.com/ficrabdr/" target="_blank" className="group">
              <FaInstagram className="text-3xl text-gray-600 group-hover:text-pink-600 transform group-hover:scale-110 transition duration-300" />
            </Link>
            <Link href="https://www.linkedin.com/in/fikriabdurrohim/" target="_blank" className="group">
              <FaLinkedin className="text-3xl text-gray-600 group-hover:text-blue-600 transform group-hover:scale-110 transition duration-300" />
            </Link>
            <Link href="mailto:abdurrohim.i.p@gmail.com" className="group">
              <CiMail className="text-3xl text-gray-600 group-hover:text-red-600 transform group-hover:scale-110 transition duration-300" />
            </Link>
          </div>

          {/* Projects link with animation */}
          <Link href="/projects" className="group inline-flex items-center space-x-2 px-6 py-3 bg-gray-50 hover:bg-gray-100 rounded-lg transition duration-300">
            <span className="text-gray-700 group-hover:text-gray-900">Go to my projects</span>
            <FaArrowRight className="text-gray-600 group-hover:text-gray-900 transform group-hover:translate-x-1 transition duration-300" />
          </Link>
        </div>
      </div>
    </div>
  );
}
