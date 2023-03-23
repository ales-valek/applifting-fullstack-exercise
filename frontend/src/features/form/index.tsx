import { FieldValues, FormProvider } from 'react-hook-form';

import { FormProps } from './index.types';

import InputField from './input-field';
import TextareaField from './textarea-field';
import Button from 'components/button';

const Form = <T extends FieldValues>({
  children,
  onSubmit,
  className,
  ...methods
}: FormProps<T>) => {
  return (
    <FormProvider {...methods}>
      <form className={className} onSubmit={onSubmit}>
        {children}
      </form>
    </FormProvider>
  );
};

Form.InputField = InputField;
Form.TextareaField = TextareaField;
Form.Button = Button;

export default Form;
