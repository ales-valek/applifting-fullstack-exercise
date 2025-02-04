import { useController, useFormContext } from 'react-hook-form';

import { TextareaFieldProps } from './index.types';

import { Label, Message, Textarea } from 'components/form';

const TextareaField = ({
  label,
  className,
  ...controllerProps
}: TextareaFieldProps) => {
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
        className={className}
        aria-labelledby={field?.name}
        aria-invalid={error ? 'true' : 'false'}
        isError={!!error}
      />
      {error && <Message variant="error">{error?.message}</Message>}
    </div>
  );
};

export default TextareaField;
