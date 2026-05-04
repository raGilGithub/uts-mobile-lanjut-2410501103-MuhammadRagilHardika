import React, { useState, useCallback } from 'react';
import {
  View, Text, FlatList, TouchableOpacity, Image,
  StyleSheet, ScrollView, StatusBar, Dimensions,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useFocusEffect } from '@react-navigation/native';
import Colors from '../constants/Colors';
import { CATEGORIES } from '../constants/IndonesianCategories';
import { MEALS_DB, getFeaturedMeals } from '../constants/IndonesianMeals';

const { width } = Dimensions.get('window');
const CARD_W = (width - 48) / 2;

function MealCard({ item, onPress }) {
  return (
    <TouchableOpacity style={styles.mealCard} onPress={onPress} activeOpacity={0.88}>
      <Image
        source={{ uri: item.strMealThumb }}
        style={styles.mealThumb}
      />
      <View style={styles.mealInfo}>
        <Text style={styles.mealName} numberOfLines={2}>{item.strMeal}</Text>
        <View style={styles.metaRow}>
          <View style={styles.mealTag}>
            <Text style={styles.mealTagText}>🇮🇩 {item.strCategory}</Text>
          </View>
          <Text style={styles.cookTime}>⏱ {item.cookTime}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}

export default function HomeScreen({ navigation }) {
  const featured = getFeaturedMeals();
  const featuredMeal = featured[0];

  useFocusEffect(
    useCallback(() => {
      StatusBar.setBarStyle('light-content');
    }, [])
  );

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor={Colors.primary} barStyle="light-content" />
      <ScrollView showsVerticalScrollIndicator={false} stickyHeaderIndices={[0]}>

        {}
        <View style={styles.header}>
          <View style={styles.headerTop}>
            <View>
              <Text style={styles.headerGreet}>Halo, Ragil! 👋</Text>
              <Text style={styles.headerTitle}>Resep Kita 🇮🇩</Text>
            </View>
            <TouchableOpacity style={styles.notifBtn}>
              <Ionicons name="notifications-outline" size={22} color={Colors.white} />
            </TouchableOpacity>
          </View>
          <TouchableOpacity
            style={styles.searchBar}
            onPress={() => navigation.getParent()?.navigate('Search')}
            activeOpacity={0.9}
          >
            <Ionicons name="search-outline" size={18} color={Colors.textLight} />
            <Text style={styles.searchPlaceholder}>Cari resep Indonesia...</Text>
          </TouchableOpacity>
        </View>

        {featuredMeal && (
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>🔥 Resep Unggulan</Text>
            </View>
            <TouchableOpacity
              style={styles.heroCard}
              activeOpacity={0.92}
              onPress={() => navigation.navigate('Detail', { mealId: featuredMeal.idMeal })}
            >
              <Image source={{ uri: featuredMeal.strMealThumb }} style={styles.heroImage} resizeMode="cover" />
              <View style={styles.heroOverlay}>
                <View style={styles.heroBadge}>
                  <Text style={styles.heroBadgeText}>#1 Terpopuler</Text>
                </View>
                <Text style={styles.heroName}>{featuredMeal.strMeal}</Text>
                <View style={styles.heroMeta}>
                  <Ionicons name="flag" size={12} color="#FFD700" />
                  <Text style={styles.heroMetaText}>{featuredMeal.strCategory}</Text>
                  <Text style={styles.heroDot}>·</Text>
                  <Ionicons name="time-outline" size={12} color="rgba(255,255,255,0.8)" />
                  <Text style={styles.heroMetaText}>{featuredMeal.cookTime}</Text>
                </View>
              </View>
            </TouchableOpacity>
          </View>
        )}

        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>📂 Kategori</Text>
          </View>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.catList}>
            {CATEGORIES.map(cat => (
              <TouchableOpacity
                key={cat.id}
                style={styles.catChip}
                activeOpacity={0.82}
                onPress={() => navigation.navigate('Browse', {
                  categoryName: cat.name,
                  filterKey: cat.filterKey,
                })}
              >
                <Text style={styles.catEmoji}>{cat.emoji}</Text>
                <Text style={styles.catLabel}>{cat.name}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        <View style={[styles.section, { marginBottom: 24 }]}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>🍽️ Semua Resep Indonesia</Text>
            <Text style={styles.sectionCount}>{MEALS_DB.length} resep</Text>
          </View>
          <View style={styles.grid}>
            {MEALS_DB.map(item => (
              <MealCard
                key={item.idMeal}
                item={item}
                onPress={() => navigation.navigate('Detail', { mealId: item.idMeal })}
              />
            ))}
          </View>
        </View>

      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.background },
  header: {
    backgroundColor: Colors.primary,
    paddingTop: 52, paddingBottom: 20, paddingHorizontal: 20,
    borderBottomLeftRadius: 24, borderBottomRightRadius: 24,
  },
  headerTop: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 16 },
  headerGreet: { fontSize: 13, color: 'rgba(255,255,255,0.78)', fontWeight: '500' },
  headerTitle: { fontSize: 24, color: Colors.white, fontWeight: '800', letterSpacing: 0.4, marginTop: 2 },
  notifBtn: { padding: 6, backgroundColor: 'rgba(255,255,255,0.15)', borderRadius: 12 },
  searchBar: { flexDirection: 'row', alignItems: 'center', gap: 10, backgroundColor: Colors.white, borderRadius: 14, paddingHorizontal: 14, paddingVertical: 12 },
  searchPlaceholder: { fontSize: 14, color: Colors.textLight, flex: 1 },
  section: { marginTop: 20, paddingHorizontal: 16 },
  sectionHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 },
  sectionTitle: { fontSize: 16, fontWeight: '700', color: Colors.text, letterSpacing: 0.1 },
  sectionCount: { fontSize: 12, color: Colors.textLight, fontWeight: '500' },
  heroCard: { borderRadius: 20, overflow: 'hidden', height: 210, backgroundColor: Colors.border },
  heroImage: { width: '100%', height: '100%', position: 'absolute' },
  heroOverlay: { position: 'absolute', bottom: 0, left: 0, right: 0, padding: 16, paddingTop: 40, backgroundColor: 'rgba(0,0,0,0.48)' },
  heroBadge: { alignSelf: 'flex-start', backgroundColor: Colors.primary, borderRadius: 20, paddingHorizontal: 10, paddingVertical: 4, marginBottom: 6 },
  heroBadgeText: { fontSize: 11, color: Colors.white, fontWeight: '700', letterSpacing: 0.3 },
  heroName: { fontSize: 18, color: Colors.white, fontWeight: '800', marginBottom: 6 },
  heroMeta: { flexDirection: 'row', alignItems: 'center', gap: 4 },
  heroMetaText: { fontSize: 12, color: 'rgba(255,255,255,0.82)', fontWeight: '500' },
  heroDot: { fontSize: 12, color: 'rgba(255,255,255,0.5)', marginHorizontal: 2 },
  catList: { paddingRight: 4, gap: 10 },
  catChip: { alignItems: 'center', backgroundColor: Colors.primaryBg, borderRadius: 16, paddingHorizontal: 14, paddingVertical: 10, gap: 4, minWidth: 70, borderWidth: 1, borderColor: Colors.border },
  catEmoji: { fontSize: 20 },
  catLabel: { fontSize: 11, fontWeight: '600', color: Colors.primary },
  grid: { flexDirection: 'row', flexWrap: 'wrap', gap: 12 },
  mealCard: { width: CARD_W, backgroundColor: Colors.white, borderRadius: 16, overflow: 'hidden', elevation: 2, shadowColor: '#00000018', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 1, shadowRadius: 6 },
  mealThumb: { width: '100%', height: 130 },
  mealInfo: { padding: 10 },
  mealName: { fontSize: 13, fontWeight: '700', color: Colors.text, lineHeight: 18, marginBottom: 6 },
  metaRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  mealTag: { alignSelf: 'flex-start', backgroundColor: Colors.primaryBg, borderRadius: 20, paddingHorizontal: 8, paddingVertical: 3 },
  mealTagText: { fontSize: 9, color: Colors.primary, fontWeight: '600' },
  cookTime: { fontSize: 10, color: Colors.textLight },
});