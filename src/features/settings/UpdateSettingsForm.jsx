import Spinner from "src/ui/Spinner";
import { useSettings } from "src/features/settings/useSettings";
// import { useUpdateSetting } from "src/features/settings/useUpdateSetting";
import { useUpdateSetting } from "src/features/settings/useEditSetting";

import Form from "src/ui/Form";
import FormRow from "src/ui/FormRow";
import Input from "src/ui/Input";

function UpdateSettingsForm() {
  const {
    settings: {
      minBookingLength,
      maxBookingLength,
      maxGuestPerBooking,
      breakfastPrice,
    } = {},
    isLoading,
  } = useSettings();

  const { updateSetting, isUpdating } = useUpdateSetting();

  // return <Spinner />;
  if (isLoading) return <Spinner />;

  function handleBlur(e, field) {
    const { value } = e.target;

    if (!value) return;
    updateSetting({ [field]: value });
  }

  // This time we are using UNCONTROLLED fields, so we will NOT store state
  return (
    <Form>
      <FormRow label="Minimum nights/booking">
        <Input
          type="number"
          defaultValue={minBookingLength}
          onBlur={(e) => handleBlur(e, "minBookingLength")}
          disabled={isUpdating}
          id="min-nights"
        />
      </FormRow>
      <FormRow label="Maximum nights/booking">
        <Input
          type="number"
          defaultValue={maxBookingLength}
          onBlur={(e) => handleBlur(e, "maxBookingLength")}
          disabled={isUpdating}
          id="max-nights"
        />
      </FormRow>
      <FormRow label="Maximum guests/booking">
        <Input
          type="number"
          defaultValue={maxGuestPerBooking}
          onBlur={(e) => handleBlur(e, "maxGuestPerBooking")}
          disabled={isUpdating}
          id="max-guests"
        />
      </FormRow>
      <FormRow label="Breakfast price">
        <Input
          type="number"
          defaultValue={breakfastPrice}
          onBlur={(e) => handleBlur(e, "breakfastPrice")}
          disabled={isUpdating}
          id="breakfast-price"
        />
      </FormRow>
    </Form>
  );
}

export default UpdateSettingsForm;
