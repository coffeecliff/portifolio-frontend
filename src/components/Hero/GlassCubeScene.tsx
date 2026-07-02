import { useMemo, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Environment, Lightformer, MeshTransmissionMaterial, RoundedBox } from '@react-three/drei';
import { CanvasTexture, SRGBColorSpace, type Mesh } from 'three';
import { colors } from '@/design-system/tokens';
import styles from './GlassCube.module.css';

interface CubeMeshProps {
  motionEnabled: boolean;
}

/**
 * Textura de gradiente gerada em canvas 2D (sem HDRI externo) usada como
 * `background` do MeshTransmissionMaterial: é o que a refração do vidro
 * "enxerga" atrás do cubo. Sem ela o material captura um buffer transparente
 * e o vidro renderiza quase preto.
 */
function useGlassBackdropTexture() {
  return useMemo(() => {
    const size = 512;
    const canvas = document.createElement('canvas');
    canvas.width = size;
    canvas.height = size;
    const ctx = canvas.getContext('2d');
    if (!ctx) return null;

    const base = ctx.createLinearGradient(0, 0, size, size);
    base.addColorStop(0, colors.cyan);
    base.addColorStop(0.5, colors.purpleMedium);
    base.addColorStop(1, colors.magenta);
    ctx.fillStyle = base;
    ctx.fillRect(0, 0, size, size);

    const blobs: Array<[number, number, number, string]> = [
      [size * 0.2, size * 0.24, size * 0.62, colors.cyan],
      [size * 0.82, size * 0.7, size * 0.68, colors.magenta],
      [size * 0.5, size * 0.9, size * 0.56, colors.purpleMedium],
      [size * 0.58, size * 0.14, size * 0.4, '#ffffff'],
    ];
    for (const [x, y, r, color] of blobs) {
      const gradient = ctx.createRadialGradient(x, y, 0, x, y, r);
      gradient.addColorStop(0, color);
      gradient.addColorStop(1, 'transparent');
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, size, size);
    }

    const texture = new CanvasTexture(canvas);
    texture.colorSpace = SRGBColorSpace;
    return texture;
  }, []);
}

/** Malha do cubo com material de transmissão (vidro real) girando em rAF do R3F. */
function CubeMesh({ motionEnabled }: CubeMeshProps) {
  const meshRef = useRef<Mesh>(null);
  const backdrop = useGlassBackdropTexture();

  useFrame((_, delta) => {
    const mesh = meshRef.current;
    if (!mesh || !motionEnabled) return;
    mesh.rotation.y += delta * 0.22;
    mesh.rotation.x = -0.32 + Math.sin(mesh.rotation.y * 0.5) * 0.05;
  });

  return (
    <RoundedBox ref={meshRef} args={[2.2, 2.2, 2.2]} radius={0.16} smoothness={6} rotation={[-0.32, 0.6, 0]}>
      <MeshTransmissionMaterial
        thickness={0.5}
        roughness={0.04}
        transmission={1}
        ior={1.3}
        chromaticAberration={0.08}
        anisotropy={0.4}
        distortion={0.2}
        distortionScale={0.4}
        temporalDistortion={0.1}
        color="#ffffff"
        attenuationColor="#ffffff"
        attenuationDistance={3}
        clearcoat={1}
        clearcoatRoughness={0.06}
        backside
        resolution={512}
        background={backdrop ?? undefined}
      />
    </RoundedBox>
  );
}

/** Ambiente sintético (sem HDRI externo) que colore os reflexos de vidro nas cores da marca. */
function CubeLighting() {
  return (
    <Environment resolution={256}>
      <Lightformer intensity={8} color={colors.cyan} position={[-4, 2, 4]} scale={[4, 3, 1]} />
      <Lightformer intensity={8} color={colors.magenta} position={[4, -2, -3]} scale={[4, 3, 1]} />
      <Lightformer intensity={5} color={colors.purpleMedium} position={[0, 4, -2]} scale={[5, 4, 1]} />
      <Lightformer intensity={4} color="#ffffff" position={[0, -3, 3]} scale={[3, 2, 1]} />
    </Environment>
  );
}

/**
 * Cena 3D do cubo (R3F). Exportada como default para permitir carregamento
 * lazy (React.lazy) — assim `three`/`drei` só entram no bundle quando o
 * dispositivo é capaz e a cena vai de fato ser montada.
 * `frameloop` fica em "demand" quando o movimento está desligado, poupando rAF.
 */
export default function GlassCubeScene({ motionEnabled }: { motionEnabled: boolean }) {
  return (
    <Canvas
      className={styles.canvas}
      style={{ pointerEvents: 'none' }}
      dpr={[1, 1.5]}
      gl={{ alpha: true, antialias: true, toneMappingExposure: 1.4 }}
      camera={{ position: [0, 0, 6], fov: 34 }}
      frameloop={motionEnabled ? 'always' : 'demand'}
      events={undefined}
    >
      <ambientLight intensity={0.7} />
      <CubeLighting />
      <CubeMesh motionEnabled={motionEnabled} />
    </Canvas>
  );
}
