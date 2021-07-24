import React, { useEffect, useState } from "react";
import { View, Text } from "react-native";

import MapView, { Marker } from "react-native-maps";
import * as Location from "expo-location";
import * as Permissions from "expo-permissions";

const Map = () => {
  const [position, setPosition] = useState({});

  useEffect(() => {
    const getPosition = async () => {
      const { status } = await Location.requestBackgroundPermissionsAsync();
      console.log(status);

      if (status !== "granted") {
        Permissions.askAsync("location");
        console.log(status);
      }

      const ubicacion = await Location.getCurrentPositionAsync();

      setPosition(ubicacion);
    };
    getPosition();
  }, []);

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text style={{ fontSize: 30, marginBottom: 20 }}>Home</Text>
      <MapView
        style={{ width: "100%", height: "50%" }}
        region={{
          latitude: -31.3354233,
          longitude: -64.3368246,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
      >
        {position.coords && (
          <Marker
            coordinate={{
              latitude: position.coords.latitude,
              longitude: position.coords.longitude,
            }}
            title={"React native 2021"}
            description={"React Native 2021 descripcion"}
            image={require("../assets/favicon.png")}
          />
        )}
        <Marker
          coordinate={{
            latitude: -31.2580788,
            longitude: -64.4368246,
          }}
          title={"React native 2021"}
          description={"React Native 2021 descripcion"}
        />
      </MapView>
    </View>
  );
};

export default Map;
