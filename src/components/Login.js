// src/components/Login.js
import React, { useState } from 'react';

const Login = ({ onLogin, onSwitchToRegister }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null); // Para manejar errores

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Aquí puedes hacer la lógica para validar el inicio de sesión
    if (email && password) {
      try {
        const response = await fetch('http://192.168.1.67:5000/api/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ email, password }),
        });

        if (!response.ok) {
          throw new Error('Error al iniciar sesión');
        }

        // Si el inicio de sesión es exitoso
        onLogin(); // Cambia el estado a autenticado
      } catch (error) {
        setError(error.message); // Captura y muestra el error
      }
    }
  };

  return (
    <div className="login-container max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold text-center mb-4">Iniciar sesión</h2>
      {error && <p className="text-red-500 text-center">{error}</p>} {/* Mostrar error si existe */}
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700">Email:</label>
          <input 
            type="email" 
            value={email} 
            onChange={(e) => setEmail(e.target.value)} 
            required 
            className="mt-1 p-2 border border-gray-300 rounded w-full"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Contraseña:</label>
          <input 
            type="password" 
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
            required 
            className="mt-1 p-2 border border-gray-300 rounded w-full"
          />
        </div>
        <button 
          type="submit" 
          className="w-full bg-blue-500 text-white font-bold py-2 rounded hover:bg-blue-600 transition duration-200"
        >
          Iniciar sesión
        </button>
      </form>
      <p className="mt-4 text-center">
        ¿No tienes una cuenta? 
        <button 
          onClick={onSwitchToRegister} 
          className="text-blue-500 hover:underline ml-1"
        >
          Regístrate
        </button>
      </p>
    </div>
  );
};

export default Login;
