import React, { useState, useEffect } from "react";
import { fetchArticles, fetchArticlesByLibelle } from "../../../../services/ArticleService";
import Pagination from "../../../../components/PagginationComponent";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheckSquare } from "@fortawesome/free-solid-svg-icons";

interface Article {
  id: string;
  libelle: string;
  prix: number;
  quantiteStock: number;
}

interface ArticleListProps {
  selectedArticles: Article[];
  onArticleSelect: (article: Article) => void;
  articles: Article[];
  setArticles: (articles: Article[]) => void;
}

const ArticleList: React.FC<ArticleListProps> = ({ selectedArticles, onArticleSelect, articles, setArticles }) => {
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [filter, setFilter] = useState<string>('ALL');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const articlesPerPage = 3;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const fetchedArticles = await fetchArticles();
        setArticles(fetchedArticles);
      } catch (err) {
        setError("Erreur lors de la récupération des articles");
      }
    };

    fetchData();
  }, [setArticles]);

  const handleSearch = async () => {
    if (searchQuery.trim() !== '') {
      try {
        const searchedArticles = await fetchArticlesByLibelle(searchQuery);
        setArticles([searchedArticles]);
      } catch (err) {
        setError("Aucun article trouvé avec ce libellé");
        setArticles([]);
      }
    } else {
      const fetchedArticles = await fetchArticles();
      setArticles(fetchedArticles);
    }
  };

  const filteredArticles = articles.filter(article => {
    if (filter === 'RUP') {
      return article.quantiteStock < 5;
    } else if (filter === 'DIS') {
      return article.quantiteStock >= 5;
    } else {
      return true;
    }
  });

  const totalPages = Math.ceil(filteredArticles.length / articlesPerPage);

  const currentArticles = filteredArticles.slice(
    (currentPage - 1) * articlesPerPage,
    currentPage * articlesPerPage
  );

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  const handleFilterChange = (newFilter: string) => {
    setFilter(newFilter);
    setCurrentPage(1);
  };

  const toggleArticleSelection = (article: Article) => {
    onArticleSelect(article);
  };

  if (error) {
    return <div className="p-4 text-red-500">{error}</div>;
  }

  return (
    <div className="p-4 bg-white rounded-lg shadow-md w-full">
      <div className="flex justify-between items-center mb-4">
        <div className="text-lg font-bold">Lister les produits</div>
      </div>
      <div className="flex">
        <input
          type="text"
          placeholder="Rechercher par libellé"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="border border-gray-300 rounded px-4 py-2  mb-4" style={{ width: '80%' }}
        />
        <button
          className="btn bg-blue-500 text-white mb-4" style={{ width: '10%', marginLeft: "2%" }}
          onClick={handleSearch}
        >
          OK
        </button>
      </div>

      <div className="space-x-2 mb-2 flex">
        <button
          className={`btn ${filter === 'RUP' ? 'bg-red-500' : 'bg-gray-500'} text-white w-16 h-8`}
          onClick={() => handleFilterChange('RUP')}
        >
          RUP
        </button>
        <button
          className={`btn ${filter === 'DIS' ? 'bg-green-500' : 'bg-gray-500'} text-white w-16 h-8`}
          onClick={() => handleFilterChange('DIS')}
        >
          DIS
        </button>
        <button
          className={`btn ${filter === 'ALL' ? 'bg-blue-500' : 'bg-gray-500'} text-white w-16 h-8`}
          onClick={() => handleFilterChange('ALL')}
        >
          ALL
        </button>
      </div>
      <table className="w-full text-left border-collapse">
        <thead className="bg-blue-800 text-white">
          <tr>
            <th className="border px-4 py-2">
              <FontAwesomeIcon icon={faCheckSquare} />
            </th>
            <th className="border px-4 py-2">Article</th>
            <th className="border px-4 py-2">Prix</th>
            <th className="border px-4 py-2">Qte en stock</th>
          </tr>
        </thead>
        <tbody>
          {Array.isArray(currentArticles) && currentArticles.length > 0 ? (
            currentArticles.map((article) => (
              <tr key={article.id}>
                <td className="border px-4 py-2 text-center">
                  <input
                    type="checkbox"
                    checked={selectedArticles.some(a => a.id === article.id)}
                    onChange={() => toggleArticleSelection(article)}
                  />
                </td>
                <td className="border px-4 py-2">{article.libelle}</td>
                <td className="border px-4 py-2">{article.prix}</td>
                <td className="border px-4 py-2">{article.quantiteStock}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={4} className="text-center py-4">
                Aucun article trouvé
              </td>
            </tr>
          )}
        </tbody>
      </table>

      <div className="mt-4">
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      </div>
    </div>
  );
};

export default ArticleList;
