import { FormHTMLAttributes } from 'react';

import Input from './input';
import Textarea from './textarea';
import Label from './label';
import Message from './message';

const Form = ({ children, ...props }: FormHTMLAttributes<HTMLFormElement>) => {
  return <form {...props}>{children}</form>;
};

Form.Label = Label;
Form.Input = Input;
Form.Textarea = Textarea;

export { Label, Input, Textarea, Message };

export default Form;
