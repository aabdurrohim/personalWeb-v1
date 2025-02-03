import Image from "next/image";
import avatarImage from "@/images/avatar.png";
import Link from "next/link";
import { FaArrowRight, FaInstagram, FaLinkedin } from "react-icons/fa";
import { CiMail } from "react-icons/ci";

export default function Home() {
  return (
    <div className="flex items-center justify-center bg-white">
      <div className="max-w-4xl">
        <Image src={avatarImage} alt="avatar-image" width={100} height={100} />
        <h1 className="text-3xl font-medium leading-snug">Fikri Abdurrohim Ibnu Prabowo</h1>
        <h3 className="text-lg  mt-2">
          <a href="https://maps.app.goo.gl/rFHYJ6q2KHHhnE3H7" target="_blank" className="me-2">
            Surakarta
          </a>
          |<span className="ms-2">Indonesia</span>
        </h3>
        <div className="mt-4 text-lg ">
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
        <div className="mt-5">
          <h3 className="text-lg flex items-center gap-2">
            <Link href="/projects" className="flex items-center gap-2  hover:underline">
              Go to my projects
              <FaArrowRight />
            </Link>
          </h3>
        </div>
      </div>
    </div>
  );
}
