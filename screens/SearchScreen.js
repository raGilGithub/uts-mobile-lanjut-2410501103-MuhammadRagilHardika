import React, { useState, useRef } from 'react';
import { View, Text, TextInput, FlatList, TouchableOpacity, Image, StyleSheet, Keyboard, StatusBar } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Colors from '../constants/Colors';
import { searchMeals } from '../constants/IndonesianMeals';

const QUICK_SEARCH = [
  'Nasi Goreng', 'Rendang', 'Soto Ayam', 'Pempek',
  'Klepon', 'Ayam Bakar', 'Tempe', 'Onde-Onde',
  'Rawon', 'Opor Ayam', 'Mie Goreng', 'Dadar Gulung',
];

export default function SearchScreen({ navigation }) {
  const [query,    setQuery]    = useState('');
  const [results,  setResults]  = useState([]);
  const [searched, setSearched] = useState(false);
  const inputRef = useRef(null);

  const canSearch = query.trim().length >= 2; 

  const doSearch = (q = query) => {
    if (q.trim().length < 2) return;
    Keyboard.dismiss();
    setSearched(true);
    setQuery(q);
    const found = searchMeals(q);
    setResults(found);
  };

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor={Colors.primary} barStyle="light-content" />
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Cari Resep 🇮🇩</Text>
        <Text style={styles.headerSub}>Cari instan dari 30 resep Nusantara</Text>
        <View style={styles.searchWrap}>
          <Ionicons name="search-outline" size={18} color={Colors.textLight} style={{ marginLeft: 14 }} />
          <TextInput
            ref={inputRef}
            style={styles.input}
            placeholder="Ketik nama masakan..."
            placeholderTextColor={Colors.textLight}
            value={query}
            onChangeText={t => {
              setQuery(t);
              if (t.length >= 2) {
                setSearched(true);
                setResults(searchMeals(t)); 
              } else {
                setResults([]);
                setSearched(false);
              }
            }}
            returnKeyType="search"
            autoCorrect={false}
          />
          {query.length > 0 && (
            <TouchableOpacity onPress={() => { setQuery(''); setResults([]); setSearched(false); }} style={{ padding: 12 }}>
              <Ionicons name="close-circle" size={18} color={Colors.textLight} />
            </TouchableOpacity>
          )}
        </View>
      </View>

      {!searched && (
        <View style={styles.quick}>
          <Text style={styles.quickTitle}>🔥 Trending Sekarang</Text>
          <View style={styles.quickWrap}>
            {QUICK_SEARCH.map(q => (
              <TouchableOpacity key={q} style={styles.quickChip} onPress={() => doSearch(q)}>
                <Text style={styles.quickText}>{q}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      )}

      {searched && results.length === 0 && (
        <View style={styles.center}>
          <Ionicons name="search-outline" size={56} color={Colors.border} />
          <Text style={styles.notFoundTitle}>Resep tidak ditemukan</Text>
          <Text style={styles.notFoundSub}>Coba kata kunci lain!</Text>
        </View>
      )}

      {results.length > 0 && (
        <FlatList
          data={results}
          keyExtractor={item => item.idMeal}
          contentContainerStyle={styles.list}
          ListHeaderComponent={() => (
            <Text style={styles.resultCount}>{results.length} hasil untuk "{query}"</Text>
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
                <View style={styles.tagRow}>
                  <View style={styles.tag}><Text style={styles.tagText}>{item.strCategory}</Text></View>
                  <Text style={{ fontSize: 11, color: Colors.textLight }}>⏱ {item.cookTime}</Text>
                </View>
              </View>
              <Ionicons name="chevron-forward" size={18} color={Colors.border} style={{ marginRight: 12 }} />
            </TouchableOpacity>
          )}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.background },
  center: { flex: 1, justifyContent: 'center', alignItems: 'center', gap: 10, paddingTop: 40 },
  header: { backgroundColor: Colors.primary, paddingTop: 52, paddingHorizontal: 20, paddingBottom: 24, borderBottomLeftRadius: 24, borderBottomRightRadius: 24 },
  headerTitle: { fontSize: 22, fontWeight: '800', color: Colors.white, marginBottom: 4 },
  headerSub: { fontSize: 13, color: 'rgba(255,255,255,0.75)', marginBottom: 16 },
  searchWrap: { flexDirection: 'row', alignItems: 'center', backgroundColor: Colors.white, borderRadius: 14, overflow: 'hidden' },
  input: { flex: 1, paddingHorizontal: 10, paddingVertical: 12, fontSize: 14, color: Colors.text },
  quick: { padding: 20 },
  quickTitle: { fontSize: 14, fontWeight: '700', color: Colors.text, marginBottom: 12 },
  quickWrap: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  quickChip: { backgroundColor: Colors.white, borderRadius: 20, paddingHorizontal: 14, paddingVertical: 8, borderWidth: 1, borderColor: Colors.border, elevation: 1 },
  quickText: { fontSize: 13, color: Colors.text, fontWeight: '500' },
  notFoundTitle: { fontSize: 16, fontWeight: '700', color: Colors.text },
  notFoundSub: { fontSize: 13, color: Colors.textLight },
  list: { padding: 16, paddingBottom: 30 },
  resultCount: { fontSize: 13, color: Colors.textLight, fontWeight: '600', marginBottom: 12 },
  card: { flexDirection: 'row', backgroundColor: Colors.white, borderRadius: 16, marginBottom: 10, overflow: 'hidden', elevation: 2, alignItems: 'center' },
  thumb: { width: 84, height: 84 },
  info: { flex: 1, padding: 12, gap: 6 },
  name: { fontSize: 14, fontWeight: '700', color: Colors.text },
  tagRow: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  tag: { backgroundColor: Colors.primaryBg, borderRadius: 20, paddingHorizontal: 8, paddingVertical: 3 },
  tagText: { fontSize: 11, color: Colors.primary, fontWeight: '600' },
});