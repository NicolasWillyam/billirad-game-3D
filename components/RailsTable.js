import { useLoader } from "@react-three/fiber";
import React, { useMemo } from "react";
import Hardwood from "../assets/textures/tablefloor.jpg";
import Cloth from "../assets/textures/cloth.jpg";

import { TextureLoader, Vector2, MeshBasicMaterial } from "three";

import {
  TABLE_SIZE,
  FACING_ANGLE,
  topRailSideH,
  topRailTopW,
  getRailSideGeometry,
  getRailsTopGeometry,
  railSideCoordinate,
  railTopCoordinate,
  cushion1Coordinate,
  cushion2Coordinate,
  cushion3Coordinate,
} from "../constants";
import {
  BoxGeometry,
  MeshStandardMaterial,
  Shape,
  ExtrudeGeometry,
} from "three";

const RailsTable = function () {
  const railMaterial = useMemo(
    () => new TextureLoader().load(Hardwood),
    [Hardwood]
  );

  const clothMaterial = useMemo(() => new TextureLoader().load(Cloth), [Cloth]);

  const railSideGeometry = new BoxGeometry(
    getRailSideGeometry[0],
    getRailSideGeometry[1],
    getRailSideGeometry[2]
  );

  const railTopGeometry = new BoxGeometry(
    getRailsTopGeometry[0],
    getRailsTopGeometry[1],
    getRailsTopGeometry[2]
  );

  const shape1 = new Shape();
  shape1.moveTo(0, 0);
  shape1.lineTo(0, topRailSideH);
  shape1.lineTo(
    TABLE_SIZE.CUSHIONS_W,
    topRailSideH - TABLE_SIZE.CUSHIONS_W / Math.tan(FACING_ANGLE)
  );
  shape1.lineTo(TABLE_SIZE.CUSHIONS_W, 0.1);
  shape1.lineTo(0, 0);

  const shape2 = new Shape();
  shape2.moveTo(0, 0);
  shape2.lineTo(0, topRailSideH);
  shape2.lineTo(TABLE_SIZE.CUSHIONS_W, topRailSideH - 0.1);
  shape2.lineTo(
    TABLE_SIZE.CUSHIONS_W,
    TABLE_SIZE.CUSHIONS_W / Math.tan(FACING_ANGLE)
  );

  const shape3 = new Shape();
  shape3.moveTo(0, 0);
  shape3.lineTo(0, topRailTopW);
  shape3.lineTo(
    TABLE_SIZE.CUSHIONS_W,
    topRailTopW - TABLE_SIZE.CUSHIONS_W / Math.tan(FACING_ANGLE)
  );
  shape3.lineTo(
    TABLE_SIZE.CUSHIONS_W,
    TABLE_SIZE.CUSHIONS_W / Math.tan(FACING_ANGLE)
  );
  shape3.lineTo(0, 0);

  const extrudeSettings = {
    steps: 1,
    depth: TABLE_SIZE.Z_PARAM,
    bevelEnabled: false,
  };

  const cushion1Geometry = new ExtrudeGeometry(shape1, extrudeSettings);
  const cushion2Geometry = new ExtrudeGeometry(shape2, extrudeSettings);
  const cushion3Geometry = new ExtrudeGeometry(shape3, extrudeSettings);

  return (
    <>
      {railSideCoordinate.map((pos, idx) => (
        <mesh key={idx} args={[railSideGeometry]} position={pos}>
          <meshStandardMaterial attach="material" map={railMaterial} />
        </mesh>
      ))}

      {railTopCoordinate.map((pos, idx) => (
        <mesh key={idx} args={[railTopGeometry]} position={pos}>
          <meshStandardMaterial attach="material" map={railMaterial} />
        </mesh>
      ))}

      {cushion1Coordinate.map((pos, idx) => (
        <mesh
          key={idx}
          args={[cushion1Geometry]}
          position={pos}
          rotation={idx === 1 ? [0, Math.PI, 0] : [0, 0, 0]}
        >
          <meshStandardMaterial attach="material" map={clothMaterial} />
        </mesh>
      ))}

      {cushion2Coordinate.map((pos, idx) => (
        <mesh
          key={idx}
          args={[cushion2Geometry]}
          position={pos}
          rotation={idx === 1 ? [0, Math.PI, 0] : [0, 0, 0]}
        >
          <meshStandardMaterial attach="material" map={clothMaterial} />
        </mesh>
      ))}

      {cushion3Coordinate.map((pos, idx) => (
        <mesh
          key={idx}
          args={[cushion3Geometry]}
          position={pos}
          rotation={idx === 0 ? [0, 0, -Math.PI / 2] : [0, 0, Math.PI / 2]}
        >
          <meshStandardMaterial attach="material" map={clothMaterial} />
        </mesh>
      ))}
    </>
  );
};

export default RailsTable;
