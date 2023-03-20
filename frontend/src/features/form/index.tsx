import Button from 'components/button';
import {
  FieldValues,
  FormProvider,
  FormProviderProps,
  UseFormWatch,
} from 'react-hook-form';
import InputField from './input-field';
import TextareaField from './textarea-field';

type FormProps<T extends FieldValues = FieldValues> = Omit<
  FormProviderProps<T>,
  'watch'
> & {
  className?: string;
  onSubmit: () => void;
  watch: UseFormWatch<T>;
};

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
