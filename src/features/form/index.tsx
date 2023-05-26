import { FC, useEffect } from "react";

import { useForm, useController, SubmitHandler } from "react-hook-form";

import Select from "react-select";

import { FormInputs, PrepTimeProps } from "./utils/types";

const dishesOptions = [
  { value: "pizza", label: "Pizza" },
  { value: "soup", label: "Soup" },
  { value: "sandwich", label: "Sandwich" },
];

export const DishesForm: FC = () => {
  //   const handleTypeChange = (e) => {
  //     console.log(`Chosen dish`);
  //   };
  const {
    register,
    handleSubmit,
    control,
    watch,
    unregister,
    formState: { errors },
  } = useForm<FormInputs & PrepTimeProps>();

  const { field } = useController({ name: "dishType", control });

  const dishType = watch("dishType");

  const onSubmit: SubmitHandler<FormInputs> = (data) => {
    console.log("submitted data: ", data);
  };

  const handleSelectChange = (option) => {
    // if (dishType === "pizza") {
    //   console.log("unregistered");
    //   unregister("spiciness");
    // }
    field.onChange(option.value);
  };
  useEffect(() => {
    if (dishType === "pizza") {
      unregister(["spiciness", "slicesOfBread"]);
    } else if (dishType === "soup") {
      unregister(["slicesOfBread", "diameter", "noOfSlices"]);
    } else if (dishType === "sandwich") {
      unregister(["spiciness", "diameter", "noOfSlices"]);
    }
  }, [unregister, dishType]);
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {/* <label htmlFor="dishName">Dish name</label> */}
      <input {...register("dishName", { required: "Dish name is required" })} />
      <p>{errors.dishName?.message}</p>
      <Select
        value={dishesOptions.find(({ value }) => value === field.value)}
        onChange={handleSelectChange}
        options={dishesOptions}
      />
      {dishType === "pizza" ? (
        <>
          <input placeholder="diamter" type="number" {...register("diameter")} />
          <input placeholder="number of slices" type="number" {...register("noOfSlices")} />
        </>
      ) : dishType === "soup" ? (
        <input placeholder="spiciness" type="number" {...register("spiciness")} />
      ) : dishType === "sandwich" ? (
        <input placeholder="slices of bread" type="number" {...register("slicesOfBread")} />
      ) : null}
      <input type="submit" />
    </form>
  );
};
