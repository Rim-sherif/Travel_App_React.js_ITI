import { useFormik } from "formik";
import * as Yup from "yup";
import { notify } from "../Toast/Toast";
import axios from "axios";
import { useContext } from "react";
import { UserContext } from "../../Context/UserContext";

const baseUrl = "http://localhost:3000/api/v1";

export default function ChangePassword() {
  const {userToken} = useContext(UserContext);
  
  
  const initialValues = {
    currentPassword: "",
    newPassword: "",
  };
  const validationSchema = Yup.object({
    currentPassword: Yup.string()
      .matches(
        new RegExp("^(?=.*[A-Z])(?=.*[!@#$%^&*()_+}{|/~`-])(?=.*[0-9]).{8,}$"),
        "password must have at least one uppercase, one digit and one special character"
      )
      .required("Old password is required"),
    newPassword: Yup.string()
      .matches(
        new RegExp("^(?=.*[A-Z])(?=.*[!@#$%^&*()_+}{|/~`-])(?=.*[0-9]).{8,}$"),
        "password must have at least one uppercase, one digit and one special character"
      )
      .required("New password is required"),
  });

  async function sendPassword(values) {
    console.log(userToken);
    
    try {
      const {data} = await axios.patch(
        `${baseUrl}/profile/changePass`,
        values,
        {
          headers: {
            authorization: `Bearer ${userToken}`
          },
        }
      );
      notify(data.data, "success");
    } catch (error) {
      notify(error?.response?.data?.error, "error");
    }
  }

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: sendPassword,
  });

  return (
    <>
        <form className="lg:w-[70%]" onSubmit={formik.handleSubmit}>
          <h2 className="text-xl font-bold mt-10">Change Password</h2>
          <hr className="text-gray-200 mt-2 mb-5" />
          <div className="flex justify-between">
            <div className="relative w-[48%]">
              <label className="absolute top-[9px] left-4 text-gray-600 font-semibold text-[12px]">
                Old Password
              </label>
              <input
                type="password"
                name="currentPassword"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.currentPassword}
                className="w-full focus:border-blue-500 border-2 text-sm pt-6 border-gray-300 font-medium text-gray-900 outline-0 px-4 pb-3 rounded-xl"
              />
              {formik.errors.currentPassword && formik.touched.currentPassword ? (
                <div className="bg-red-200 p-3 rounded text-sm mt-1">
                  {formik.errors.currentPassword}
                </div>
              ) : (
                ""
              )}
            </div>
            <div className="relative w-[48%]">
              <label className="absolute top-[9px] left-4 text-gray-600 font-semibold text-[12px]">
                New Password
              </label>
              <input
                type="password"
                className="w-full focus:border-blue-500 border-2 text-sm pt-6 border-gray-300 font-medium text-gray-900 outline-0 px-4 pb-3 rounded-xl"
                name="newPassword"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.newPassword}
              />
              {formik.errors.newPassword && formik.touched.newPassword ? (
                <div className="bg-red-200 p-3 rounded text-sm mt-1">
                  {formik.errors.newPassword}
                </div>
              ) : (
                ""
              )}
            </div>
          </div>
        
          <button
            type="submit"
            className="block mt-6 text-sm cursor-pointer bg-blue-500 text-white py-2 px-7 rounded-3xl"
          >
            Update
          </button>
        </form>
    </>
  );
}
