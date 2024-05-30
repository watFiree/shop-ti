"use client";
import { Input } from "@nextui-org/input";
import { deliveryFormChangeHandler } from "./deliveryFormChangeHandler";
import styles from "./deliveryForm.module.css";

export const DeliveryForm = () => {
  const { formData, handleChange } = deliveryFormChangeHandler();
  return (
    <div className={styles.component_container}>
      <h3 className="text-foreground-500 pb-2">Adres dostawy</h3>
      <form className={styles.form_container}>
        <div className={styles.inputs_row}>
          <Input
            isRequired
            variant="bordered"
            radius="sm"
            type="text"
            name="name"
            label="Imię"
            value={formData.name}
            className="max-w"
            onChange={handleChange}
          />
          <Input
            isRequired
            variant="bordered"
            radius="sm"
            type="text"
            name="surname"
            label="Nazwisko"
            value={formData.surname}
            className="max-w"
            onChange={handleChange}
          />
        </div>

        <Input
          isRequired
          variant="bordered"
          radius="sm"
          type="text"
          name="address"
          label="Adres mieszkania"
          value={formData.address}
          className="max-w"
          onChange={handleChange}
        />
        <Input
          isRequired
          variant="bordered"
          radius="sm"
          type="text"
          name="postalCode"
          label="Kod pocztowy"
          value={formData.postalCode}
          className="max-w"
          onChange={handleChange}
        />
        <Input
          isRequired
          variant="bordered"
          radius="sm"
          type="text"
          name="city"
          label="Miasto"
          value={formData.city}
          className="max-w"
          onChange={handleChange}
        />
        <Input
          isRequired
          variant="bordered"
          radius="sm"
          type="tel"
          name="phone"
          label="Numer telefonu"
          value={formData.phone}
          className="max-w"
          onChange={handleChange}
        />
        <Input
          isRequired
          variant="bordered"
          radius="sm"
          type="email"
          name="email"
          label="E-mail"
          value={formData.email}
          className="max-w"
          onChange={handleChange}
        />
      </form>
    </div>
  );
};
