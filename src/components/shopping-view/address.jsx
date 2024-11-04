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
  pincode: "",
  notes: "",
};

function Address({ setCurrentSelectedAddress, selectedId }) {
  const [formData, setFormData] = useState(initialAddressFormData);
  const [addressList, setAddressList] = useState([]);
  const { toast } = useToast();

  // Load addresses from local storage on mount
  useEffect(() => {
    const storedAddresses = JSON.parse(localStorage.getItem('addresses')) || [];
    setAddressList(storedAddresses);
  }, []);

  // Function to handle adding/updating addresses
  function handleManageAddress(event) {
    event.preventDefault();
    
    const existingAddressIndex = addressList.findIndex(address => address._id === formData._id);
    
    let updatedAddressList;
    
    if (existingAddressIndex > -1) {
      // Edit existing address
      updatedAddressList = addressList.map((address, index) => 
        index === existingAddressIndex ? { ...formData } : address
      );
      toast({ title: "Address updated successfully!" });
    } else {
      // Add new address
      const newAddress = { ...formData, _id: Date.now() };
      updatedAddressList = [...addressList, newAddress];
      toast({ title: "Address added successfully!" });
    }
  
    setAddressList(updatedAddressList);
    localStorage.setItem('addresses', JSON.stringify(updatedAddressList));
    setFormData(initialAddressFormData);
  }
  

  function handleDeleteAddress(addressToDelete) {
    const updatedAddressList = addressList.filter(address => address._id !== addressToDelete._id);
    setAddressList(updatedAddressList);
    localStorage.setItem('addresses', JSON.stringify(updatedAddressList));
    toast({ title: "Address deleted successfully!" });
  }

  function handleEditAddress(addressToEdit) {
    setFormData(addressToEdit);
    handleDeleteAddress(addressToEdit); // Remove the current address to edit from the list
  }

  function isFormValid() {
    return Object.values(formData).every(value => value.trim() !== "");
  }

  return (
    <Card>
      <div className="mb-5 p-3 grid grid-cols-1 sm:grid-cols-2 gap-2">
        {addressList.map((singleAddressItem) => (
          <AddressCard
            key={singleAddressItem._id}
            selectedId={selectedId}
            handleDeleteAddress={handleDeleteAddress}
            addressInfo={singleAddressItem}
            handleEditAddress={handleEditAddress}
            setCurrentSelectedAddress={setCurrentSelectedAddress}
          />
        ))}
      </div>
      <CardHeader>
        <CardTitle>Add New Address</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        <CommonForm
          formControls={addressFormControls}
          formData={formData}
          setFormData={setFormData}
          buttonText="Add"
          onSubmit={handleManageAddress}
          isBtnDisabled={!isFormValid()}
        />
      </CardContent>
    </Card>
  );
}

export default Address;
