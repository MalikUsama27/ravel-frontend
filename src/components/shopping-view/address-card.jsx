import { Button } from "../ui/button";
import { Card, CardContent, CardFooter } from "../ui/card";
import { Label } from "../ui/label";

function AddressCard({
  addressInfo,
  handleDeleteAddress,
  handleEditAddress,
  setCurrentSelectedAddress,
  selectedId,
}) {
  return (
    <Card
      onClick={
        setCurrentSelectedAddress
          ? () => setCurrentSelectedAddress(addressInfo)
          : null
      }
      className={`cursor-pointer w-full border-2 transition-all ease-in-out duration-300 ${
        selectedId?._id === addressInfo?._id
          ? "border-red-500 shadow-lg transform scale-105 " 
          : "border-gray-300 shadow-md"
      } rounded-lg bg-white overflow-hidden`}
    >
      <CardContent className="p-4 sm:p-6 gap-1 grid ">
        <Label className="text-lg font-semibold text-gray-700">Address</Label>
        <p className="text-sm text-gray-600">{addressInfo?.address}</p>

        <Label className="text-lg font-semibold text-gray-700">City</Label>
        <p className="text-sm text-gray-600">{addressInfo?.city}</p>

        <Label className="text-lg font-semibold text-gray-700">Email</Label>
        <p className="text-sm text-gray-600">{addressInfo?.pincode}</p> {/* Showing pincode as email */}

        <Label className="text-lg font-semibold text-gray-700">Phone</Label>
        <p className="text-sm text-gray-600">{addressInfo?.phone}</p>

        <Label className="text-lg font-semibold text-gray-700">Notes</Label>
        <p className="text-sm text-gray-600">{addressInfo?.notes}</p>
      </CardContent>
      <CardFooter className="p-3 flex justify-between bg-gray-50 border-t">
        {/* <Button
          onClick={() => handleEditAddress(addressInfo)}
          className="text-white bg-blue-500 hover:bg-blue-600 transition duration-200 px-4 py-2 rounded-md"
        >
          Edit
        </Button> */}
        <Button
          onClick={() => handleDeleteAddress(addressInfo)}
          className="text-white bg-red-500 hover:bg-red-600 transition duration-200 px-4 py-2 rounded-md"
        >
          Delete
        </Button>
      </CardFooter>
    </Card>
  );
}

export default AddressCard;
