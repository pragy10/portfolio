import React, { useRef, useEffect, Suspense } from 'react';
import { useFrame } from '@react-three/fiber';
import { Text, Float, useGLTF } from '@react-three/drei';
import * as THREE from 'three';

const ComputerModel = ({ position = [0, 0, 0] }) => {
  const computerRef = useRef();
  
  try {
    // Load GLB model with error handling
    const gltf = useGLTF('/models/computer.glb');
    
    useEffect(() => {
      if (gltf && gltf.scene) {
        console.log('GLB loaded successfully');
        
        // Clone the scene to avoid issues
        const scene = gltf.scene.clone();
        
        // Scale the model safely
        if (scene) {
          scene.scale.setScalar(0.5);
          
          // Apply materials and shadows safely
          scene.traverse((child) => {
            if (child.isMesh) {
              child.castShadow = true;
              child.receiveShadow = true;
              
              if (child.material) {
                child.material.needsUpdate = true;
              }
            }
          });
          
          console.log('Model setup complete');
        }
      }
    }, [gltf]);

    useFrame((state) => {
      if (computerRef.current) {
        const time = state.clock.elapsedTime;
        computerRef.current.position.y = position[1] + Math.sin(time * 0.5) * 0.2;
        computerRef.current.rotation.y = Math.sin(time * 0.3) * 0.05;
      }
    });

    return (
      <Float speed={1} rotationIntensity={0.1} floatIntensity={0.2}>
        <group ref={computerRef} position={position} scale={0.92}>
          {gltf?.scene && <primitive object={gltf.scene.clone()} />}
          
          <Text
            position={[3, -2, 0]}
            fontSize={0.3}
            color="#5eead4"
            anchorX="center"
            anchorY="middle"
          >
          </Text>
        </group>
      </Float>
    );
    
  } catch (error) {
    console.error('Error in ComputerModel:', error);
    return <ComputerModelFallback position={position} />;
  }
};

// Safe fallback component
const ComputerModelFallback = ({ position = [0, 0, 0] }) => {
  const fallbackRef = useRef();

  useFrame((state) => {
    if (fallbackRef.current) {
      const time = state.clock.elapsedTime;
      fallbackRef.current.position.y = position[1] + Math.sin(time * 0.5) * 0.1;
      fallbackRef.current.rotation.y = time * 0.2;
    }
  });

  return (
    <Float speed={1} rotationIntensity={0.2} floatIntensity={0.3}>
      <group ref={fallbackRef} position={position}>
        {/* Simple computer shape */}
        <mesh position={[0, 0.3, 0]}>
          <boxGeometry args={[1.5, 1, 0.1]} />
          <meshStandardMaterial color="#2a2a2a" />
        </mesh>
        
        <mesh position={[0, 0.3, 0.06]}>
          <boxGeometry args={[1.3, 0.8, 0.02]} />
          <meshStandardMaterial 
            color="#14b8a6"
            emissive="#0d9488"
            emissiveIntensity={0.3}
          />
        </mesh>
        
        <mesh position={[0, -0.3, 0]}>
          <boxGeometry args={[1, 0.6, 0.8]} />
          <meshStandardMaterial color="#1a1a1a" />
        </mesh>
        
        <Text
          position={[0, -1, 0]}
          fontSize={0.2}
          color="#5eead4"
          anchorX="center"
          anchorY="middle"
        >
          COMPUTER
        </Text>
      </group>
    </Float>
  );
};

// Error boundary wrapper
class ComputerModelErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error('ComputerModel Error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return <ComputerModelFallback position={this.props.position} />;
    }

    return this.props.children;
  }
}

// Main component with all safety measures
const ComputerModelWithSuspense = (props) => {
  return (
    <ComputerModelErrorBoundary position={props.position}>
      <Suspense fallback={
        <Float speed={1} rotationIntensity={0.2} floatIntensity={0.3}>
          <group position={props.position}>
            <mesh>
              <boxGeometry args={[1.5, 1.2, 0.8]} />
              <meshStandardMaterial 
                color="#22d3ee" 
                transparent 
                opacity={0.5}
                wireframe
              />
            </mesh>
            
            <Text
              position={[0, -1, 0]}
              fontSize={0.2}
              color="#5eead4"
              anchorX="center"
              anchorY="middle"
            >
              LOADING...
            </Text>
          </group>
        </Float>
      }>
        <ComputerModel {...props} />
      </Suspense>
    </ComputerModelErrorBoundary>
  );
};

export default ComputerModelWithSuspense;
