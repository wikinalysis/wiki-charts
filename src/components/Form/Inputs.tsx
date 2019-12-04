import * as React from "react";
import ReactSelect from "react-select";
import { Form } from "react-bootstrap";
import { FieldRenderProps } from "react-final-form";
import styled from "styled-components";

export interface Option {
  value: any;
  label: string;
}

const StyledSelect = styled(ReactSelect)`
  color: black;
`;

export const TextInput: React.FC<FieldRenderProps<string>> = props => {
  return <Form.Control {...props.input} />;
};

export const Select: React.SFC<FieldRenderProps<any>> = ({
  input,
  ...rest
}) => <StyledSelect {...input} {...rest} searchable />;
