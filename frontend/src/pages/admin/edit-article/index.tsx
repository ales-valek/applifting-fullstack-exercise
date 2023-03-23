import { useState, useLayoutEffect, lazy, Suspense } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ArticleFormValues } from 'forms/article-form';
import { BlogApiHooks } from 'services/api/applifting-blog';
import Spinner from 'components/spinner';
import { UseFormReturn } from 'react-hook-form';

import styles from './index.module.scss';
import Button from 'components/button';
import ButtonLink from 'components/button-link';

const ArticleForm = lazy(() => import('forms/article-form'));

const EditArticlePage = () => {
  const { articleId } = useParams();

  const {
    data: articleData,
    isLoading,
    isError,
    refetch,
  } = BlogApiHooks.articles.useGet({
    articleId: articleId ?? '',
  });

  const { data: imageData } = BlogApiHooks.images.useGet({
    imageId: articleData?.imageId ?? '',
  });
  const [initialFeaturedImage, setInitialFeaturedImage] =
    useState<File | null>(null);

  const { mutateAsync: uploadImage, isLoading: isUploadingImage } =
    BlogApiHooks.images.useUpload();
  const { mutateAsync: updateArticle, isLoading: isUpdatingArticle } =
    BlogApiHooks.articles.useUpdate();

  const navigate = useNavigate();

  const onSubmit = async (
    formValues: ArticleFormValues,
    { setError }: UseFormReturn<ArticleFormValues, any>
  ) => {
    try {
      if (formValues?.featuredImage === null) {
        return setError('featuredImage', { message: 'Image is required' });
      }
      let imageId = articleData?.imageId!;
      if (formValues?.featuredImage?.name !== 'original') {
        const [{ imageId: uploadedImageId }] = await uploadImage({
          imageFile: formValues?.featuredImage,
        });
        imageId = uploadedImageId;
      }

      await updateArticle({
        articleId: articleData?.articleId!,
        imageId,
        title: formValues?.title,
        perex: formValues?.perex,
        content: formValues?.content,
      });
      navigate('/admin/articles');
    } catch (err) {}
  };

  useLayoutEffect(() => {
    if (!imageData?.imageUrl) return;
    const idk = async () => {
      const base64 = await fetch(imageData?.imageUrl);
      const blob = await base64.blob();
      const file = new File([blob], 'original', { type: blob?.type });
      setInitialFeaturedImage(file);
    };
    idk();
  }, [imageData]);

  if (isError) {
    return (
      <div className={styles['error-wrapper']}>
        <h3>Article was unable to load.</h3>
        <div className={styles['error-buttons']}>
          <Button onClick={() => refetch()}>Try again</Button>
          <ButtonLink to="/admin/articles" variant="link-primary">
            Back to my articles
          </ButtonLink>
        </div>
      </div>
    );
  }

  return isLoading ? (
    <div className={styles['spinner-wrapper']}>
      <Spinner size="xl" />
    </div>
  ) : (
    <Suspense
      fallback={
        <div className={styles['spinner-wrapper']}>
          <Spinner size="xl" />
        </div>
      }
    >
      <ArticleForm
        type="edit"
        onSubmit={onSubmit}
        initialTitle={articleData?.title}
        initialPerex={articleData?.perex}
        initialFeaturedImage={initialFeaturedImage}
        initialContent={articleData?.content}
        isMutating={isUploadingImage || isUpdatingArticle}
      />
    </Suspense>
  );
};

export default EditArticlePage;
