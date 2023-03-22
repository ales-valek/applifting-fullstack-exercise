import { ReactNode } from 'react';
import {
  UseControllerProps,
  useController,
  useFormContext,
} from 'react-hook-form';
import { Label, Message, Textarea } from 'components/form';

type TextareaFieldProps = Omit<UseControllerProps, 'control'> & {
  label?: ReactNode;
};

const TextareaField = ({ label, ...controllerProps }: TextareaFieldProps) => {
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
      <Textarea
        {...field}
        aria-labelledby={field?.name}
        aria-invalid={error ? 'true' : 'false'}
        isError={!!error}
      />
      {error && <Message variant="error">{error?.message}</Message>}
    </div>
  );
};

export default TextareaField;
