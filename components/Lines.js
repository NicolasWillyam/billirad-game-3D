import { BufferGeometry, Vector3 } from "three";

const Lines = ({ start, end }) => {
  const points = [];
  points.push(new Vector3(...start));
  points.push(new Vector3(...end));
  const lineGeometry = new BufferGeometry().setFromPoints(points);

  return (
    <line geometry={lineGeometry}>
      <lineBasicMaterial
        attach="material"
        color="white"
        lineWidth={0.1}
        opacity={0}
      />
    </line>
  );
};
export default Lines;
