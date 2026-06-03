import React, { useEffect } from 'react';
import { View, Text, Button, Alert, BackHandler } from 'react-native';
import { useFocusEffect, useTheme } from '@react-navigation/native';
import { getSysTime } from '@/api/user.ts';

export default function DetailScreen({ navigation, route }: any) {
  // 1、获取路由参数
  const { userId } = route.params || { userId: 0 };

  // 2、获取主题色
  const { colors } = useTheme();
  console.log('colors', colors);

  // 3、当屏幕聚焦或失焦时
  useFocusEffect(
    React.useCallback(() => {
      // Do something when the screen is focused
      console.log('ProfileScreen focus effect');

      return () => {
        // Do something when the screen is unfocused
        console.log('ProfileScreen focus effect cleanup');
      };
    }, [])
  );

  // 4、阻止Android硬件返回键，以免丢失未保存的更改
  useEffect(() => {
    const onBackPress = () => {
      Alert.alert(
        'Exit App',
        'Do you want to exit?',
        [
          {
            text: 'Cancel',
            onPress: () => {},
            style: 'cancel',
          },
          { text: 'YES', onPress: () => BackHandler.exitApp() },
        ],
        { cancelable: false }
      );

      return true;
    };

    const backHandler = BackHandler.addEventListener('hardwareBackPress', onBackPress);

    return () => backHandler.remove();
  }, []);

  const handleAuth = async () => {
    try {
      const data = await getSysTime();
      console.log('Api getSysTime data', data);
    } catch (error) {
      console.log('Api getSysTime error', error);
    }
  };

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <View style={{ backgroundColor: colors.primary }}>
        <Text>📝 Detail Screen</Text>
        <Text>User ID: {userId}</Text>
        <Text>1、返回页面</Text>
        <Button title="Go Back" onPress={() => navigation.goBack()} />
        <Text>2、Api请求</Text>
        <Button title="Fetch.get" onPress={handleAuth} />
      </View>
    </View>
  );
}
