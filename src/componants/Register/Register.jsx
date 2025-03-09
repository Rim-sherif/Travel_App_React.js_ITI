import axios from "axios";
import { useFormik } from "formik";
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import * as Yup from "yup";

export default function Register() {
  let navigate = useNavigate();
  const [apiError, setApiError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false); 

  async function register(values) {
    try {
      setApiError(null);
      setLoading(true);
      let { data } = await axios.post(
        `http://localhost:5000/api/v1/auth/signup`,
        values
      );
      if (data.message === "Success") {
        setSuccess(true); 
        formik.resetForm();
      }
    } catch (error) {
      setApiError(error.response.data.message);
    } finally {
      setLoading(false);
    }
  }

  // Redirect to login after 5 seconds on success
  useEffect(() => {
    if (success) {
      const timer = setTimeout(() => {
        navigate("/login");
      }, 5000); 
      return () => clearTimeout(timer);
    }
  }, [success, navigate]);

  let validationSchema = Yup.object({
    name: Yup.string()
      .min(3, "Name min length is 3")
      .max(30, "Name max length is 30")
      .required("Name is required"),
    email: Yup.string().email("Invalid email").required("Email is required"),
    password: Yup.string()
    .matches(
      /^(?=.*\d)(?=.*[a-zA-Z])(?=.*[!@#$%^&*]).{8,}$/,
      "Password must contain at least one letter, one number, and one special character (!@#$%^&*).")
    .required("Password is required"),
    cPassword: Yup.string()
    .oneOf([Yup.ref("password")], "Passwords do not match")
    .required("Confirm Password is required"),
    phone: Yup.string()
      .length(11, "Enter a valid number")
      .matches(/^\d{11}$/, "Invalid phone number")
      .required("Phone is required"),
  });

  let formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      cPassword: "",
      phone: "",
    },
    validationSchema,
    onSubmit: register,
  });

  return (
    <>
      <div className="w-2/4 mx-auto py-5">
        {/* Success Message */}
        {success && (
          <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4">
            <p>Registration successful! Please check your email to verify your account.</p>
          </div>
        )}

        {/* Error Message */}
        {apiError && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            {apiError}
          </div>
        )}

        {/* Form Title */}
        <h2 className="text-center text-2xl font-bold mb-4">Register Now</h2>

        {/* Registration Form */}
        <form
          onSubmit={formik.handleSubmit}
          className="bg-gray-50 p-6 rounded-lg shadow-md"
        >
          {/* Name Input */}
          <div className="mb-4">
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700"
            >
              Enter your name
            </label>
            <input
              type="text"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              id="name"
              placeholder="Enter your name"
              name="name"
              value={formik.values.name}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.errors.name && formik.touched.name && (
              <div className="text-red-500 text-sm mt-2">
                {formik.errors.name}
              </div>
            )}
          </div>

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

          {/* Confirm Password Input */}
          <div className="mb-4">
            <label
              htmlFor="cPassword"
              className="block text-sm font-medium text-gray-700"
            >
              Repeat your password
            </label>
            <input
              type="password"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              id="cPassword"
              placeholder="Repeat your password"
              name="cPassword"
              value={formik.values.cPassword}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.errors.cPassword && formik.touched.cPassword && (
              <div className="text-red-500 text-sm mt-2">
                {formik.errors.cPassword}
              </div>
            )}
          </div>

          {/* Phone Input */}
          <div className="mb-4">
            <label
              htmlFor="phone"
              className="block text-sm font-medium text-gray-700"
            >
              Enter your phone number
            </label>
            <input
              type="text"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              id="phone"
              placeholder="Enter your phone number"
              name="phone"
              value={formik.values.phone}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              pattern="\d*"
              maxLength={11}
            />
            {formik.errors.phone && formik.touched.phone && (
              <div className="text-red-500 text-sm mt-2">
                {formik.errors.phone}
              </div>
            )}
          </div>

          {/* Register Button and Login Link */}
          <div className="flex items-center justify-between mt-6">
            <button
              disabled={loading || !(formik.isValid && formik.dirty)}
              type="submit"
              className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:opacity-50 flex items-center justify-center"
            >
              {loading ? (
                <span className="animate-spin border-2 border-white rounded-full w-5 h-5"></span>
              ) : (
                "Register"
              )}
            </button>

            <span className="text-sm">
              Already have an account?{" "}
              <Link
                className="text-indigo-600 font-semibold hover:text-indigo-500"
                to="/login"
              >
                Login Now
              </Link>
            </span>
          </div>
        </form>
      </div>
    </>
  );
}