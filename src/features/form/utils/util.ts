import { ChangeEvent, RefObject } from "react";
import { PrepTimeProps } from "./types";

export const dishesOptions = [
  { value: "pizza", label: "Pizza" },
  { value: "soup", label: "Soup" },
  { value: "sandwich", label: "Sandwich" },
];

export const handleHoursChange = (e: ChangeEvent<HTMLInputElement>, ref: RefObject<PrepTimeProps>) => {
  if (ref.current !== null) {
    ref.current.hours = +e.target.value;
    console.log(ref.current.hours);
  }
};

export const handleMinutesChange = (e: ChangeEvent<HTMLInputElement>, ref: RefObject<PrepTimeProps>) => {
  if (ref.current !== null) {
    if (+e.target.value > 59) {
      return;
    }
    ref.current.minutes = +e.target.value;
    console.log(ref.current.minutes);
  }
};
export const handleSecondsChange = (e: ChangeEvent<HTMLInputElement>, ref: RefObject<PrepTimeProps>) => {
  if (ref.current !== null) {
    if (+e.target.value > 59) {
      return;
    }
    ref.current.seconds = +e.target.value;
    console.log(ref.current.seconds);
  }
};
