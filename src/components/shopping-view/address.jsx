import { useEffect, useState } from "react";
import CommonForm from "../common/form";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { addressFormControls } from "@/config";
import AddressCard from "./address-card";
import { useToast } from "../ui/use-toast";

const initialAddressFormData = {
  address: "",
  city: "",
  phone: "",
  pincode: "",  // Change pincode to email
  notes: "",
};

function Address({ setCurrentSelectedAddress, selectedId }) {
  const [formData, setFormData] = useState(initialAddressFormData);
  const [addressList, setAddressList] = useState([]);
  const { toast } = useToast();

  // Load addresses from local storage on mount (allow only one address)
  useEffect(() => {
    const storedAddresses = JSON.parse(localStorage.getItem('addresses')) || [];
    if (storedAddresses.length > 0) {
      setAddressList(storedAddresses);  // Only allow one address
    }
  }, []);

  // Handle adding or editing an address
  function handleManageAddress(event) {
    event.preventDefault();

    // Only allow one address at a time
    if (addressList.length > 0) {
      toast({ title: "You can only add one address!" });
      return;
    }

    const newAddress = { ...formData, _id: Date.now() };
    const updatedAddressList = [newAddress]; // Only one address allowed

    setAddressList(updatedAddressList);
    localStorage.setItem('addresses', JSON.stringify(updatedAddressList));
    setFormData(initialAddressFormData);

    toast({ title: "Address added successfully!" });
  }

  // Handle deleting an address
  function handleDeleteAddress(addressToDelete) {
    const updatedAddressList = addressList.filter(address => address._id !== addressToDelete._id);
    setAddressList(updatedAddressList);
    localStorage.setItem('addresses', JSON.stringify(updatedAddressList));
    toast({ title: "Address deleted successfully!" });
  }

  // Handle editing an address
  function handleEditAddress(addressToEdit) {
    setFormData(addressToEdit);
  }

  // Check if form is valid (i.e., all fields are filled)
  function isFormValid() {
    return Object.values(formData).every(value => value.trim() !== "") && validateEmail(formData.pincode);
  }

  // Validate email format (used for pincode field)
  function validateEmail(email) {
    const re = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return re.test(email);
  }

  return (
    <Card className="max-w-4xl mx-auto">
      <div className="mb-5 p-3 grid grid-cols-1 sm:grid-cols-1 gap-4">
        {addressList.length > 0 ? (
          addressList.map((singleAddressItem) => (
            <AddressCard
              key={singleAddressItem._id}
              selectedId={selectedId}
              handleDeleteAddress={handleDeleteAddress}
              addressInfo={singleAddressItem}
              handleEditAddress={handleEditAddress}
              setCurrentSelectedAddress={setCurrentSelectedAddress}
            />
          ))
        ) : (
          <p className="text-center text-gray-600">No address added yet!</p>
        )}
      </div>

      <CardHeader>
        <CardTitle>{addressList.length > 0 ? 'Edit Address' : 'Add New Address'}</CardTitle>
      </CardHeader>

      <CardContent className="space-y-4">
        <CommonForm
          formControls={addressFormControls}
          formData={formData}
          setFormData={setFormData}
          buttonText={addressList.length > 0 ? "Edit Address" : "Add Address"}
          onSubmit={handleManageAddress}
          isBtnDisabled={!isFormValid()}
        />
      </CardContent>
    </Card>
  );
}

export default Address;
