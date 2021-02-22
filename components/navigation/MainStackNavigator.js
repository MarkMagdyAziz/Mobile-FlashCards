import React from "react";
import { StyleSheet } from "react-native";
import AddCard from "./../AddCard";
import DeckDetails from "./../DeckDetails";
import _Quiz from "./../_Quiz";
import { babyblue, darkblue } from "../../utils/colors";
import { createStackNavigator } from "@react-navigation/stack";

import MainTabs from "./MainTabs";

const Stack = createStackNavigator();
function MainStackNavigator() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerTintColor: darkblue,
        headerStyle: {
          backgroundColor: babyblue,
        },
      }}
    >
      <Stack.Screen
        name="Falashcard tabs"
        component={MainTabs}
        options={{
          title: "Deck Details",
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="DeckDetails"
        component={DeckDetails}
        options={{
          title: "Deck Details",
        }}
      />
      <Stack.Screen
        name="AddCard"
        component={AddCard}
        options={{
          headerTitleStyle: {
            justifyContent: "center",
            textAlign: "center",
          },
          title: "Add Card",
        }}
      />
      <Stack.Screen name="_Quiz" component={_Quiz} />
    </Stack.Navigator>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});

export default MainStackNavigator;
