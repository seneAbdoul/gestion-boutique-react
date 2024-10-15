// LoginPage.tsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { authService, Credentials } from '../../../services/AuthService'; // Assurez-vous que Credentials est correctement importé
import { useForm } from 'react-hook-form';
import axios from 'axios';

export default function LoginPage() {
  const navigate = useNavigate();
  const { register, handleSubmit, formState: { errors } } = useForm<Credentials>();
  const [loginError, setLoginError] = React.useState<string | null>(null);

  const handleConnexion = async (credentials: Credentials) => {
    try {
      const response = await authService.login(credentials);
      if (response.status !== 200) {
        setLoginError('Connexion échouée, veuillez vérifier vos informations');
        return;
      }

      const { token } = response.data;
      authService.saveToken(token);
      navigate('/boutique', { replace: true });
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        setLoginError(error.response.data.message || 'Erreur inconnue lors de la connexion');
      } else {
        setLoginError('Erreur inconnue lors de la connexion');
      }
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white shadow-2xl rounded-lg overflow-hidden max-w-md w-full grid grid-cols-1 md:grid-cols-1">
        {/* Section gauche */}
        <div className="hidden md:flex relative bg-gradient-to-br from-blue-900 to-blue-700 p-8 text-white flex-col justify-center">
          {/* Contenu de la section gauche */}
          <h2 className="text-2xl font-bold">Bienvenue</h2>
          <p className="mt-4">Veuillez vous connecter pour accéder à votre espace.</p>
        </div>

        {/* Section droite */}
        <div className="p-8 flex flex-col justify-center">
          <h1 className="text-3xl font-bold text-gray-800 mb-4 text-center">Connexion</h1>
          <p className="text-lg text-gray-500 text-center mb-6">Connectez-vous pour accéder à votre espace de gestion.</p>

          {loginError && <p className="text-red-600 text-center mb-4">{loginError}</p>}

          <form
            onSubmit={handleSubmit(handleConnexion)}
            className="space-y-6"
          >
            <div>
              <label htmlFor="mail" className="block text-sm font-medium text-gray-700">
                Adresse e-mail
              </label>
              <input
                {...register('mail', { required: 'Le login est requis' })}
                type="text"
                id="mail"
                className="w-full mt-1 px-4 py-3 border border-gray-300 rounded-lg bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="exemple@domaine.com"
              />
              {errors.mail && <p className="text-red-600 mt-1 text-sm">{errors.mail.message}</p>}
            </div>
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Mot de passe
              </label>
              <input
                {...register('password', {
                  required: 'Le mot de passe est requis',
                  minLength: {
                    value: 6,
                    message: 'Le mot de passe doit comporter au moins 6 caractères',
                  },
                })}
                type="password"
                id="password"
                className="w-full mt-1 px-4 py-3 border border-gray-300 rounded-lg bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="••••••••"
              />
              {errors.password && <p className="text-red-600 mt-1 text-sm">{errors.password.message}</p>}
            </div>
            <button
              type="submit"
              className="w-full bg-yellow-500 text-white py-3 rounded-lg font-semibold hover:bg-yellow-600 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-offset-2"
            >
              Se connecter
            </button>
            <div className="flex justify-between items-center mt-4 text-sm">
              <a href="#" className="text-blue-600 hover:text-blue-800 transition-colors">Mot de passe oublié?</a>
              <a href="/" className="text-gray-700 hover:text-gray-900 transition-colors">Annuler</a>
            </div>
            <button
              type="button"
              onClick={() => navigate('/espace-client')}
              className="w-full bg-blue-700 text-white py-3 rounded-lg font-semibold hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              Espace Client
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
