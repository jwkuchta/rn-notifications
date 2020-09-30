import { StatusBar } from 'expo-status-bar';
import React, {useEffect} from 'react';
import { StyleSheet, View, Button } from 'react-native';
import * as Notifications from 'expo-notifications'
import * as Permissions from 'expo-permissions'

export default function App() {

  // check for permission and ask for it if not granted
  useEffect(() => {
    Permissions.getAsync(Permissions.NOTIFICATIONS).then(statusObj => {
      if (statusObj.status !== 'granted') {
        return Permissions.askAsync(Permissions.NOTIFICATIONS)
      }
    }).then(statusObj => {
      if (statusObj.status !== 'granted') {
        return
      }
    })
  }, [])

  const triggerNotificationHandler = () => {
    Notifications.scheduleNotificationAsync({
      content: {
        title: 'My first local notification',
        body: 'This is the very first local notification yeet'
      },
      trigger: {
        seconds: 5
      }
    })
  }
  return (
    <View style={styles.container}>
      <Button title="Trigger Notifications" onPress={triggerNotificationHandler} />
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
})
