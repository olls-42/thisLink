import { useForm } from "@tanstack/react-form";
import type ReferralLink from "./ReferralLink";
import { TextArea, TextField } from "../base/TextField";
import { createLinkItem, updateLinkItem } from "$/storage/ReferralLinkStorage";
import { Button } from "../base/Button";
import { Link, useNavigate } from "@tanstack/react-router";

interface ReferralFormProps {
  referralLinkItem: ReferralLink;
  context: "CREATE" | "UPDATE";
}

export default function ReferralLinkForm({
  context,
  referralLinkItem,
}: ReferralFormProps) {

  const navigator = useNavigate();

  const onSubmitHandler = async ({ value }) => {
    if (context == "CREATE") {
      const res = await createLinkItem(value, false);
      if (res) navigator({ to: "/" });
      return;
    }

    if (context == "UPDATE") {
      const res = await updateLinkItem(value);
      if (res) navigator({ to: "/" });
      return;
    }
  };

  const form = useForm({
    defaultValues: referralLinkItem,
    onSubmit: onSubmitHandler,
    validators: {
      onSubmitAsync: async ({ value }) => {
        // Validate the value on the server
        const hasErrors = await await createLinkItem(value, true);
        if (hasErrors && hasErrors.status === "valid") {
          return null;
        }
        if (hasErrors) {
          const parsedMessage = hasErrors.error.message.split("\n");

          const errorsMap = {};
          parsedMessage.forEach((element) => {
            const fieldName = element.split(":")[0];
            errorsMap[fieldName] = element;

            //  not tested well

            // return {
            //   form: 'Invalid data', // The `form` key is optional
            //   fields: {
            //     age: 'Must be 13 or older to sign',
            //     // Set errors on nested fields with the field's name
            //     'socials[0].url': 'The provided URL does not exist',
            //     'details.email': 'An email is required',
            //   },
            // }
          });

          return {
            fields: errorsMap
          }

        }

        return {fields: "todo"}
      },
    },
  });

  const isValidURL = (value: string) => {
    try {
      new URL("http://" + value);
      return true;
    } catch (err) {
      return false;
    }
  };

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        e.stopPropagation();
        form.handleSubmit();
      }}
      className=" flex flex-col gap-3"
    >
      <div>
        {/* A type-safe field component*/}
        <form.Field
          name="title"
          // use backend validation

          // validators={{
          //   onChange: ({ value }) =>
          //     !value
          //       ? "A Title is required"
          //       : value.length < 3
          //         ? "Title must be at least 3 characters"
          //         : undefined,
          //   onChangeAsyncDebounceMs: 500,
          //   // onChangeAsync: async ({ value, fieldApi }) => await asyncValidator("Title", fieldApi),
          // }}
          children={(field) => {
            // Avoid hasty abstractions. Render props are great!
            return (
              <TextField
                id={field.name}
                value={field.state.value}
                onBlur={field.handleBlur}
                onChange={(e) => field.handleChange(e)}
                label="Title"
                name={field.name}
                // isRequired
                placeholder="Enter title"
                field={field}
              />
            );
          }}
        />
      </div>
      <div>
        <form.Field
          name="description"
          children={(field) => (
            <>
              <TextArea
                field={field}
                id={field.name}
                value={field.state.value}
                onBlur={field.handleBlur}
                onChange={(e) => field.handleChange(e)}
                label="Description"
                name={field.name}
                // isRequired
                placeholder="Add description"
              ></TextArea>
            </>
          )}
        />
      </div>
      <div>
        <form.Field
          name="referralUrl"
          validators={{
            // use backend validation

            // onChange: ({ value }) =>
            //   !value
            //     ? "A URL value is required"
            //     : !isValidURL(value)
            //       ? "Url value must be correct"
            //       : undefined,
            // onChangeAsyncDebounceMs: 500,
            // onChangeAsync: async ({ value }) => {
            //   // await new Promise((resolve) => setTimeout(resolve, 1000));
            //   return (
            //     value.includes("error") && 'No "error" allowed in first name'
            //   );
            // },
          }}
          children={(field) => (
            <div className="flex flex-row items-end ">
              <div className="p-4">http://</div>
              <TextField
                field={field}
                id={field.name}
                value={field.state.value}
                onBlur={field.handleBlur}
                onChange={(e) => field.handleChange(e)}
                label="URL"
                name={field.name}
                // isRequired
                placeholder="Add URL"
              ></TextField>
            </div>
          )}
        />
      </div>
      <form.Subscribe
        selector={(state) => [state.canSubmit, state.isSubmitting]}
        children={([canSubmit, isSubmitting]) => (
          <div className="flex flex-row justify-between gap-5">
            <Button
              type="submit"
              variant={canSubmit ? "primary" : "secondary"}
              disabled={!canSubmit}
            >
              {isSubmitting ? "..." : "Submit"}
            </Button>
            <Button
              type="reset"
              variant="secondary"
              onClick={(e) => {
                e.preventDefault();
                form.reset();
              }}
            >
              Reset
            </Button>
            <Button variant="secondary">
              <Link to="/"> Cancel</Link>
            </Button>
          </div>
        )}
      />
    </form>
  );
}
