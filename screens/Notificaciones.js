import React, { useEffect, useState, useRef } from "react";
import {
  View,
  Text,
  ActivityIndicator,
  TouchableOpacity,
  Button,
} from "react-native";
import Constants from "expo-constants";
import * as Permissions from "expo-permissions";
import * as Notifications from "expo-notifications";

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});

const Notificaciones = () => {
  const notificationsListener = useRef();
  const responseListener = useRef();

  const registrarNotificacion = async () => {
    console.log(Constants.isDevice);
    let token = "";
    if (Constants.isDevice) {
      const { status: existingStatus } = await Permissions.getAsync(
        Permissions.NOTIFICATIONS
      );
      let finalStatus = existingStatus;
      if (finalStatus !== "granted") {
        const { status } = await Permissions.askAsync(
          Permissions.NOTIFICATIONS
        );
        finalStatus = status;
      }
      if (finalStatus === "granted") {
        token = (await Notifications.getExpoPushTokenAsync()).data;
        console.log(token);
        return token;
      }
    } else {
      return;
    }
  };

  useEffect(() => {
    registrarNotificacion().then((token) => console.log(token));

    notificationsListener.current =
      Notifications.addNotificationReceivedListener((noti) =>
        console.log("noti", noti)
      );

    responseListener.current =
      Notifications.addNotificationResponseReceivedListener((response) =>
        console.log("resp", response)
      );

    return () => {
      Notifications.removeNotificationSubscription(notificationsListener);
      Notifications.removeNotificationSubscription(responseListener);
    };
  }, []);

  const agendarNotificacion = async () => {
    await Notifications.scheduleNotificationAsync({
      content: {
        title: "Titulo Notificacion 2",
        body: "Curso React Native 2021",
        data: { data: "data" },
      },
      trigger: { seconds: 2 },
    });
  };

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>Notificaciones</Text>
      <Button
        title="Agendar Notificacion"
        onPress={() => agendarNotificacion()}
      />
    </View>
  );
};

export default Notificaciones;
