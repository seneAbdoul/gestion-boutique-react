import React, { useState } from 'react';
import { createClient } from '../../../../services/ClientService'; 
import { registerUser } from '../../../../services/UserService'; 

const ClientForm = () => {
  const [createAccount, setCreateAccount] = useState(false);
  const [clientData, setClientData] = useState({
    nom: '',
    prenom: '',
    telephone: '',
    adresse: '',
    photo: '', 
    genre: '',
  });
  const [userData, setUserData] = useState({
    mail: '',
    password: '',
    role: 'CLIENT',
  });
  const [confirmationMessage, setConfirmationMessage] = useState(''); 

  const toggleAccountFields = () => {
    setCreateAccount(!createAccount);
  };

  const handleClientSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      // Créer le client
      const clientResponse = await createClient(clientData);
      const clientId = clientResponse.data.id;

      // Si la création du compte est activée, créer l'utilisateur
      if (createAccount) {
        await registerUser({ ...userData, clientId });
      }

      // Réinitialiser les champs du formulaire
      setClientData({
        nom: '',
        prenom: '',
        telephone: '',
        adresse: '',
        photo: '',
        genre: '',
      });
      setUserData({
        mail: '',
        password: '',
        role: 'CLIENT',
      });
      setCreateAccount(false); // Réinitialiser le toggle de création de compte

      // Afficher le message de confirmation
      setConfirmationMessage('Client ajouté avec succès !');
    } catch (error) {
      console.error('Erreur lors de la création du client ou de l\'utilisateur:', error);
    }
  };

  const handlePhotoChange: React.ChangeEventHandler<HTMLInputElement> = (event) => {
    const file = event.target.files?.[0];

    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setClientData((prevData) => ({ ...prevData, photo: reader.result as string }));
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-2xl font-bold mb-6 text-blue-800">
        <i className="fas fa-user-plus mr-2"></i>Nouveau Client
      </h2>
      <form onSubmit={handleClientSubmit} method="POST" action="#" encType="multipart/form-data" className="space-y-4">
        <div className="form-row mb-4 flex items-center space-x-2">
          <label htmlFor="prenom" className="w-full sm:w-1/6 flex-shrink-0 font-semibold text-gray-700 flex items-center mr-2">
            <i className="fas fa-user mr-1"></i>Prénom
          </label>
          <input
            type="text"
            id="prenom"
            name="prenom"
            value={clientData.prenom}
            onChange={(e) => setClientData({ ...clientData, prenom: e.target.value })}
            className="input-shadow flex-grow p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
        <div className="form-row mb-4 flex items-center space-x-2">
          <label htmlFor="nom" className="w-full sm:w-1/6 flex-shrink-0 font-semibold text-gray-700 flex items-center mr-1">
            <i className="fas fa-user mr-1"></i>Nom
          </label>
          <input
            type="text"
            id="nom"
            name="nom"
            value={clientData.nom}
            onChange={(e) => setClientData({ ...clientData, nom: e.target.value })}
            className="input-shadow flex-grow p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
        <div className="form-row mb-4 flex items-center space-x-2">
          <label htmlFor="telephone" className="w-1/6 flex-shrink-0 font-semibold text-gray-700 flex items-center mr-1">
            <i className="fas fa-phone mr-1"></i>Tél
          </label>
          <input
            type="tel"
            id="telephone"
            name="telephone"
            value={clientData.telephone}
            onChange={(e) => setClientData({ ...clientData, telephone: e.target.value })}
            className="input-shadow flex-grow p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
        <div className="form-row mb-4 flex items-center space-x-2">
          <label htmlFor="adresse" className="w-1/6 flex-shrink-0 font-semibold text-gray-700 flex items-center mr-1">
            <i className="fas fa-map-marker-alt mr-1"></i>Adresse
          </label>
          <input
            type="text"
            id="adresse"
            name="adresse"
            value={clientData.adresse}
            onChange={(e) => setClientData({ ...clientData, adresse: e.target.value })}
            className="input-shadow flex-grow p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
        <div className="form-row mb-4 flex items-center space-x-2">
          <label htmlFor="photo" className="w-1/6 flex-shrink-0 font-semibold text-gray-700 flex items-center mr-1">
            <i className="fas fa-camera mr-2"></i>Photo
          </label>
          <input
            type="file"
            id="photo"
            name="photo"
            onChange={handlePhotoChange}
            className="input-shadow flex-grow p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
        <div className="form-row mb-4 flex items-center space-x-2">
          <label htmlFor="genre" className="w-1/6 flex-shrink-0 font-semibold text-gray-700 flex items-center mr-1">
            <i className="fas fa-genderless mr-1"></i>Genre
          </label>
          <select
            id="genre"
            name="genre"
            value={clientData.genre}
            onChange={(e) => setClientData({ ...clientData, genre: e.target.value })}
            className="input-shadow flex-grow p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="">Sélectionner</option>
            <option value="Masculin">Masculin</option>
            <option value="Féminin">Féminin</option>
          </select>
        </div>

        {/* Toggle pour Création de Compte */}
        <div className="mb-4 flex items-center">
          <span className="toggle-label mr-2">Créer un compte :</span>
          <label className="toggle-switch relative inline-block w-10 h-6">
            <input
              type="checkbox"
              id="creerCompte"
              className="sr-only"
              onChange={toggleAccountFields}
            />
            <span
              className={`slider absolute inset-0 cursor-pointer rounded-full transition duration-200 ease-in-out ${createAccount ? 'bg-green-500' : 'bg-gray-300'}`}
            ></span>
          </label>
          <span className="toggle-label ml-2 text-gray-700 font-semibold" id="toggleLabel">
            {createAccount ? 'Oui' : 'Non'}
          </span>
        </div>

        {/* Champs Supplémentaires pour la Création de Compte */}
        {createAccount && (
          <div id="accountFields">
            <div className="form-row mb-4 flex items-center space-x-2">
              <label htmlFor="login" className="w-1/6 flex-shrink-0 font-semibold text-gray-700 flex items-center">
                <i className="fas fa-envelope mr-2"></i>Login
              </label>
              <input
                type="text"
                id="login"
                name="login"
                value={userData.mail}
                onChange={(e) => setUserData({ ...userData, mail: e.target.value })}
                className="input-shadow flex-grow p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            <div className="form-row mb-2 flex items-center space-x-2">
              <label htmlFor="password" className="w-1/6 flex-shrink-0 font-semibold text-gray-700 flex items-center">
                <i className="fas fa-lock mr-2"></i>Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                value={userData.password}
                onChange={(e) => setUserData({ ...userData, password: e.target.value })}
                className="input-shadow flex-grow p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          </div>
        )}

        <div className="flex justify-center">
          <button type="reset" className="btn font-bold bg-red-600 text-white py-2 px-4 rounded-md hover:bg-red-700 mr-12">
            <i className="fas fa-times mr-2"></i>Annuler
          </button>
          <button type="submit" className="btn font-bold bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded shadow-md">
            <i className="fas fa-save mr-2"></i>Enregistrer
          </button>
        </div>
      </form>
      {/* Affichage du message de confirmation */}
      {confirmationMessage && (
        <div className="mt-4 text-green-600 font-semibold">
          {confirmationMessage}
        </div>
      )}
    </div>
  );
};

export default ClientForm;
