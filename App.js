import { StatusBar } from "expo-status-bar";
import * as React from "react";
import { StyleSheet, View, useWindowDimensions } from "react-native";
import Constants from "expo-constants";
import MainStackNavigator from "./components/navigation/MainStackNavigator";
import rootReducer from "./reducer/rootReducer";
import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import logger from "redux-logger";
import { Provider } from "react-redux";
import { steelblue, gray } from "./utils/colors";
import { NavigationContainer } from "@react-navigation/native";
import { Provider as PaperProvider } from "react-native-paper";
import { setLocalNotification } from "./utils/helpers";

const store = createStore(rootReducer, applyMiddleware(thunk, logger));

function FlashCardsStatusBar() {
  return (
    <View style={styles.statusBar}>
      <StatusBar
        translucent
        backgroundColor={steelblue}
        barStyle="light-content"
      />
    </View>
  );
}
export default function App() {
  const windowWidth = useWindowDimensions().width;

  // React.useEffect(() => {
  //   // Update the document title using the browser API
  //   setLocalNotification();
  // });
  return (
    <Provider store={store}>
      <PaperProvider>
        <View style={[styles.container, { width: windowWidth }]}>
          <FlashCardsStatusBar />
          <NavigationContainer>
            <MainStackNavigator />
          </NavigationContainer>
        </View>
      </PaperProvider>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  statusBar: {
    backgroundColor: gray,
    height: Constants.statusBarHeight,
  },
});
