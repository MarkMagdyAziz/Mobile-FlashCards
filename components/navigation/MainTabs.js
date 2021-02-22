import React from "react";
import { StyleSheet, Platform } from "react-native";
import AddDeck from "./../AddDeck";
import DeckList from "./../DeckList";
import { darkGray, white, steelblue } from "../../utils/colors";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons, FontAwesome } from "@expo/vector-icons";

const Tab = createBottomTabNavigator();
function MainTabs() {
  return (
    <Tab.Navigator
      screenOptions={{ bounces: true }}
      initialRouteName="DeckList"
      tabBarOptions={{
        activeTintColor: steelblue,
        style: {
          height: 60,
          backgroundColor: white,
          shadowColor: "rgba(0,0,0, 0.24)",
          shadowOffset: {
            width: 0,
            height: 3,
          },
          shadowRadius: 6,
          shadowOpacity: 1,
          borderTopWidth: 1,
          borderTopColor: darkGray,
        },
        labelStyle: {
          fontSize: 12,
          fontWeight: "bold",
        },
        tabStyle: {
          marginTop: 3,
          marginBottom: 2,
        },
        showIcon: true,
      }}
    >
      <Tab.Screen
        name="Decks"
        component={DeckList}
        options={{
          tabBarIcon: () => (
            <Ionicons
              name={Platform.OS === "ios" ? "ios-bookmarks" : "md-bookmarks"}
              color={darkGray}
              size={30}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Add Deck"
        component={AddDeck}
        options={{
          tabBarIcon: () => (
            <FontAwesome name="plus-square" color={darkGray} size={30} />
          ),
        }}
      />

      {/* <Tab.Screen name="DeckDetails" component={MainStackNavigator} /> */}
    </Tab.Navigator>
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

export default MainTabs;
