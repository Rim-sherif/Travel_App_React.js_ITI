import plane from "../../../public/plane.webp";
import helal from "../../../public/helal.png";

const TripMegaSale = () => {
  return (
    <div className="bg-[#066185] text-white overflow-hidden m-4">
      <div className="relative p-6 flex flex-col md:flex-row items-center justify-between">
        <img
          className="w-40 md:w-80 mb-4 md:mb-0"
          src={helal}
          alt="helal"
          width={892}
          height={227}
          layout="responsive"
        />
        <div className="text-center flex flex-col items-center justify-center px-4">
          <h1 className="text-2xl md:text-4xl font-bold">Up to SAR 1,000 OFF!</h1>
          <p className="text-sm md:text-lg">Book your next getaway with our exclusive offers.</p>
          <small className="text-xs mt-2">
            *Sale takes place between 2 and 8 March 2025. T&Cs apply. Subject to
            availability.
          </small>
        </div>
        <img
          className="w-40 md:w-80 mt-4 md:mt-0"
          src={plane}
          alt="plane"
          width={892}
          height={227}
          layout="responsive"
        />
      </div>
    </div>
  );
};

export default TripMegaSale;