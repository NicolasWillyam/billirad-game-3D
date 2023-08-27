/* Lights for Expo React Native */
import React, { useMemo } from "react";
import { LIGHT_PARAM } from "../constants";

const getCoordinateLights = (h, dr, dc, row, col) => {
  const pointLight = [];
  for (let i = 0; i < row; i++) {
    for (let j = 0; j < col; j++) {
      pointLight.push([
        ((-(row - 1) + 2 * i) * dr) / 2,
        ((-(col - 1) + 2 * j) * dc) / 2,
        h,
      ]);
    }
  }
  return pointLight;
};
const Lights = () => {
  const downLight = LIGHT_PARAM;
  const pointLight = useMemo(
    () =>
      getCoordinateLights(
        downLight.LIGHT_HEIGHT,
        downLight.ROW_DISTANCE,
        downLight.COL_DISTANCE,
        downLight.LIGHT_COL,
        downLight.LIGHT_ROW
      ),
    [downLight]
  );
  return (
    <>
      <ambientLight color={0xffffff} intensity={0} position={[1, 1, 1]} />
      {pointLight.map((pos, idx) => (
        <pointLight
          key={idx}
          position={pos}
          color={0xffffff}
          intensity={0.25}
          distance={100}
          castShadow
        />
      ))}
    </>
  );
};

export default Lights;
