import { useFormik } from "formik";
import axios from "axios";
import * as Yup from "yup";
import toast from "react-hot-toast";
import { useState, useContext, useEffect } from "react";
import { InputField } from "./Form/InputField";
import { DateInput } from "./Form/DateInput";
import { StartPoints } from "./Form/StartPoint";
import { ImageUpload } from "./Form/ImageUpload";
import { CategorySelect } from "./Form/CategorySelect";
import { UserContext } from "../../Context/UserContext";
import { useNavigate } from "react-router-dom";

export default function Trips() {
  const [apiError, setApiError] = useState(null);
  const [loading, setLoading] = useState(false);
  const { userToken } = useContext(UserContext);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const navigate = useNavigate();

  async function fetchCategories() {
    try {
      let { data } = await axios.get("http://localhost:3000/api/v1/category/all");
      setCategories(data.allCategories);
    } catch (error) {
      console.error("Error fetching categories:", error);
      setApiError("Failed to load categories.");
    }
  }

  useEffect(() => {
    fetchCategories();
  }, []);

  async function addTrip(tripData) {
    try {
      console.log(tripData.startPoint);
      
      setApiError(null);
      setLoading(true);

      const formData = new FormData();
  
      for (const key in tripData) {
        if (key === "startPoint") {
          tripData.startPoint.forEach((point) => {
            formData.append(`${key}[]`, point);
          });
        } else if (tripData[key]) {
          formData.append(key, tripData[key]); 
        }
      }

      if (tripData.images && tripData.images.length > 0) {
        tripData.images.forEach((image) => {
          formData.append("images", image);
        });
      }
  
      const headers = {
        Authorization: `Bearer ${userToken}`,
      };
  
      let { data } = await axios.post(
        `http://localhost:3000/api/v1/trips/${selectedCategory}`,
        formData,
        { headers }
      );
  
      if (data.message === "Success") {
        formik.resetForm();
        toast.success("Trip added successfully!");
        setTimeout(() => navigate("/dashboard"), 3000);
      }
    } catch (error) {
      const errorMessage = error.response?.data?.message || "Something went wrong";
      setApiError(errorMessage);
      toast.error("Failed to add trip. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  const formik = useFormik({
    initialValues: {
      title: "",
      description: "",
      price: "",
      departureDate: "",
      returnDate: "",
      startPoint: [""],
      destination: "",
      images: [],
      availableSeats: "",
    },
    validationSchema: Yup.object({
      title: Yup.string().required("Title is required"),
      description: Yup.string()
        .max(500, "Description too long")
        .required("Description is required"),
      price: Yup.number()
        .min(0, "Price must be positive")
        .required("Price is required"),
      departureDate: Yup.date()
        .required("Departure date is required")
        .nullable()
        .transform((value) => (value === "" ? null : value)),
      returnDate: Yup.date()
        .nullable()
        .when("departureDate", (departureDate, schema) =>
          departureDate
            ? schema.min(departureDate, "Return date must be after departure date")
            : schema
        ),
      startPoint: Yup.array().of(Yup.string().required("Start point is required")),
      destination: Yup.string().required("Destination is required"),
      images: Yup.array().min(1, "At least one image is required"),
      availableSeats: Yup.number()
        .min(1, "At least one seat is required")
        .required("Available seats are required"),
    }),    
    onSubmit: addTrip,
  });

  return (
    <div className="max-w-xl mx-auto p-8 bg-white shadow-lg rounded-lg">
      <h2 className="text-3xl font-semibold mb-6 text-center">Add a New Trip</h2>

      {apiError && <p className="text-red-500 text-center">{apiError}</p>}

      <form onSubmit={formik.handleSubmit} className="space-y-6">
        <InputField
          label="Trip Title"
          placeholder="Enter the trip title"
          {...formik.getFieldProps("title")}
        />
        {formik.touched.title && formik.errors.title && (
          <p className="text-red-500 text-xs">{formik.errors.title}</p>
        )}

        <textarea
          {...formik.getFieldProps("description")}
          placeholder="Trip Description"
          className="w-full border p-3 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        {formik.touched.description && formik.errors.description && (
          <p className="text-red-500 text-xs">{formik.errors.description}</p>
        )}

        <InputField
          label="Destination"
          placeholder="Enter the trip destination"
          {...formik.getFieldProps("destination")}
        />
        {formik.touched.destination && formik.errors.destination && (
          <p className="text-red-500 text-xs">{formik.errors.destination}</p>
        )}

<StartPoints
  startPoint={formik.values.startPoint}
  setStartPoint={(points) => formik.setFieldValue("startPoint", points)}
  error={
    formik.errors.startPoint &&
    formik.touched.startPoint &&
    formik.errors.startPoint
  }
/>
{formik.touched.startPoint && formik.errors.startPoint && (
  <p className="text-red-500 text-xs">{formik.errors.startPoint}</p>
)}
        
        <CategorySelect
          categories={categories}
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
        />
        {formik.touched.selectedCategory && formik.errors.selectedCategory && (
          <p className="text-red-500 text-xs">{formik.errors.selectedCategory}</p>
        )}

        <InputField
          label="Price"
          placeholder="Enter the trip price"
          {...formik.getFieldProps("price")}
          type="number"
        />
        {formik.touched.price && formik.errors.price && (
          <p className="text-red-500 text-xs">{formik.errors.price}</p>
        )}

        <InputField
          label="Available Seats"
          placeholder="Enter the available seats"
          {...formik.getFieldProps("availableSeats")}
          type="number"
        />
        {formik.touched.availableSeats && formik.errors.availableSeats && (
          <p className="text-red-500 text-xs">{formik.errors.availableSeats}</p>
        )}

        <DateInput
          label="Start Date"
          {...formik.getFieldProps("departureDate")}
          error={formik.errors.departureDate}
        />
        {formik.touched.departureDate && formik.errors.departureDate && (
          <p className="text-red-500 text-xs">{formik.errors.departureDate}</p>
        )}

        <DateInput
          label="Return Date"
          {...formik.getFieldProps("returnDate")}
          error={formik.errors.returnDate}
        />
        {formik.touched.returnDate && formik.errors.returnDate && (
          <p className="text-red-500 text-xs">{formik.errors.returnDate}</p>
        )}

        <ImageUpload
          images={formik.values.images}
          setImages={(files) => formik.setFieldValue("images", files)}
          error={formik.errors.images}
        />
        {formik.touched.images && formik.errors.images && (
          <p className="text-red-500 text-xs">{formik.errors.images}</p>
        )}

        <button
          type="submit"
          disabled={loading}
          className={`w-full py-3 rounded-md ${
            loading ? "bg-gray-500 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700"
          } text-white`}
        >
          {loading ? "Adding Trip..." : "Add Trip"}
        </button>
      </form>
    </div>
  );
}
