const BASE_URL = 'https://www.themealdb.com/api/json/v1/1';
 
export const ambilKategori = async () => {
  try {
    const response = await fetch(`${BASE_URL}/categories.php`);
    const data = await response.json();
    return data.categories || [];
  } catch (error) {
    console.error('Gagal mengambil kategori:', error);
    return [];
  }
};
 
export const ambilResepByKategori = async (kategori) => {
  try {
    const response = await fetch(`${BASE_URL}/filter.php?c=${kategori}`);
    const data = await response.json();
    return data.meals || [];
  } catch (error) {
    console.error('Gagal mengambil resep:', error);
    return [];
  }
};
 
export const ambilDetailResep = async (idMeal) => {
  try {
    const response = await fetch(`${BASE_URL}/lookup.php?i=${idMeal}`);
    const data = await response.json();
    return data.meals ? data.meals[0] : null;
  } catch (error) {
    console.error('Gagal mengambil detail resep:', error);
    return null;
  }
};
 
export const cariResep = async (namaResep) => {
  try {
    const response = await fetch(`${BASE_URL}/search.php?s=${namaResep}`);
    const data = await response.json();
    return data.meals || [];
  } catch (error) {
    console.error('Gagal mencari resep:', error);
    return [];
  }
};
 
export const ambilBahan = (detailResep) => {
  const bahan = [];
  for (let i = 1; i <= 20; i++) {
    const ingredient = detailResep[`strIngredient${i}`];
    const measure = detailResep[`strMeasure${i}`];
    if (ingredient && ingredient.trim()) {
      bahan.push({ bahan: ingredient, takaran: measure || '' });
    }
  }
  return bahan;
};