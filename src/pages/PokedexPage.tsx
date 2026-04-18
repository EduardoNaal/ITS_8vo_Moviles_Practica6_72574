import React, { useContext, useEffect, useState, useRef } from 'react';
import { MenuPokedexContext } from '../contexts/MenuPokedexContext';
import './PokedexPage.css';

interface PokemonBasic {
  name: string;
  url: string;
}

interface PokemonDetails {
  id: number;
  name: string;
  image: string;
  description: string;
}

const PokedexPage: React.FC = () => {
  const { pokemonIndex } = useContext(MenuPokedexContext);
  const [pokemonList, setPokemonList] = useState<PokemonBasic[]>([]);
  const [selectedDetails, setSelectedDetails] = useState<PokemonDetails | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [loadingDetails, setLoadingDetails] = useState(false);
  const listRef = useRef<HTMLDivElement>(null);

  const fetchData = () => {
    setLoading(true);
    setError(null);
    fetch('https://pokeapi.co/api/v2/pokemon?limit=151')
      .then(res => res.json())
      .then(data => {
        setPokemonList(data.results);
        setLoading(false);
      })
      .catch(err => {
        console.error('Fetch error:', err);
        setError('Error de conexión con la PokeAPI');
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchData();
  }, []);

  // Fetch details when index changes
  useEffect(() => {
    if (pokemonList.length > 0) {
      const selected = pokemonList[pokemonIndex];
      setLoadingDetails(true);
      
      // Fetch details and species in parallel
      Promise.all([
        fetch(selected.url).then(res => res.json()),
        fetch(`https://pokeapi.co/api/v2/pokemon-species/${pokemonIndex + 1}`).then(res => res.json())
      ]).then(([details, species]) => {
        const flavorText = species.flavor_text_entries.find((entry: any) => entry.language.name === 'es') 
          || species.flavor_text_entries.find((entry: any) => entry.language.name === 'en');
        
        setSelectedDetails({
          id: details.id,
          name: details.name,
          image: details.sprites.other['official-artwork'].front_default || details.sprites.front_default,
          description: flavorText ? flavorText.flavor_text.replace(/\f/g, ' ') : 'No description available.'
        });
        setLoadingDetails(false);
      }).catch(() => {
        setLoadingDetails(false);
      });
    }
  }, [pokemonIndex, pokemonList]);

  // Handle scroll to active item
  useEffect(() => {
    const activeItem = document.querySelector('.pokemon-item.active');
    if (activeItem) {
      activeItem.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
  }, [pokemonIndex]);

  if (loading) {
    return <div className="pokedex-screen-content center">Cargando datos...</div>;
  }

  if (error) {
    return (
      <div className="pokedex-screen-content center flex-col gap-2">
        <div className="text-red-500 font-bold">{error}</div>
        <button 
          onClick={fetchData} 
          className="border-2 border-black p-1 bg-gray-200 text-[8px] active:bg-gray-400"
        >
          REINTENTAR
        </button>
      </div>
    );
  }

  return (
    <div className="pokedex-screen-content pokedex-layout font-pokemon">
      <div className="pokemon-list" ref={listRef}>
        {pokemonList.map((p, i) => (
          <div key={p.name} className={`pokemon-item ${i === pokemonIndex ? 'active' : ''}`}>
            <span className="id">#{String(i + 1).padStart(3, '0')}</span>
            <span className="name">{p.name.toUpperCase()}</span>
          </div>
        ))}
      </div>
      
      <div className="pokemon-details">
        {selectedDetails ? (
          <div className={`details-container ${loadingDetails ? 'faded' : ''}`}>
            <div className="image-frame">
               <img src={selectedDetails.image} alt={selectedDetails.name} />
            </div>
            <div className="details-text">
              <h2 className="detail-name">{selectedDetails.name.toUpperCase()}</h2>
              <p className="detail-desc">{selectedDetails.description}</p>
            </div>
          </div>
        ) : (
          <div className="center">Seleccionando...</div>
        )}
      </div>
    </div>
  );
};

export default PokedexPage;
