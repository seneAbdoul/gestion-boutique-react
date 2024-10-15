import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { fetchClient, fetchClientByTelephone } from '../../../services/ClientService';
import Pagination from '../../../components/PagginationComponent';
import ClientForm from '../../../pages/secure/dettes/components/FormClient';
import Modal from './components/ModalProps';

const ITEMS_PER_PAGE = 5;

const ListeClient: React.FC = () => {
  const [clients, setClients] = useState<any[]>([]);
  const [paginatedClients, setPaginatedClients] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [showClientForm, setShowClientForm] = useState<boolean>(false);
  const [telephone, setTelephone] = useState<string>('');
  const [clientFound, setClientFound] = useState<any | null>(null);
  const navigate = useNavigate();  // Hook pour naviguer

  useEffect(() => {
    const getClients = async () => {
      try {
        const clientData = await fetchClient();
        setClients(clientData);
        const total = Math.ceil(clientData.length / ITEMS_PER_PAGE);
        setTotalPages(total);
        setPaginatedClients(clientData.slice(0, ITEMS_PER_PAGE));
      } catch (err) {
        setError('Erreur lors de la récupération des clients');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    getClients();
  }, []);

  useEffect(() => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const endIndex = startIndex + ITEMS_PER_PAGE;
    setPaginatedClients(clients.slice(startIndex, endIndex));
  }, [currentPage, clients]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleShowClientForm = () => {
    setShowClientForm(true);
  };

  const handleCloseModal = () => {
    setShowClientForm(false);
  };

  const handleTelephoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTelephone(e.target.value);
  };

  const handleSearchByTelephone = async () => {
    setLoading(true);
    setError(null);
    try {
      const clientData = await fetchClientByTelephone(telephone);
      setClientFound(clientData);
      setPaginatedClients([]);
    } catch (err) {
      setError("Client non trouvé avec ce numéro");
      setClientFound(null);
    } finally {
      setLoading(false);
    }
  };

  const handleDetailsClick = async (telephone: string) => {
    try {
      const clientData = await fetchClientByTelephone(telephone);
      navigate('/boutique/listedette', { state: { client: clientData } });
    } catch (err) {
      console.error("Erreur lors de la récupération des détails du client", err);
    }
  };

  return (
    <main className="mt-8 mx-4 md:mr-8 rounded-xl bg-white p-4 shadow-sm flex flex-col main-content"
      style={{ marginLeft: "11%", width: "75em", height: "15em" }}>
      <div className="product-lists">
        <div className="product-list bg-white rounded-lg shadow p-4 w-full">
          <div className="mb-4 text-xl font-bold text-black">
            Lister Clients
          </div>
          <div className="flex flex-wrap justify-between items-center mb-4">
            <div className="flex items-center space-x-2">
              <input
                type="text"
                value={telephone}
                onChange={handleTelephoneChange}
                placeholder="Filtrer par Téléphone"
                className="p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none w-1/2"
              />
              <button
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                onClick={handleSearchByTelephone}
              >
                OK
              </button>
            </div>
            <div className="flex gap-4">
              <button
                className="px-4 py-2 bg-blue-600 text-white rounded-md shadow hover:bg-blue-700 mt-2 sm:mt-0"
                onClick={handleShowClientForm}
              >
                Nouveau Client
              </button>
            </div>
          </div>

          <div className="overflow-x-auto">
            {clientFound ? (
              <table className="min-w-full">
                <thead className="bg-blue-600 text-white">
                  <tr>
                    <th className="px-6 py-3 text-left">PRENOM ET NOM</th>
                    <th className="px-6 py-3 text-left">TELEPHONE</th>
                    <th className="px-6 py-3 text-left">ADRESSE</th>
                    <th className="px-6 py-3 text-left">MONTANT DUE</th>
                    <th className="px-6 py-3 text-left">ACTION</th>
                  </tr>
                </thead>
                <tbody className="text-gray-700">
                  <tr key={clientFound.id} className="border-t">
                    <td className="px-6 py-4">{clientFound.nom} {clientFound.prenom}</td>
                    <td className="px-6 py-4">{clientFound.telephone}</td>
                    <td className="px-6 py-4">{clientFound.adresse}</td>
                    <td className="px-6 py-4">{clientFound.montantDue} FCFA</td>
                    <td className="px-6 py-4">
                      <button 
                        className="px-4 py-2 bg-blue-500 text-white rounded-md shadow hover:bg-blue-600"
                        onClick={() => handleDetailsClick(clientFound.telephone)} // Gérer le clic pour afficher les détails
                      >
                        Détails
                      </button>
                    </td>
                  </tr>
                </tbody>
              </table>
            ) : (
              <table className="min-w-full">
                <thead className="bg-blue-600 text-white">
                  <tr>
                    <th className="px-6 py-3 text-left">PRENOM ET NOM</th>
                    <th className="px-6 py-3 text-left">TELEPHONE</th>
                    <th className="px-6 py-3 text-left">ADRESSE</th>
                    <th className="px-6 py-3 text-left">MONTANT DUE</th>
                    <th className="px-6 py-3 text-left">ACTION</th>
                  </tr>
                </thead>
                <tbody className="text-gray-700">
                  {loading && <tr><td colSpan={5} className="px-6 py-4 text-center">Chargement...</td></tr>}
                  {error && <tr><td colSpan={5} className="px-6 py-4 text-center text-red-600">{error}</td></tr>}
                  {!loading && !error && paginatedClients.length === 0 && (
                    <tr>
                      <td colSpan={5} className="px-6 py-4 text-center">Aucun client trouvé</td>
                    </tr>
                  )}
                  {paginatedClients.map((client) => (
                    <tr key={client.id} className="border-t">
                      <td className="px-6 py-4">{client.nom} {client.prenom}</td>
                      <td className="px-6 py-4">{client.telephone}</td>
                      <td className="px-6 py-4">{client.adresse}</td>
                      <td className="px-6 py-4">{client.montantDue} FCFA</td>
                      <td className="px-6 py-4">
                        <button 
                          className="px-4 py-2 bg-blue-500 text-white rounded-md shadow hover:bg-blue-600"
                          onClick={() => handleDetailsClick(client.telephone)}
                        >
                          Détails
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        </div>
      </div>

      <Modal
        show={showClientForm}
        onClose={handleCloseModal}
      >
        <ClientForm />
      </Modal>
    </main>
  );
};

export default ListeClient;
