import { useTheme } from 'hooks';
import React, { useMemo } from 'react';
import { Canvas, Image, useImage } from '@shopify/react-native-skia';

export interface ChallengeNodeProps {
  type: 'block' | 'start' | 'half' | 'pass';
}
const ChallengeNode = ({ type }: ChallengeNodeProps) => {
  const { Images } = useTheme();

  const imagesType = useMemo(() => {
    const mapping: Record<ChallengeNodeProps['type'], any> = {
      block: Images.challenge.nodeBlock,
      start: Images.challenge.nodeOnePass,
      half: Images.challenge.nodeTwoPass,
      pass: Images.challenge.nodePass,
    };
    return mapping[type] || Images.challenge.nodeBlock;
  }, [type]);

  const image = useImage(imagesType);

  return (
    <Canvas style={{ width: 48, height: 64 }}>
      <Image image={image} fit="cover" x={0} y={0} width={48} height={64} />
    </Canvas>
  );
};

export default ChallengeNode;
