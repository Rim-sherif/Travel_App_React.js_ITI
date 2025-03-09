import axios from "axios";
import { useFormik } from "formik";
import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { UserContext } from "../../Context/UserContext";

export default function Login() {
  let { setUserToken } = useContext(UserContext);
  let navigate = useNavigate();
  const [apiError, setApiError] = useState(null);
  const [loading, setLoading] = useState(false);

  async function login(values) {
    try {
      setApiError(null);
      setLoading(true);
      let { data } = await axios.post(
        `http://localhost:5000/api/v1/auth/login`,
        values
      );
      if (data.message == "Success") {
        localStorage.setItem("token", data.token);
        localStorage.setItem("userId", data.userId); 
        localStorage.setItem("userRole", data.userRole); 
        setUserToken(data.token);
        navigate("/");
      }
    } catch (error) {
      setApiError(error.response.data.message);
    } finally {
      setLoading(false);
    }
  }

  let validationSchema = Yup.object({
    email: Yup.string().email("Invalid email").required("Email is required"),
    password: Yup.string()
      .required("Password is required"),
  });

  let formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema,
    onSubmit: login,
  });

  return (
    <>
      <div className="w-2/4 mx-auto py-5">
        {/* Error Message */}
        {apiError && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            {apiError}
          </div>
        )}

        {/* Form Title */}
        <h2 className="text-center text-2xl font-bold mb-4">Login Now</h2>

        {/* Login Form */}
        <form
          onSubmit={formik.handleSubmit}
          className="bg-gray-50 p-6 rounded-lg shadow-md"
        >
          {/* Email Input */}
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Enter your email
            </label>
            <input
              type="email"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              id="email"
              placeholder="Enter your email"
              name="email"
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.errors.email && formik.touched.email && (
              <div className="text-red-500 text-sm mt-2">
                {formik.errors.email}
              </div>
            )}
          </div>

          {/* Password Input */}
          <div className="mb-4">
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              Enter your password
            </label>
            <input
              type="password"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              id="password"
              placeholder="Enter your password"
              name="password"
              value={formik.values.password}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.errors.password && formik.touched.password && (
              <div className="text-red-500 text-sm mt-2">
                {formik.errors.password}
              </div>
            )}
          </div>

          {/* Login Button and Register Link */}
          <div className="flex items-center justify-between mt-6">
            <button
              disabled={!(formik.isValid && formik.dirty)}
              type="submit"
              className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:opacity-50 flex items-center justify-center"
            >
              {loading ? (
                <span className="animate-spin border-2 border-white rounded-full w-5 h-5"></span>
              ) : (
                "Login"
              )}
            </button>

            <span className="text-sm">
              Don't have an account yet?
              <Link
                className="text-indigo-600 font-semibold hover:text-indigo-500 ml-1"
                to="/register"
              >
                Register Now
              </Link>
            </span>
          </div>
        </form>
      </div>
    </>
  );
}
