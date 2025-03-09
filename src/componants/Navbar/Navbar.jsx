import { Link } from "react-router-dom";
import logo from "../../assets/logo.svg";
import { useContext, useEffect, useRef, useState } from "react";
import { UserContext } from "../../Context/UserContext";
import { notify } from "../Toast/Toast";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { getUserDataThunk } from "../../redux/reducers/userSlice";

const baseUrl = "http://localhost:5000/api/v1";

export default function Navbar() {
  const [searchShow, setSearchShow] = useState(false);
  const [profileShow, setProfileShow] = useState(false);
  const {userToken} = useContext(UserContext);
  const [data , setData] = useState({});
  const profileDiv = useRef(null);
  const dispatch = useDispatch();
  const user = useSelector(store=>store.user);
  

  useEffect(() => {
    if(userToken){
      dispatch(getUserDataThunk(userToken));
    }
  }, [userToken]);

  useEffect(() => {
    if(user){
      setData(user.data);
    }
  }, [user]);

  function handleSearchShow() {
    setSearchShow(!searchShow);
  }

  function handleProfilePop() {
    setProfileShow(!profileShow);
  }

  function handleClickOutside(event) {
    if (profileDiv.current && !profileDiv.current.contains(event.target)) {
      setProfileShow(false);
    }
  }

  document.addEventListener("click", handleClickOutside);

  return (
    <div className="py-3 border-b border-gray-100">
      <div className="w-[80%] mx-auto flex justify-between items-center">
        <div className="logo gap-10 flex items-center">
          <Link to="/">
            <img src={logo} alt="Trips logo" />
          </Link>
          <div className="relative w-[500px] hidden lg:block">
            <input
              type="text"
              placeholder="Find places and things to do"
              className="py-3 px-11 w-full outline-0 text-[14px] rounded-4xl font-semibold text-gray-600 border border-gray-200"
            />
            <div className="search_icon absolute top-[12px] text-gray-600 left-4">
              <i className="fa-solid fa-magnifying-glass"></i>
            </div>
            <button className="bg-[#0071eb] font-bold absolute top-[6.4px] right-3 cursor-pointer text-white rounded-4xl py-2 text-[12px] px-6">
              Search
            </button>
          </div>
        </div>
        <div className="flex justify-between items-center gap-10">
          <div
            onClick={handleSearchShow}
            className="search_icon cursor-pointer block lg:hidden ms-5 text-center text-gray-600"
          >
            <i className="fa-solid fa-magnifying-glass"></i>
            <section className="text-[13px] font-semibold">Search</section>
          </div>
          {searchShow ? (
            <div className="fixed top-20 lg:hidden bg-white p-5 w-full left-0 ">
              <input
                type="text"
                placeholder="Find places and things to do"
                className="py-3 px-11 w-full outline-0 text-[14px] rounded-4xl font-semibold text-gray-600 border border-gray-200"
              />
              <div className="search_icon absolute top-[32px] text-gray-600 left-9">
                <i className="fa-solid fa-magnifying-glass"></i>
              </div>
              <button className="bg-[#0071eb] font-bold absolute top-[27px] right-8 cursor-pointer text-white rounded-4xl py-2 text-[12px] px-6">
                Search
              </button>
            </div>
          ) : (
            ""
          )}

          <Link to="/wishlist" className="text-center text-gray-500">
            <i className="fa-regular fa-heart text-[19px]"></i>
            <section className="text-[13px] font-semibold">Wishlist</section>
          </Link>
          <div className="text-center relative text-gray-500">
            <div onClick={handleProfilePop} ref={profileDiv} className="cursor-pointer">
              <i className="fa-regular fa-user text-[19px]"></i>
              <section className="text-[13px] font-semibold">
                {data && Object.keys(data).length > 0 ? data?.name?.split(" ")[0] : "Profile"}
              </section>
            </div>
            {profileShow ? (
              <div
                style={{ boxShadow: "rgba(149, 157, 165, 0.2) 0px 8px 24px" , zIndex: 11}}
                className="bg-white absolute top-16 w-80 text-start right-0 rounded-xl p-5"
              >
                <h4 className="font-semibold mb-5 text-xl">Profile</h4>

                {userToken ? 
                    <Link
                  to="/profile/account"
                  onClick={()=>setProfileShow(false)}
                  className="text-[14px] block mb-3 font-medium"
                >
                  <i className="fa-regular fa-circle-right me-1"></i> {data?.name}
                </Link> : <Link
                    to="/login"
                    onClick={()=>setProfileShow(false)}
                    className="text-[14px] block mb-3 font-medium"
                  >
                    <i className="fa-regular fa-circle-right me-1"></i> Log in or
                    Sign up
                  </Link>
                }
                <hr className="text-zinc-200" />
                <Link
                  to="/support"
                  onClick={()=>setProfileShow(false)}
                  className="text-[14px] block mt-4 mb-1 font-medium"
                >
                  <i className="fa-regular fa-circle-question me-1"></i> Support
                </Link>
              </div>
            ) : (
              ""
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
