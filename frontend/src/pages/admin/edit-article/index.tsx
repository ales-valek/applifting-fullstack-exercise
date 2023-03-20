import { useNavigate, useParams } from 'react-router-dom';
import ArticleForm from 'forms/article-form';

const EditArticlePage = () => {
  const { articleId } = useParams();
  const navigate = useNavigate();

  const onSubmitSuccess = () => {
    navigate('/admin/articles');
  };

  return (
    <ArticleForm articleId={articleId} onSubmitSuccess={onSubmitSuccess} />
  );
};

export default EditArticlePage;
