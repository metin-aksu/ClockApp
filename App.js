import React, { useEffect, useState } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import KeepAwake from 'react-native-keep-awake';
import BackgroundTimer from 'react-native-background-timer';
import Permissions, { PERMISSIONS } from 'react-native-permissions';

const ClockApp = () => {
  const [time, setTime] = useState(new Date().toLocaleTimeString());

  useEffect(() => {
    // Arka planda her saniye saati güncelle
    const intervalId = BackgroundTimer.setInterval(() => {
      setTime(new Date().toLocaleTimeString());
    }, 1000);

    // Uygulamanın ekranını açık tut
    KeepAwake.activate();

    // İzinleri iste
    Permissions.request(PERMISSIONS.ANDROID.SYSTEM_ALERT_WINDOW).then(response => {
      console.log('Permission response: ', response);
    });

    return () => {
      BackgroundTimer.clearInterval(intervalId);
      KeepAwake.deactivate();
    };
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.clockText}>{time}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#000',
  },
  clockText: {
    fontSize: 50,
    color: '#fff',
  },
});

export default ClockApp;
