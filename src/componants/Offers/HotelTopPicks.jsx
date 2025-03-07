import hotel from '/bed.jpg';

const HotelTopPicks = () => {
  return (
    <div className="relative w-full max-w-4xl h-[400px] flex items-center justify-center overflow-hidden mx-auto">
      <img src={hotel} alt="hotel" className="w-full h-full object-cover absolute z-0" />

      <div className="absolute inset-0 bg-gradient-to-r from-blue-700 via-blue-700/70 to-transparent"></div>

      <div className="relative text-center text-white p-8 max-w-lg z-10">
        <h1 className="text-5xl font-bold mb-6">Hotel Top Picks</h1>
        <button className="bg-white text-blue-700 border-2 border-white px-8 py-3 rounded-full shadow-lg hover:bg-blue-100 transition">
          Explore now
        </button>
        <p className="mt-4 text-sm opacity-80">* T&Cs apply. Subject to availability.</p>
      </div>
      <div className="absolute top-6 left-6 text-white text-xl font-semibold z-20">
        Trip<span className="text-blue-400">.com</span>
      </div>
    </div>
  );
};

export default HotelTopPicks;