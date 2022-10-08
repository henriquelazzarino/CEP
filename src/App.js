import { useState } from 'react';
import { FiSearch } from 'react-icons/fi';
import api from './services/api.js'
import './style.css';

function App() {

  const [input, setInput] = useState('');
  const [cep, setCep] = useState({});

  async function handleSearch() {
    if (input === '') {
      alert('Informe algum CEP');
      return;
    }

    try {
      const response = await api.get(`${input}/json`)
      setCep(response.data)
    } catch {
      alert('CEP não achado')
    }
    setInput('');
  }

  return (
    <div className="container">
      <h1 className="title">Buscador CEP</h1>
      <div className="containerInput">
        <input
          type="text"
          placeholder="CEP..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />

        <button className="buttonSearch" onClick={handleSearch}>
          <FiSearch size={25} color="" />
        </button>
      </div>
      {Object.keys(cep).length > 1 && (
        <main className="main">
        <h2>CEP: {cep.cep}</h2>
        <span>Rua: {cep.logradouro}</span>
        <span>Complemento: {cep.complemento}</span>
        <span>Bairro: {cep.bairro}</span>
        <span>Localidade: {cep.localidade + ' - ' + cep.uf}</span>
      </main>
      )}
    </div>
  );
}

export default App;
