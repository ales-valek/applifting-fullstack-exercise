import {
  Suspense,
  ChangeEvent,
  useLayoutEffect,
  useMemo,
  useState,
  lazy,
} from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { BlogApiHooks } from 'services/api/applifting-blog';

const MDEditor = lazy(() => import('@uiw/react-md-editor'));

type FormValues = {
  title: string;
  perex: string;
};

const CreateArticlePage = () => {
  const navigate = useNavigate();
  const { mutate: uploadImage } = BlogApiHooks.images.useUpload();
  const { mutate: createArticle } = BlogApiHooks.articles.useCreate();

  const { handleSubmit, register } = useForm<FormValues>({
    defaultValues: {
      title: '',
      perex: '',
    },
  });

  const [markdownValue, setMarkdownValue] = useState('');
  const [featuredImage, setFeaturedImage] = useState<File | null>(null);
  const featuredImagePreview = useMemo(() => {
    if (featuredImage === null) return '';
    return URL.createObjectURL(featuredImage);
  }, [featuredImage]);

  const onImageUpload = (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) {
      return setFeaturedImage(null);
    }
    setFeaturedImage(e.target.files[0]);
  };

  const onSubmit = (formValues: FormValues) => {
    if (!featuredImage) {
      return;
    }

    uploadImage(
      { imageFile: featuredImage },
      {
        onSuccess: ([{ imageId }]) => {
          createArticle(
            {
              imageId,
              title: formValues?.title,
              perex: '',
              content: markdownValue,
            },
            {
              onSuccess: () => {
                navigate('/admin/articles');
              },
            }
          );
        },
      }
    );
  };

  useLayoutEffect(() => {
    document.title = 'Create article | Applifting Blog';
  }, []);
  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} data-color-mode="light">
        <div>
          <h1>Create new article</h1>
          <button>Publish Article</button>
        </div>
        <div>
          <label>Article Title</label>
          <input type="text" {...register('title')} />
          <label>Featured Image</label>
          <div>
            {featuredImage ? (
              <div>
                <img src={featuredImagePreview} alt="Uploaded image" />
                <input
                  type="file"
                  placeholder="Upload new"
                  onChange={onImageUpload}
                />
                <button type="button" onClick={() => setFeaturedImage(null)}>
                  Delete
                </button>
              </div>
            ) : (
              <input
                type="file"
                placeholder="Upload an Image"
                onChange={onImageUpload}
              />
            )}
          </div>
          <label>Perex</label>
          <textarea {...register('perex')} />
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
    </>
  );
};

export default CreateArticlePage;
