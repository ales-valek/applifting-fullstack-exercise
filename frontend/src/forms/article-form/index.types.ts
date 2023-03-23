import { UseFormReturn } from 'react-hook-form';

export type ArticleFormValues = {
  title: string;
  perex: string;
  featuredImage: File | null;
  content: string;
};

export type ArticleFormType = 'create' | 'edit';

export type ArticleFormProps = {
  type: ArticleFormType;
  initialTitle?: string;
  initialPerex?: string;
  initialFeaturedImage?: File | null;
  initialContent?: string;
  onSubmit: (
    responseData: ArticleFormValues,
    methods: UseFormReturn<ArticleFormValues, any>
  ) => void;
  isMutating?: boolean;
};
