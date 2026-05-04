import React from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { WARNA, UKURAN } from '../constants/Colors';
import { useFavorites } from '../context/FavoritesContext';

const ResepCard = ({ resep, onTekan, gaya }) => {
  const { apakahFavorit, toggleFavorit } = useFavorites();
  const isFavorit = apakahFavorit(resep.idMeal);

  const handleToggleFavorit = (e) => {
    e.stopPropagation();
    toggleFavorit(resep);
  };

  return (
    <TouchableOpacity
      style={[style.kartu, gaya]}
      onPress={() => onTekan && onTekan(resep)}
      activeOpacity={0.85}
    >
      <Image
        source={{ uri: resep.strMealThumb }}
        style={style.gambar}
        resizeMode="cover"
      />

      <TouchableOpacity style={style.tombolFavorit} onPress={handleToggleFavorit}>
        <Ionicons
          name={isFavorit ? 'heart' : 'heart-outline'}
          size={20}
          color={isFavorit ? WARNA.primer : WARNA.putih}
        />
      </TouchableOpacity>

      <View style={style.konten}>
        <Text style={style.namaResep} numberOfLines={2}>
          {resep.strMeal}
        </Text>
        {resep.strCategory && (
          <View style={style.badgeKategori}>
            <Text style={style.teksKategori}>{resep.strCategory}</Text>
          </View>
        )}
      </View>
    </TouchableOpacity>
  );
};

const style = StyleSheet.create({
  kartu: {
    backgroundColor: WARNA.card,
    borderRadius: UKURAN.borderRadius,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 3,
    marginBottom: 12,
  },
  gambar: {
    width: '100%',
    height: 160,
    backgroundColor: WARNA.abu200,
  },
  tombolFavorit: {
    position: 'absolute',
    top: 10,
    right: 10,
    backgroundColor: 'rgba(0,0,0,0.35)',
    borderRadius: 20,
    padding: 6,
  },
  konten: {
    padding: 12,
  },
  namaResep: {
    fontSize: 14,
    fontWeight: '600',
    color: WARNA.hitam,
    marginBottom: 6,
    lineHeight: 20,
  },
  badgeKategori: {
    alignSelf: 'flex-start',
    backgroundColor: WARNA.primerSangat,
    borderRadius: UKURAN.borderRadiusKecil,
    paddingHorizontal: 8,
    paddingVertical: 3,
  },
  teksKategori: {
    fontSize: 11,
    fontWeight: '500',
    color: WARNA.primer,
  },
});

export default ResepCard;