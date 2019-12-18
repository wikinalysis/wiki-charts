import * as React from "react";
import { Form, FormSpy, FormProps } from "react-final-form";
import { Select } from "../Form/Inputs";
import { FormState } from "final-form";

export interface LanguageSelectProps
  extends Partial<JSX.IntrinsicElements["form"]> {
  languages: { value: string; label: string }[];
  initialLanguage: { value: string; label: string };
  setLanguage: (s: string) => void;
}

// Minor MUI-RFF
export const LanguageSelect: React.SFC<LanguageSelectProps> = ({
  languages,
  setLanguage,
  initialLanguage,
  ...rest
}) => {
  return (
    <Form
      initialValues={{ language: initialLanguage.value }}
      onSubmit={_values => undefined}
    >
      {({ handleSubmit }) => (
        <form onSubmit={handleSubmit} {...rest}>
          <Select name="language" data={languages} label="Language" />
          <FormSpy
            subscription={{ values: true }}
            onChange={(formProps: FormState<any>) => {
              formProps.values.language &&
                setLanguage(formProps.values.language);
            }}
          />
        </form>
      )}
    </Form>
  );
};
