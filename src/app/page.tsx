import Image from "next/image";
import avatarImage from "@/images/avatar.png";
import Link from "next/link";
import { FaArrowRight, FaInstagram, FaLinkedin } from "react-icons/fa";
import { CiMail } from "react-icons/ci";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-white">
      <div className="max-w-4xl w-full p-8">
        {" "}
        {/* Tambahkan padding */}
        <div className="flex flex-col items-start">
          {" "}
          {/* Align konten ke kiri */} {/* Tengah horizontal untuk gambar */}
          <Image src={avatarImage} alt="avatar-image" width={100} height={100} />
          <h1 className="text-3xl font-medium leading-snug text-left w-full">
            {" "}
            {/* Align text ke kiri */}
            Fikri Abdurrohim Ibnu Prabowo
          </h1>
          <h3 className="text-lg mt-2 text-left w-full">
            {" "}
            {/* Align text ke kiri */}
            <a href="https://maps.app.goo.gl/rFHYJ6q2KHHhnE3H7" target="_blank" className="me-2">
              Surakarta
            </a>
            |<span className="ms-2">Indonesia</span>
          </h3>
          <div className="mt-4 text-lg text-left w-full">
            {" "}
            {/* Align text ke kiri */}
            <p>Halo! 🖐🏻 anda bisa memanggil saya Abe, dan ini adalah situs pribadi saya, situs ini akan menampilkan beberapa pengalaman saya di bidang teknologi, terutama pemrograman.</p>
          </div>
          {/* social media */}
          <div className="mt-4 flex items-center gap-4">
            <Link href="https://www.instagram.com/ficrabdr/" target="_blank">
              <FaInstagram className="text-2xl text-black hover:text-gray-700 transition duration-200" />
            </Link>
            <Link href="https://www.linkedin.com/in/fikriabdurrohim/" target="_blank">
              <FaLinkedin className="text-2xl text-black hover:text-gray-700 transition duration-200" />
            </Link>
            <Link href="mailto:abdurrohim.i.p@gmail.com">
              <CiMail className="text-2xl text-black hover:text-gray-700 transition duration-200" />
            </Link>
          </div>
          <div className="mt-5 text-left w-full">
            {" "}
            {/* Align text ke kiri */}
            <h3 className="text-lg flex items-center gap-2 hover:underline">
              <Link href="/projects" className="flex items-center gap-2">
                Go to my projects
                <FaArrowRight />
              </Link>
            </h3>
          </div>
        </div>
      </div>
    </div>
  );
}
