import about from "../../assets/about.jpg";


export default function AboutUs() {
  return (
    <>
      <div className="bg-gray-100 text-center py-6 mb-[-50px]">
        <h2 className="text-3xl font-bold">Discover Your Next Adventure</h2>
        <div className="flex justify-center my-5">
          <video
            className="rounded-xl w-[80%] h-[40vh] max-h-[400px] object-cover"
            loop
            autoPlay
            muted
          >
            <source src="/3576378-uhd_3840_2160_25fps.mp4" type="video/mp4" />
          </video>
        </div>
      </div>
      <div className="bg-gray-100 py-16 px-6 lg:px-20">
        <div className="max-w-6xl mx-auto flex flex-col lg:flex-row items-center gap-10">
          <div className="lg:w-1/2">
            <img src={about} alt="About Us" className="rounded-2xl w-full" />
          </div>
          <div className="lg:w-1/2 text-center lg:text-left">
            <h2 className="text-4xl font-extrabold text-gray-900 mb-4">
              Discover the World with Us
            </h2>
            <p className="text-lg text-gray-700 leading-relaxed">
              We are passionate about making your travel dreams a reality.
              Whether you're looking for breathtaking landscapes, cultural
              experiences, or thrilling adventures, we provide the best trips
              tailored to your needs.
            </p>
            <p className="mt-4 text-lg text-gray-700 leading-relaxed">
              Our mission is to connect travelers with unforgettable experiences
              by offering seamless booking, top destinations, and expert
              guidance.
            </p>
            <div className="mt-6">
              <a
                href="/"
                className="px-6 py-3 bg-blue-600 text-white rounded-full shadow-md font-semibold text-lg transition-transform transform hover:scale-105"
              >
                Explore Our Trips
              </a>
            </div>
          </div>
        </div>
      </div>
     
    </>
  );
}

