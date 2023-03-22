import { ReactNode } from 'react';
import { Input, Label, Message } from 'components/form';
import {
  UseControllerProps,
  useController,
  useFormContext,
} from 'react-hook-form';

type InputFieldProps = Omit<UseControllerProps, 'control'> & {
  label?: ReactNode;
  type?: string;
};

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
