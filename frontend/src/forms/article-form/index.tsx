import Button from 'components/button';
import { Label, Message } from 'components/form';
import MdEditor from 'components/form/md-editor';
import Spinner from 'components/spinner';
import Form from 'features/form';
import { ChangeEvent, useLayoutEffect, useRef } from 'react';
import { Controller, useForm, UseFormReturn } from 'react-hook-form';

import styles from './index.module.scss';

export type ArticleFormValues = {
  title: string;
  perex: string;
  featuredImage: File | null;
  content: string;
};

type ArticleFormType = 'create' | 'edit';

type ArticleFormProps = {
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

const ArticleForm = ({
  type,
  initialTitle,
  initialPerex,
  initialFeaturedImage,
  initialContent,
  onSubmit,
  isMutating,
}: ArticleFormProps) => {
  const methods = useForm<ArticleFormValues>({
    values: {
      title: initialTitle ?? '',
      perex: initialPerex ?? '',
      featuredImage: initialFeaturedImage ?? null,
      content: initialContent ?? '',
    },
  });

  const { control, handleSubmit, setValue } = methods;

  const fileInputRef = useRef<HTMLInputElement>(null);

  const onImageUpload = (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) {
      return setValue('featuredImage', null, { shouldValidate: true });
    }
    setValue('featuredImage', e.target.files[0], { shouldValidate: true });
    if (fileInputRef?.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <Form
      {...methods}
      onSubmit={handleSubmit((formValues) => onSubmit(formValues, methods))}
    >
      <div className={styles['heading-wrapper']}>
        <h1>{`${type === 'create' ? 'Create' : 'Edit'} article`}</h1>
        <Button type="submit" disabled={isMutating}>
          {isMutating ? (
            <Spinner className={styles['submit-spinner']} size="xs" />
          ) : (
            `Publish Article`
          )}
        </Button>
      </div>
      <Form.InputField
        label="Article title"
        name="title"
        rules={{
          required: { value: true, message: 'Title is required' },
          minLength: {
            value: 3,
            message: 'Title has to have at least 3 characters',
          },
        }}
      />
      <Controller
        control={control}
        name="featuredImage"
        rules={{
          validate: {
            isFeatured: (value) =>
              value === null ? 'Image is required' : true,
          },
        }}
        render={({ field, fieldState: { error } }) => (
          <>
            <Label id={field?.name} isRequired>
              Featured Image
            </Label>
            <div>
              {field?.value && (
                <div>
                  <img
                    className={styles['image-preview']}
                    src={field?.value ? URL.createObjectURL(field?.value) : ''}
                    alt={field?.value?.name}
                  />
                </div>
              )}
              <div className={styles['image-buttons']}>
                <Label
                  className={styles['image-upload-button-label']}
                  htmlFor="file"
                  style={{ cursor: 'pointer' }}
                >
                  <input
                    aria-labelledby={field?.name}
                    name={field?.name}
                    ref={fileInputRef}
                    id="file"
                    type="file"
                    placeholder="Upload an Image"
                    onChange={onImageUpload}
                    style={{ display: 'none' }}
                  />
                  <Button
                    type="button"
                    variant={field?.value ? 'link-primary' : 'secondary'}
                    style={{ pointerEvents: 'none' }}
                  >
                    {field?.value ? 'Upload new' : 'Upload an image'}
                  </Button>
                </Label>
                {field?.value && (
                  <Button
                    variant="link-danger"
                    type="button"
                    onClick={() => setValue('featuredImage', null)}
                  >
                    Delete
                  </Button>
                )}
              </div>
            </div>
            {error && <Message variant="error">{error?.message}</Message>}
          </>
        )}
      />
      <Form.TextareaField
        className={styles['perex']}
        label="Perex"
        name="perex"
        rules={{
          required: { value: true, message: 'Perex is required' },
          minLength: {
            value: 3,
            message: 'Perex has to have at least 3 characters',
          },
        }}
      />
      <Controller
        control={control}
        name="content"
        rules={{
          required: { value: true, message: 'Content is required' },
          minLength: {
            value: 20,
            message: 'Content has to have at least 20 characters',
          },
        }}
        render={({ field, fieldState: { error } }) => (
          <>
            <Label id={field?.name} isRequired>
              Content
            </Label>
            <MdEditor
              value={field.value}
              onChange={(value) => field.onChange(value)}
              textareaProps={{
                'aria-labelledby': field?.name,
              }}
            />
            {error && <Message variant="error">{error.message}</Message>}
          </>
        )}
      />
    </Form>
  );
};

export default ArticleForm;
