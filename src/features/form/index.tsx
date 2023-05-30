import { FC, useEffect, useRef, useState } from "react";

import { useForm, useController, SubmitHandler } from "react-hook-form";

import Select, { SingleValue } from "react-select";

import { FormInputs, IResponse, PrepTimeProps } from "./utils/types";
import { handleHoursChange, handleMinutesChange, handleSecondsChange, dishesOptions } from "./utils/util";
import { Response } from "./response";

export const DishesForm: FC = () => {
  const [busy, setBusy] = useState(false);
  const [response, setResponse] = useState<IResponse>({ fetching: true, responseMsg: "Loading" });

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

  const onSubmit: SubmitHandler<FormInputs> = async (data) => {
    setBusy(true);

    const hours = prepTimeRef.current.hours < 10 ? `0${prepTimeRef.current.hours}` : `${prepTimeRef.current.hours}`;
    const minutes =
      prepTimeRef.current.minutes < 10 ? `0${prepTimeRef.current.minutes}` : `${prepTimeRef.current.minutes}`;
    const seconds =
      prepTimeRef.current.seconds < 10 ? `0${prepTimeRef.current.seconds}` : `${prepTimeRef.current.seconds}`;

    const request = {
      ...data,
      preparation_time: `${hours}:${minutes}:${seconds}`,
    };

    const response = await fetch("https://umzzcc503l.execute-api.us-west-2.amazonaws.com/dishes/", {
      method: "POST",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(request),
    });
    response.json().then(
      () => {
        setResponse({ responseMsg: "Request sent successfully", fetching: false });
      },
      () => {
        setResponse({ responseMsg: "Request failed. Try again", fetching: false });
      }
    );
  };

  const handleSelectChange = (option: SingleValue<{ value: string; label: string }>) => {
    field.onChange(option?.value);
  };
  useEffect(() => {
    if (dishType === "pizza") {
      unregister(["spiciness_scale", "slices_of_bread"]);
    } else if (dishType === "soup") {
      unregister(["slices_of_bread", "diameter", "no_of_slices"]);
    } else if (dishType === "sandwich") {
      unregister(["spiciness_scale", "diameter", "no_of_slices"]);
    }
  }, [unregister, dishType]);
  return (
    <div className="container-fluid">
      <form onSubmit={handleSubmit(onSubmit)}>
        {/* <label htmlFor="dishName">Dish name</label> */}
        <h4>Dish Name</h4>
        <input {...register("name", { required: "Dish name is required" })} />
        <p>{errors.name?.message}</p>
        <h4>Preparation Time</h4>
        <div className="grid">
          <input required type="number" placeholder="Hr" onChange={(e) => handleHoursChange(e, prepTimeRef)} />
          <input
            required
            type="number"
            max={59}
            maxLength={2}
            placeholder="Min"
            onChange={(e) => handleMinutesChange(e, prepTimeRef)}
          />
          <input
            required
            type="number"
            max={59}
            maxLength={2}
            placeholder="Sec"
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
              {...register("diameter", { required: "Please enter diamater", min: 1 })}
            />
            <p>{errors.diameter?.message}</p>
            <h4>Number of splices</h4>
            <input
              placeholder="number of slices"
              type="number"
              {...register("no_of_slices", { required: "Please enter number of slices", min: 1 })}
            />
            <p>{errors.no_of_slices?.message}</p>
          </>
        ) : dishType === "soup" ? (
          <>
            <h4>Spiciness of the soup (1-10)</h4>
            <input
              placeholder="spiciness"
              type="number"
              {...register("spiciness_scale", { required: "Please enter level of spiciness", min: 1, max: 10 })}
            />
            <p>{errors.spiciness_scale?.message}</p>
          </>
        ) : dishType === "sandwich" ? (
          <>
            <h4>Slices of bread</h4>
            <input
              placeholder="slices of bread"
              type="number"
              {...register("slices_of_bread", { required: "Please enter the number of slices", min: 1 })}
            />
          </>
        ) : null}
        <p>{errors.slices_of_bread?.message}</p>
        <input type="submit" />
      </form>
      {busy && <Response isLoading={response.fetching} msg={response.responseMsg} />}
    </div>
  );
};
