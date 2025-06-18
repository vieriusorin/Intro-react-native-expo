import { useEffect, useRef } from "react";
import { 
    Animated,
    StyleSheet
  } from "react-native";
  
export const LoadingItem: React.FC<{ index: number }> = ({ index }) => {
    const shimmerAnim = useRef(new Animated.Value(0)).current;
    const slideAnim = useRef(new Animated.Value(-15)).current; // Subtle slide from left
  
    useEffect(() => {
      // Entry animation
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 300,
        delay: index * 60,
        useNativeDriver: true,
      }).start();
  
      // Shimmer animation
      const shimmerAnimation = Animated.loop(
        Animated.sequence([
          Animated.timing(shimmerAnim, {
            toValue: 1,
            duration: 1200,
            useNativeDriver: true,
          }),
          Animated.timing(shimmerAnim, {
            toValue: 0,
            duration: 1200,
            useNativeDriver: true,
          }),
        ])
      );
      
      shimmerAnimation.start();
      return () => shimmerAnimation.stop();
    }, [shimmerAnim, slideAnim, index]);
  
    return (
      <Animated.View
        style={[
          styles.loadingItem,
          {
            opacity: shimmerAnim.interpolate({
              inputRange: [0, 1],
              outputRange: [0.4, 0.8],
            }),
            transform: [{ translateX: slideAnim }],
          },
        ]}
      />
    );
  };

  
  const styles = StyleSheet.create({
    loadingItem: {
      height: 78,
      backgroundColor: '#f0f0f0',
      marginHorizontal: 16,
      marginBottom: 12,
      borderRadius: 12,
    },
  });