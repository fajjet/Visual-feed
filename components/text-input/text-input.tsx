import React, { InputHTMLAttributes, TextareaHTMLAttributes } from "react";

import Styled from "./text-input.style";

interface Props {
  value: any;
  name?: string;
  type?: "text" | "email" | "number" | "password" | "tel";
  onChangeHandler?(value: string): any;
  label?: string;
  as?: "input" | "textarea";
}

type HTMLProps = TextareaHTMLAttributes<HTMLTextAreaElement> &
  InputHTMLAttributes<HTMLTextAreaElement>;

const TextInput = (props: Props & HTMLProps) => {
  const {
    label,
    type = "text",
    value,
    onChangeHandler,
    required,
    minLength,
    maxLength,
    name: passedName,
    placeholder = "",
    as = "input",
    ...restProps
  } = props;
  const name = passedName || label;

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChangeHandler && onChangeHandler(e.target.value);
  };

  return (
    <Styled.Root>
      <label>
        {label && <Styled.Label>{label}</Styled.Label>}
        <Styled.Input
          name={name}
          type={type}
          onChange={onChange}
          value={value}
          required={required}
          minLength={minLength}
          maxLength={maxLength}
          placeholder={placeholder}
          as={as}
          {...restProps}
        />
      </label>
    </Styled.Root>
  );
};

export default React.memo(TextInput);
