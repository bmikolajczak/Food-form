export type FormInputs = {
  name: string;
  preparation_time: string;
  type: string;
  no_of_slices: number;
  diameter: number;
  spiciness_scale: number;
  slices_of_bread: number;
};

export type PrepTimeProps = {
  hours: number;
  minutes: number;
  seconds: number;
};

export interface IResponse {
  fetching: boolean;
  responseMsg: string;
}
