import { createIconSet } from 'react-native-vector-icons';

const glyphMap = {
  star: 58887,
  'back-top': 58885,
  delete: 58884,
  // 从 iconfont.json 拷贝内容
};

const IconFont = createIconSet(glyphMap, 'iconfont', 'iconfont.ttf');

export default IconFont;
