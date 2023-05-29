import { FC, useEffect, useRef } from "react";

import { useForm, useController, SubmitHandler } from "react-hook-form";

import Select from "react-select";

import { FormInputs, PrepTimeProps } from "./utils/types";
import { handleHoursChange, handleMinutesChange, handleSecondsChange, dishesOptions } from "./utils/util";

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

  //dish time select
  const { field } = useController({ name: "type", control });

  const dishType = watch("type");

  const onSubmit: SubmitHandler<FormInputs> = (data) => {
    console.log("submitted data: ", data, data.spiciness);
  };

  const handleSelectChange = (option: { value: string; label: string }) => {
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
        <input required type="number" placeholder="HH" onChange={(e) => handleHoursChange(e, prepTimeRef)} />
        <input
          required
          type="number"
          max={59}
          maxLength={2}
          placeholder="MM"
          onChange={(e) => handleMinutesChange(e, prepTimeRef)}
        />
        <input
          required
          type="number"
          max={59}
          maxLength={2}
          placeholder="SS"
          onChange={(e) => handleSecondsChange(e, prepTimeRef)}
        />
      </div>
      <p>{errors.dishName?.message}</p>
      <Select
        required
        value={dishesOptions.find(({ value }) => value === field.value)}
        onChange={handleSelectChange}
        options={dishesOptions}
      />
      {dishType === "pizza" ? (
        <>
          <input
            placeholder="diamter"
            step={0.1}
            type="number"
            {...register("diameter", { required: "Please enter diamater" })}
          />
          <input
            placeholder="number of slices"
            type="number"
            {...register("noOfSlices", { required: "Please enter number of slices" })}
          />
        </>
      ) : dishType === "soup" ? (
        <input placeholder="spiciness" max={10} type="number" {...register("spiciness", { required: true })} />
      ) : dishType === "sandwich" ? (
        <input placeholder="slices of bread" type="number" {...register("slicesOfBread", { required: true })} />
      ) : null}
      <input type="submit" />
    </form>
  );
};
