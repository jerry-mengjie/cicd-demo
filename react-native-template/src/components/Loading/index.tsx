import React, { useState, useEffect } from 'react';
import { Modal, View, ActivityIndicator, Text, StyleSheet } from 'react-native';

let setVisibleFn: any;
let setTextFn: any;

class Loading {
  static show(text = 'loading...') {
    if (setVisibleFn && setTextFn) {
      setTextFn(text);
      setVisibleFn(true);
    }
  }

  static hide() {
    if (setVisibleFn) {
      setVisibleFn(false);
    }
  }
}

export const LoadingContainer = () => {
  const [visible, setVisible] = useState(false);
  const [text, setText] = useState('');

  // 赋值set函数
  useEffect(() => {
    setVisibleFn = setVisible;
    setTextFn = setText;
  }, []);

  if (!visible) return null;

  return (
    <Modal transparent animationType="fade" visible={visible}>
      <View style={styles.overlay}>
        <ActivityIndicator size="large" color="#007aff" />
        {/* <View style={styles.container}>
          <ActivityIndicator size="large" color="#007aff" />
          {text ? <Text style={styles.text}>{text}</Text> : null}
        </View> */}
      </View>
    </Modal>
  );
};

export default Loading;

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.25)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    minWidth: 120,
    alignItems: 'center',
  },
  text: {
    marginTop: 10,
    color: '#333',
  },
});
