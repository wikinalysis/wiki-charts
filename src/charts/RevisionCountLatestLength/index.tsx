import * as React from "react";
import RevisionCountLatestLengthPlot from "./RevisionCountLatestLengthPlot";
import { Form, Field } from "react-final-form";

const RevisionCountLatestLength = () => {
  const [language, setLanguage] = React.useState();
  return (
    <div>
      <Form
        onSubmit={values => setLanguage(values.language)}
        render={({ handleSubmit, submitting, pristine }) => {
          return (
            <form onSubmit={handleSubmit}>
              <h2>Select Language</h2>
              <div>
                <label>Language</label>
                <Field
                  name="language"
                  component="select"
                  placeholder="Select..."
                >
                  <option />
                  <option value="rmy">Romani</option>
                  <option value="pih">Norfolk Island</option>
                  <option value="tn">Setswana</option>
                </Field>
              </div>
              <button type="submit" disabled={submitting || pristine}>
                Submit
              </button>
            </form>
          );
        }}
      ></Form>
      <RevisionCountLatestLengthPlot language={language} />
    </div>
  );
};

export default RevisionCountLatestLength;
