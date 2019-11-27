import * as React from "react";
import { Form, Field } from "react-final-form";

export interface LanguageSelectProps {
  languages: { id: string; name: string }[];
  setLanguage: (s: string) => void;
}

export const LanguageSelect: React.SFC<LanguageSelectProps> = props => {
  return (
    <Form onSubmit={({ language }) => props.setLanguage(language)}>
      {({ handleSubmit }) => (
        <form onSubmit={handleSubmit}>
          <Field name="language" component="select">
            <option />
            {props.languages.map(v => (
              <option key={v.id} value={v.id}>
                {v.name}
              </option>
            ))}
          </Field>
          <button type="submit">Submit</button>
        </form>
      )}
    </Form>
  );
};
