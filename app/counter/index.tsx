import {
    Text,
    View,
    StyleSheet,
    TouchableOpacity,
    Alert,
    ActivityIndicator,
    Dimensions,
  } from "react-native";
  import { theme } from "../../theme";
  import { registerForPushNotificationsAsync } from "../../utils/registerForPushNotificationsAsync";
  import * as Notifications from "expo-notifications";
  import { useEffect, useRef, useState } from "react";
  import { intervalToDuration, isBefore } from "date-fns";
  import { TimeSegment } from "../../components/TimeSegment";
  import { getFromStorage, saveToStorage } from "../../utils/storage";
  import * as Haptics from "expo-haptics";
  import ConfettiCannon from "react-native-confetti-cannon";
  
  // 2 weeks in ms (for production)
//   const frequency = 14 * 24 * 60 * 60 * 1000;
  
  // 🚀 For testing: Uncomment the line below to use 30 seconds instead of 2 weeks
  const frequency = 30 * 1000;
  
  export const countdownStorageKey = "taskly-countdown";
  
  export type PersistedCountdownState = {
    currentNotificationId: string | undefined;
    completedAtTimestamps: number[];
  };
  
  type CountdownStatus = {
    isOverdue: boolean;
    distance: ReturnType<typeof intervalToDuration>;
  };
  
  export default function CounterScreen() {
    const confettiRef = useRef<any>();
    const [isLoading, setIsLoading] = useState(true);
    const [countdownState, setCountdownState] = useState<PersistedCountdownState>();
    const [status, setStatus] = useState<CountdownStatus>({
      isOverdue: false,
      distance: {},
    });
  
    useEffect(() => {
      const init = async () => {
        try {
          const value = await getFromStorage(countdownStorageKey);
          setCountdownState(value);
        } catch (error) {
          console.error('Failed to load countdown state:', error);
          // Set default state if loading fails
          setCountdownState({
            currentNotificationId: undefined,
            completedAtTimestamps: [],
          });
        } finally {
          // Move setLoading(false) here - after data is loaded
          setIsLoading(false);
        }
      };
      init();
    }, []);
  
    const lastCompletedAt = countdownState?.completedAtTimestamps[0];
  
    // Only start the countdown timer when loading is complete
    useEffect(() => {
      if (isLoading) return;
  
      const updateCountdown = () => {
        const now = Date.now();
        let targetTime: number;
  
        if (lastCompletedAt) {
          // If there's a previous wash, next wash is due after frequency period
          targetTime = lastCompletedAt + frequency;
        } else {
          // If no previous wash, set next wash for frequency time from now
          // This creates a countdown that actually counts down
          targetTime = now + frequency;
        }
  
        const isOverdue = isBefore(targetTime, now);
  
        const distance = intervalToDuration(
          isOverdue
            ? { start: targetTime, end: now }  // How long overdue
            : { start: now, end: targetTime }   // Time remaining
        );
  
        setStatus({ isOverdue, distance });
        
        // Debug log to see what's happening
        console.log('Countdown update:', {
          now: new Date(now).toLocaleString(),
          targetTime: new Date(targetTime).toLocaleString(),
          isOverdue,
          distance,
          lastCompletedAt: lastCompletedAt ? new Date(lastCompletedAt).toLocaleString() : 'None'
        });
      };
  
      // Run immediately, then every second
      updateCountdown();
      const intervalId = setInterval(updateCountdown, 1000);
  
      return () => {
        clearInterval(intervalId);
      };
    }, [lastCompletedAt, isLoading]);
  
    const scheduleNotification = async () => {
      if (isLoading) return;
  
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
      confettiRef?.current?.start();
      
      let pushNotificationId;
      const result = await registerForPushNotificationsAsync();
      
      if (result === "granted") {
        pushNotificationId = await Notifications.scheduleNotificationAsync({
          content: {
            title: 'Car wash overdue',
            body: 'You need to wash your car',
            sound: 'default',
            badge: 1,
            categoryIdentifier: 'car-wash',
            priority: Notifications.AndroidNotificationPriority.HIGH,
          },
          trigger: {
            type: Notifications.SchedulableTriggerInputTypes.TIME_INTERVAL,
            seconds: frequency / 1000,
          }
        });
      } else {
        Alert.alert(
          "Unable to schedule notification",
          "Enable the notifications permission for Expo Go in settings",
        );
      }
  
      if (countdownState?.currentNotificationId) {
        await Notifications.cancelScheduledNotificationAsync(
          countdownState.currentNotificationId,
        );
      }
  
      const now = Date.now();
      const newCountdownState: PersistedCountdownState = {
        currentNotificationId: pushNotificationId,
        completedAtTimestamps: countdownState?.completedAtTimestamps
          ? [now, ...countdownState.completedAtTimestamps]
          : [now],
      };
  
      setCountdownState(newCountdownState);
      await saveToStorage(countdownStorageKey, newCountdownState);
      
      console.log('Car wash completed at:', new Date(now).toLocaleString());
    };
  
    // Show loading state while data is being fetched
    if (isLoading) {
      return (
        <View style={[styles.container, styles.loadingContainer]}>
          <ActivityIndicator size="large" color={theme.colors.dark} />
          <Text style={styles.loadingText}>Loading...</Text>
        </View>
      );
    }
  
    return (
      <View
        style={[
          styles.container,
          status.isOverdue ? styles.containerLate : undefined,
        ]}
      >
        {!status.isOverdue ? (
          <Text style={[styles.heading]}>Next car wash due in</Text>
        ) : (
          <Text style={[styles.heading, styles.whiteText]}>
            Car wash overdue by
          </Text>
        )}
        <View style={styles.row}>
          <TimeSegment
            unit="Days"
            number={status.distance?.days ?? 0}
            textStyle={status.isOverdue ? styles.whiteText : undefined}
          />
          <TimeSegment
            unit="Hours"
            number={status.distance?.hours ?? 0}
            textStyle={status.isOverdue ? styles.whiteText : undefined}
          />
          <TimeSegment
            unit="Minutes"
            number={status.distance?.minutes ?? 0}
            textStyle={status.isOverdue ? styles.whiteText : undefined}
          />
          <TimeSegment
            unit="Seconds"
            number={status.distance?.seconds ?? 0}
            textStyle={status.isOverdue ? styles.whiteText : undefined}
          />
        </View>
        <TouchableOpacity
          onPress={scheduleNotification}
          style={styles.button}
          activeOpacity={0.8}
        >
          <Text style={styles.buttonText}>{`I've washed the car!`}</Text>
        </TouchableOpacity>
        
        {/* 🔍 Debug Info - Remove in production */}
        {__DEV__ && (
          <View style={styles.debugContainer}>
            <Text style={styles.debugText}>
              Debug Info:
            </Text>
            <Text style={styles.debugText}>
              Last wash: {lastCompletedAt ? new Date(lastCompletedAt).toLocaleString() : 'Never'}
            </Text>
            <Text style={styles.debugText}>
              Status: {status.isOverdue ? 'Overdue' : 'On time'}
            </Text>
            <Text style={styles.debugText}>
              Days: {status.distance?.days ?? 0}, Hours: {status.distance?.hours ?? 0}, 
              Minutes: {status.distance?.minutes ?? 0}, Seconds: {status.distance?.seconds ?? 0}
            </Text>
          </View>
        )}
        
        <ConfettiCannon
          ref={confettiRef}
          count={50}
          origin={{ x: Dimensions.get("window").width / 2, y: -30 }}
          autoStart={false}
          fadeOut={true}
        />
      </View>
    );
  }
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: theme.colors.light,
    },
    loadingContainer: {
      justifyContent: "center",
      alignItems: "center",
    },
    loadingText: {
      marginTop: 16,
      fontSize: 16,
      color: theme.colors.dark,
    },
    button: {
      backgroundColor: theme.colors.dark,
      padding: 12,
      borderRadius: 6,
    },
    buttonText: {
      color: "#fff",
      fontWeight: "bold",
      textTransform: "uppercase",
      letterSpacing: 1,
    },
    row: {
      flexDirection: "row",
      marginBottom: 24,
    },
    heading: {
      fontSize: 24,
      fontWeight: "bold",
      marginBottom: 24,
      color: theme.colors.dark,
    },
    containerLate: {
      backgroundColor: theme.colors.danger,
    },
    whiteText: {
      color: theme.colors.light,
    },
    debugContainer: {
      position: 'absolute',
      bottom: 50,
      left: 20,
      right: 20,
      backgroundColor: 'rgba(0,0,0,0.8)',
      padding: 10,
      borderRadius: 8,
    },
    debugText: {
      color: 'white',
      fontSize: 12,
      marginBottom: 2,
    },
  });