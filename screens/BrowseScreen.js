import React, { useMemo } from 'react';
import { View, Text, FlatList, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Colors from '../constants/Colors';
import { getMealsByCategory } from '../constants/IndonesianMeals';

export default function BrowseScreen({ route, navigation }) {
  const { filterKey, categoryName } = route.params;

  const meals = useMemo(() => getMealsByCategory(filterKey), [filterKey]);

  if (meals.length === 0) return (
    <View style={styles.center}>
      <Ionicons name="restaurant-outline" size={60} color={Colors.border} />
      <Text style={styles.emptyText}>Belum ada resep "{categoryName}"</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={meals}
        keyExtractor={item => item.idMeal}
        numColumns={2}
        columnWrapperStyle={styles.row}
        contentContainerStyle={styles.list}
        ListHeaderComponent={() => (
          <Text style={styles.countLabel}>{meals.length} resep {categoryName}</Text>
        )}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.card}
            activeOpacity={0.88}
            onPress={() => navigation.navigate('Detail', { mealId: item.idMeal })}
          >
            <Image source={{ uri: item.strMealThumb }} style={styles.thumb} resizeMode="cover" />
            <View style={styles.cardBody}>
              <Text style={styles.cardName} numberOfLines={2}>{item.strMeal}</Text>
              <Text style={styles.cookTime}>⏱ {item.cookTime}</Text>
              <View style={styles.cardFoot}>
                <View style={styles.badge}>
                  <Text style={styles.badgeText}>🇮🇩 Nusantara</Text>
                </View>
                <Ionicons name="chevron-forward" size={14} color={Colors.primary} />
              </View>
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.background },
  center: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 30 },
  emptyText: { fontSize: 16, fontWeight: '700', color: Colors.text, marginTop: 14, textAlign: 'center' },
  countLabel: { fontSize: 13, color: Colors.textLight, paddingHorizontal: 16, marginBottom: 12, marginTop: 16, fontWeight: '600' },
  list: { paddingBottom: 30 },
  row: { justifyContent: 'space-between', paddingHorizontal: 16, marginBottom: 14 },
  card: { width: '47.5%', backgroundColor: Colors.white, borderRadius: 16, overflow: 'hidden', elevation: 2, shadowColor: '#0000001A', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 1, shadowRadius: 6 },
  thumb: { width: '100%', height: 125 },
  cardBody: { padding: 10 },
  cardName: { fontSize: 13, fontWeight: '700', color: Colors.text, lineHeight: 18, marginBottom: 4 },
  cookTime: { fontSize: 11, color: Colors.textLight, marginBottom: 6 },
  cardFoot: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  badge: { backgroundColor: Colors.primaryBg, borderRadius: 20, paddingHorizontal: 8, paddingVertical: 3 },
  badgeText: { fontSize: 10, color: Colors.primary, fontWeight: '600' },
});