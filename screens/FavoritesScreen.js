import React from 'react';
import {
  View, Text, FlatList, TouchableOpacity,
  Image, StyleSheet, Animated,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Colors from '../constants/Colors';
import { useFavorites } from '../context/FavoritesContext';

function EmptyState() {
  return (
    <View style={styles.empty}>
      <View style={styles.emptyIcon}>
        <Ionicons name="heart-outline" size={44} color={Colors.primaryLight} />
      </View>
      <Text style={styles.emptyTitle}>Belum ada favorit</Text>
      <Text style={styles.emptySubtitle}>
        Buka detail resep, tekan ikon{' '}
        <Text style={{ color: Colors.primary }}>♥</Text>
        {' '}untuk menyimpan ke sini.
      </Text>
    </View>
  );
}

export default function FavoritesScreen({ navigation }) {
  const { favorites, removeFavorite } = useFavorites();

  return (
    <View style={styles.container}>
      {favorites.length === 0 ? (
        <EmptyState />
      ) : (
        <FlatList
          data={favorites}
          keyExtractor={item => item.idMeal}
          contentContainerStyle={styles.list}
          ListHeaderComponent={() => (
            <Text style={styles.countText}>
              {favorites.length} resep tersimpan ❤️
            </Text>
          )}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.card}
              activeOpacity={0.88}
              onPress={() => navigation.navigate('Detail', { mealId: item.idMeal })}
            >
              <Image source={{ uri: item.strMealThumb }} style={styles.thumb} />
              <View style={styles.info}>
                <Text style={styles.name} numberOfLines={2}>{item.strMeal}</Text>
                <Text style={styles.meta}>🇮🇩 Masakan Indonesia</Text>
                <Text style={styles.cta}>Lihat resep →</Text>
              </View>
              <TouchableOpacity
                style={styles.delBtn}
                onPress={() => removeFavorite(item.idMeal)}
                hitSlop={{ top: 12, bottom: 12, left: 12, right: 12 }}
              >
                <Ionicons name="heart-dislike-outline" size={20} color={Colors.primaryLight} />
              </TouchableOpacity>
            </TouchableOpacity>
          )}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container:   { flex: 1, backgroundColor: Colors.background },

  empty: {
    flex: 1, justifyContent: 'center', alignItems: 'center',
    padding: 40, gap: 12,
  },
  emptyIcon: {
    width: 88, height: 88, borderRadius: 44,
    backgroundColor: Colors.primaryBg,
    justifyContent: 'center', alignItems: 'center',
    marginBottom: 8,
  },
  emptyTitle:    { fontSize: 18, fontWeight: '800', color: Colors.text },
  emptySubtitle: { fontSize: 14, color: Colors.textLight, textAlign: 'center', lineHeight: 22 },

  list:      { padding: 16, paddingBottom: 30 },
  countText: { fontSize: 13, color: Colors.textLight, fontWeight: '600', marginBottom: 14 },
  card: {
    flexDirection:    'row',
    backgroundColor:  Colors.white,
    borderRadius:     16,
    marginBottom:     12,
    overflow:         'hidden',
    elevation:        2,
    shadowColor:      '#0000001A',
    shadowOffset:     { width: 0, height: 2 },
    shadowOpacity:    1,
    shadowRadius:     6,
    alignItems:       'center',
  },
  thumb:   { width: 88, height: 88 },
  info:    { flex: 1, padding: 12, gap: 3 },
  name:    { fontSize: 14, fontWeight: '700', color: Colors.text },
  meta:    { fontSize: 11, color: Colors.textLight },
  cta:     { fontSize: 12, color: Colors.primary, fontWeight: '600', marginTop: 3 },
  delBtn:  { padding: 14 },
});