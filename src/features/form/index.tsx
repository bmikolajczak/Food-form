import { FC, useEffect, useRef, useState } from "react";

import { useForm, useController, SubmitHandler } from "react-hook-form";

import Select from "react-select";

import { FormInputs, IResponse, PrepTimeProps } from "./utils/types";
import { handleHoursChange, handleMinutesChange, handleSecondsChange, dishesOptions } from "./utils/util";
import { Response } from "./response";

export const DishesForm: FC = () => {
  const [busy, setBusy] = useState(false);
  const [response, setResponse] = useState<IResponse>({ fetching: true, responseCode: 100, responseMsg: "Loading" });

  const {
    register,
    handleSubmit,
    control,
    watch,
    unregister,
    formState: { errors },
  } = useForm<FormInputs>();

  //prep time ref
  const prepTimeRef = useRef<PrepTimeProps>({ hours: 0, minutes: 0, seconds: 0 });

  //dish time select
  const { field } = useController({ name: "type", control });

  const dishType = watch("type");

  const onSubmit: SubmitHandler<FormInputs> = (data) => {
    const hours = prepTimeRef.current.hours < 10 ? `0${prepTimeRef.current.hours}` : `${prepTimeRef.current.hours}`;
    const minutes =
      prepTimeRef.current.minutes < 10 ? `0${prepTimeRef.current.minutes}` : `${prepTimeRef.current.minutes}`;
    const seconds =
      prepTimeRef.current.seconds < 10 ? `0${prepTimeRef.current.seconds}` : `${prepTimeRef.current.seconds}`;
    setBusy(true);
    const request = {
      ...data,
      preparation_time: `${hours}:${minutes}:${seconds}`,
    };
    console.log("submitted data: ", request);

    setTimeout(() => {
      setResponse({ responseCode: 200, responseMsg: "OK", fetching: false });
    }, 2000);
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
    <div className="container-fluid">
      <form onSubmit={handleSubmit(onSubmit)}>
        {/* <label htmlFor="dishName">Dish name</label> */}
        <h4>Dish Name</h4>
        <input {...register("dishName", { required: "Dish name is required" })} />
        <p>{errors.dishName?.message}</p>
        <h4>Duration</h4>
        <div className="grid">
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
        <h4>Type of Food</h4>
        <Select
          required
          value={dishesOptions.find(({ value }) => value === field.value)}
          onChange={handleSelectChange}
          options={dishesOptions}
          styles={{
            placeholder: (baseStyles) => ({
              ...baseStyles,
              color: "white",
            }),
            singleValue: (baseStyles) => ({
              ...baseStyles,
              color: "white",
            }),
            control: (baseStyles, state) => ({
              ...baseStyles,
              backgroundColor: "#11191f",
              borderColor: state.isFocused ? "#e9bf83" : "#374956",
            }),
            option: (baseStyles) => ({
              ...baseStyles,
              backgroundColor: "#374956",
              color: "white",
            }),
          }}
        />
        {dishType === "pizza" ? (
          <>
            <h4>Diamater fo the pizza</h4>
            <input
              placeholder="diamter"
              step={0.1}
              type="number"
              {...register("diameter", { required: "Please enter diamater" })}
            />
            <span>{errors.diameter?.message}</span>
            <h4>Number of splices</h4>
            <input
              placeholder="number of slices"
              type="number"
              {...register("noOfSlices", { required: "Please enter number of slices" })}
            />
            <span>{errors.noOfSlices?.message}</span>
          </>
        ) : dishType === "soup" ? (
          <>
            <h4>Spiciness of the soup (1-10)</h4>
            <input
              placeholder="spiciness"
              max={10}
              type="number"
              {...register("spiciness", { required: "Please enter level of spiciness", min: 1, max: 10 })}
            />
            <span>{errors.spiciness?.message}</span>
          </>
        ) : dishType === "sandwich" ? (
          <>
            <h4>Slices of bread</h4>
            <input placeholder="slices of bread" type="number" {...register("slicesOfBread", { required: true })} />
            <span>{errors.slicesOfBread?.message}</span>
          </>
        ) : null}
        <p>{errors.slicesOfBread?.message}</p>
        <input type="submit" />
      </form>
      {busy && <Response isLoading={response.fetching} msg={response.responseMsg} code={response.responseCode} />}
    </div>
  );
};
