import * as React from "react";
import { Form, Field, FormSpyRenderProps, FormSpy } from "react-final-form";
import { Select } from "../Form/Inputs";
import { Button } from "react-bootstrap";
import { FormState } from "final-form";

export interface LanguageSelectProps {
  languages: { value: string; label: string }[];
  setLanguage: (s: string) => void;
}

export const LanguageSelect: React.SFC<LanguageSelectProps> = props => {
  return (
    <Form onSubmit={({ language }) => props.setLanguage(language.value)}>
      {({ handleSubmit }) => (
        <form onSubmit={handleSubmit}>
          <Field
            name="language"
            component={Select}
            options={props.languages}
            placeholder="Select Language..."
          />
          <FormSpy
            subscription={{ values: true }}
            onChange={(formProps: FormState<any>) => {
              formProps.values.language &&
                props.setLanguage(formProps.values.language.value);
            }}
          />
        </form>
      )}
    </Form>
  );
};
