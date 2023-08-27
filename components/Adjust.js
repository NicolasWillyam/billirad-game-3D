import { StyleSheet, Text, View, TextInput } from "react-native";
import React, { useState } from "react";
import InputRange from "react-input-range";
import Slider from "react-native-slider";
import Animated, {
  useAnimatedGestureHandler,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";
const Adjust = (props) => {
  //   const [value, setValue] = useState(props.value);
  //   props.changValue(value)

  const eyeDistance = useSharedValue(0.5);

  return (
    <View style={styles.adjust}>
      <Text style={styles.label}>
        {props.label} : {props.value.toFixed(3)}
      </Text>
      {/* <Slider
        value={props.value}
        onValueChange={(newValue) => setValue(newValue)}
        maximumValue={props.max}
        minimumValue={props.min}
        step={0.01}
      /> */}
      <Slider
        {...props}
        value={props.value}
        onValueChange={props.changeValue}
        maximumValue={props.max}
        minimumValue={props.min}
        step={0.001}
      />

      {/* <View style={styles.slider}>
        
        <TextInput
          style={styles.input}
          type="range"
          {...props}
          onChange={props.changeValue}
          min={props.min}
          max={props.max}
          step={0.001}
          value={props.value}
        ></TextInput>
        <p>{props.value}</p>
      </View> */}
    </View>
  );
};

export default Adjust;

const styles = StyleSheet.create({
  adjust: {
    color: "white",
    width: 180,
    height: 60,
    fontSize: 12,
    marginTop: 10,
    borderWidth: 1,
    borderColor: "white",
    color: "white",
    left: 10,
    top: 10,
    border: 1,
    borderRadius: 8,
    padding: 4,
  },
  label: {
    color: "white",
  },
});
