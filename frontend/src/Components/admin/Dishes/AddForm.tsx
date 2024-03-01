import { useState, useEffect } from "react";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import axios from "axios";
import { toast, Toaster } from "sonner";

const AddForm: React.FC = () => {
  const [dishPreview, setDishPreview] = useState<string[]>([]);
  const [categories, setCategories] = useState<
    { id: number; category: string }[]
  >([]);
  const { register, handleSubmit, watch, reset } = useForm();
  const selectedCategory = watch("category_ID");
  const watchedDishImage = watch("dishImage");

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
    if (watchedDishImage && watchedDishImage.length > 0) {
      handleFileInputChange(watchedDishImage, "dishImage");
    }
  }, [watchedDishImage]);

  const handleFileInputChange = (files: FileList, fieldName: "dishImage") => {
    const previews = Array.from(files).map((file) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      return new Promise<string>((resolve) => {
        reader.onloadend = () => {
          resolve(reader.result as string);
        };
      });
    });

    Promise.all(previews).then((previewUrls) => {
      if (fieldName === "dishImage") {
        setDishPreview(previewUrls);
      }
    });
  };

  const useApiCall = useMutation({
    mutationKey: ["POST_PRODUCT_MANAGEPRODUCT"],
    mutationFn: async (formData: FormData) => {
      try {
        const response = await axios.post(
          "http://localhost:8080/dish/createDish",
          formData,
          {
            headers: {
              authorization: "Bearer " + localStorage.getItem("accessToken"),
              "Content-Type": "multipart/form-data",
            },
          }
        );

        if (response.status === 200) {
          toast.success("Dish added Successfully");
          reset();
        }
      } catch (error: any) {
        console.error("Error adding restaurant:", error);
        toast.error(`Error: ${error.message}`);
      }
    },
  });

  const onSubmit = (formData: any) => {
    if (!formData.dishImage || formData.dishImage.length === 0) {
      toast.error("Please select a dish image");
      return;
    }

    const formDataWithFile = new FormData();
    formDataWithFile.append("dish", formData.dish);
    formDataWithFile.append("category_ID", formData.category_ID);
    formDataWithFile.append("dishImage", formData.dishImage[0]);
    formDataWithFile.append("price", formData.price);

    useApiCall.mutate(formDataWithFile);
  };

  return (
    <div className=" flex flex-col items-center w-full h-[91.2%]  ">
      <span className="text-main text-4xl text-center font-bold ">
        Add Dish
      </span>
      <form
        className="flex flex-col gap-10 bg-white py-20 w-full"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="flex justify-center items-center name gap-5">
          <label className="text-xl text-slate-500">Dish Name:</label>
          <input
            type="text"
            className="w-[60%] text-lg p-1 bg-slate-100 border rounded focus:border-2 focus:border-main focus:outline-none "
            {...register("dish")}
          />
        </div>
        <div className="flex justify-center items-center name gap-5">
          <label className="text-xl text-slate-500">Dish Name:</label>
          <select className="w-[60%] p-2" {...register("category_ID")}>
            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.category}
              </option>
            ))}
          </select>
        </div>
        <div className="flex w-full size-auto ml-60 gap-1 items-center">
          <label className="text-xl text-slate-500 mr-4">Dish Image:</label>
          <input
            className=" cursor-pointer"
            type="file"
            accept="image/*"
            {...register("dishImage")}
          />
          <div>
            {dishPreview.map((preview, index) => (
              <img
                key={index}
                src={preview}
                alt={`Preview-${index}`}
                className="mr-2 border border-gray-300 rounded-sm"
                style={{ width: "100px", height: "100px" }}
              />
            ))}
          </div>
        </div>
        <div className="flex justify-center items-center name gap-5">
          <label className="text-xl text-slate-500 mr-16">Price:</label>
          <input
            type="number"
            className="w-[60%] text-lg p-1 bg-slate-100 border rounded focus:border-2 focus:border-main focus:outline-none "
            {...register("price")}
          />
        </div>

        <div className="mt-5">
          <button
            className="px-5 py-3 bg-main text-white font-semibold text-xl hover:bg-yellow-400 focus:outline-none focus:border-yellow-400 transition"
            type={"submit"}
          >
            Add dish
            <Toaster
              className="absolute right-0 transform translate-x-16 transition-transform duration-300 ease-in-out"
              richColors
            />
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddForm;
