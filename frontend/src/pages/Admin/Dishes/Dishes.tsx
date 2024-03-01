import { useState, useEffect } from "react";
import { PopupModal } from "../../../Components/Common/ContainerModal";
import Layout from "../layout";
import AddForm from "../../../Components/admin/Dishes/AddForm";
import StyledTable from "../../../Components/Common/Tables/Edit-DeleteTable";
import axios from "axios";
import { toast, Toaster } from "sonner";
import EditForm from "../../../Components/admin/Dishes/Editform";
import { useForm } from "react-hook-form";
import { isAdmin } from "../../../auth/authService";
import PopUp from "../../../Components/Common/Popup";
import { useNavigate } from "react-router-dom";

interface Dish {
  id: string;
  dish: string;
  price: number;
}

interface Category {
  category_ID: number;
  category: string;
}

const tableHeaders = ["ID", "Dish", "Price", "Actions"];
const Dishes: React.FC = () => {
  const navigate = useNavigate();
  const [tableData, setTableData] = useState([]);
  const [categories, setCategories] = useState<
    { id: number; category: string }[]
  >([]);

  const [editID, setEditID] = useState<number>(0);
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const { register, watch, reset } = useForm<Category>();
  const selectedCategory = watch("category_ID");

  const categoryData = watch("category");

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch(
          "http://localhost:8080/category/getAllCategories"
        );
        if (!response.ok) {
          throw new Error("Failed to fetch categories");
        }
        const data = await response.json();
        setCategories(data);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchCategories();
  }, [selectedCategory]);

  useEffect(() => {
    axios
      .get("http://localhost:8080/dish/findAllDishes")
      .then((response) => {
        const dishesArray = response.data || [];
        const modifiedData = dishesArray.map((item: Dish) => ({
          id: item.id,
          dish: item.dish,
          price: item.price,
        }));
        setTableData(modifiedData);
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, [isCreateOpen, isEditOpen]);

  const handleCloseModal = () => {
    setIsCreateOpen(false);
    setIsEditOpen(false);
  };

  const handleEditClick = (rowData: Record<string, any>) => {
    setIsEditOpen(true);
    setEditID(rowData.id);
  };

  const handleDeleteClick = async (rowData: Record<string, any>) => {
    if (window.confirm(`Are you sure you want to remove ${rowData.id}?`)) {
      try {
        const deleteResponse = await axios.delete(
          `http://localhost:8080/dish/deleteDishById/${rowData.id}`,
          {
            headers: {
              authorization: "Bearer " + localStorage.getItem("accessToken"),
              "Content-Type": "multipart/form-data",
            },
          }
        );

        if (deleteResponse.status === 200) {
          const packagesResponse = await axios.get(
            "http://localhost:8080/dish/findAllDishes"
          );

          const packagesArray = packagesResponse.data || [];
          const modifiedData = packagesArray.map((item: Dish) => ({
            id: item.id,
            dish: item.dish,
          }));
          setTableData(modifiedData);
          toast.success(`Dish ${rowData.dish} deleted successfully`, {
            position: "top-right",
            duration: 3000,
            style: {
              minWidth: "300px",
              maxWidth: "400px",
              minHeight: "80px",
              fontSize: "18px",
              transform: "translateX(0%)",
            },
          });
        } else {
          console.error("Delete request failed:", deleteResponse);
          toast.error(deleteResponse.data.message || "Delete request failed", {
            position: "top-right",
            duration: 3000,

            style: {
              minWidth: "300px",
              maxWidth: "400px",
              minHeight: "80px",
              fontSize: "18px",
              transform: "translateX(0%)",
            },
          });
        }
      } catch (error) {
        console.error("Error deleting or fetching data:", error);

        toast.error(
          "Error deleting or fetching data. Please check the console for more details.",
          {
            position: "top-right",
            duration: 3000,

            style: {
              minWidth: "300px",
              maxWidth: "400px",
              minHeight: "80px",
              fontSize: "18px",
              transform: "translateX(0%)",
            },
          }
        );
      }
    }
  };

  const handleCategorySubmit = async () => {
    try {
      await axios.post(
        "http://localhost:8080/category/createCategory",
        { category: categoryData },
        {
          headers: {
            authorization: "Bearer " + localStorage.getItem("accessToken"),
            "Content-Type": "application/json",
          },
          transformRequest: [(data) => JSON.stringify(data)],
        }
      );
      toast.success("Category created successfully");
      reset();
    } catch (error) {
      console.error("Error creating category:", error);
      toast.error("Error creating category. Please try again.");
    }
  };

  const handleCategoryDelete = async () => {
    if (selectedCategory) {
      if (
        window.confirm(
          `Are you sure you want to remove category ${selectedCategory}?`
        )
      ) {
        try {
          const deleteResponse = await axios.delete(
            `http://localhost:8080/category/deleteCategoryById/${selectedCategory}`,
            {
              headers: {
                authorization: "Bearer " + localStorage.getItem("accessToken"),
                "Content-Type": "application/json",
              },
            }
          );

          if (deleteResponse.status === 200) {
            toast.success(`Category ${selectedCategory} deleted successfully`);
            const categoriesResponse = await axios.get(
              "http://localhost:8080/category/getAllCategories"
            );
            const categoriesData = categoriesResponse.data || [];
            setCategories(categoriesData);
          } else {
            console.error("Delete request failed:", deleteResponse);
            toast.error(deleteResponse.data.message || "Delete request failed");
          }
        } catch (error) {
          console.error("Error deleting category:", error);
          toast.error("Error deleting category. Please try again.");
        }
      }
    } else {
      toast.error("Please select a category to delete.");
    }
  };

  return (
    <Layout>
      {isAdmin() ? (
        <>
          <div className="h-[92.5vh]">
            <div className="flex flex-col items-center bg-slate-50 px-16 w-full h-full overflow-y-auto">
              <span className="text-4xl font-semibold font-noto text-main p-12">
                Dishes Portal
              </span>
              <div className="flex justify-end w-full px-5">
                <button
                  className="px-5 py-3 bg-main text-white font-semibold text-xl hover:bg-yellow-400 focus:outline-none focus:border-yellow-400 transition"
                  onClick={() => {
                    setIsCreateOpen(true);
                  }}
                >
                  Add Dish
                </button>
              </div>
              <div className="w-full p-5">
                <StyledTable
                  headers={tableHeaders}
                  data={tableData}
                  onDeleteClick={handleDeleteClick}
                  onEditClick={handleEditClick}
                />
              </div>
              <div className="flex mt-20 w-full gap-5">
                {" "}
                <div className="flex flex-col items-center gap-5  w-[50%] p-5 bg-slate-100 border border-main rounded font-noto">
                  <span className="text-center text-3xl font-semibold text-main">
                    Add a category
                  </span>
                  <div className="flex items-center gap-4 w-full">
                    <label className="text-xl ">Enter the category:</label>
                    <input
                      type="text"
                      className="w-[60%] text-lg p-1 bg-slate-50 border rounded focus:border-2 focus:border-main focus:outline-none "
                      {...register("category")}
                    />
                  </div>
                  <button
                    onClick={handleCategorySubmit}
                    className="p-3  rounded-md bg-main text-white font-semibold text-xl hover:bg-yellow-400 focus:outline-none focus:border-yellow-400 transition"
                  >
                    Create category
                    <Toaster
                      className="absolute right-0 transform translate-x-16 transition-transform duration-300 ease-in-out"
                      richColors
                    />
                  </button>
                </div>
                <div className="flex flex-col items-center gap-5  w-[50%] p-5 bg-slate-100 border border-main rounded font-noto">
                  <span className="text-center text-3xl font-semibold text-main">
                    Delete a category
                  </span>
                  <div className="flex items-center gap-4 w-full">
                    <label className="text-xl ">Enter the category:</label>
                    <select
                      className="w-[60%] p-2"
                      {...register("category_ID")}
                    >
                      {categories.map((category) => (
                        <option key={category.id} value={category.id}>
                          {category.category}
                        </option>
                      ))}
                    </select>
                  </div>
                  <button
                    onClick={handleCategoryDelete}
                    className="p-3  rounded-md bg-main text-white font-semibold text-xl hover:bg-yellow-400 focus:outline-none focus:border-yellow-400 transition"
                  >
                    Delete category
                    <Toaster
                      className="absolute right-0 transform translate-x-16 transition-transform duration-300 ease-in-out"
                      richColors
                    />
                  </button>
                </div>
              </div>
            </div>
          </div>
          <PopupModal onClose={handleCloseModal} isOpen={isEditOpen}>
            <EditForm dishId={editID} />
          </PopupModal>
          <PopupModal onClose={handleCloseModal} isOpen={isCreateOpen}>
            <AddForm />
          </PopupModal>{" "}
        </>
      ) : (
        <PopUp
          buttonText="Proceed Admin Login"
          closable={false}
          message="You are unauthorized for this page."
          onClick={() => {
            navigate("/auth");
          }}
        />
      )}
    </Layout>
  );
};

export default Dishes;
