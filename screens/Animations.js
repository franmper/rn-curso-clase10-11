import React, { useRef } from "react";
import { View, Text, Animated, PanResponder, Easing } from "react-native";

const Animations = () => {
  const pan = useRef(new Animated.ValueXY()).current;
  const widthAnimated = useRef(new Animated.Value(200)).current;
  const heightAnimated = widthAnimated.interpolate({
    inputRange: [180, 220],
    outputRange: [180, 220],
  });
  const borderAnimated = widthAnimated.interpolate({
    inputRange: [180, 220],
    outputRange: [3, 7],
  });
  const fontAnimated = widthAnimated.interpolate({
    inputRange: [180, 220],
    outputRange: [20, 30],
  });
  const panResponder = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponderCapture: () => true,
      onPanResponderGrant: () => {
        Animated.timing(widthAnimated, {
          toValue: 220,
          duration: 400,
          easing: Easing.inOut(Easing.ease),
        }).start();
        pan.setOffset({
          x: pan.x._value,
          y: pan.y._value,
        });
        console.log("onPanResponderGrant", pan);
      },
      onPanResponderMove: Animated.event([null, { dx: pan.x, dy: pan.y }], {
        useNativeDriver: false,
      }),
      onPanResponderRelease: (e, gestureState) => {
        pan.flattenOffset();
        Animated.timing(widthAnimated, {
          toValue: 180,
          duration: 200,
          easing: Easing.inOut(Easing.ease),
        }).start(() => {
          Animated.timing(widthAnimated, {
            toValue: 200,
            duration: 200,
            easing: Easing.inOut(Easing.ease),
          }).start();
        });
        console.log("onPanResponderRelease", gestureState);
      },
    })
  ).current;

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#FED9B7",
      }}
    >
      <Animated.View
        {...panResponder.panHandlers}
        style={{
          width: widthAnimated,
          height: heightAnimated,
          backgroundColor: "#0081A7",
          borderRadius: 200,
          borderWidth: borderAnimated,
          borderColor: "#00AFB9",
          alignItems: "center",
          justifyContent: "center",

          transform: [{ translateX: pan.x }, { translateY: pan.y }],
        }}
      >
        <Animated.Text style={{ fontSize: fontAnimated, color: "#FED9B7" }}>
          2021
        </Animated.Text>
      </Animated.View>
    </View>
  );
};

export default Animations;
