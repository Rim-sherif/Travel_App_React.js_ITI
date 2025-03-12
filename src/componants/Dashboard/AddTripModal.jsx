import { useFormik } from "formik";
import axios from "axios";
import * as Yup from "yup";
import toast from "react-hot-toast";
import { useState, useEffect } from "react";
import { InputField } from "./Form/InputField";
import { DateInput } from "./Form/DateInput";
import { StartPoints } from "./Form/StartPoint";
import { ImageUpload } from "./Form/ImageUpload";
import { CategorySelect } from "./Form/CategorySelect";

export default function AddTripModal({
  isOpen,
  onClose,
  onTripAdded,
  editingTrip,
  userToken,
}) {
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    fetchCategories();
  }, []);

  useEffect(() => {
    if (editingTrip) {
      const formatDate = (dateString) => dateString ? dateString.split("T")[0] : "";
  
      formik.setValues({
        title: editingTrip.title || "",
        description: editingTrip.description || "",
        price: editingTrip.price || "",
        departureDate: formatDate(editingTrip.departureDate), 
        returnDate: formatDate(editingTrip.returnDate),       
        startPoint: editingTrip.startPoint || [""],
        destination: editingTrip.destination || "",
        availableSeats: editingTrip.availableSeats || "",
        category: editingTrip.categoryId._id || "",
        images: editingTrip.images || [],
      });
    }
  }, [editingTrip]);
  

  const fetchCategories = async () => {
    try {
      const { data } = await axios.get(
        "http://localhost:3000/api/v1/category/all"
      );
      setCategories(data.allCategories);
    } catch (error) {
      console.log("Failed to load categories.", error);
    }
  };

  async function handleSubmit(tripData) {
    try {
      setLoading(true);
      const formData = new FormData();

      for (const key in tripData) {
        if (key === "startPoint" && Array.isArray(tripData.startPoint)) {
          tripData.startPoint.forEach((point) => {
            formData.append("startPoint", point);
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

      const headers = { Authorization: `Bearer ${userToken}` };

      let response;
      if (editingTrip) {
        response = await axios.patch(
          `http://localhost:3000/api/v1/trips/${editingTrip._id}`,
          formData,
          { headers }
        );
      } else {
        response = await axios.post(
          `http://localhost:3000/api/v1/trips/${tripData.category}`,
          formData,
          { headers }
        );
      }

      if (response.data.message === "Success") {
        formik.resetForm();
        toast.success(
          editingTrip
            ? "Trip updated successfully!"
            : "Trip added successfully!"
        );
        onTripAdded();
        onClose();
      }
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || "Something went wrong";
      console.error("Error occurred:", errorMessage);
      toast.error("Failed to save the trip. Please try again.");
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
      category: "",
    },
    validationSchema: Yup.object({
      title: Yup.string().required("Required"),
      description: Yup.string().required("Required"),
      price: Yup.number().required("Required"),
      departureDate: Yup.date().required("Required"),
      returnDate: Yup.date().min(
        Yup.ref("departureDate"),
        "Return date must be after departure"
      ),
      startPoint: Yup.array().of(Yup.string().required("Required")),
      destination: Yup.string().required("Required"),
      images: Yup.array().min(1, "At least one image required"),
      availableSeats: Yup.number().min(1, "Required"),
      category: Yup.string().required("Required"),
    }),
    onSubmit: handleSubmit,
  });

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 w-full flex items-center justify-center p-4 shadow-2xl bg-gray-500/30 z-10 backdrop-blur-sm">
      <div className="bg-white rounded-lg p-4 w-125 max-h-[650px] overflow-auto">
        <h2 className="text-2xl font-bold mb-4">
          {editingTrip ? "Edit Trip" : "Add New Trip"}
        </h2>

        <form onSubmit={formik.handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <InputField
              label="Trip Title"
              placeholder="Enter the trip title"
              {...formik.getFieldProps("title")}
            />
            {formik.touched.title && formik.errors.title && (
              <p className="text-red-500 text-xs">{formik.errors.title}</p>
            )}
            <InputField
              label="Trip Destination"
              placeholder="Enter the trip destination"
              {...formik.getFieldProps("destination")}
            />
            {formik.touched.destination && formik.errors.destination && (
              <p className="text-red-500 text-xs">
                {formik.errors.destination}
              </p>
            )}
          </div>
          <textarea
            id="description"
            {...formik.getFieldProps("description")}
            placeholder="Trip Description"
            className="w-full border p-3 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {formik.touched.description && formik.errors.description && (
            <p className="text-red-500 text-xs">{formik.errors.description}</p>
          )}
          <div className="grid grid-cols-2 gap-4">
            <DateInput
              label="Start Date"
              {...formik.getFieldProps("departureDate")}
              error={formik.errors.departureDate}
            />
            {formik.touched.departureDate && formik.errors.departureDate && (
              <p className="text-red-500 text-xs">
                {formik.errors.departureDate}
              </p>
            )}
            <DateInput
              label="Return Date"
              {...formik.getFieldProps("returnDate")}
              error={formik.errors.returnDate}
            />
            {formik.touched.returnDate && formik.errors.returnDate && (
              <p className="text-red-500 text-xs">{formik.errors.returnDate}</p>
            )}
          </div>

          <StartPoints
            startPoint={formik.values.startPoint}
            setStartPoint={(points) =>
              formik.setFieldValue("startPoint", points)
            }
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
            value={formik.values.category}
            onChange={(e) => formik.setFieldValue("category", e.target.value)}
          />
          {formik.touched.category && formik.errors.category && (
            <p className="text-red-500 text-xs">{formik.errors.category}</p>
          )}

          <div className="grid grid-cols-2 gap-4">
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
              <p className="text-red-500 text-xs">
                {formik.errors.availableSeats}
              </p>
            )}
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
              className="bg-blue-600 text-white rounded-md px-4 py-2 hover:bg-blue-700"
            >
              {loading ? "Saving..." : editingTrip ? "Update Trip" : "Add Trip"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}