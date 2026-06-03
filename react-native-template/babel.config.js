module.exports = {
  presets: ['module:@react-native/babel-preset'],
  plugins: [
    ['import', { libraryName: '@ant-design/react-native' }], // 与 Web 平台的区别是不需要设置 style
    [
      'module-resolver',
      {
        root: ['./src'],
        alias: {
          '@': './src', // 加上这一行
        },
      },
    ],
  ],
};
