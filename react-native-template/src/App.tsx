import React, { Suspense } from 'react';
import { useColorScheme, ActivityIndicator } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import {
  SafeAreaProvider,
  initialWindowMetrics,
} from 'react-native-safe-area-context';
import { Provider } from 'mobx-react';
import { Provider as AntProvider } from '@ant-design/react-native';
import { LoadingContainer } from '@/components/Loading';
import screens from '@/screens/router.ts';
import { lightTheme, darkTheme } from '@/config/theme.ts';
import stores from '@/stores';
import '@/i18n';

const Stack = createNativeStackNavigator();
const Loading = () => <ActivityIndicator size="large" color="#666666" />;

export default function App(props: any) {
  const scheme = useColorScheme();
  console.log('App props', props);
  console.log('App scheme', scheme);

  return (
    <Provider {...stores}>
      <AntProvider>
        <SafeAreaProvider initialMetrics={initialWindowMetrics}>
          {/* 全局Loading */}
          <LoadingContainer />
          <NavigationContainer
            theme={scheme === 'dark' ? darkTheme : lightTheme}
          >
            <Stack.Navigator
              screenOptions={{
                animation: 'slide_from_right', // 👈 全局动画类型
                headerShadowVisible: false, // 👈 去除头部阴影
                headerTransparent: true, // 👈 设置透明头部（可选）
                headerTitleAlign: 'center',
              }}
              screenLayout={({ children }) => (
                <Suspense fallback={<Loading />}>{children}</Suspense>
              )}
            >
              {screens.map((screen, index) => (
                <Stack.Screen
                  name={screen.name}
                  component={screen.component}
                  options={screen.options}
                  key={index}
                />
              ))}
            </Stack.Navigator>
          </NavigationContainer>
        </SafeAreaProvider>
      </AntProvider>
    </Provider>
  );
}
