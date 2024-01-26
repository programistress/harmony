import { useParams } from 'react-router-dom';
import NavBar from '../../components/NavBar'
import { articles } from './articlesInfo';

const ArticleDetails = () => {
  const { id } = useParams();

  const article = articles.find(article => article.id === parseInt(id, 10))

  const content = <div dangerouslySetInnerHTML={{ __html: article.fullText }} />;
  return (
    <div className='container'>
      <NavBar />
      <h1 className='title'>{article?.title}</h1>
      <p className='article__fulltext'>{content}</p>
    </div>
  )
}

export default ArticleDetails