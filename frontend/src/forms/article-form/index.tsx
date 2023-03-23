import { ChangeEvent, useRef } from 'react';
import { Controller, useForm } from 'react-hook-form';

import { ArticleFormProps, ArticleFormValues } from './index.types';

import {
  MAX_FILE_SIZE,
  TITLE_MIN_CHARACTERS,
  TITLE_MAX_CHARACTERS,
  PEREX_MIN_CHARACTERS,
  PEREX_MAX_CHARACTERS,
  CONTENT_MIN_CHARACTERS,
} from './index.constants';

import { Label, Message } from 'components/form';
import Button from 'components/button';
import MdEditor from 'components/form/md-editor';
import Spinner from 'components/spinner';
import Form from 'features/form';

import styles from './index.module.scss';

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

  const { control, handleSubmit, setValue, setError } = methods;

  const fileInputRef = useRef<HTMLInputElement>(null);

  const resetImageField = (shouldValidate: boolean = true) => {
    setValue('featuredImage', null, { shouldValidate });
  };

  const onImageUpload = (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) {
      return resetImageField(true);
    }
    if (!e.target.files[0].type?.includes('image')) {
      setError('featuredImage', { message: 'File is not image' });
      return resetImageField(false);
    }
    if (e.target.files[0].size > MAX_FILE_SIZE) {
      setError('featuredImage', { message: 'File is too big (< 1000kb)' });
      return resetImageField(false);
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
            value: TITLE_MIN_CHARACTERS,
            message: `Title has to have at least ${TITLE_MIN_CHARACTERS} characters`,
          },
          maxLength: {
            value: TITLE_MAX_CHARACTERS,
            message: `Title is too long, it cannot extend more than ${TITLE_MAX_CHARACTERS} characters`,
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
                    accept="image/*"
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
            value: PEREX_MIN_CHARACTERS,
            message: `Perex has to have at least ${PEREX_MIN_CHARACTERS} characters`,
          },
          maxLength: {
            value: PEREX_MAX_CHARACTERS,
            message: `Perex is too long, it cannot extend more than ${PEREX_MAX_CHARACTERS} characters`,
          },
        }}
      />
      <Controller
        control={control}
        name="content"
        rules={{
          required: { value: true, message: 'Content is required' },
          minLength: {
            value: CONTENT_MIN_CHARACTERS,
            message: `Content has to have at least ${CONTENT_MIN_CHARACTERS} characters`,
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
