import { useState, useEffect } from "react";
import debounce from "lodash.debounce";

export const sessionStorageDeliveryFormKey = "deliveryForm";

export const deliveryFormChangeHandler = () => {
  const [formData, setFormData] = useState({
    name: "",
    surname: "",
    address: "",
    postalCode: "",
    city: "",
    phone: "",
    email: "",
  });

  useEffect(() => {
    const savedData = sessionStorage.getItem(sessionStorageDeliveryFormKey);
    if (savedData) {
      setFormData(JSON.parse(savedData));
    }
  }, []);

  const saveFormData = debounce(() => {
    sessionStorage.setItem(
      sessionStorageDeliveryFormKey,
      JSON.stringify(formData)
    );
  }, 500);

  useEffect(() => {
    saveFormData();
  }, [
    formData.name,
    formData.surname,
    formData.address,
    formData.postalCode,
    formData.city,
    formData.phone,
    formData.email,
  ]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return { formData, handleChange };
};
