import { ChangeEvent, FC, useEffect, useRef } from "react";

import { useForm, useController, SubmitHandler } from "react-hook-form";

import Select from "react-select";

import { FormInputs, PrepTimeProps } from "./utils/types";

const dishesOptions = [
  { value: "pizza", label: "Pizza" },
  { value: "soup", label: "Soup" },
  { value: "sandwich", label: "Sandwich" },
];

export const DishesForm: FC = () => {
  const {
    register,
    handleSubmit,
    control,
    watch,
    unregister,
    formState: { errors },
  } = useForm<FormInputs & PrepTimeProps>();

  //prep time ref
  const prepTimeRef = useRef<PrepTimeProps>({ hours: 0, minutes: 0, seconds: 0 });
  const handleHoursChange = (e: ChangeEvent<HTMLInputElement>) => {
    prepTimeRef.current.hours = +e.target.value;
    console.log(prepTimeRef.current.hours);
  };
  const handleMinutesChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (+e.target.value > 59) {
      return;
    }
    prepTimeRef.current.minutes = +e.target.value;
    console.log(prepTimeRef.current.minutes);
  };
  const handleSecondsChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (+e.target.value > 59) {
      return;
    }
    prepTimeRef.current.seconds = +e.target.value;
    console.log(prepTimeRef.current.seconds);
  };
  //dish time select
  const { field } = useController({ name: "type", control });

  const dishType = watch("type");

  const onSubmit: SubmitHandler<FormInputs> = (data) => {
    console.log("submitted data: ", data);
  };

  const handleSelectChange = (option) => {
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
      <p>Duration</p>
      <div>
        <input type="number" placeholder="HH" onChange={(e) => handleHoursChange(e)} />
        <input type="number" max={59} maxLength={2} placeholder="MM" onChange={(e) => handleMinutesChange(e)} />
        <input type="number" max={59} maxLength={2} placeholder="SS" onChange={(e) => handleSecondsChange(e)} />
      </div>
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
