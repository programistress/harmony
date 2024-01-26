import { Link } from "react-router-dom";
import NavBar from "../../components/NavBar";
import "./ArticlesPage.css";
import { articles } from "./articlesInfo";
function ArticlesPage() {
  return (
    <div className="container">
      <NavBar />
      <div className="articles">
        {articles.map((article) => (
          <Link to={`/articles/${article.id}`}>
            <article className="article">
              <img src={article.img} className="article__image" />
              <h1 className="article__title">{article.title}</h1>
              <p className="article__desc">
                {article.desc}
              </p>
            </article>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default ArticlesPage;
