import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { NavigationContainer }         from '@react-navigation/native';
import { createBottomTabNavigator }    from '@react-navigation/bottom-tabs';
import { createStackNavigator }        from '@react-navigation/stack';
import { Ionicons }                    from '@expo/vector-icons';

import HomeScreen      from './screens/HomeScreen';
import BrowseScreen    from './screens/BrowseScreen';
import DetailScreen    from './screens/DetailScreen';
import FavoritesScreen from './screens/FavoritesScreen';
import SearchScreen    from './screens/SearchScreen';
import AboutScreen     from './screens/AboutScreen';

import { FavoritesProvider } from './context/FavoritesContext';
import Colors from './constants/Colors';

const Tab        = createBottomTabNavigator();
const HomeStack  = createStackNavigator();
const FavStack   = createStackNavigator();
const SearchStack = createStackNavigator();

const HEADER_OPTS = {
  headerStyle:      { backgroundColor: Colors.primary, elevation: 0, shadowOpacity: 0 },
  headerTintColor:  Colors.white,
  headerTitleStyle: { fontWeight: '700', fontSize: 17, letterSpacing: 0.3 },
  headerBackTitleVisible: false,
};

function HomeStackNav() {
  return (
    <HomeStack.Navigator screenOptions={HEADER_OPTS}>
      <HomeStack.Screen name="HomeMain"  component={HomeScreen}
        options={{ headerShown: false }} />
      <HomeStack.Screen name="Browse"    component={BrowseScreen}
        options={({ route }) => ({ title: route.params?.categoryName || 'Resep' })} />
      <HomeStack.Screen name="Detail"    component={DetailScreen}
        options={{ title: 'Detail Resep' }} />
    </HomeStack.Navigator>
  );
}

function FavStackNav() {
  return (
    <FavStack.Navigator screenOptions={HEADER_OPTS}>
      <FavStack.Screen name="FavMain" component={FavoritesScreen}
        options={{ title: 'Favorit Saya' }} />
      <FavStack.Screen name="Detail"  component={DetailScreen}
        options={{ title: 'Detail Resep' }} />
    </FavStack.Navigator>
  );
}

function SearchStackNav() {
  return (
    <SearchStack.Navigator screenOptions={HEADER_OPTS}>
      <SearchStack.Screen name="SearchMain" component={SearchScreen}
        options={{ headerShown: false }} />
      <SearchStack.Screen name="Detail"     component={DetailScreen}
        options={{ title: 'Detail Resep' }} />
    </SearchStack.Navigator>
  );
}

function TabIcon({ name, focused, color, size }) {
  return <Ionicons name={name} size={size} color={color} />;
}

export default function App() {
  return (
    <FavoritesProvider>
      <NavigationContainer>
        <Tab.Navigator
          screenOptions={({ route }) => ({
            headerShown:          false,
            tabBarActiveTintColor:   Colors.primary,
            tabBarInactiveTintColor: '#BBBBBB',
            tabBarStyle: {
              backgroundColor:  Colors.white,
              borderTopColor:   Colors.border,
              borderTopWidth:   1,
              height:           62,
              paddingBottom:    8,
              paddingTop:       6,
            },
            tabBarLabelStyle: { fontSize: 10, fontWeight: '600', letterSpacing: 0.2 },
          })}
        >
          <Tab.Screen name="Home"     component={HomeStackNav}
            options={{ tabBarLabel: 'Beranda',
              tabBarIcon: ({ focused, color, size }) =>
                <TabIcon name={focused ? 'home' : 'home-outline'} focused={focused} color={color} size={size} /> }}
          />
          <Tab.Screen name="Favorites" component={FavStackNav}
            options={{ tabBarLabel: 'Favorit',
              tabBarIcon: ({ focused, color, size }) =>
                <TabIcon name={focused ? 'heart' : 'heart-outline'} focused={focused} color={color} size={size} /> }}
          />
          <Tab.Screen name="Search"   component={SearchStackNav}
            options={{ tabBarLabel: 'Cari',
              tabBarIcon: ({ focused, color, size }) =>
                <TabIcon name={focused ? 'search' : 'search-outline'} focused={focused} color={color} size={size} /> }}
          />
          <Tab.Screen name="About"    component={AboutScreen}
            options={{
              tabBarLabel: 'Profil',
              headerShown: true,
              headerTitle: 'Profil',
              ...HEADER_OPTS,
              tabBarIcon: ({ focused, color, size }) =>
                <TabIcon name={focused ? 'person-circle' : 'person-circle-outline'} focused={focused} color={color} size={size} /> }}
          />
        </Tab.Navigator>
      </NavigationContainer>
    </FavoritesProvider>
  );
}