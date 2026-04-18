import React, { useContext, useEffect, useState, useRef } from 'react';
import { MenuPokedexContext } from '../contexts/MenuPokedexContext';
import './PackPage.css';

interface ItemBasic {
  name: string;
  url: string;
}

interface ItemDetails {
  id: number;
  name: string;
  image: string;
  effect: string;
}

const PackPage: React.FC = () => {
  const { itemIndex } = useContext(MenuPokedexContext);
  const [itemList, setItemList] = useState<ItemBasic[]>([]);
  const [selectedItem, setSelectedItem] = useState<ItemDetails | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const listRef = useRef<HTMLDivElement>(null);

  const fetchData = () => {
    setLoading(true);
    setError(null);
    fetch('https://pokeapi.co/api/v2/item?limit=50')
      .then(res => res.json())
      .then(data => {
        setItemList(data.results);
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

  useEffect(() => {
    if (itemList.length > 0) {
      const selected = itemList[itemIndex];
      fetch(selected.url)
        .then(res => res.json())
        .then(data => {
          // Buscar primero en flavor_text_entries (suele tener más traducciones a español)
          const flavorEntry = data.flavor_text_entries.find((entry: any) => entry.language.name === 'es')
            || data.flavor_text_entries.find((entry: any) => entry.language.name === 'en');

          const effectEntry = data.effect_entries.find((entry: any) => entry.language.name === 'es')
            || data.effect_entries.find((entry: any) => entry.language.name === 'en');

          setSelectedItem({
            id: data.id,
            name: data.name,
            image: data.sprites.default,
            effect: flavorEntry 
              ? flavorEntry.text.replace(/[\n\f]/g, ' ') 
              : (effectEntry ? effectEntry.short_effect : 'Sin descripción.')
          });
        });
    }
  }, [itemIndex, itemList]);

  useEffect(() => {
    const activeItem = document.querySelector('.pack-item.active');
    if (activeItem) {
      activeItem.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
  }, [itemIndex]);

  if (loading) {
    return <div className="pokedex-screen-content center">Cargando bolsa...</div>;
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
    <div className="pokedex-screen-content pack-layout font-pokemon">
      <div className="pack-list" ref={listRef}>
        <h3 className="pack-title">BOLSA DE OBJETOS</h3>
        {itemList.map((item, i) => (
          <div key={item.name} className={`pack-item ${i === itemIndex ? 'active' : ''}`}>
            <span className="bullet">●</span>
            <span className="name">{item.name.replace(/-/g, ' ').toUpperCase()}</span>
          </div>
        ))}
      </div>
      
      <div className="item-preview">
        {selectedItem && (
          <>
            {selectedItem.image && (
              <div className="item-icon">
                <img src={selectedItem.image} alt={selectedItem.name} />
              </div>
            )}
            <div className="item-details">
               <p className="item-effect">{selectedItem.effect}</p>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default PackPage;
