import React, { useRef } from 'react';
import { Canvas, Image, useImage } from '@shopify/react-native-skia';
import { useTheme } from 'hooks';
import { Dimensions, ScrollView, View } from 'react-native';
import { ChallengeNode } from 'components';

const fakeData = [
  {
    id: '1',
    type: 'pass',
    offset: {
      bottom: 50,
      right: 50,
    },
  },
  {
    id: '2',
    type: 'pass',
    offset: {
      bottom: 150,
      right: 40,
    },
  },
  {
    id: '3',
    type: 'half',
    offset: {
      bottom: 180,
      right: 120,
    },
  },
  {
    id: '4',
    type: 'start',
    offset: {
      bottom: 200,
      right: 220,
    },
  },
  {
    id: '5',
    type: 'pass',
    offset: {
      bottom: 230,
      right: 320,
    },
  },
  {
    id: '6',
    type: 'pass',
    offset: {
      bottom: 300,
      right: 250,
    },
  },
  {
    id: '7',
    type: 'pass',
    offset: {
      bottom: 330,
      right: 150,
    },
  },
  {
    id: '8',
    type: 'block',
    offset: {
      bottom: 360,
      right: 50,
    },
  },
  {
    id: '9',
    type: 'pass',
    offset: {
      bottom: 360,
      right: 50,
    },
  },
  {
    id: '10',
    type: 'start',
    offset: {
      bottom: 450,
      right: 40,
    },
  },
  {
    id: '11',
    type: 'start',
    offset: {
      bottom: 550,
      right: 120,
    },
  },
  {
    id: '12',
    type: 'start',
    offset: {
      bottom: 600,
      right: 220,
    },
  },
  {
    id: '13',
    type: 'pass',
    offset: {
      bottom: 650,
      right: 330,
    },
  },
  {
    id: '14',
    type: 'pass',
    offset: {
      bottom: 720,
      right: 240,
    },
  },
  {
    id: '15',
    type: 'pass',
    offset: {
      bottom: 750,
      right: 120,
    },
  },
  {
    id: '16',
    type: 'pass',
    offset: {
      bottom: 800,
      right: 30,
    },
  },
  {
    id: '17',
    type: 'pass',
    offset: {
      bottom: 890,
      right: 70,
    },
  },
];

const Home = () => {
  const { Images } = useTheme();
  const image = useImage(Images.home.test);
  const containerRef = useRef<ScrollView | null>(null);

  return (
    <ScrollView
      ref={containerRef}
      onContentSizeChange={() =>
        containerRef.current?.scrollToEnd({ animated: true })
      }
    >
      <Canvas
        style={{
          height: Dimensions.get('window').height * 2,
        }}
      >
        <Image
          image={image}
          fit="cover"
          x={0}
          y={0}
          width={Dimensions.get('window').width}
          height={Dimensions.get('window').height * 2}
        />
      </Canvas>
      {fakeData.map(item => (
        <View
          key={item.id}
          style={{ position: 'absolute', zIndex: 9999, ...item.offset }}
        >
          <ChallengeNode type={item.type as any} />
        </View>
      ))}
    </ScrollView>
  );
};

export default Home;
