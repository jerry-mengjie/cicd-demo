import React from 'react';
import { View, Text, Button } from 'react-native';
import { inject, observer } from 'mobx-react';
import { scale, verticalScale, moderateScale } from 'react-native-size-matters';
import { useTranslation } from 'react-i18next';
import { t } from 'i18next';
import IconFont from '@/components/IconFont';

function HomeScreen({ navigation, counterStore }: any) {
  const { i18n } = useTranslation();
  // 切换多语言
  const toggleLanguage = () => {
    const newLang = i18n.language === 'en' ? 'zh' : 'en';
    i18n.changeLanguage(newLang);
  };
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>🏠 Home Screen</Text>
      <Text>1、路由传参</Text>
      <Button title="Go to Details" onPress={() => navigation.navigate('Detail', { userId: 42 })} />
      <Text>2、切换多语言</Text>
      <Button title={t('change_language')} onPress={toggleLanguage} />
      <Text>3、store状态应用</Text>
      <Text>当前计数: {counterStore.count}</Text>
      <Button title="+1" onPress={counterStore.increment} />
      <Button title="-1" onPress={counterStore.decrement} />
      <Text>4、iconfont图标管理</Text>
      <IconFont name="star" size={30} color="#333" />
      <IconFont name="back-top" size={30} color="blue" />
      <Text>5、样式响应式方案</Text>
      <View
        style={{
          width: scale(30), // 根据屏幕宽度
          height: verticalScale(50), // 根据屏幕高度
          padding: moderateScale(5),
          borderWidth: 1,
        }}
      />
    </View>
  );
}

export default inject('counterStore')(observer(HomeScreen));
