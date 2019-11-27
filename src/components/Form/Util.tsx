import * as React from "react";
import { Field } from "react-final-form";

export const Condition: React.SFC<{
  when: string;
  is: any;
  children: React.ReactNode;
}> = ({ when, is, children }) => (
  <Field name={when} subscription={{ value: true }}>
    {({ input: { value } }) => (value === is ? children : null)}
  </Field>
);

export interface ErrorProps {
  name: string;
  errorRenderer?: React.ComponentType<any>;
}

export const Error: React.SFC<ErrorProps> = ({
  name,
  errorRenderer: Component = "span",
  ...rest
}) => (
  <Field
    name={name}
    subscription={{ touched: true, error: true, submitError: true }}
    render={({ meta: { touched, error, submitError } }) =>
      touched && (error || submitError) ? (
        <Component {...rest}>{error || submitError}</Component>
      ) : null
    }
  />
);
