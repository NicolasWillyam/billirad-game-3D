import React, { useState } from "react";
import { Canvas } from "@react-three/fiber";
// import Controls from "./Component/Controls";
import Scene from "./view/Scene";
import Lights from "./components/Lights";
import PoolTable from "./components/PoolTable";
import PoolBall from "./components/PoolBall";
// import { targetCoordinate } from "./constants";
import Adjust from "./components/Adjust";
import { Text, View, StyleSheet } from "react-native";
import Animated, {
  useAnimatedGestureHandler,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";
import {
  PanGestureHandler,
  TapGestureHandler,
  GestureHandlerRootView,
} from "react-native-gesture-handler";

function App() {
  const [eyeDistance, setEyeDistance] = useState(0.5);
  const translationX = useSharedValue(60);

  // console.log("eyeDistance ==>", eyeDistance);
  const [eyeHeight, setEyeHeight] = useState(0.5);
  const [rotateAngle, setRotateAngle] = useState(0);
  // const [checkValue, setCheckValue] = useState();
  const changeEyeDistanceValue = (e) => {
    setEyeDistance(e);
    // console.log("eyeDistance ==>", eyeDistance2);
  };
  const changeEyeHeightValue = (e) => setEyeHeight(e);
  const changeRotateAngleValue = (e) => setRotateAngle(e);
  const handleCheck = (result) => {
    setCheckValue(result);
  };

  const panGestureEventEyeRotate = useAnimatedGestureHandler({
    onStart: (event, context) => {
      context.translationX = translationX.value;
    },
    onActive: (event, context) => {
      translationX.value = event.translationX + context.translationX;
      const ans = translationX;
      console.log(ans);
    },

    onEnd: (event) => {
      // translationX.value = 0;
    },
  });

  const animatedStyleEyeRotate = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateX: translationX.value,
        },
      ],
    };
  });

  return (
    <>
      <Canvas className="webGL">
        <Lights />
        {/* <PoolTable /> */}

        <Scene
          position={[0, 0, 0]}
          target={"topLeft"}
          distance={4}
          cutAngle={30}
          side="right"
          showAimPoint={true}
          eyeHeight={eyeHeight} // min = 1.8, max = 7
          eyeDistance={eyeDistance} // min= 0, max = 1
          rotateAngle={rotateAngle}
          handleCheck={handleCheck}
        />
        {/* <Controls target={target} distance={2} cutAngle={15} /> */}
      </Canvas>

      <View style={styles.container}>
        <Adjust
          label="Eye Height"
          min={0}
          max={1.5}
          changeValue={changeEyeHeightValue}
          value={eyeHeight}
        />
        <Adjust
          label="Eye Distance"
          min={0}
          max={1.5}
          changeValue={changeEyeDistanceValue}
          value={eyeDistance}
        />

        <Adjust
          label="Rotate"
          min={-3}
          max={3}
          changeValue={changeRotateAngleValue}
          value={rotateAngle}
        />
        <GestureHandlerRootView className="flex-1">
          <PanGestureHandler onGestureEvent={panGestureEventEyeRotate}>
            <Animated.View
              className="h-20 w-20 mt-6 bg-white opacity-50 absolute rounded-full"
              style={animatedStyleEyeRotate}
            />
          </PanGestureHandler>
        </GestureHandlerRootView>
      </View>

      {/* <button
        className="button"
        style={{
          backgroundColor: checkValue ? "green" : "red",
          cursor: "pointer",
          borderRadius: 5,
          width: 60,
          height: 30,
          top: 2,
          left: "50%",
          position: "absolute",
        }}
      >
        CHECK
      </button>

      
      /> */}
    </>
  );
}

export default App;

const styles = StyleSheet.create({
  container: {
    color: "#999",
    fontSize: 12,
    position: "absolute",

    color: "white",
    left: 10,
    border: 1,
    borderRadius: 8,
    padding: 0,
    marginTop: 4,
  },
});

// import { useRef, useState } from "react";
// import { StyleSheet, View } from "react-native";
// import { Canvas, useFrame } from "@react-three/fiber";

// export default function App() {
//   return (
//     <View style={styles.container}>
{
  /* <Canvas>
  <ambientLight />
  <pointLight position={[10, 10, 10]} />
  <mesh>
    <sphereGeometry />
    <meshStandardMaterial color={"orange"} />
  </mesh>
</Canvas>; */
}
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "black",
//   },
// });
