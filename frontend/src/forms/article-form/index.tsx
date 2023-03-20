import Button from 'components/button';
import { Label, Message } from 'components/form';
import MdEditor from 'components/form/md-editor';
import Spinner from 'components/spinner';
import Form from 'features/form';
import { ChangeEvent, useLayoutEffect, useRef } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { BlogApi, BlogApiHooks } from 'services/api/applifting-blog';
import { Article } from 'services/api/applifting-blog/openapi.types';

type ArticleFormValues = {
  title: string;
  perex: string;
  featuredImage: File | null;
  content: string;
};

type ArticleFormProps = {
  articleId?: string;
  onSubmitSuccess?: (responseData: Article) => void;
};

const ArticleForm = ({ articleId, onSubmitSuccess }: ArticleFormProps) => {
  const { data, isLoading, isFetched } = BlogApiHooks.articles.useGet({
    articleId: articleId ?? '',
  });

  const { mutateAsync: uploadImage, isLoading: isUploadingImage } =
    BlogApiHooks.images.useUpload();
  const { mutateAsync: createArticle, isLoading: isCreatingArticle } =
    BlogApiHooks.articles.useCreate();
  const { mutateAsync: updateArticle, isLoading: isUpdatingArticle } =
    BlogApiHooks.articles.useUpdate();

  const isMutating = isUploadingImage || isCreatingArticle || isUpdatingArticle;

  const methods = useForm<ArticleFormValues>({
    values: {
      title: data?.title ?? '',
      perex: data?.perex ?? '',
      featuredImage: null,
      content: data?.content ?? '',
    },
  });

  const { control, handleSubmit, setValue, setError } = methods;

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

  const onSubmit = async (formValues: ArticleFormValues) => {
    try {
      if (formValues?.featuredImage === null) {
        return setError('featuredImage', { message: 'Image is required' });
      }
      let imageId = data?.imageId!;
      if (formValues?.featuredImage?.name !== 'original') {
        const [{ imageId: uploadedImageId }] = await uploadImage({
          imageFile: formValues?.featuredImage,
        });
        imageId = uploadedImageId;
      }

      let responseData = null;

      if (!articleId) {
        // Create article
        responseData = await createArticle({
          imageId,
          title: formValues?.title,
          perex: formValues?.perex,
          content: formValues?.content,
        });
      } else {
        // Edit article
        responseData = await updateArticle({
          articleId: data?.articleId!,
          imageId,
          title: formValues?.title,
          perex: formValues?.perex,
          content: formValues?.content,
        });
      }
      if (typeof onSubmitSuccess === 'function') {
        onSubmitSuccess(responseData);
      }
    } catch (err) {}
  };

  useLayoutEffect(() => {
    if (!isFetched) return;

    if (data?.imageId) {
      BlogApi.images
        .get({ imageId: data?.imageId })
        .then(async ({ imageUrl }) => {
          const base64 = await fetch(imageUrl);
          const blob = await base64.blob();
          const file = new File([blob], 'original', { type: blob?.type });
          setValue('featuredImage', file);
        });
    }
  }, [data, isFetched]);

  return articleId && isLoading ? (
    <Spinner size="xl" />
  ) : (
    <Form {...methods} onSubmit={handleSubmit(onSubmit)}>
      <div>
        <h1>{`${articleId ? 'Edit' : 'Create'} article`}</h1>
        <Button type="submit" disabled={isMutating}>
          {isMutating ? <Spinner size="xs" /> : `Publish Article`}
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
            <Label>Featured Image</Label>
            <div>
              {field?.value && (
                <div>
                  <img
                    src={field?.value ? URL.createObjectURL(field?.value) : ''}
                    alt="Uploaded Image"
                  />
                </div>
              )}
              <Label htmlFor="file" style={{ cursor: 'pointer' }}>
                <input
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
            </div>
            {field?.value && (
              <Button
                variant="link-danger"
                type="button"
                onClick={() => setValue('featuredImage', null)}
              >
                Delete
              </Button>
            )}
            {error && <Message variant="error">{error?.message}</Message>}
          </>
        )}
      />
      <Form.TextareaField
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
            <Label>Content</Label>
            <MdEditor
              value={field.value}
              onChange={(value) => field.onChange(value)}
            />
            {error && <Message variant="error">{error.message}</Message>}
          </>
        )}
      />
    </Form>
  );
};

export default ArticleForm;
