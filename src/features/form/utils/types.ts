export type FormInputs = {
  dishName: string;
  prepTime: string;
  type: string;
  noOfSlices: number;
  diameter: number;
  spiciness: number;
  slicesOfBread: number;
};

export type PrepTimeProps = {
  hours: number;
  minutes: number;
  seconds: number;
};

export interface IResponse {
  fetching: boolean;
  responseCode: number;
  responseMsg: string;
}
