import {
  Suspense,
  ChangeEvent,
  useLayoutEffect,
  useMemo,
  useState,
} from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';
import { BlogApi, BlogApiHooks } from 'services/api/applifting-blog';

import MDEditor from '@uiw/react-md-editor';

type FormValues = {
  title: string;
  perex: string;
};

const EditArticlePage = () => {
  const navigate = useNavigate();
  const { articleId } = useParams();
  const { data, isLoading, isFetched } = BlogApiHooks.articles.useGet({
    articleId: articleId ?? '',
  });
  const { mutateAsync: uploadImage } = BlogApiHooks.images.useUpload();
  const { mutateAsync: updateArticle } = BlogApiHooks.articles.useUpdate();

  const { handleSubmit, register } = useForm<FormValues>({
    values: {
      title: data?.title ?? '',
      perex: data?.perex ?? '',
    },
  });

  const [markdownValue, setMarkdownValue] = useState('');
  const [featuredImage, setFeaturedImage] = useState<File | null>(null);
  const featuredImagePreview = useMemo(() => {
    if (featuredImage === null || typeof featuredImage === 'boolean') return '';
    return URL.createObjectURL(featuredImage);
  }, [featuredImage]);

  const onImageUpload = (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) {
      return setFeaturedImage(null);
    }
    setFeaturedImage(e.target.files[0]);
  };

  const onSubmit = async (formValues: FormValues) => {
    try {
      if (!featuredImage) {
        return;
      }

      let imageId = data?.imageId ?? '';
      if (featuredImage?.name !== 'original') {
        const [{ imageId: newImageId }] = await uploadImage({
          imageFile: featuredImage,
        });
        imageId = newImageId;
      }
      await updateArticle({
        articleId: data?.articleId ?? '',
        imageId,
        title: formValues?.title,
        perex: formValues?.perex,
        content: markdownValue,
      });
      navigate('/admin/articles');
    } catch (err) {}
  };

  useLayoutEffect(() => {
    document.title = 'Edit article | Applifting Blog';
  }, []);

  useLayoutEffect(() => {
    if (!(isFetched && data)) return;

    if (data?.content) {
      setMarkdownValue(data?.content);
    }
    if (data?.imageId) {
      BlogApi.images
        .get({ imageId: data?.imageId })
        .then(async ({ imageUrl }) => {
          const base64 = await fetch(imageUrl);
          const blob = await base64.blob();
          const file = new File([blob], 'original', { type: blob?.type });
          setFeaturedImage(file);
        });
    }
  }, [data, isFetched]);

  return (
    <>
      {isLoading ? (
        'Loading...'
      ) : (
        <form onSubmit={handleSubmit(onSubmit)} data-color-mode="light">
          <div>
            <h1>Edit article</h1>
            <button>Publish Article</button>
          </div>
          <div>
            <label>Article Title</label>
            <input type="text" {...register('title')} />
            <label>Perex</label>
            <textarea {...register('perex')} />
            <label>Featured Image</label>
            <div>
              {featuredImage !== null ? (
                <img src={featuredImagePreview} alt="Uploaded image" />
              ) : (
                <input
                  type="file"
                  placeholder="Upload new"
                  onChange={onImageUpload}
                />
              )}
              {featuredImage && (
                <button type="button" onClick={() => setFeaturedImage(null)}>
                  Delete
                </button>
              )}
            </div>
            <label>Content</label>
            <Suspense fallback={<>Loading...</>}>
              <MDEditor
                value={markdownValue}
                onChange={(value) =>
                  setMarkdownValue(
                    (prevMarkdownValue) => value ?? prevMarkdownValue
                  )
                }
              />
            </Suspense>
          </div>
        </form>
      )}
    </>
  );
};

export default EditArticlePage;
