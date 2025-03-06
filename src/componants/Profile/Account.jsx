import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { jwtDecode } from "jwt-decode";
import axios from "axios";
import { notify } from "../Toast/Toast";
import { useFormik } from "formik";
import * as Yup from "yup";

const baseUrl = "http://localhost:3000/api/v1/user";

export default function Account() {
  const tokenSlice = useSelector((store) => store.token);
  const [data , setData] = useState({});


  const initialValues = {
    username: "",
    phone: ""
  };
  
  const validationSchema = Yup.object({
      username: Yup.string().min(3 , "min length is 3 characters").max(25 , "max length is 25 characters")
      .required("username is required"),
      phone: Yup.string()
    .matches(/^01[0125][0-9]{8}$/, "Phone must be an Egyptian number")
    .required("Phone is required")
  });

  const formik = useFormik({
      initialValues,
      validationSchema,
      onSubmit: saveData,
  });


  async function getUserData() {
    try {
      const {data}  = await axios.get(`${baseUrl}/profile/account/data` , {
        headers: {
            authorization: tokenSlice
        }
      });
      setData(data.data)
      formik.setValues({
        username: data.data.name,
        phone: data.data.phone
      })
    } catch (err) {
      notify(err?.response?.data?.message, "error");
    }
  }

  useEffect(()=>{
    getUserData();
  },[])

    async function saveData(values){
        try{
            const {data} = await axios.put(`${baseUrl}/profile/account` , values , {
                headers:{
                    authorization: tokenSlice
                }
            })
            notify(data.status, "success");
        }   
        catch(err){
            console.log(err);
            notify(err?.response?.data?.message, "error");
        }
    }

  return (
    <form className="lg:w-[70%]" onSubmit={formik.handleSubmit}>
      <h2 className="text-xl font-bold mb-2">Profile Details</h2>
      <hr className="text-gray-200 mb-5" />

      <div className="relative">
        <label className="absolute top-[9px] left-4 text-gray-600 font-semibold text-[12px]">
          Username
        </label>
        {console.log(formik)
        }
        <input
          type="text"
          value={formik.values.username}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          name="username"
          className="w-full border-2 text-sm pt-6 border-gray-300 font-medium text-gray-900 outline-0 px-4 pb-3 rounded-xl"
        />
        {formik.errors.username && formik.touched.username ? (
        <div className="bg-red-200 p-3 rounded text-sm mt-1">
            {formik.errors.username}
        </div>
        ) : (
        ""
        )}
      </div>

      <h2 className="text-xl font-bold mt-10">Contact Details</h2>
      <hr className="text-gray-200 mt-2 mb-5" />
      <div className="flex justify-between">
        <div className="relative w-[48%]">
          <label className="absolute top-[9px] left-4 text-gray-600 font-semibold text-[12px]">
            Email
          </label>
          <input
            type="email"
            name="email"
            disabled
            value={data.email}
            className="w-full border-2 text-sm pt-6 border-gray-300 font-medium cursor-not-allowed text-gray-900 bg-[#EBEEF1] outline-0 px-4 pb-3 rounded-xl"
            placeholder="Email"
          />
          
        </div>

        <div className="relative w-[48%]">
          <label className="absolute top-[9px] left-4 text-gray-600 font-semibold text-[12px]">
            Mobile phone
          </label>
          <input
            type="tel"
            name="phone"
            value={formik.values.phone}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className="w-full focus:border-blue-500 border-2 text-sm pt-6 border-gray-300 font-medium text-gray-900 outline-0 px-4 pb-3 rounded-xl"
          />
          {formik.errors.phone && formik.touched.phone ? (
                <div className="bg-red-200 p-3 rounded text-sm mt-1">
                  {formik.errors.phone}
                </div>
              ) : (
                ""
              )}
        </div>
      </div>

      <button
        type="submit"
        className="block mt-6 cursor-pointer bg-blue-500 text-white py-2 px-7 rounded-3xl"
      >
        Save
      </button>
    </form>
  );
}
