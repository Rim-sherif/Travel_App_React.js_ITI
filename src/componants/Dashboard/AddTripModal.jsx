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

export default function AddTripModal({ isOpen, onClose, onTripAdded }) {
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState([]);
  const { userToken } = useContext(UserContext);

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const { data } = await axios.get("http://localhost:3000/api/v1/category/all");
      setCategories(data.allCategories);
    } catch (error) {
      console.log("Failed to load categories." ,error)
    }
  };

  const handleSubmit = async (values) => {
    try {
      setLoading(true);
      const formData = new FormData();

      Object.entries(values).forEach(([key, value]) => {
        if (key === "startPoint") {
          value.forEach((point, index) => formData.append(`${key}[${index}]`, point));
        } else if (key === "images") {
          value.forEach(file => formData.append(key, file));
        } else {
          formData.append(key, value);
        }
      });

      await axios.post(
        `http://localhost:3000/api/v1/trips/${values.category}`,
        formData,
        { headers: { Authorization: `Bearer ${userToken}` } }
      );

      toast.success("Trip added successfully!");
      onTripAdded();
      onClose();
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to add trip");
    } finally {
      setLoading(false);
    }
  };

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
      category: ""
    },
    validationSchema: Yup.object({
      title: Yup.string().required("Required"),
      description: Yup.string().required("Required"),
      price: Yup.number().required("Required"),
      departureDate: Yup.date().required("Required"),
      returnDate: Yup.date().min(Yup.ref('departureDate'), "Return date must be after departure"),
      startPoint: Yup.array().of(Yup.string().required("Required")),
      destination: Yup.string().required("Required"),
      images: Yup.array().min(1, "At least one image required"),
      availableSeats: Yup.number().min(1, "Required"),
      category: Yup.string().required("Required")
    }),
    onSubmit: handleSubmit
  });

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 w-full  flex items-center justify-center p-4 shadow-2xl">
      <div className="bg-white rounded-lg p-4 w-full max-w-3xl">
        <h2 className="text-2xl font-bold mb-4">Add New Trip</h2>
        
        <form onSubmit={formik.handleSubmit} className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <InputField label="Title" name="title" formik={formik} />
          <InputField label="Destination" name="destination" formik={formik} />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <DateInput
              label="Departure Date"
              name="departureDate"
              formik={formik}
            />
            <DateInput
              label="Return Date"
              name="returnDate"
              formik={formik}
            />
          </div>

          <StartPoints
            values={formik.values.startPoint}
            onChange={(points) => formik.setFieldValue("startPoint", points)}
          />

          <CategorySelect
            categories={categories}
            value={formik.values.category}
            onChange={(value) => formik.setFieldValue("category", value)}
            error={formik.touched.category && formik.errors.category}
          />

          <div className="grid grid-cols-2 gap-4">
            <InputField label="Price" name="price" type="number" formik={formik} />
            <InputField label="Available Seats" name="availableSeats" type="number" formik={formik} />
          </div>

          <ImageUpload
            images={formik.values.images}
            setImages={(files) => formik.setFieldValue("images", files)}
            error={formik.touched.images && formik.errors.images}
          />

          <div className="flex justify-end gap-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-gray-600 hover:text-gray-800"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:bg-gray-400"
            >
              {loading ? "Saving..." : "Save Trip"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}