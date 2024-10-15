import React, { useState, useEffect } from "react";
import { fetchCategories } from "../../../../services/CategorieService";
import { createArticle } from "../../../../services/ArticleService";

interface Article {
  id: string;
  libelle: string;
  prix: number;
  quantiteStock: number;
}

interface ArticleFormProps {
  onClose: () => void;
  onArticleAdded: (article: Article) => void; // Fonction modifiée pour accepter un argument
}

const ArticleForm: React.FC<ArticleFormProps> = ({ onClose, onArticleAdded }) => {
  const [newArticle, setNewArticle] = useState({
    libelle: '',
    prix: '',
    quantiteStock: '',
    promotion: '',
    prixDetail: '',
    categorieId: ''
  });
  const [categories, setCategories] = useState<any[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCategoriesData = async () => {
      try {
        const fetchedCategories = await fetchCategories();
        setCategories(fetchedCategories);
      } catch (err) {
        setError("Erreur lors de la récupération des catégories");
      }
    };

    fetchCategoriesData();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setNewArticle(prevArticle => ({
      ...prevArticle,
      [name]: name === 'prix'
        ? parseFloat(value) // Conversion en float pour le champ prix
        : (name === 'quantiteStock' || name === 'prixDetail' || name === 'categorieId')
          ? parseInt(value, 10) // Conversion en int pour quantiteStock, prixDetail et categorieId
          : value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const addedArticle = await createArticle(newArticle);
      onArticleAdded(addedArticle); // Passer l'article ajouté en argument
      onClose(); // Fermer le formulaire
    } catch (err: any) {
      setError(err.message || "Erreur lors de l'ajout de l'article");
    }
  };

  return (
    <div className="p-4 bg-white rounded-lg shadow-md">
      <h2 className="text-lg font-bold mb-4">Ajouter un Nouvel Article</h2>
      {error && <div className="text-red-500 mb-4">{error}</div>}
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Libellé</label>
          <input
            type="text"
            name="libelle"
            value={newArticle.libelle}
            onChange={handleChange}
            className="border border-gray-300 rounded px-4 py-2 w-full"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Prix</label>
          <input
            type="number"
            name="prix"
            value={newArticle.prix}
            onChange={handleChange}
            className="border border-gray-300 rounded px-4 py-2 w-full"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Quantité en stock</label>
          <input
            type="number"
            name="quantiteStock"
            value={newArticle.quantiteStock}
            onChange={handleChange}
            className="border border-gray-300 rounded px-4 py-2 w-full"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Promotion</label>
          <input
            type="text"
            name="promotion"
            value={newArticle.promotion}
            onChange={handleChange}
            className="border border-gray-300 rounded px-4 py-2 w-full"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Prix Détail</label>
          <input
            type="number"
            name="prixDetail"
            value={newArticle.prixDetail}
            onChange={handleChange}
            className="border border-gray-300 rounded px-4 py-2 w-full"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Catégorie</label>
          <select
            name="categorieId"
            value={newArticle.categorieId}
            onChange={handleChange}
            className="border border-gray-300 rounded px-4 py-2 w-full"
            required
          >
            <option value="">Sélectionner une catégorie</option>
            {categories.map(category => (
              <option key={category.id} value={category.id}>
                {category.libelle}
              </option>
            ))}
          </select>
        </div>
        <button
          type="button"
          onClick={onClose}
          className="btn bg-gray-500 text-white"
        >
          Annuler
        </button>
        <button
          type="submit"
          className="btn bg-blue-500 text-white ml-2"
        >
          Ajouter
        </button>
      </form>
    </div>
  );
};

export default ArticleForm;
