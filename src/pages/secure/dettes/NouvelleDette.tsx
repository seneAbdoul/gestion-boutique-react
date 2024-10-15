import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { fetchArticles } from '../../../services/ArticleService'; 
import Pagination from '../../../components/PagginationComponent'; 
import { createDette } from '../../../services/DetteService';
import { createPaiement } from '../../../services/PaiementService';
import { createDemande } from '../../../services/DemandeService';

const NouveauDette: React.FC = () => {
  const location = useLocation();
  const clientInfo = location.state?.client || {};

  const navigate = useNavigate();
    // État pour stocker le montant saisi
    const [montantSaisi, setMontantSaisi] = useState<number>(0);

  // Calcul des montants total, versé et restant
  const montantTotal = clientInfo.dettes?.reduce((acc: number, dette: { montantDue: number }) => acc + dette.montantDue, 0) || 0;
  const montantVerse = clientInfo.dettes?.reduce((acc: number, dette: { montantVerser: number }) => acc + dette.montantVerser, 0) || 0;
  const montantRestant = montantTotal - montantVerse;

  // État pour les articles disponibles, chargement et erreurs
  const [articles, setArticles] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // État pour la pagination des articles
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [articlesPerPage] = useState<number>(3);

  // État pour les articles sélectionnés
  const [selectedArticles, setSelectedArticles] = useState<any[]>([]);
  const [currentPageSelected, setCurrentPageSelected] = useState<number>(1);
  const [selectedArticlesPerPage] = useState<number>(2);

  // État pour les quantités temporaires
  const [tempQuantities, setTempQuantities] = useState<Record<number, number>>({});

  // Charger les articles au démarrage
  useEffect(() => {
    const loadArticles = async () => {
      try {
        const articlesData = await fetchArticles();
        setArticles(articlesData);
      } catch (error) {
        setError('Erreur lors de la récupération des articles');
      } finally {
        setLoading(false);
      }
    };

    loadArticles();
  }, []);

  // Recalculer le montant total des produits sélectionnés en temps réel
  const calculateMontantTotalArticles = () => {
    return selectedArticles.reduce((acc: number, article: any) => {
      const quantity = tempQuantities[article.id] || 1;
      return acc + article.prix * quantity;
    }, 0);
  };

  // Calcul du montant total des produits sélectionnés
  const montantTotalArticles = calculateMontantTotalArticles();

  // Pagination des articles disponibles
  const indexOfLastArticle = currentPage * articlesPerPage;
  const indexOfFirstArticle = indexOfLastArticle - articlesPerPage;
  const currentArticles = articles.slice(indexOfFirstArticle, indexOfLastArticle);
  const totalPages = Math.ceil(articles.length / articlesPerPage);

  // Pagination des articles sélectionnés
  const indexOfLastSelectedArticle = currentPageSelected * selectedArticlesPerPage;
  const indexOfFirstSelectedArticle = indexOfLastSelectedArticle - selectedArticlesPerPage;
  const currentSelectedArticles = selectedArticles.slice(indexOfFirstSelectedArticle, indexOfLastSelectedArticle);
  const totalSelectedPages = Math.ceil(selectedArticles.length / selectedArticlesPerPage);

  // Fonction pour gérer les changements de quantité temporaire
  const handleTempQuantityChange = (id: number, increment: boolean) => {
    setTempQuantities(prev => ({
      ...prev,
      [id]: Math.max((prev[id] || 1) + (increment ? 1 : -1), 1),
    }));
  };

  // Fonction pour mettre à jour les quantités des articles sélectionnés
  const updateArticleQuantities = () => {
    setSelectedArticles(prev => 
      prev.map(article => ({
        ...article,
        quantite: (article.quantite || 0) + (tempQuantities[article.id] || 0),
      }))
    );
    // Réinitialiser les quantités temporaires
    setTempQuantities({});
  };

  // Gestion des changements de sélection
  const handleCheckboxChange = (article: any) => {
    setSelectedArticles(prev => {
      const alreadySelected = prev.some(a => a.id === article.id);
      if (alreadySelected) {
        return prev.filter(a => a.id !== article.id);
      } else {
        return [...prev, article];
      }
    });
  };

  // Fonction pour supprimer un article sélectionné
  const handleDeleteSelectedArticle = (id: number) => {
    // Supprimer l'article de la liste des articles sélectionnés
    setSelectedArticles(prev => prev.filter(article => article.id !== id));

    // Réactiver l'article dans la liste des articles disponibles
    setArticles(prev => prev.map(article => {
      if (article.id === id) {
        return { ...article, selected: false }; // Modifier l'état de sélection
      }
      return article;
    }));
  };




  
  
  const handleCreateDette = async () => {
    // Vérification du montant saisi
    if (isNaN(montantSaisi) || montantSaisi < 0) {
      alert('Veuillez entrer un montant valide');
      return;
    }
  
    // Vérification de l'identifiant du client
    if (!clientInfo || !clientInfo.id) {
      alert('L\'identifiant du client est requis.');
      return;
    }
  
    // Préparer les articles
    const articles = selectedArticles.map(article => ({
      articleId: article.id,
      quantiteArticleDette: tempQuantities[article.id] || 1
    }));
  
    // Vérifier que chaque article a un `articleId`
    if (articles.some(article => !article.articleId)) {
      alert('Tous les articles doivent avoir un identifiant.');
      return;
    }
  
    // Calculer les montants total, versé et restant
    let montantTotal = 0;
    let montantVerse = 0;
    let montantRestant = 0;
  

  
    // Ajuster les montants pour la nouvelle dette
    montantTotal += montantTotalArticles; // Ajouter le montant total des articles sélectionnés
    const montantVerser = montantSaisi;
    montantRestant = montantTotal - montantVerser;
  
    // Préparer les données de la dette
    const detteData = {
      clientId: clientInfo.id,
      date: new Date().toISOString(),
      montantDue: montantTotal,
      montantVerser: montantVerser,
      articles: articles
    };
  
    try {
      const response = await createDette(detteData);
  
      if (response.status !== 201) {
        throw new Error('Erreur lors de la création de la dette');
      }
  
      const newDetteId = response.data.id;
  
      // Ajouter la demande dans tous les cas
      const demandeData = {
        date: new Date(),
        clientId: clientInfo.id,
        statut: "EN_ATTENTE",
        montant: montantTotal, // Montant total des articles sélectionnés
      };
      await createDemande(demandeData);
  
      // Si le montant saisi est supérieur à 0, ajouter un paiement
      if (montantSaisi > 0) {
        const paiementData = {
          date: new Date(),
          detteId: newDetteId,
          montant: montantSaisi,
        };
        await createPaiement(paiementData);
      }
  
      // Réinitialiser les états après succès
      setSelectedArticles([]);
      setTempQuantities({});
      setMontantSaisi(0);
  
      navigate("/boutique/listedette", { state: { client: clientInfo } });
    } catch (error) {
      console.error('Erreur lors de la création de la dette, du paiement ou de la demande:', error);
    }
  };
  
  



  useEffect(() => {
    // Recalculer le montant total des produits sélectionnés lorsque selectedArticles ou tempQuantities change
    calculateMontantTotalArticles();
  }, [selectedArticles, tempQuantities]);

  return (
    <main className="mt-8 mx-4 md:mr-8 rounded-xl bg-white p-4 shadow-sm flex flex-col main-content"
          style={{ marginLeft: "11%", width: "75em", height: "15em" }}>
      <div className="bg-white p-6 rounded-lg shadow-md">
        <div className="p-4 sm:p-6 md:p-8 mb-8" style={{ background: 'linear-gradient(to right, #2b6cb0, #2d3748)' }}>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6">
            {/* Carte Total des Dettes */}
            <div className="stat-card rounded-lg p-4 sm:p-6 text-white font-semibold text-lg sm:text-xl md:text-2xl flex flex-col justify-between" style={{ height: "9em" }}>
              <div className="flex flex-col justify-center space-y-4">
                <div className="flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-4 md:space-x-8">
                  <img
                    src={clientInfo.photo || "https://images.unsplash.com/photo-1499714608240-22fc6ad53fb2"}
                    alt="User Photo"
                    className="w-24 h-24 sm:w-32 sm:h-32 md:w-36 md:h-36 rounded-full"
                  />
                  <div className="flex flex-col justify-between h-full pb-4 text-center sm:text-left">
                    <p>Prenom: {clientInfo.prenom || 'Inconnu'}</p>
                    <p>Nom: {clientInfo.nom || 'Inconnu'}</p>
                    <p>Tel: {clientInfo.telephone || 'Inconnu'}</p>
                    <p className="email text-center sm:text-left p-6">Email: {clientInfo.user?.mail || 'Inconnu'}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Carte Demandes en Cours */}
            <div className="stat-card rounded-lg p-4 sm:p-6 font-semibold text-white text-lg sm:text-xl md:text-3xl flex flex-col justify-between">
              <p>Montant Total: {montantTotal} FCFA</p>
              <p>Montant Versé: {montantVerse} FCFA</p>
              <p>Montant Restant: {montantRestant} FCFA</p>
            </div>
          </div>
        </div>

        {/* Conteneur Flex pour les Listes */}
        <div className="flex flex-col md:flex-row gap-4">
          {/* Liste des Articles Disponibles */}
          <div className="product-list bg-white rounded-lg shadow p-4 mb-4 flex-1">
            <h2 className="font-semibold mb-2">Lister les articles disponibles</h2>
            <input type="text" placeholder="Libelle" className="p-2 border rounded-lg w-full mb-2" />
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-blue-600 text-white">
                  <tr>
                    <th className="p-2 text-center">
                      <i className="fas fa-check-square"></i>
                    </th>
                    <th className="p-2">Article</th>
                    <th className="p-2">Prix</th>
                    <th className="p-2">Quantité</th>
                  </tr>
                </thead>
                <tbody>
                  {loading ? (
                    <tr>
                      <td colSpan={4}>Chargement...</td>
                    </tr>
                  ) : error ? (
                    <tr>
                      <td colSpan={4}>{error}</td>
                    </tr>
                  ) : (
                    currentArticles.map(article => (
                      <tr key={article.id}>
                        <td className="p-2 text-center">
                          <input 
                            type="checkbox" 
                            checked={selectedArticles.some(a => a.id === article.id)} 
                            className="form-checkbox h-4 w-4 text-blue-600" 
                            onChange={() => handleCheckboxChange(article)}
                          />
                        </td>
                        <td className="p-2">{article.libelle}</td>
                        <td className="p-2">{article.prix} CFA</td>
                        <td className="p-2">{article.quantite}</td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
            <Pagination 
              totalPages={totalPages} 
              currentPage={currentPage} 
              onPageChange={setCurrentPage} 
            />
          </div>

          {/* Liste de Produits Sélectionnés */}
          <div className="product-list bg-white rounded-lg shadow p-4 flex-1">
            <div className="mb-4 flex justify-end">
              <label className="block mb-2 text-lg font-medium">Total: {montantTotalArticles} FCFA</label>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-blue-600 text-white">
                  <tr>
                    <th className="p-2">ARTICLE</th>
                    <th className="p-2">PRIX</th>
                    <th className="p-2">QUANTITÉ</th>
                    <th className="p-2">MONTANT</th>
                    <th className="p-2">ACTION</th>
                  </tr>
                </thead>
                <tbody>
                  {currentSelectedArticles.map(article => (
                    <tr key={article.id}>
                      <td className="p-2">{article.libelle}</td>
                      <td className="p-2">{article.prix} CFA</td>
                      <td className="p-2">
                        <div className="flex items-center justify-center">
                          <button 
                            className="px-2 py-1 bg-gray-200 rounded-l"
                            onClick={() => handleTempQuantityChange(article.id, false)}
                          >-</button>
                          <input 
                            type="text" 
                            value={tempQuantities[article.id] || 1} 
                            className="w-12 text-center border-t border-b" 
                            readOnly
                          />
                          <button 
                            className="px-2 py-1 bg-gray-200 rounded-r"
                            onClick={() => handleTempQuantityChange(article.id, true)}
                          >+</button>
                        </div>
                      </td>
                      <td className="p-2">{article.prix * (tempQuantities[article.id] || 1)} CFA</td>
                      <td>
                        <button 
                          className="text-red-500"
                          onClick={() => handleDeleteSelectedArticle(article.id)}
                        >
                          <i className="fas fa-trash"></i> Supprimer
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>

              </table>
            </div>
            <Pagination 
              totalPages={totalSelectedPages} 
              currentPage={currentPageSelected} 
              onPageChange={setCurrentPageSelected} 
            />
            <div className="flex items-center justify-center mt-4" style={{ marginLeft: "15em" }}>
            <label htmlFor="montant" className="mr-2 text-lg font-medium">Montant</label>
            <input 
                type="text" 
                name="montant" 
                id="montant" 
                value={montantSaisi || ''} // Affiche une chaîne vide si montantSaisi est 0 ou non défini
                onChange={(e) => {
                    const value = parseFloat(e.target.value);
                    setMontantSaisi(isNaN(value) ? 0 : value); // Si la saisie n'est pas un nombre, on revient à 0
                }}
                className="p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
            />
                <button
                className="ml-2 px-4 py-2 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 transition duration-300"
                onClick={handleCreateDette}
                >
                OK
                </button>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default NouveauDette;
