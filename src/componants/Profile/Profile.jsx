import topLine from "/Top-Line.svg";
import bottomLine from "/Bottom-Line.svg";
import { Link, NavLink, Outlet, useLocation, useNavigate } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import './profile.css';
import Footer from "../Footer/Footer";
import { notify } from "../Toast/Toast";
import axios from "axios";
import { UserContext } from "../../Context/UserContext";
import { useDispatch, useSelector } from "react-redux";
import { getUserDataThunk } from "../../redux/reducers/userSlice";

const baseUrl = "http://localhost:3000/api/v1";

export default function Profile() {
  const navigate = useNavigate();
  const {pathname} = useLocation();
  const {userToken , setUserToken} = useContext(UserContext);
  const [dataInfo , setDataInfo] = useState({});
  const dispatch = useDispatch();
  const user = useSelector(store=>store.user);


  // async function getUserData() {
  //   try {
  //     if(userToken){
  //       const {data}  = await axios.get(`${baseUrl}/profile/data` , {
  //         headers: {
  //           authorization: `Bearer ${userToken}`
  //         }
  //       });
  //       setDataInfo(data.data)
  //     }
  //   } catch (err) {
  //     notify(err?.response?.data?.message, "error");
  //   }
  // }

  function logoutFun(){
    setUserToken(null);
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    
    navigate("/login");
  }
  
  useEffect(()=>{
    (pathname.includes("/profile") ? navigate("/profile/account"):"");
    if(userToken){
      dispatch(getUserDataThunk(userToken));
    }
  },[userToken])

   useEffect(() => {
      if(user){
        setDataInfo(user.data);
      }
    }, [user]);

  return (
    <>
      <div className='w-[80%] mx-auto my-15'>
        
        <div className='flex justify-between'>
          <div className='lg:w-[25%]'>
            <div className="box bg-[#1A2B49] p-5 py-15 overflow-hidden relative text-center text-white border">
              <div>
                  <h2 className='text-3xl font-semibold'>{dataInfo?.name?.split(" ")[0]}</h2>
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
              <NavLink to="changePassword" className="text-gray-600 border-b-0 border border-gray-300 p-4 flex items-center">
                <i className="fa-regular fa-user me-2"></i> <strong className="text-sm">Change Password</strong>
              </NavLink>
              <div onClick={logoutFun} className="text-gray-600 cursor-pointer border border-gray-300 p-4 flex items-center">
                <i className="fa-solid fa-arrow-right-from-bracket rotate-180 me-2"></i> <strong className="text-sm">Logout</strong>
              </div>
            </div>
      
          </div>
          <Outlet />
        </div>
      
      </div>
      <Footer />
    </>
  )
}
