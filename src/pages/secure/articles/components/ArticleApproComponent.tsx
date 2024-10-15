import React, { useState, useEffect } from 'react';
import { updateArticleQuantite } from '../../../../services/ArticleService';

interface Article {
  id: string;
  libelle: string;
  prix: number;
  quantiteStock: number;
}

interface ArticleApproProps {
  selectedArticles: Article[];
  onSave?: (updatedArticles: Article[]) => void; // Fonction de sauvegarde avec mise à jour
  onRemoveArticle: (id: string) => void; // Fonction pour supprimer un article
}

const ArticleAppro: React.FC<ArticleApproProps> = ({ selectedArticles, onSave, onRemoveArticle }) => {
  const [localQuantities, setLocalQuantities] = useState<Record<string, number>>(
    selectedArticles.reduce((acc, article) => {
      acc[article.id] = 1;
      return acc;
    }, {} as Record<string, number>)
  );

  const handleSave = async () => {
    const updatedArticles = selectedArticles.map(article => ({
      ...article,
      quantiteStock: article.quantiteStock + (localQuantities[article.id] || 1)
    }));

    try {
      for (const article of updatedArticles) {
        const newQuantity = localQuantities[article.id] || 1;
        await updateArticleQuantite(article.id, newQuantity);
      }
      console.log('Mise à jour réussie');
      if (onSave) {
        onSave(updatedArticles); // Appel de la fonction onSave avec les articles mis à jour
      }
      // Réinitialiser les quantités locales et vider les articles sélectionnés
      setLocalQuantities({});
      if (onRemoveArticle) {
        selectedArticles.forEach(article => onRemoveArticle(article.id));
      }
    } catch (error) {
      console.error('Erreur lors de la sauvegarde:', error);
    }
  };

  const incrementQuantity = (id: string) => {
    setLocalQuantities((prevQuantities) => ({
      ...prevQuantities,
      [id]: (prevQuantities[id] || 1) + 1,
    }));
  };

  const decrementQuantity = (id: string) => {
    setLocalQuantities((prevQuantities) => ({
      ...prevQuantities,
      [id]: Math.max((prevQuantities[id] || 1) - 1, 1),
    }));
  };

  const handleRemoveArticle = (id: string) => {
    onRemoveArticle(id);
  };

  return (
    <div className="p-4 bg-white rounded-lg shadow-md">
      <div className="text-lg font-bold mb-4">Liste de produits sélectionnés</div>
      <table className="w-full text-left border-collapse">
        <thead className="bg-blue-800 text-white">
          <tr>
            <th className="border px-4 py-2">Article</th>
            <th className="border px-4 py-2">Prix</th>
            <th className="border px-4 py-2">Quantité</th>
            <th className="border px-4 py-2">Action</th>
          </tr>
        </thead>
        <tbody>
          {selectedArticles.length > 0 ? (
            selectedArticles.map((article) => (
              <tr key={article.id}>
                <td className="border px-4 py-2">{article.libelle}</td>
                <td className="border px-4 py-2">{article.prix} FCFA</td>
                <td className="border px-4 py-2 flex items-center">
                  <button
                    className="px-2 bg-gray-200 rounded"
                    onClick={() => decrementQuantity(article.id)}
                  >
                    -
                  </button>
                  {localQuantities[article.id] || 1}
                  <button
                    className="px-2 bg-gray-200 rounded"
                    onClick={() => incrementQuantity(article.id)}
                  >
                    +
                  </button>
                </td>
                <td
                  className="border px-4 py-2 text-red-500 cursor-pointer"
                  onClick={() => handleRemoveArticle(article.id)}
                >
                  Supprimer
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={4} className="border px-4 py-2 text-center">
                Aucune sélection
              </td>
            </tr>
          )}
        </tbody>
      </table>
      <div className="mt-4">
        <button
          className="px-4 py-2 bg-blue-500 text-white rounded"
          onClick={handleSave}
        >
          SAVE
        </button>
      </div>
    </div>
  );
};

export default ArticleAppro;
