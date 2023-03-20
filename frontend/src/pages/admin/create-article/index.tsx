import ArticleForm from 'forms/article-form';
import { useNavigate } from 'react-router-dom';

const CreateArticlePage = () => {
  const navigate = useNavigate();

  const onSubmitSuccess = () => {
    navigate('/admin/articles');
  };

  return <ArticleForm onSubmitSuccess={onSubmitSuccess} />;
};

export default CreateArticlePage;
