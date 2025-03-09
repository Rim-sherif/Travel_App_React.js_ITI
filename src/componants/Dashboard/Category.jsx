import { useFormik } from "formik";
import axios from "axios";
import * as Yup from "yup";
import toast from "react-hot-toast";
import { useState, useContext } from "react";
import { InputField } from "./Form/InputField";
import { UserContext } from "../../Context/UserContext";

export default function Categories() {
  const [apiError, setApiError] = useState(null);
  const [loading, setLoading] = useState(false);
  const { userToken } = useContext(UserContext);
  // const [categories, setCategories] = useState([]);

  // async function fetchCategories() {
  //   try {
  //     let { data } = await axios.get("http://localhost:3000/api/v1/category/all");
  //     setCategories(data.allCategories);
  //   } catch (error) {
  //     console.error("Error fetching categories:", error);
  //     setApiError("Failed to load categories.");
  //   }
  // }

  // useEffect(() => {
  //   fetchCategories();
  // }, []);

  async function addCategory(CategoryData) {
    try {
      setApiError(null);
      setLoading(true);

      const headers = {
        Authorization: `Bearer ${userToken}`,
      };

      let { data } = await axios.post(
        `http://localhost:3000/api/v1/category/add`,
        CategoryData,
        { headers }
      );

      if (data.message === "Created") {
        formik.resetForm();
        toast.success("Category added successfully!");
      }
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || "Something went wrong";
      setApiError(errorMessage);
      toast.error("Failed to add trip. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  const formik = useFormik({
    initialValues: {
      name: "",
    },
    validationSchema: Yup.object({
      name: Yup.string().required("Category name is required"),
    }),
    onSubmit: addCategory,
  });

  return (
    <div className="max-w-xl mx-auto mt-4 p-8 bg-white shadow-lg rounded-lg">
      <h2 className="text-3xl font-semibold mb-6 text-center">
        Add a New Category
      </h2>

      {apiError && <p className="text-red-500 text-center">{apiError}</p>}

      <form onSubmit={formik.handleSubmit} className="space-y-6">
        <InputField
          label="Category Name"
          placeholder="Enter category name"
          {...formik.getFieldProps("name")}
        />
        {formik.touched.name && formik.errors.name && (
          <p className="text-red-500 text-xs">{formik.errors.name}</p>
        )}

        <button
          type="submit"
          disabled={loading}
          className={`w-full py-3 rounded-md ${
            loading
              ? "bg-gray-500 cursor-not-allowed"
              : "bg-blue-600 hover:bg-blue-700"
          } text-white`}
        >
          {loading ? "Adding Category..." : "Add Category"}
        </button>
      </form>
    </div>
  );
}
