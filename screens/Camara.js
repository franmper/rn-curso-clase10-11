import React, { useEffect, useState, useRef } from "react";
import { View, Text, ActivityIndicator, TouchableOpacity } from "react-native";
import { Camera } from "expo-camera";

const Camara = () => {
  const camaraRef = useRef();

  const [type, setType] = useState(Camera.Constants.Type.back);
  const [permisos, setPermisos] = useState(false);

  useEffect(() => {
    preguntarPermisos();
  }, []);

  const preguntarPermisos = async () => {
    const { status } = await Camera.requestPermissionsAsync();
    setPermisos(status === "granted");
  };

  if (permisos === false) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text>Se necesitan permisos para utilizar la camara</Text>
      </View>
    );
  }

  return (
    <View style={{ flex: 1 }}>
      <Camera
        style={{ flex: 1 }}
        type={type}
        ref={camaraRef}
        onCameraReady={() => (
          <View
            style={{
              flex: 1,
              backgroundColor: "white",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <ActivityIndicator size="large" color="black" />
          </View>
        )}
      >
        <View
          style={{
            flex: 1,
            justifyContent: "flex-end",
            alignItems: "center",
            flexDirection: "row",
            position: "absolute",
            bottom: 50,
          }}
        >
          <TouchableOpacity
            style={{ width: "50%", height: 70, backgroundColor: "red" }}
            onPress={() =>
              type === Camera.Constants.Type.back
                ? setType(Camera.Constants.Type.front)
                : setType(Camera.Constants.Type.back)
            }
          >
            <Text>Cambiar Camara</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{ width: "50%", height: 70, backgroundColor: "green" }}
            onPress={() =>
              camaraRef.current
                .takePictureAsync()
                .then((res) => console.log(res))
                .catch((e) => console.log(e))
            }
          >
            <Text>Foto</Text>
          </TouchableOpacity>
        </View>
      </Camera>
    </View>
  );
};

export default Camara;
