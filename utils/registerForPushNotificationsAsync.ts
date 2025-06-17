import { Platform } from "react-native";
import * as Notifications from 'expo-notifications';
import * as Device from 'expo-device';

export const registerForPushNotificationsAsync = async () => {
    /**
     * Set notification channel for Android
     * https://docs.expo.dev/notifications/notifications-overview/#android-specific-configuration
     */
    if (Platform.OS === 'android') {
        await Notifications.setNotificationChannelAsync('default', {
            name: 'default',
            importance: Notifications.AndroidImportance.MAX,
            vibrationPattern: [0, 250, 250, 250],
            sound: 'default',
            enableLights: true,
            showBadge: true,
        });
    }

    if (Device.isDevice) {
        // Request permissions
        const { status: existingStatus } = await Notifications.getPermissionsAsync();

        /**
         * If the user has not granted permissions, request permissions
         * If the user has granted permissions, return the status
         * If the user is not a device, return null
         * type: 'granted' | 'undetermined' | 'denied'
         */
        if (existingStatus !== 'granted') {
            const { status } = await Notifications.requestPermissionsAsync();
            return status;
        } else {
            return existingStatus;
        }
    } else {
        return null;
    }
};
