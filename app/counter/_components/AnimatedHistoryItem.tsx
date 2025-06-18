import { useEffect, useRef } from "react";
import { 
    Text,
    View, 
    Animated, 
    TouchableOpacity,
    StyleSheet
  } from "react-native";
import { AnimatedHistoryItemProps } from "../../../types/History.types";
import { theme } from "../../../theme";
import { format } from "date-fns";
const fullDateFormat = `LLL d yyyy, h:mm aaa`;

export const AnimatedHistoryItem: React.FC<AnimatedHistoryItemProps> = ({ 
    item, 
    index, 
    onPress 
  }) => {
    const fadeAnim = useRef(new Animated.Value(0)).current;
    const slideAnim = useRef(new Animated.Value(-20)).current; // Start from left (-20px)
  
    useEffect(() => {
      // Subtle stagger animation based on index
      const delay = index * 80; // Reduced delay for subtlety
      
      Animated.parallel([
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 400, // Shorter duration
          delay,
          useNativeDriver: true,
        }),
        Animated.timing(slideAnim, {
          toValue: 0, // Slide to natural position
          duration: 400,
          delay,
          useNativeDriver: true,
        }),
      ]).start();
    }, [fadeAnim, slideAnim, index]);
  
    const handlePress = () => {
      // Very subtle press animation
      Animated.sequence([
        Animated.timing(fadeAnim, {
          toValue: 0.7,
          duration: 80,
          useNativeDriver: true,
        }),
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 80,
          useNativeDriver: true,
        }),
      ]).start();
      
      onPress?.();
    };
  
    return (
      <Animated.View
        style={[
          styles.animatedContainer,
          {
            opacity: fadeAnim,
            transform: [
              { translateX: slideAnim }, // Changed to horizontal slide
            ],
          },
        ]}
      >
        <TouchableOpacity
          style={styles.listItem}
          onPress={handlePress}
          activeOpacity={0.8}
        >
          <View style={styles.itemContent}>
            <View style={styles.iconContainer}>
              <Text style={styles.carIcon}>🚗</Text>
            </View>
            <View style={styles.textContainer}>
              <Text style={styles.listItemText}>
                Car washed
              </Text>
              <Text style={styles.dateText}>
                {format(item, fullDateFormat)}
              </Text>
            </View>
            <View style={styles.checkmarkContainer}>
              <Text style={styles.checkmark}>✓</Text>
            </View>
          </View>
        </TouchableOpacity>
      </Animated.View>
    );
  };

  const styles = StyleSheet.create({
    list: {
      flex: 1,
      backgroundColor: theme.colors.light,
    },
    contentContainer: {
      paddingTop: 16,
      paddingBottom: 20,
    },
    animatedContainer: {
      marginHorizontal: 16,
      marginBottom: 12,
    },
    listItem: {
      backgroundColor: 'white',
      borderRadius: 12,
      padding: 16,
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.1,
      shadowRadius: 4,
      elevation: 3,
    },
    itemContent: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    iconContainer: {
      width: 50,
      height: 50,
      borderRadius: 25,
      backgroundColor: theme.colors.grayLight,
      alignItems: 'center',
      justifyContent: 'center',
      marginRight: 16,
    },
    carIcon: {
      fontSize: 24,
    },
    textContainer: {
      flex: 1,
    },
    listItemText: {
      fontSize: 16,
      fontWeight: '600',
      color: theme.colors.dark,
      marginBottom: 4,
    },
    dateText: {
      fontSize: 14,
      color: '#666',
    },
    checkmarkContainer: {
      width: 30,
      height: 30,
      borderRadius: 15,
      backgroundColor: '#4CAF50',
      alignItems: 'center',
      justifyContent: 'center',
    },
    checkmark: {
      color: 'white',
      fontSize: 16,
      fontWeight: 'bold',
    },
    listEmptyContainer: {
      justifyContent: 'center',
      alignItems: 'center',
      marginVertical: 60,
      paddingHorizontal: 40,
    },
    emptyIcon: {
      fontSize: 64,
      marginBottom: 16,
    },
    emptyTitle: {
      fontSize: 20,
      fontWeight: 'bold',
      color: theme.colors.dark,
      marginBottom: 8,
      textAlign: 'center',
    },
    emptySubtitle: {
      fontSize: 16,
      color: '#666',
      textAlign: 'center',
      lineHeight: 22,
    },
    loadingItem: {
      height: 78,
      backgroundColor: '#f0f0f0',
      marginHorizontal: 16,
      marginBottom: 12,
      borderRadius: 12,
    },
  });