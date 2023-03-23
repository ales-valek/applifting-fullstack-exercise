import { FieldValues, FormProviderProps, UseFormWatch } from 'react-hook-form';

export type FormProps<T extends FieldValues = FieldValues> = Omit<
  FormProviderProps<T>,
  'watch'
> & {
  className?: string;
  onSubmit: () => void;
  watch: UseFormWatch<T>;
};
