import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Permissions from "expo-permissions";
import * as Notifications from "expo-notifications";

const NOTIFICATION_KEY = "MobileFlashcard:notifications";

export function clearLocalNotifications() {
  return AsyncStorage.removeItem(NOTIFICATION_KEY).then(() => {
    Notifications.cancelAllScheduledNotificationsAsync();
    console.log("Notification cleared for: ", new Date().toLocaleDateString());
  });
}

export function setLocalNotifications() {
  AsyncStorage.getItem(NOTIFICATION_KEY)
    .then(JSON.parse)
    .then((data) => {
      console.log("notif key data:", data);
      if (data === null) {
        Permissions.askAsync(Permissions.NOTIFICATIONS).then(({ status }) => {
          console.log("permi status: ", status);
          if (status === "denied") {
            // TODO: Ask For Notification Permission
          }

          if (status === "granted") {
            console.log("Permission Granted");
            //if no notification is set and persmissions granted, make sure and clear any notifications
            Notifications.cancelAllScheduledNotificationsAsync();

            //set up how to handle the notification config
            Notifications.setNotificationHandler({
              handleNotification: async () => ({
                shouldPlaySound: true,
                shouldShowAlert: true,
                shouldSetBadge: false,
              }),
            });

            //create a date object to trigger the notification (android)
            let tomorrow = new Date();
            tomorrow = tomorrow.getTime() + 10 * 1000;
            const notificationDate = new Date(tomorrow);

            Notifications.scheduleNotificationAsync({
              content: {
                title: "👋 It's time to study",
                body: "Hey! Don't forget to study today!",
                sound: true,
              },
              trigger: notificationDate,
              // trigger: {
              //   seconds: 10,
              //   repeats: true,
              // },
            });

            AsyncStorage.setItem(NOTIFICATION_KEY, JSON.stringify(true));
          }
        });
      }
    });
}
