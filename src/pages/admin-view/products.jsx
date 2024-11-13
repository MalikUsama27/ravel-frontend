import ProductImageUpload from "@/components/admin-view/image-upload";
import AdminProductTile from "@/components/admin-view/product-tile";
import CommonForm from "@/components/common/form";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { useToast } from "@/components/ui/use-toast";
import { addProductFormElements } from "@/config";
import {
  addNewProduct,
  deleteProduct,
  editProduct,
  fetchAllProducts,
} from "@/store/admin/products-slice";
import { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";

const initialFormData = {
  image: null,
  title: "",
  description: "",
  category: "",
  brand: "",
  price: "",
  salePrice: "",
  totalStock: "",
  averageReview: 0,
};

function AdminProducts() {
  const [openCreateProductsDialog, setOpenCreateProductsDialog] =
    useState(false);
  const [formData, setFormData] = useState(initialFormData);
  const [imageFile, setImageFile] = useState(null);
  const [uploadedImageUrl, setUploadedImageUrl] = useState("");
  const [imageLoadingState, setImageLoadingState] = useState(false);
  const [currentEditedId, setCurrentEditedId] = useState(null);
  const [categories, setCategories] = useState([]);

  const { productList } = useSelector((state) => state.adminProducts);
  const dispatch = useDispatch();
  const { toast } = useToast();

  useEffect(() => {
    // Fetch all products
    dispatch(fetchAllProducts());

    // Fetch categories
    const fetchCategories = async () => {
      try {
        const response = await axios.get('https://ravel-be.vercel.app/api/admin/category/get');
        const options = response.data.data.map(category => ({
          id: category._id,
          label: category.title,
        }));
        setCategories(options);
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };
    
    fetchCategories();
  }, [dispatch]);
  function onSubmit(event) {
    event.preventDefault();
  
    const productData = {
      ...formData,
      image: uploadedImageUrl,
    };
  
    console.log("Submitting Product Data:", productData);
  
    const action = currentEditedId
      ? dispatch(editProduct({ id: currentEditedId, formData: productData }))
      : dispatch(addNewProduct(productData));
  
    action
      .then((result) => {
        if (result?.payload?.success) {
          // Close the dialog and reset form state after success
          setOpenCreateProductsDialog(false);
          setFormData(initialFormData); // Reset form data
          setImageFile(null); // Reset image file
          setUploadedImageUrl(""); // Reset uploaded image URL
          setImageLoadingState(false); // Reset image loading state
          setCurrentEditedId(null); // Reset editing state
          dispatch(fetchAllProducts()); // Optionally fetch products again
          toast({
            title: "Success",
            description: currentEditedId ? "Product updated successfully" : "Product added successfully",
            variant: "success",
          });
        } else {
          toast({
            title: "Error",
            description: "There was an issue adding or editing the product.",
            variant: "destructive",
          });
        }
      })
      .catch((error) => {
        toast({
          title: "Error",
          description: "Something went wrong. Please try again.",
          variant: "destructive",
        });
        console.error("Error submitting product:", error);
      });
  }
  

  const handleDelete = (getCurrentProductId) => {
    dispatch(deleteProduct(getCurrentProductId)).then((data) => {
      if (data?.payload?.success) {
        dispatch(fetchAllProducts());
      }
    });
  };

  const isFormValid = () => {
    return Object.keys(formData)
      .filter((currentKey) => currentKey !== "averageReview")
      .map((key) => formData[key] !== "")
      .every((item) => item);
  };

  return (
    <Fragment>
      <div className="mb-5 w-full flex justify-end">
        <Button onClick={() => setOpenCreateProductsDialog(true)}>
          Add New Product
        </Button>
      </div>
      <div className="grid gap-4 md:grid-cols-3 lg:grid-cols-4">
        {productList && productList.length > 0
          ? productList.map((productItem) => (
              <AdminProductTile
                key={productItem._id}
                setFormData={setFormData}
                setOpenCreateProductsDialog={setOpenCreateProductsDialog}
                setCurrentEditedId={setCurrentEditedId}
                product={productItem}
                handleDelete={handleDelete}
              />
            ))
          : null}
      </div>
      <Sheet
        open={openCreateProductsDialog}
        onOpenChange={() => {
          setOpenCreateProductsDialog(false);
          setCurrentEditedId(null);
          setFormData(initialFormData);
        }}
      >
        <SheetContent side="right" className="overflow-auto">
          <SheetHeader>
            <SheetTitle>
              {currentEditedId !== null ? "Edit Product" : "Add New Product"}
            </SheetTitle>
          </SheetHeader>
          <ProductImageUpload
            imageFile={imageFile}
            setImageFile={setImageFile}
            uploadedImageUrl={uploadedImageUrl}
            setUploadedImageUrl={setUploadedImageUrl}
            setImageLoadingState={setImageLoadingState}
            imageLoadingState={imageLoadingState}
            isEditMode={currentEditedId !== null}
          />
          <div className="py-6">
            <CommonForm
              onSubmit={onSubmit}
              formData={formData}
              setFormData={setFormData}
              buttonText={currentEditedId !== null ? "Edit" : "Add"}
              formControls={addProductFormElements.map((element) => {
                if (element.name === "category") {
                  return {
                    ...element,
                    options: categories, // Set fetched categories here
                  };
                }
                return element;
              })}
              isBtnDisabled={!isFormValid()}
            />
          </div>
        </SheetContent>
      </Sheet>
    </Fragment>
  );
}

export default AdminProducts;
