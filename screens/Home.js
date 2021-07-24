import React, { useEffect } from "react";
import { View, Text, AppState } from "react-native";

import NetInfo from "@react-native-community/netinfo";

import * as Localization from "expo-localization";
import i18n from "i18n-js";

i18n.locale = Localization.locale;

i18n.translations = {
  en: { home: "HomeScreen", nombre: "Francisco" },
  es: { home: "Pantalla de inicio", nombre: "Francisco Peralta" },
};

i18n.fallbacks = true;

const Home = () => {
  useEffect(() => {
    const net = async () => {
      try {
        const info = await NetInfo.fetch();
        console.log(info);
      } catch (error) {
        console.log(error);
      }
    };
    net();

    console.log("Idioma", Localization.locale);

    console.log("Current", AppState.currentState);
    AppState.addEventListener("change", (nextState) => console.log(nextState));
    return AppState.removeEventListener("change", (nextState) =>
      console.log(nextState)
    );
  }, []);

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text style={{ fontSize: 30 }}>{i18n.t("home")}</Text>
      <Text style={{ fontSize: 30 }}>{i18n.t("nombre")}</Text>
    </View>
  );
};

export default Home;
