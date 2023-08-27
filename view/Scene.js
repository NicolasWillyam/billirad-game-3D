import React, { useMemo } from "react";
//import PoolBall from "../Component/PoolBall";
import PoolTable from "../components/PoolTable";
import zero from "../assets/textures/0.png";
import nine from "../assets/textures/9.png";
import ten from "../assets/textures/10.png";
import { useThree } from "@react-three/fiber";
import PoolBall from "../components/PoolBall";
import Lines from "../components/Lines";
import { getLimitPosition, getOBAndCB } from "../utils/function";
import {
  BALL_DIAMETER,
  targetCoordinate,
  targetLimitPoint,
} from "../constants";
import {
  lineAngle,
  lineLength,
  lineMidpoint,
  pointRotate,
  pointTranslate,
} from "geometric";

function Scene(props) {
  const { camera, gl } = useThree();
  // const cueBall = [-1, -4, 0];
  const {
    target,
    distance,
    cutAngle,
    side,
    showAimPoint,
    eyeHeight,
    eyeDistance,
    rotateAngle,
  } = props;

  const [objBall, aimPoint, aiming1, aiming2] = useMemo(
    () => getOBAndCB(targetCoordinate[target], distance, cutAngle, eyeDistance),
    [target, distance, cutAngle, eyeDistance]
  );

  const [aimingLine, eyePosition, cueBall, twoBallAngle, correctEyePosition] =
    side === "left" && aiming1.aimingLine
      ? [
          aiming1.aimingLine,
          aiming1.eyePosition,
          aiming1.cueBall,
          aiming1.twoBallAngle,
          aiming1.correctEyePosition,
        ]
      : side === "right" && aiming2.aimingLine
      ? [
          aiming2.aimingLine,
          aiming2.eyePosition,
          aiming2.cueBall,
          aiming2.twoBallAngle,
          aiming2.correctEyePosition,
        ]
      : [0, 0, 7];

  const [minTrueEyePosition, minAimPoint] = useMemo(
    () =>
      getLimitPosition(
        targetLimitPoint[target][1],
        objBall,
        cueBall,
        eyeDistance
      ),
    [objBall, cueBall, eyeDistance, target]
  );

  // // Comment by Hoang
  const [maxTrueEyePosition, maxAimPoint] = useMemo(
    () =>
      getLimitPosition(
        targetLimitPoint[target][2],
        objBall,
        cueBall,
        eyeDistance
      ),
    [target, objBall, cueBall, eyeDistance]
  );
  const eyePositionAndCueBallLength = lineLength([cueBall, eyePosition]);

  const minTrueCameraPosition = pointTranslate(
    cueBall,
    lineAngle([cueBall.slice(0, 2), minTrueEyePosition]),
    eyePositionAndCueBallLength
  );
  const maxTrueCameraPosition = pointTranslate(
    cueBall,
    lineAngle([cueBall.slice(0, 2), maxTrueEyePosition]),
    eyePositionAndCueBallLength
  );

  // const minLimitEyePosition = pointRotate(
  //   eyePosition,
  //   -twoBallAngle,
  //   cueBall.slice(0, 2)
  //
  // const maxLimitEyePosition = pointRotate(
  //   eyePosition,
  //   twoBallAngle,
  //   cueBall.slice(0, 2)
  // );

  const rotateCamera = [
    ...pointRotate(
      eyePosition,
      rotateAngle * twoBallAngle,
      cueBall.slice(0, 2)
    ),
    0.36 + eyeHeight * 5.2,
  ];

  gl.setClearColor(0x0000, 1);

  camera.fov = 50;
  camera.aspect = 2.16;
  camera.near = 0.1;
  camera.far = 1000;
  camera.up.set(0, 0, 1);

  // console.log("Check eye ===>", eyePosition);

  let zoom = 10;
  camera.position.set(
    eyePosition[0] / zoom,
    eyePosition[1] / zoom,
    (1.8 + eyeHeight * 5.2) / zoom
  );
  [camera.position.x, camera.position.y, camera.position.z] = rotateCamera;

  camera.updateProjectionMatrix();

  const cueLine = [camera.position.x, camera.position.y, BALL_DIAMETER / 2];

  let result;
  if (minTrueCameraPosition[0] === maxTrueCameraPosition[0]) {
    if (minTrueCameraPosition[1] < maxTrueCameraPosition[1])
      result =
        cueLine[1] > minTrueCameraPosition[1] &&
        cueLine[1] < maxTrueCameraPosition[1];
    if (minTrueCameraPosition[1] > maxTrueCameraPosition[1])
      result =
        cueLine[1] < minTrueCameraPosition[1] &&
        cueLine[1] > maxTrueCameraPosition[1];
  }
  if (minTrueCameraPosition[0] < maxTrueCameraPosition[0])
    result =
      cueLine[0] > minTrueCameraPosition[0] &&
      cueLine[0] < maxTrueCameraPosition[0];
  if (minTrueCameraPosition[0] > maxTrueCameraPosition[0])
    result =
      cueLine[0] < minTrueCameraPosition[0] &&
      cueLine[0] > maxTrueCameraPosition[0];

  // // props.handleCheck(result);
  // // console.log(result);
  // // console.log("cue line:", cueLine);
  const cueLineMidPoint = lineMidpoint([cueLine, cueBall]);
  camera.lookAt(...cueBall);

  return (
    <React.Suspense>
      <PoolTable />

      <PoolBall position={objBall} textureURL={ten} opacity={1} />

      <Lines start={aimingLine[0]} end={aimingLine[1]} />
      <PoolBall position={cueBall} textureURL={zero} opacity={1} />
      {showAimPoint && (
        <PoolBall position={aimPoint} textureURL={zero} opacity={0.5} />
      )}

      {/* <Lines start={objBall} end={[...eyePosition, BALL_DIAMETER / 2]} />

      <Lines start={objBall} end={[...eyePosition, BALL_DIAMETER / 2]} /> */}

      {/* {showAimPoint && (
        <PoolBall
          position={[...minAimPoint, BALL_DIAMETER / 2]}
          textureURL={zero}
          opacity={0.4}
        />
      )}
      {showAimPoint && (
        <PoolBall
          position={[...maxAimPoint, BALL_DIAMETER / 2]}
          textureURL={zero}
          opacity={0.4}
        />
      )} */}

      {/* <Lines
        start={cueBall}
        end={[...minLimitEyePosition, BALL_DIAMETER / 2]}
      />
      <Lines
        start={cueBall}
        end={[...maxLimitEyePosition, BALL_DIAMETER / 2]}
      /> */}
      {/* <Lines
        start={cueBall}
        end={[...minTrueCameraPosition, BALL_DIAMETER / 2]}
      />
      <Lines
        start={cueBall}
        end={[...maxTrueCameraPosition, BALL_DIAMETER / 2]}
      /> */}
      {/* <Lines
        start={[...minAimPoint, BALL_DIAMETER / 2]}
        end={[...minTrueEyePosition, BALL_DIAMETER / 2]}
      />
      <Lines
        start={[...maxAimPoint, BALL_DIAMETER / 2]}
        end={[...maxTrueEyePosition, BALL_DIAMETER / 2]}
      /> */}
    </React.Suspense>
  );
}

export default Scene;
