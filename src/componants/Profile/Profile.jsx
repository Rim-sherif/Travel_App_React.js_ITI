import topLine from "/Top-Line.svg";
import bottomLine from "/Bottom-Line.svg";
import { Link, NavLink, Outlet, useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import './profile.css';
import Footer from "../Footer/Footer";
import { notify } from "../Toast/Toast";
import axios from "axios";
import { useSelector } from "react-redux";

const baseUrl = "http://localhost:3000/api/v1/user";

export default function Profile() {
  const navigate = useNavigate();
  const {pathname} = useLocation();
  const tokenSlice = useSelector((store) => store.token);
  const [data , setData] = useState({});

  async function getUserData() {
    try {
      const {data}  = await axios.get(`${baseUrl}/profile/account/data` , {
        headers: {
            authorization: tokenSlice
        }
      });
      setData(data.data)
    } catch (err) {
      notify(err?.response?.data?.message, "error");
    }
  }
  
  useEffect(()=>{
    (pathname.includes("/profile") ? navigate("/profile/account"):"");
    getUserData();

  },[])

  return (
    <>
      <div className='w-[80%] mx-auto my-15'>
        
        <div className='flex justify-between'>
          <div className='lg:w-[25%]'>
            <div className="box bg-[#1A2B49] p-5 py-15 overflow-hidden relative text-center text-white border">
              <div>
                  <h2 className='text-3xl font-semibold'>{data.name.split(" ")[0]}</h2>
                  <section className='text-xl'>Account</section>
              </div>
              <div className="image top-[0px] right-[-100px] absolute">
                <img src={topLine} alt="" />
              </div>
              <div className="image bottom-[0px] left-[-100px] absolute">
                <img src={bottomLine} alt="" />
              </div>
            </div>
      
            <div className="box">
              <NavLink to="account" className="text-gray-600 border-b-0 border border-gray-300 p-4 flex items-center">
                <i className="fa-regular fa-user me-2"></i> <strong className="text-sm">Profile</strong>
              </NavLink>
              <NavLink to="changePassword" className="text-gray-600 border border-gray-300 p-4 flex items-center">
                <i className="fa-regular fa-user me-2"></i> <strong className="text-sm">Change Password</strong>
              </NavLink>
            </div>
      
          </div>
          <Outlet />
        </div>
      
      </div>
      <Footer />
    </>
  )
}
