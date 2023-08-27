import React from "react";
import { useLoader } from "@react-three/fiber";

import { TextureLoader, MeshStandardMaterial } from "three";
import { TABLE_SIZE } from "../constants";
import Cloth from "../assets/textures/cloth.jpg";
import Pocket from "./Pocket";
import RailsTable from "./RailsTable";

function PoolTable() {
  const clothMaterial = new MeshStandardMaterial({
    color: 0x42a8ff,
    roughness: 0.4,
    bumpScale: 1,
  });
  const clothTexture = useLoader(TextureLoader, Cloth);
  clothMaterial.map = clothTexture;

  console.log("Table Rendering...");

  return (
    <>
      <mesh receiveShadow>
        <boxGeometry
          attach="geometry"
          args={[
            TABLE_SIZE.PLAY_FIELD_W + 2 * TABLE_SIZE.CUSHIONS_W,
            TABLE_SIZE.PLAY_FIELD_H + 2 * TABLE_SIZE.CUSHIONS_W,
            0.04,
          ]}
        />
        <meshStandardMaterial
          attach="material"
          color={0x42a8ff}
          roughness={0.4}
          bumpScale={1}
          map={clothTexture}
        />
      </mesh>
      <Pocket />
      <RailsTable />
    </>
  );
}
export default React.memo(PoolTable);
