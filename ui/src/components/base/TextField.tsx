import React from 'react';
import {
  TextField as AriaTextField,
  TextArea as AriaTextArea,
  type TextFieldProps as AriaTextFieldProps,
  type ValidationResult
} from 'react-aria-components';
import { tv } from 'tailwind-variants';
import { Description, FieldError, Input, Label, fieldBorderStyles } from './Field';
import { composeTailwindRenderProps, focusRing } from '../utils';
import { FieldInfo } from './FieldInfo';
import type { AnyFieldApi } from '@tanstack/react-form';

const inputStyles = tv({
  extend: focusRing,
  base: 'border-1 rounded-lg min-h-9 font-sans text-sm py-3 px-3 box-border transition',
  variants: {
    isFocused: fieldBorderStyles.variants.isFocusWithin,
    isInvalid: fieldBorderStyles.variants.isInvalid,
    isDisabled: fieldBorderStyles.variants.isDisabled
  }
});

export interface TextFieldProps extends AriaTextFieldProps {
  label?: string;
  description?: string;
  placeholder?: string;
  errorMessage?: string | ((validation: ValidationResult) => string);
  field: AnyFieldApi
}

export function TextField(
  { label, description, errorMessage, field, ...props }: TextFieldProps
) {
  return (
    <AriaTextField {...props} className={composeTailwindRenderProps(props.className, 'flex flex-col gap-1 font-sans')}>
      {label && <Label>{label}</Label>}
      <Input className={inputStyles} />
      {description && <Description>{description}</Description>}
      <FieldInfo field={field}></FieldInfo>
      <FieldError>{errorMessage}</FieldError>
    </AriaTextField>
  );
}

export function TextArea(
  { label, description, errorMessage, field, ...props }: TextFieldProps
) {
  return (
    <AriaTextField {...props} className={composeTailwindRenderProps(props.className, 'flex flex-col gap-1 font-sans')}>
      {label && <Label>{label}</Label>}
      <AriaTextArea className={inputStyles} />
      {description && <Description>{description}</Description>}
      <FieldInfo field={field}></FieldInfo>
      <FieldError>{errorMessage}</FieldError>
    </AriaTextField>
  );
}

