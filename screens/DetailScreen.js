import React, { useState } from 'react';
import {
  View, Text, ScrollView, Image, StyleSheet,
  TouchableOpacity, StatusBar, Dimensions, Share,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Colors from '../constants/Colors';
import { useFavorites } from '../context/FavoritesContext';
import { getMealById } from '../constants/IndonesianMeals';

const { width } = Dimensions.get('window');

export default function DetailScreen({ route, navigation }) {
  const { mealId } = route.params;
  const meal = getMealById(mealId); 
  const [tab, setTab] = useState('bahan');
  const { addFavorite, removeFavorite, isFavorite } = useFavorites();

  if (!meal) return (
    <View style={styles.center}>
      <Ionicons name="alert-circle-outline" size={60} color={Colors.border} />
      <Text style={{ color: Colors.textLight, marginTop: 10 }}>Resep tidak ditemukan</Text>
    </View>
  );

  const fav = isFavorite(meal.idMeal);

  const handleShare = () => Share.share({
    message: `Coba resep ${meal.strMeal} dari ResepNusantara! 🇮🇩`,
  });

  return (
    <View style={styles.container}>
      <StatusBar translucent backgroundColor="transparent" barStyle="light-content" />
      <ScrollView showsVerticalScrollIndicator={false}>

        <View style={styles.heroWrap}>
          <Image source={{ uri: meal.strMealThumb }} style={styles.heroImg} resizeMode="cover" />
          <TouchableOpacity style={styles.backBtn} onPress={() => navigation.goBack()}>
            <Ionicons name="chevron-back" size={22} color={Colors.white} />
          </TouchableOpacity>
          <View style={styles.actionBtns}>
            <TouchableOpacity style={styles.iconBtn} onPress={handleShare}>
              <Ionicons name="share-social-outline" size={20} color={Colors.white} />
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.iconBtn, fav && styles.iconBtnActive]}
              onPress={() => fav ? removeFavorite(meal.idMeal) : addFavorite(meal)}
            >
              <Ionicons name={fav ? 'heart' : 'heart-outline'} size={20} color={fav ? Colors.primary : Colors.white} />
            </TouchableOpacity>
          </View>
          <View style={styles.heroOverlay} />
        </View>

        <View style={styles.card}>
          <Text style={styles.mealTitle}>{meal.strMeal}</Text>
          <View style={styles.metaRow}>
            <View style={styles.metaChip}><Ionicons name="globe-outline" size={12} color={Colors.primary} /><Text style={styles.metaChipText}>{meal.strArea}</Text></View>
            <View style={styles.metaChip}><Ionicons name="restaurant-outline" size={12} color={Colors.primary} /><Text style={styles.metaChipText}>{meal.strCategory}</Text></View>
            <View style={styles.metaChip}><Ionicons name="time-outline" size={12} color={Colors.primary} /><Text style={styles.metaChipText}>{meal.cookTime}</Text></View>
          </View>
          <View style={styles.statRow}>
            {[
              { icon: 'flame-outline',  label: 'Kalori', value: meal.kalori },
              { icon: 'people-outline', label: 'Porsi',  value: meal.porsi },
              { icon: 'layers-outline', label: 'Bahan',  value: `${meal.strIngredients.length} item` },
            ].map(s => (
              <View key={s.label} style={styles.statItem}>
                <Ionicons name={s.icon} size={18} color={Colors.primary} />
                <Text style={styles.statValue}>{s.value}</Text>
                <Text style={styles.statLabel}>{s.label}</Text>
              </View>
            ))}
          </View>
        </View>

        <View style={styles.tabRow}>
          {['bahan', 'cara'].map(t => (
            <TouchableOpacity key={t} style={[styles.tabBtn, tab === t && styles.tabBtnActive]} onPress={() => setTab(t)}>
              <Text style={[styles.tabLabel, tab === t && styles.tabLabelActive]}>
                {t === 'bahan' ? `🥘 Bahan (${meal.strIngredients.length})` : '📋 Cara Membuat'}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {tab === 'bahan' && (
          <View style={styles.section}>
            {meal.strIngredients.map((item, idx) => (
              <View key={idx} style={styles.ingRow}>
                <View style={styles.ingNum}><Text style={styles.ingNumText}>{idx + 1}</Text></View>
                <Text style={styles.ingName}>{item.ing}</Text>
                <View style={styles.ingMsr}><Text style={styles.ingMsrText}>{item.msr || '–'}</Text></View>
              </View>
            ))}
          </View>
        )}

        {tab === 'cara' && (
          <View style={styles.section}>
            {meal.strInstructions.map((step, idx) => (
              <View key={idx} style={styles.stepRow}>
                <View style={styles.stepNum}><Text style={styles.stepNumText}>{idx + 1}</Text></View>
                <Text style={styles.stepText}>{step}</Text>
              </View>
            ))}
          </View>
        )}

        <View style={{ height: 40 }} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.background },
  center: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  heroWrap: { position: 'relative', height: 300 },
  heroImg: { width: '100%', height: 300 },
  heroOverlay: { position: 'absolute', bottom: 0, left: 0, right: 0, height: 100, backgroundColor: 'rgba(0,0,0,0.25)' },
  backBtn: { position: 'absolute', top: 52, left: 16, width: 38, height: 38, borderRadius: 19, backgroundColor: 'rgba(0,0,0,0.4)', justifyContent: 'center', alignItems: 'center' },
  actionBtns: { position: 'absolute', top: 52, right: 16, flexDirection: 'row', gap: 10 },
  iconBtn: { width: 38, height: 38, borderRadius: 19, backgroundColor: 'rgba(0,0,0,0.4)', justifyContent: 'center', alignItems: 'center' },
  iconBtnActive: { backgroundColor: Colors.white },
  card: { backgroundColor: Colors.white, marginHorizontal: 16, marginTop: -24, borderRadius: 20, padding: 18, elevation: 4, shadowColor: '#0000001A', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 1, shadowRadius: 12, zIndex: 10 },
  mealTitle: { fontSize: 20, fontWeight: '800', color: Colors.text, marginBottom: 12, lineHeight: 26 },
  metaRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 8, marginBottom: 16 },
  metaChip: { flexDirection: 'row', alignItems: 'center', gap: 4, backgroundColor: Colors.primaryBg, borderRadius: 20, paddingHorizontal: 10, paddingVertical: 5 },
  metaChipText: { fontSize: 12, color: Colors.primary, fontWeight: '600' },
  statRow: { flexDirection: 'row', borderTopWidth: 1, borderTopColor: Colors.border, paddingTop: 14 },
  statItem: { flex: 1, alignItems: 'center', gap: 3, borderRightWidth: 1, borderRightColor: Colors.border },
  statValue: { fontSize: 13, fontWeight: '700', color: Colors.text },
  statLabel: { fontSize: 11, color: Colors.textLight },
  tabRow: { flexDirection: 'row', marginHorizontal: 16, marginTop: 20, backgroundColor: Colors.white, borderRadius: 14, padding: 4, gap: 4 },
  tabBtn: { flex: 1, paddingVertical: 10, borderRadius: 10, alignItems: 'center' },
  tabBtnActive: { backgroundColor: Colors.primary },
  tabLabel: { fontSize: 13, fontWeight: '600', color: Colors.textLight },
  tabLabelActive: { color: Colors.white },
  section: { marginHorizontal: 16, marginTop: 12 },
  ingRow: { flexDirection: 'row', alignItems: 'center', paddingVertical: 11, borderBottomWidth: 1, borderBottomColor: Colors.border, gap: 10 },
  ingNum: { width: 26, height: 26, borderRadius: 13, backgroundColor: Colors.primaryBg, justifyContent: 'center', alignItems: 'center' },
  ingNumText: { fontSize: 11, fontWeight: '700', color: Colors.primary },
  ingName: { flex: 1, fontSize: 14, color: Colors.text, fontWeight: '500' },
  ingMsr: { backgroundColor: Colors.background, borderRadius: 8, paddingHorizontal: 8, paddingVertical: 4 },
  ingMsrText: { fontSize: 12, color: Colors.textMed, fontWeight: '500' },
  stepRow: { flexDirection: 'row', gap: 12, marginBottom: 16, alignItems: 'flex-start' },
  stepNum: { width: 28, height: 28, borderRadius: 14, backgroundColor: Colors.primary, justifyContent: 'center', alignItems: 'center', marginTop: 1, flexShrink: 0 },
  stepNumText: { fontSize: 12, fontWeight: '800', color: Colors.white },
  stepText: { flex: 1, fontSize: 14, color: Colors.textMed, lineHeight: 22 },
});