import { ThemeVariables } from 'types/theme';

export default function ({}: ThemeVariables) {
  return {
    logo: require('./assets/images/tom_light.png'),
    sparkles: {
      topLeft: require('./assets/images/sparkles-top-left.png'),
      top: require('./assets/images/sparkles-top.png'),
      topRight: require('./assets/images/sparkles-top-right.png'),
      right: require('./assets/images/sparkles-right.png'),
      bottomRight: require('./assets/images/sparkles-bottom-right.png'),
      bottom: require('./assets/images/sparkles-bottom.png'),
      bottomLeft: require('./assets/images/sparkles-bottom-left.png'),
    },
    icons: {
      colors: require('./assets/images/colorswatch.png'),
      send: require('./assets/images/send.png'),
      translate: require('./assets/images/translate.png'),
    },
    home: {
      backgroundJpg: require('./assets/images/Group.jpg'),
      backgroundPng: require('./assets/images/Group.png'),
      test: require('./assets/images/mergebg.png'),
    },
    challenge: {
      nodeBlock: require('./assets/images/NodeBlock.jpg'),
      nodeOnePass: require('./assets/images/NodeOnePass.jpg'),
      nodeTwoPass: require('./assets/images/NodeTwoPass.jpg'),
      nodePass: require('./assets/images/NodePass.jpg'),
    },
  };
}
