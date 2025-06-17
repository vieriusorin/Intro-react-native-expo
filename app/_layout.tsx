import { Tabs } from "expo-router";
import { theme } from "../theme";
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';

export default function RootLayout() {
    return (
        <Tabs
            screenOptions={{
                headerBackButtonDisplayMode: 'minimal',
                headerShown: false,
                tabBarAccessibilityLabel: 'Main Navigation',
                tabBarActiveBackgroundColor: theme.colors.grayLight,
                tabBarInactiveBackgroundColor: theme.colors.grayLight,
                tabBarActiveTintColor: theme.colors.grayDark,
                tabBarInactiveTintColor: theme.colors.grayDark,
                tabBarStyle: {
                    backgroundColor: theme.colors.grayLight,
                },
            }}
        >
            <Tabs.Screen
                name="index"
                options={{
                    title: 'Shopping List',
                    headerStyle: {
                        backgroundColor: theme.colors.primary,
                    },
                    headerTintColor: theme.colors.light,
                    headerTitleStyle: {
                        fontWeight: 'bold' as const
                    },
                    tabBarIcon: ({ color, size, focused }) => (
                        <FontAwesome6 
                        name="cart-shopping" color={focused ? theme.colors.grayDark : color} size={size} />
                    ),
                    tabBarLabelStyle: {
                        fontSize: 14,
                        fontWeight: 'bold',
                    },
                    tabBarStyle: {
                        backgroundColor: theme.colors.grayLight,
                    },
                }}
            />
            <Tabs.Screen name="counter"
                options={{
                    title: 'Counter',
                    headerStyle: {
                        backgroundColor: theme.colors.primary,
                    },
                    headerShown: false,
                    headerTintColor: theme.colors.light,
                    headerTitleStyle: {
                        fontWeight: 'bold',
                    },
                    tabBarIcon: ({ color, size, focused }) => (
                        <FontAwesome6 
                            name="clock" 
                            color={focused ? theme.colors.grayDark : color} 
                            size={size} 
                        />
                    ),
                    tabBarLabelStyle: {
                        fontSize: 14,
                        fontWeight: 'bold',
                    },
                    tabBarStyle: {
                        backgroundColor: theme.colors.grayLight,
                    },
                }}
            />
            <Tabs.Screen name="ideea" 
                options={{
                    title: 'Ideea',
                    headerStyle: {
                        backgroundColor: theme.colors.primary,
                    },
                    headerTintColor: theme.colors.light,
                    headerTitleStyle: {
                        fontWeight: 'bold',
                    },
                    tabBarLabelStyle: {
                        fontSize: 14,
                        fontWeight: 'bold',
                    },
                    tabBarIcon: ({ color, size, focused }) => (
                        <FontAwesome6 
                            name="lightbulb" 
                            color={focused ? theme.colors.grayDark : color} 
                            size={size} 
                        />
                    ),
                    tabBarStyle: {
                        backgroundColor: theme.colors.grayLight,
                    },
                }} 
            />
        </Tabs>
    )
}