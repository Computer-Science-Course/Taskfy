import { Platform } from 'react-native';
import * as Device from 'expo-device';
import * as Notifications from 'expo-notifications';

/**
 * Sets the notification handler for the app.
 * This handler determines the behavior of the app when a notification is received.
 */
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});

/**
 * Schedule a push notification.
 *
 * @param {string} title - The title of the notification.
 * @param {string} body - The body of the notification.
 * @returns {Promise<void>} A promise that resolves when the notification is scheduled.
 */
export async function schedulePushNotification(title, body,) {
  await Notifications.scheduleNotificationAsync({
    content: { title, body, data, },
    trigger: { seconds: 2 },
  });
}

/**
 * Registers the device for push notifications and returns the push token.
 * The push token is a unique identifier for the device, and it is used to
 * send push notifications to the device.
 * @returns {Promise<string>} The push token.
 */
export async function registerForPushNotificationsAsync() {
  let token;

  if (Platform.OS === 'android') {
    await Notifications.setNotificationChannelAsync('default', {
      name: 'default',
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: '#FF231F7C',
    });
  }

  if (Device.isDevice) {
    const { status: existingStatus } = await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;
    if (existingStatus !== 'granted') {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }
    if (finalStatus !== 'granted') {
      alert('Failed to get push token for push notification!');
      return;
    }
    // Learn more about projectId:
    // https://docs.expo.dev/push-notifications/push-notifications-setup/#configure-projectid
    token = (await Notifications.getExpoPushTokenAsync({ projectId: 'your-project-id' })).data;
    console.log(token);
  } else {
    alert('Must use physical device for Push Notifications');
  }

  return token;
}
