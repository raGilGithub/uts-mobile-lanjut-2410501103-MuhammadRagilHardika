import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';

import HomeScreen from '../screens/HomeScreen';
import BrowseScreen from '../screens/BrowseScreen';
import DetailScreen from '../screens/DetailScreen';
import FavoritesScreen from '../screens/FavoritesScreen';
import SearchScreen from '../screens/SearchScreen';
import AboutScreen from '../screens/AboutScreen';

import { useFavorites } from '../context/FavoritesContext';
import { WARNA } from '../constants/Colors';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const HomeStack = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="Home" component={HomeScreen} />
    <Stack.Screen name="Browse" component={BrowseScreen} />
    <Stack.Screen name="Detail" component={DetailScreen} />
  </Stack.Navigator>
);

const SearchStack = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="SearchMain" component={SearchScreen} />
    <Stack.Screen name="Detail" component={DetailScreen} />
  </Stack.Navigator>
);

const FavoritesStack = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="FavoritesMain" component={FavoritesScreen} />
    <Stack.Screen name="Detail" component={DetailScreen} />
  </Stack.Navigator>
);

const TabNavigator = () => {
  const { daftarFavorit } = useFavorites();

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarActiveTintColor: WARNA.primer,
        tabBarInactiveTintColor: WARNA.abu400,
        tabBarStyle: {
          backgroundColor: WARNA.putih,
          borderTopWidth: 0.5,
          borderTopColor: WARNA.border,
          height: 60,
          paddingBottom: 8,
          paddingTop: 6,
          elevation: 8,
          shadowColor: '#000',
          shadowOffset: { width: 0, height: -2 },
          shadowOpacity: 0.06,
          shadowRadius: 8,
        },
        tabBarLabelStyle: {
          fontSize: 11,
          fontWeight: '600',
        },
        tabBarIcon: ({ focused, color, size }) => {
          let namaIkon;
          if (route.name === 'HomeTab') {
            namaIkon = focused ? 'home' : 'home-outline';
          } else if (route.name === 'FavoritesTab') {
            namaIkon = focused ? 'heart' : 'heart-outline';
          } else if (route.name === 'SearchTab') {
            namaIkon = focused ? 'search' : 'search-outline';
          } else if (route.name === 'AboutTab') {
            namaIkon = focused ? 'person' : 'person-outline';
          }
          return <Ionicons name={namaIkon} size={22} color={color} />;
        },
      })}
    >
      <Tab.Screen
        name="HomeTab"
        component={HomeStack}
        options={{
          tabBarLabel: 'Beranda',
        }}
      />
      <Tab.Screen
        name="FavoritesTab"
        component={FavoritesStack}
        options={{
          tabBarLabel: 'Favorit',
          tabBarBadge: daftarFavorit.length > 0 ? daftarFavorit.length : undefined,
          tabBarBadgeStyle: {
            backgroundColor: WARNA.primer,
            color: WARNA.putih,
            fontSize: 10,
          },
        }}
      />
      <Tab.Screen
        name="SearchTab"
        component={SearchStack}
        options={{ tabBarLabel: 'Cari' }}
      />
      <Tab.Screen
        name="AboutTab"
        component={AboutScreen}
        options={{ tabBarLabel: 'Tentang' }}
      />
    </Tab.Navigator>
  );
};

const AppNavigator = () => (
  <NavigationContainer>
    <TabNavigator />
  </NavigationContainer>
);

export default AppNavigator;