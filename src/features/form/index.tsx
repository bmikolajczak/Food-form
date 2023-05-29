import { FC, useEffect, useRef, useState } from "react";

import { useForm, useController, SubmitHandler } from "react-hook-form";

import Select from "react-select";

import { FormInputs, IResponse, PrepTimeProps } from "./utils/types";
import { handleHoursChange, handleMinutesChange, handleSecondsChange, dishesOptions } from "./utils/util";
import { Error } from "./error";

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
    setBusy(true);
    console.log("submitted data: ", data, data.spiciness);
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
    <main>
      <form onSubmit={handleSubmit(onSubmit)}>
        {/* <label htmlFor="dishName">Dish name</label> */}
        <p>Dish Name</p>
        <input {...register("dishName", { required: "Dish name is required" })} />
        <p>{errors.dishName?.message}</p>
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
            <p>{errors.diameter?.message}</p>
            <input
              placeholder="number of slices"
              type="number"
              {...register("noOfSlices", { required: "Please enter number of slices" })}
            />
            <p>{errors.noOfSlices?.message}</p>
          </>
        ) : dishType === "soup" ? (
          <>
            <input
              placeholder="spiciness"
              max={10}
              type="number"
              {...register("spiciness", { required: true, min: 1, max: 10 })}
            />
            <p>{errors.spiciness?.message}</p>
          </>
        ) : dishType === "sandwich" ? (
          <input placeholder="slices of bread" type="number" {...register("slicesOfBread", { required: true })} />
        ) : null}
        <p>{errors.slicesOfBread?.message}</p>
        <input type="submit" />
      </form>
      {busy && <Error isLoading={response.fetching} msg={response.responseMsg} code={response.responseCode} />}
    </main>
  );
};
