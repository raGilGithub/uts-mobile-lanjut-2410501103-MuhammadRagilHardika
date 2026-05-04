import React, { createContext, useContext, useState } from 'react';

const FavoritesContext = createContext();

export function FavoritesProvider({ children }) {
  const [favorites, setFavorites] = useState([]);

  const addFavorite    = (meal) => setFavorites(prev =>
    prev.find(m => m.idMeal === meal.idMeal) ? prev : [...prev, meal]
  );
  const removeFavorite = (id)   => setFavorites(prev => prev.filter(m => m.idMeal !== id));
  const isFavorite     = (id)   => favorites.some(m => m.idMeal === id);

  return (
    <FavoritesContext.Provider value={{ favorites, addFavorite, removeFavorite, isFavorite }}>
      {children}
    </FavoritesContext.Provider>
  );
}

export const useFavorites = () => useContext(FavoritesContext);