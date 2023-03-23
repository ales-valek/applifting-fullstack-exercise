import { useController, useFormContext } from 'react-hook-form';

import { InputFieldProps } from './index.types';

import { Input, Label, Message } from 'components/form';

const InputField = ({ label, type, ...controllerProps }: InputFieldProps) => {
  const { control } = useFormContext();
  const {
    field,
    fieldState: { error },
  } = useController({ ...controllerProps, control });

  return (
    <div>
      <Label id={field?.name} isRequired={!!controllerProps?.rules?.required}>
        {label}
      </Label>
      <Input
        {...field}
        type={type}
        aria-labelledby={field?.name}
        aria-invalid={error ? 'true' : 'false'}
        isError={!!error}
      />
      {error && <Message variant="error">{error?.message}</Message>}
    </div>
  );
};

export default InputField;
