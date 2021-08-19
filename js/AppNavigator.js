import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import * as Icon from '@expo/vector-icons';

import Overview from './screens/Overview';
import ReceptScreen from './screens/ReceptScreen';

const Stack = createStackNavigator();

function HomeStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: 'aliceblue' },
        
      }}
    >
      <Stack.Screen
        name="Overview"
        component={Overview}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="ReceptScreen"
        component={ReceptScreen}
        options={({ route }) => {
          const recipe = route.params?.recipe;
          return {
            headerBackTitle: null,
            headerTruncatedBackTitle: null,
            headerTitle: `${recipe.title}`,
          };
        }}
      />
    </Stack.Navigator>
  );
}

const Tab = createBottomTabNavigator();

export default () => (
  <NavigationContainer>
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let icon;

          if (route.name === "Home") {
            icon = focused ? "home" : "home-outline";
          } else if (route.name === "Favorites") {
            icon = "heart";
          }

          return (
            <Icon.MaterialCommunityIcons
              name={icon}
              size={size}
              color={color}
            />
          );
        },
        tabBarActiveTintColor: "darkorange",
        tabBarStyle: [
          {
            display: "flex",
          },
          null,
        ],
        style: { backgroundColor: "aliceblue" },
      })}
    >
      <Tab.Screen
        name="Home"
        component={HomeStack}
        options={{ title: "Rezepte" }}
      />
      <Tab.Screen
        name="Favorites"
        component={HomeStack}
        options={{ title: "Favoriten" }}
      />
    </Tab.Navigator>
  </NavigationContainer>
);
