import { useFormik } from "formik";
import axios from "axios";
import * as Yup from "yup";
import toast from "react-hot-toast";
import { useState, useContext, useEffect } from "react";
import { InputField } from "./Form/InputField";
import { UserContext } from "../../Context/UserContext";

export default function Categories() {
  const [apiError, setApiError] = useState(null);
  const [loading, setLoading] = useState(false);
  const { userToken } = useContext(UserContext);
  const [categories, setCategories] = useState([]);
  const [editingCategory, setEditingCategory] = useState(null);

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

  async function addCategory(CategoryData) {
    try {
      setApiError(null);
      setLoading(true);

      const headers = {
        Authorization: `Bearer ${userToken}`,
      };

      let url = "http://localhost:3000/api/v1/category/add";
      let method = "post";

      if (editingCategory) {
        url = `http://localhost:3000/api/v1/category/update/${editingCategory._id}`;
        method = "put";
      }

      let { data } = await axios({
        method,
        url,
        data: CategoryData,
        headers,
      });

      if (data.message === "Created" || data.message === "Updated") {
        formik.resetForm();
        setEditingCategory(null);
        toast.success(`Category ${editingCategory ? "updated" : "added"} successfully!`);
        fetchCategories();
      }
    } catch (error) {
      const errorMessage = error.response?.data?.message || "Something went wrong";
      setApiError(errorMessage);
      toast.error("Failed to save the category. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  const formik = useFormik({
    enableReinitialize: true, 
    initialValues: {
      name: editingCategory ? editingCategory.name : "",
    },
    validationSchema: Yup.object({
      name: Yup.string().required("Category name is required"),
    }),
    onSubmit: addCategory,
  });

  const handleDelete = async (categoryId) => {
    try {
      await axios.delete(`http://localhost:3000/api/v1/category/${categoryId}`, {
        headers: { Authorization: `Bearer ${userToken}` }
      });
      toast.success("Category deleted successfully!");
      fetchCategories();
    } catch (error) {
      toast.error("Failed to delete the category.");
      console.log("Delete Error:", error);
    }
  };

  const handleEdit = (category) => {
    setEditingCategory(category); 
  };

  const handleCancelEdit = () => {
    setEditingCategory(null);
    formik.resetForm();
  };

  return (
    <>
      <div className="max-w-xl mx-auto mt-4 p-8 bg-white shadow-lg rounded-lg">
        <h2 className="text-3xl font-semibold mb-6 text-center text-blue-600">
          {editingCategory ? "Edit Category" : "Add a New Category"}
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

          <div className="flex items-center gap-4">
            <button
              type="submit"
              disabled={loading}
              className={`w-full py-3 rounded-md ${
                loading ? "bg-gray-500 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700"
              } text-white`}
            >
              {loading ? (editingCategory ? "Updating Category..." : "Adding Category...") : (editingCategory ? "Update Category" : "Add Category")}
            </button>

            {editingCategory && (
              <button
                type="button"
                onClick={handleCancelEdit}
                className="w-full py-3 rounded-md bg-gray-600 text-white hover:bg-gray-700"
              >
                Cancel Editing
              </button>
            )}
          </div>
        </form>
      </div>

      <div className="overflow-x-auto rounded-lg shadow mt-6">
        <table className="min-w-full divide-y divide-gray-200 bg-white">
          <thead className="bg-gray-100 text-gray-700">
            <tr>
              <th className="px-6 py-4 text-left text-sm font-bold uppercase">Number</th>
              <th className="px-6 py-4 text-left text-sm font-bold uppercase">Name</th>
              <th className="px-6 py-4 text-left text-sm font-bold uppercase">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {categories.map((category, index) => (
              <tr key={category._id} className="hover:bg-gray-100">
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{index + 1}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">{category.name}</td>
                <td className="px-6 py-4 whitespace-nowrap space-x-2">
                  <button
                    onClick={() => handleEdit(category)}
                    className="bg-yellow-500 text-white px-3 py-1 rounded-md hover:bg-yellow-600"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(category._id)}
                    className="bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-600"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
