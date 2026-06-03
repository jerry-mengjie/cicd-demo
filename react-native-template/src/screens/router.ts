import { lazy } from 'react';

export default [
  {
    name: 'Home',
    component: lazy(() => import('./demo/HomeScreen')),
    options: {}, // 头部配置栏，可看下面注释
  },
  {
    name: 'Detail',
    component: lazy(() => import('./demo/DetailScreen')),
    options: {}, // 头部配置栏，可看下面注释
  },
  {
    name: 'User',
    component: lazy(() => import('./demo/UserScreen')),
    options: { headerShown: true, headerTitle: '用户列表' },
  },
];

/* <Stack.Screen
  name="Detail"
  component={DetailScreen}
  options={{
    // ✅ 标题栏（Header）设置
    headerShown: true,                        // 是否显示头部导航栏
    headerTitle: '详情页',                    // 标题文字（可传组件）
    headerTitleAlign: 'center',               // 标题居中（iOS默认居中，Android默认左对齐）
    headerTitleStyle: {
      fontSize: 18,
      fontWeight: 'bold',
    },
    headerStyle: {
      backgroundColor: '#fff',                // 头部背景色
    },
    headerTintColor: '#333',                  // 返回按钮和标题文字颜色
    headerTransparent: false,                 // 是否头部透明（如弹窗页面）
    headerShadowVisible: false,               // iOS：是否显示底部阴影/分隔线
    headerBackVisible: true,                  // 是否显示返回按钮
    headerBackTitleVisible: false,            // iOS：是否显示返回按钮上的文字
    headerBackTitle: '返回',                  // iOS：返回按钮的文字
    headerLeft: () => <MyBackButton />,       // 自定义返回按钮
    headerRight: () => <LangSwitchButton />,  // 右侧按钮
    headerTitle: () => <LogoTitle />,         // 自定义标题组件

    // ✅ 动画控制
    animation: 'slide_from_right',            // 转场动画类型（见下方动画表）
    animationDuration: 300,                   // 动画时长（部分平台有效）
    animationTypeForReplace: 'push',          // 当用 replace() 替换页面时，动画表现（push | pop）
    
    // ✅ 手势控制
    gestureEnabled: true,                     // 是否启用返回手势
    gestureDirection: 'horizontal',           // 手势方向（horizontal | vertical）

    // ✅ 页面展示方式
    presentation: 'card',                     // 页面呈现方式（modal / transparentModal / fullScreenModal）
    contentStyle: {
      backgroundColor: '#f5f5f5',             // 页面背景样式
    },

    // ✅ 状态栏控制（适用于 iOS 和 Android）
    statusBarStyle: 'dark',                   // 状态栏文字颜色（light / dark）
    statusBarColor: '#ffffff',                // Android：状态栏背景颜色
    statusBarHidden: false,                   // 是否隐藏状态栏
    statusBarTranslucent: false,              // Android：是否透明状态栏
  }}
/> */
