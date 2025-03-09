import { Link } from "react-router-dom";

export default function HeroSection() {
  return (
    <div className="heroImage items-start justify-center flex-col h-full flex">
        <div className="w-[80%] mx-auto ">
            <h1 className="text-[3.5rem] text-white text_travel font-extrabold">
                Travel memories <br /> you'll never forget
            </h1>
            <section className="mt-6 text-white font-semibold text-xl">
                Goreme Hot Air Balloon Flight at Sunrise
            </section>
            
            <Link
          to="/about"
          className="text-white mt-6 block text-lg font-medium transform transition-all duration-300 ease-out hover:scale-105 hover:text-yellow-400"
        >
          Learn more
          <i className="fa-solid fa-angle-right align-middle ml-2"></i>
        </Link>
        </div>
    </div>
  )
}

