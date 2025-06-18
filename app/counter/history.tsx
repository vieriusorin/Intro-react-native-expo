import {
    Text,
    StyleSheet,
    FlatList,
    View,
    Animated,
    LayoutAnimation,
} from "react-native";
import { countdownStorageKey, PersistedCountdownState } from "./";
import { useEffect, useState, useRef } from "react";
import { getFromStorage } from "../../utils/storage";
import { format } from "date-fns";
import { theme } from "../../theme";
import { AnimatedHistoryItem } from "./_components/AnimatedHistoryItem";
import { LoadingItem } from "./_components/LoadingItem";

const fullDateFormat = `LLL d yyyy, h:mm aaa`;

export default function HistoryScreen() {
    const [countdownState, setCountdownState] = useState<PersistedCountdownState>();
    const [isLoading, setIsLoading] = useState(true);
    const listRef = useRef<FlatList>(null);

    useEffect(() => {
        const init = async () => {
            try {
                // Add a small delay to show loading animation
                await new Promise(resolve => setTimeout(resolve, 500));

                const value = await getFromStorage(countdownStorageKey);
                setCountdownState(value);

                // Configure layout animation for list appearance
                LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
            } catch (error) {
                console.error('Failed to load history:', error);
            } finally {
                setIsLoading(false);
            }
        };

        init();

        return () => {
            setCountdownState(undefined);
        };
    }, []);

    const handleItemPress = (timestamp: number) => {
        console.log('Pressed item:', format(timestamp, fullDateFormat));
        // Add haptic feedback if available
        // Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    };

    const renderItem = ({ item, index }: { item: number; index: number }) => (
        <AnimatedHistoryItem
            item={item}
            index={index}
            onPress={() => handleItemPress(item)}
        />
    );

    const renderLoadingItems = () => (
        <View>
            {[...Array(5)].map((_, index) => (
                <LoadingItem key={index} index={index} />
            ))}
        </View>
    );

    const EmptyStateComponent = () => {
        const emptyFadeAnim = useRef(new Animated.Value(0)).current;
        const emptySlideAnim = useRef(new Animated.Value(-30)).current; // Slide from left

        useEffect(() => {
            if (!isLoading) {
                Animated.parallel([
                    Animated.timing(emptyFadeAnim, {
                        toValue: 1,
                        duration: 500, // More subtle duration
                        useNativeDriver: true,
                    }),
                    Animated.timing(emptySlideAnim, {
                        toValue: 0,
                        duration: 500,
                        useNativeDriver: true,
                    }),
                ]).start();
            }
        }, [isLoading]);

        return (
            <Animated.View
                style={[
                    styles.listEmptyContainer,
                    {
                        opacity: emptyFadeAnim,
                        transform: [{ translateX: emptySlideAnim }], // Horizontal slide
                    },
                ]}
            >
                <Text style={styles.emptyIcon}>🧽</Text>
                <Text style={styles.emptyTitle}>No Car Washes Yet</Text>
                <Text style={styles.emptySubtitle}>
                    Start washing your car to see your history here!
                </Text>
            </Animated.View>
        );
    };

    if (isLoading) {
        return (
            <View style={styles.list}>
                <View style={styles.contentContainer}>
                    {renderLoadingItems()}
                </View>
            </View>
        );
    }

    return (
        <FlatList
            ref={listRef}
            style={styles.list}
            contentContainerStyle={styles.contentContainer}
            data={countdownState?.completedAtTimestamps}
            renderItem={renderItem}
            keyExtractor={(item, index) => `${item}-${index}`}
            ListEmptyComponent={<EmptyStateComponent />}
            showsVerticalScrollIndicator={false}
            // Performance optimizations
            removeClippedSubviews={true}
            maxToRenderPerBatch={10}
            windowSize={10}
            initialNumToRender={8}
            getItemLayout={(_, index) => ({
                length: 90, // item height + margin
                offset: 90 * index,
                index,
            })}
            // Pull to refresh (optional)
            onRefresh={async () => {
                const value = await getFromStorage(countdownStorageKey);
                setCountdownState(value);
            }}
            refreshing={false}
        />
    );
}

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