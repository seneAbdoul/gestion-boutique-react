import React, { useState, useEffect } from 'react';
import ArticleList from './components/ArticleListComponent';
import ArticleAppro from './components/ArticleApproComponent';
import ArticleForm from './components/ArticleForm';
import './ArticlePage.css';
import { fetchArticles } from '../../../services/ArticleService';

interface Article {
  id: string;
  libelle: string;
  prix: number;
  quantiteStock: number;
}

const ArticlePage: React.FC = () => {
  const [articles, setArticles] = useState<Article[]>([]);
  const [selectedArticles, setSelectedArticles] = useState<Article[]>([]);
  const [isFormVisible, setIsFormVisible] = useState<boolean>(false);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const articlesPerPage = 3;

  useEffect(() => {
    const fetchData = async () => {
      const fetchedArticles = await fetchArticles();
      setArticles(fetchedArticles);
    };

    fetchData();
  }, []);

  const handleArticleSelection = (selectedArticle: Article) => {
    setSelectedArticles(prevSelectedArticles => {
      const isSelected = prevSelectedArticles.some(article => article.id === selectedArticle.id);
      if (isSelected) {
        return prevSelectedArticles.filter(article => article.id !== selectedArticle.id);
      } else {
        return [...prevSelectedArticles, selectedArticle];
      }
    });
  };

  const handleOpenForm = () => {
    setIsFormVisible(true);
  };

  const handleCloseForm = () => {
    setIsFormVisible(false);
  };

  const handleRemoveArticle = (id: string) => {
    setSelectedArticles(prevSelectedArticles =>
      prevSelectedArticles.filter(article => article.id !== id)
    );
  };

  const handleSave = (updatedArticles: Article[]) => {
    setArticles(prevArticles =>
      prevArticles.map(article =>
        updatedArticles.find(updated => updated.id === article.id) || article
      )
    );
    setSelectedArticles([]);
  };

  const handleArticleAdded = (newArticle: Article) => {
    setArticles(prevArticles => {
      const updatedArticles = [newArticle, ...prevArticles];
      setCurrentPage(1); // Réinitialiser la pagination à la première page
      return updatedArticles;
    });
    setIsFormVisible(false);
    setSelectedArticles(prevSelectedArticles => [...prevSelectedArticles, newArticle]);
  };

  return (
    <div className="ping p-8 bg-gray-100 overflow-hidden">
      <div className="flex justify-between items-center mb-4 mt-6">
        <h1 className="text-2xl font-bold">Approvisionnement</h1>
        <button
          className="btn bg-blue-800 text-white rounded px-4 py-2"
          onClick={handleOpenForm}
        >
          Nouvelle Article
        </button>
      </div>

      <div className="flex space-x-8 h-full">
        <div className="w-1/2 h-full">
          <ArticleList
            articles={articles}
            setArticles={setArticles}
            selectedArticles={selectedArticles}
            onArticleSelect={handleArticleSelection}
          />
        </div>
        <div className="w-1/2 h-full">
          <ArticleAppro
            selectedArticles={selectedArticles}
            onRemoveArticle={handleRemoveArticle}
            onSave={handleSave}
          />
        </div>
      </div>

      {isFormVisible && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-700 bg-opacity-50">
          <ArticleForm
            onClose={handleCloseForm}
            onArticleAdded={handleArticleAdded}
          />
        </div>
      )}
    </div>
  );
};

export default ArticlePage;
