import { lazy, Suspense } from 'react';
import { UseFormReturn } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

import { ArticleFormValues } from 'forms/article-form/index.types';

import { BlogApiHooks } from 'services/api/applifting-blog';

import Spinner from 'components/spinner';

import styles from './index.module.scss';

const ArticleForm = lazy(() => import('forms/article-form'));

const CreateArticlePage = () => {
  const navigate = useNavigate();

  const { mutateAsync: uploadImage, isLoading: isUploadingImage } =
    BlogApiHooks.images.useUpload();

  const { mutateAsync: createArticle, isLoading: isCreatingArticle } =
    BlogApiHooks.articles.useCreate();

  const onSubmit = async (
    formValues: ArticleFormValues,
    { setError }: UseFormReturn<ArticleFormValues, any>
  ) => {
    try {
      if (formValues?.featuredImage === null) {
        return setError('featuredImage', { message: 'Image is required' });
      }

      const [{ imageId }] = await uploadImage({
        imageFile: formValues?.featuredImage,
      });

      if (!imageId) throw new Error('Image could not be uploaded');

      await createArticle({
        imageId,
        title: formValues?.title,
        perex: formValues?.perex,
        content: formValues?.content,
      });
      navigate('/admin/articles');
    } catch (err) {
      alert(
        'Error occured while creating new article. Please try again later.'
      );
    }
  };

  return (
    <Suspense
      fallback={
        <div className={styles['spinner-wrapper']}>
          <Spinner size="xl" />
        </div>
      }
    >
      <ArticleForm
        type="create"
        onSubmit={onSubmit}
        isMutating={isUploadingImage || isCreatingArticle}
      />
    </Suspense>
  );
};

export default CreateArticlePage;
