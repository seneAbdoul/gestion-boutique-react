import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import Pagination from '../../../components/PagginationComponent'; 
import { fetchPaiementByIdDette, createPaiement } from '../../../services/PaiementService'; // Assurez-vous que le chemin d'importation est correct

interface Article {
  id: number;
  libelle: string;
}

interface ArticleDette {
  articleId: number;
  quantiteArticleDette: number;
  article: Article;
}

interface Dette {
  id: number;
  date: string;
  montantDue: number;
  montantVerser: number;
  ArticleDette: ArticleDette[];
}

interface Paiement {
  id: number;
  date: string;
  montant: number;
}

interface ClientInfo {
  prenom: string;
  nom: string;
  telephone: string;
  photo?: string;
  user: {
    mail: string;
  };
}

const DetailPage: React.FC = () => {
  const location = useLocation();
  const { dette, client } = location.state as { dette: Dette; client: ClientInfo };

  const [paiements, setPaiements] = useState<Paiement[]>([]);
  const [newMontant, setNewMontant] = useState('');
  const itemsPerPage = 3;
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const getPaiements = async () => {
      try {
        const data = await fetchPaiementByIdDette(dette.id);
        setPaiements(data);
      } catch (error) {
        console.error('Erreur lors de la récupération des paiements:', error);
      }
    };

    getPaiements();
  }, [dette.id]);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentArticles = dette?.ArticleDette.slice(indexOfFirstItem, indexOfLastItem) || [];
  const currentPaiements = paiements.slice(indexOfFirstItem, indexOfLastItem) || [];

  const totalPages = Math.ceil((dette?.ArticleDette.length || 0) / itemsPerPage);
  const totalPaiementPages = Math.ceil((paiements.length || 0) / itemsPerPage);

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  const handleAddPaiement = async () => {
    const montantRestant = calculateReste(dette?.montantDue, dette?.montantVerser);
    if (parseFloat(newMontant) <= 0 || parseFloat(newMontant) > montantRestant) {
      console.error('Le montant doit être supérieur à zéro et ne pas dépasser le montant restant.');
      return;
    }

    const paiementData = {
      montant: parseFloat(newMontant),
      date: new Date(),
      detteId: dette.id,
    };

    try {
      const response = await createPaiement(paiementData);
      const { updatedDette } = response.data;

      // Mettre à jour les paiements et la dette
      setPaiements((prevPaiements) => [...prevPaiements, response.data.newPaiement]);
      // Mise à jour de l'état de `dette`
      location.state.dette.montantVerser = updatedDette.montantVerser;
      setNewMontant(''); // Réinitialiser le montant saisi
    } catch (error) {
      console.error('Erreur lors de la création du paiement:', error);
    }
  };

  const calculateReste = (montantDue: number, montantVerser: number): number => montantDue - montantVerser;

  const montantRestant = calculateReste(dette?.montantDue, dette?.montantVerser);

  return (
    <main className="mt-8 mx-4 md:mr-8 rounded-xl bg-white p-4 shadow-sm flex flex-col" style={{ marginLeft: "11%", width: "75em", height: "15em" }}>
      <div className="p-4 sm:p-6 md:p-8 mb-8" style={{ background: "linear-gradient(to right, #2b6cb0, #2d3748)" }}>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6">
          <div className="stat-card rounded-lg p-4 sm:p-6 text-white font-semibold text-lg sm:text-xl md:text-2xl flex flex-col justify-between">
            <div className="flex flex-col justify-center space-y-4">
              <div className="flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-4 md:space-x-8">
                <img
                  src={client?.photo || "https://images.unsplash.com/photo-1499714608240-22fc6ad53fb2"}
                  alt="User Photo"
                  className="w-24 h-24 sm:w-32 sm:h-32 md:w-36 md:h-36 rounded-full"
                />
                <div className="flex flex-col justify-between h-full pb-4 text-center sm:text-left">
                  <p>Prenom: {client?.prenom}</p>
                  <p>Nom: {client?.nom}</p>
                  <p>Tel: {client?.telephone}</p>
                </div>
              </div>
              <p className="email text-center sm:text-left">Email: {client?.user.mail}</p>
            </div>
          </div>

          <div className="stat-card rounded-lg p-4 sm:p-6 font-semibold text-white text-lg sm:text-xl md:text-3xl flex flex-col justify-between">
            <p>Montant Total: {dette?.montantDue.toLocaleString()} FCFA</p>
            <p>Montant Versé: {dette?.montantVerser.toLocaleString()} FCFA</p>
            <p>Montant Restant: {montantRestant.toLocaleString()} FCFA</p>
          </div>
        </div>
      </div>

      <div className="flex justify-start mb-2">
        <button className="px-6 py-2 border-2 border-gray-300 bg-white text-gray-800 font-semibold">Articles</button>
        <button className="px-6 py-2 bg-blue-800 text-white font-semibold">Paiements</button>
      </div>

      <div className="flex flex-col lg:flex-row justify-between gap-4 mb-6 w-full">
        <div className="bg-white rounded-lg shadow p-4 w-full lg:w-2/3">
          <table className="w-full text-center">
            <thead className="bg-blue-700 text-white">
              <tr>
                <th className="py-2 px-4 text-center">Identifiant</th>
                <th className="py-2 px-4 text-center">Article</th>
                <th className="py-2 px-4 text-center">Quantité</th>
              </tr>
            </thead>
            <tbody>
              {currentArticles.length > 0 ? (
                currentArticles.map((articleDette) => (
                  <tr key={articleDette.articleId} className="border-b">
                    <td className="py-2 px-4 text-center">{articleDette.article.id}</td>
                    <td className="py-2 px-4 text-center">{articleDette.article.libelle}</td>
                    <td className="py-2 px-4 text-center">{articleDette.quantiteArticleDette}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td className="py-2 px-4 text-center" colSpan={3}>Aucun article trouvé</td>
                </tr>
              )}
            </tbody>
          </table>
          {/* Pagination pour les articles */}
          <Pagination
            totalPages={totalPages}
            currentPage={currentPage}
            onPageChange={handlePageChange}
          />
        </div>
        
        <div className="bg-white rounded-lg shadow p-4 w-full lg:w-1/3 mt-4 lg:mt-0">
          <div className="flex mb-4">
            <input 
              type="number" 
              placeholder="Montant" 
              className="border rounded px-4 py-2 mr-2 w-1/2" 
              value={newMontant} 
              onChange={(e) => setNewMontant(e.target.value)} 
            />
            <button 
              className="bg-blue-500 text-white px-4 py-2 rounded" 
              onClick={handleAddPaiement}
              disabled={parseFloat(newMontant) <= 0 || parseFloat(newMontant) > montantRestant}
            >
              ok
            </button>
          </div>
          <table className="w-full text-center">
            <thead className="bg-blue-700 text-white">
              <tr>
                <th className="py-2 px-4">Date</th>
                <th className="py-2 px-4">Montant</th>
              </tr>
            </thead>
            <tbody>
              {currentPaiements.length > 0 ? (
                currentPaiements.map((paiement) => (
                  <tr key={paiement.id} className="border-b">
                    <td className="py-2 px-4">{new Date(paiement.date).toLocaleDateString()}</td>
                    <td className="py-2 px-4">{paiement.montant.toLocaleString()} FCFA</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td className="py-2 px-4" colSpan={2}>Aucun paiement trouvé</td>
                </tr>
              )}
            </tbody>
          </table>
          {/* Pagination pour les paiements */}
          <Pagination
            totalPages={totalPaiementPages}
            currentPage={currentPage}
            onPageChange={handlePageChange}
          />
        </div>
      </div>
    </main>
  );
};

export default DetailPage;
