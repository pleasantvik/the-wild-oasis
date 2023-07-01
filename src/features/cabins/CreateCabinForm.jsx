/* eslint-disable react/prop-types */
import { useForm } from "react-hook-form";

import Input from "src/ui/Input";
import Form from "src/ui/Form";
import Button from "src/ui/Button";
import FileInput from "src/ui/FileInput";
import Textarea from "src/ui/Textarea";
import FormRow from "src/ui/FormRow";
import { useCreateCabin } from "src/features/cabins/useCreateCabin";
import { useEditCabin } from "src/features/cabins/useEditCabin";

function CreateCabinForm({ cabinToEdit = {}, onCloseModal }) {
  const { createCabin, isCreating } = useCreateCabin();
  const { editCabin, isEditing } = useEditCabin();

  const { id: editId, ...editValues } = cabinToEdit;

  const isEditSession = Boolean(editId);
  const {
    register,
    handleSubmit,
    reset,
    getValues,
    formState: { errors },
  } = useForm({
    defaultValues: isEditSession ? editValues : {},
  });

  const isWorking = isCreating || isEditing;

  const onFormSubmit = (data) => {
    const image =
      typeof data?.image === "string" ? data?.image : data?.image?.[0];
    if (isEditSession) {
      editCabin(
        { newCabinData: { ...data, image }, id: editId },
        {
          onSuccess: () => {
            reset(), onCloseModal?.();
          },
        }
      );
    } else {
      createCabin(
        { ...data, image },
        {
          onSuccess: () => reset(),
        }
      );
    }
  };
  // eslint-disable-next-line no-unused-vars
  const onError = (error) => {
    // console.log(error);
  };

  return (
    <Form
      onSubmit={handleSubmit(onFormSubmit, onError)}
      type={onCloseModal ? "modal" : "regular"}
    >
      <FormRow label="Cabin name" error={errors?.name?.message}>
        <Input
          type="text"
          id="name"
          {...register("name", {
            required: "This field is required",
          })}
        />
      </FormRow>
      <FormRow label="Maximum capacity" error={errors?.name?.message}>
        <Input
          type="number"
          id="maxCapacity"
          {...register("maxCapacity", {
            required: "This field is required",
            min: {
              value: 1,
              message: "Capacity should be at least one",
            },
          })}
        />
      </FormRow>
      <FormRow label="Regular price" error={errors?.regularPrice?.message}>
        <Input
          type="number"
          id="regularPrice"
          {...register("regularPrice", {
            required: "This field is required",
          })}
        />
      </FormRow>
      <FormRow label="Discount" error={errors?.discount?.message}>
        <Input
          type="number"
          id="discount"
          // defaultValue={0}
          {...register("discount", {
            required: "This field is required",
            validate: (value) =>
              value <= Number(getValues().regularPrice) ||
              "Discount should be less than regular price",
          })}
        />
      </FormRow>
      <FormRow
        label="Description for website"
        error={errors?.description?.message}
      >
        <Textarea
          type="number"
          id="description"
          {...register("description", {
            required: "This field is required",
          })}
          defaultValue=""
        />
      </FormRow>
      <FormRow error={errors?.image?.message} label="Cabin photo">
        <FileInput
          id="image"
          accept="image/*"
          {...register("image", {
            required: isEditSession ? false : "This field is required",
          })}
        />
      </FormRow>

      <FormRow>
        <Button
          variation="secondary"
          type="reset"
          onClick={() => onCloseModal?.()}
        >
          Cancel
        </Button>
        <Button disabled={isWorking}>
          {isEditSession ? "Edit Cabin" : "Create Cabin"}
        </Button>
      </FormRow>
    </Form>
  );
}

export default CreateCabinForm;
