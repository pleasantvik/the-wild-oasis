import * as Yup from "yup";

export const cabinSchema = Yup.object({
  name: Yup.string().required("Required"),
  maxCapacity: Yup.number().required("Required"),
  description: Yup.string().required("Required"),
  discount: Yup.number(),
  regularPrice: Yup.number(),
});
