import React from 'react';
import {
  View, Text, Image, ScrollView, StyleSheet,
  TouchableOpacity, Linking,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Colors from '../constants/Colors';

const PROFILE = {
  nama:      'Muhammad Ragil Hardika',
  nim:       '2410501103',
  kelas:     'SI - A Sistem Infromasi',
  mapel:     'Pemrograman Mobile Lanjut',
  initials:  'MRH',
};

const APP_INFO = [
  { icon: 'phone-portrait-outline', label: 'Nama Aplikasi',   value: 'Resep Kita'},
  { icon: 'flag-outline',           label: 'Tema',            value: 'Katalog Masakan Indonesia' },
  { icon: 'cloud-outline',          label: 'Sumber Data',     value: 'TheMealDB Free API' },
  { icon: 'git-branch-outline',     label: 'Versi',           value: '1.0.0' },
];

const TECH = [
  { icon: 'logo-react',        label: 'React Native + Expo' },
  { icon: 'navigate-outline',  label: 'React Navigation (Stack + Tab)' },
  { icon: 'sync-outline',      label: 'Context API — State Favorit' },
  { icon: 'globe-outline',     label: 'Fetch API — TheMealDB' },
];

export default function AboutScreen() {
  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}
      showsVerticalScrollIndicator={false}>

      <View style={styles.hero}>
        <View style={styles.avatarCircle}>
          <Text style={styles.avatarInit}>{PROFILE.initials}</Text>
        </View>
        <Text style={styles.heroName}>{PROFILE.nama}</Text>
        <Text style={styles.heroNim}>{PROFILE.nim} · {PROFILE.kelas}</Text>
        <View style={styles.heroBadge}>
          <Text style={styles.heroBadgeText}>📱 {PROFILE.mapel}</Text>
        </View>
      </View>

      <Text style={styles.sectionTitle}>Tentang Aplikasi</Text>
      <View style={styles.card}>
        {APP_INFO.map((item, i) => (
          <View key={item.label}
            style={[styles.infoRow, i < APP_INFO.length - 1 && styles.infoRowBorder]}>
            <View style={styles.infoIcon}>
              <Ionicons name={item.icon} size={16} color={Colors.primary} />
            </View>
            <Text style={styles.infoLabel}>{item.label}</Text>
            <Text style={styles.infoValue}>{item.value}</Text>
          </View>
        ))}
      </View>

      <Text style={styles.sectionTitle}>Stack Teknologi</Text>
      <View style={styles.card}>
        {TECH.map((t, i) => (
          <View key={t.label}
            style={[styles.techRow, i < TECH.length - 1 && styles.infoRowBorder]}>
            <View style={[styles.infoIcon, { backgroundColor: Colors.primaryDark }]}>
              <Ionicons name={t.icon} size={15} color={Colors.white} />
            </View>
            <Text style={styles.techLabel}>{t.label}</Text>
            <Ionicons name="checkmark-circle" size={16} color={Colors.green} />
          </View>
        ))}
      </View>

      <View style={styles.footer}>
        <Text style={styles.footerText}>Dibuat dengan ❤️ untuk Indonesia 🇮🇩</Text>
        <Text style={styles.footerSub}>Data resep dari themealdb.com</Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container:  { flex: 1, backgroundColor: Colors.background },
  content:    { paddingBottom: 40 },

  hero: {
    backgroundColor:        Colors.primary,
    alignItems:             'center',
    paddingTop:             40,
    paddingBottom:          36,
    paddingHorizontal:      20,
    borderBottomLeftRadius:  30,
    borderBottomRightRadius: 30,
    marginBottom:           24,
  },
  avatarCircle: {
    width: 96, height: 96, borderRadius: 48,
    backgroundColor: 'rgba(255,255,255,0.22)',
    borderWidth: 3, borderColor: 'rgba(255,255,255,0.5)',
    justifyContent: 'center', alignItems: 'center',
    marginBottom: 16,
    overflow: 'hidden',
  },
  avatar:     { width: 96, height: 96, borderRadius: 48 },
  avatarInit: { fontSize: 34, fontWeight: '800', color: Colors.white },
  heroName:   { fontSize: 20, fontWeight: '800', color: Colors.white, marginBottom: 4 },
  heroNim:    { fontSize: 13, color: 'rgba(255,255,255,0.78)', marginBottom: 12 },
  heroBadge: {
    backgroundColor: 'rgba(255,255,255,0.2)',
    borderRadius:    20,
    paddingHorizontal: 16, paddingVertical: 6,
  },
  heroBadgeText: { fontSize: 12, color: Colors.white, fontWeight: '600' },

  sectionTitle: {
    fontSize: 15, fontWeight: '700', color: Colors.text,
    marginHorizontal: 16, marginBottom: 10,
  },

  card: {
    backgroundColor:  Colors.white,
    marginHorizontal: 16,
    marginBottom:     20,
    borderRadius:     16,
    overflow:         'hidden',
    elevation:        2,
    shadowColor:      '#0000001A',
    shadowOffset:     { width: 0, height: 2 },
    shadowOpacity:    1,
    shadowRadius:     6,
  },
  infoRow: {
    flexDirection: 'row', alignItems: 'center',
    paddingHorizontal: 16, paddingVertical: 14, gap: 12,
  },
  infoRowBorder: { borderBottomWidth: 1, borderBottomColor: Colors.border },
  infoIcon: {
    width: 30, height: 30, borderRadius: 8,
    backgroundColor: Colors.primaryBg,
    justifyContent: 'center', alignItems: 'center',
  },
  infoLabel: { flex: 1, fontSize: 13, color: Colors.textLight, fontWeight: '500' },
  infoValue: { fontSize: 13, color: Colors.text, fontWeight: '700', maxWidth: 160, textAlign: 'right' },

  techRow: {
    flexDirection: 'row', alignItems: 'center',
    paddingHorizontal: 16, paddingVertical: 13, gap: 12,
  },
  techLabel: { flex: 1, fontSize: 13, color: Colors.text, fontWeight: '500' },

  footer: {
    alignItems: 'center', paddingTop: 8, gap: 4,
  },
  footerText: { fontSize: 14, color: Colors.textLight, fontWeight: '500' },
  footerSub:  { fontSize: 11, color: Colors.border },
});