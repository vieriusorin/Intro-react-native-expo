import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import { Link, Stack } from "expo-router";
import { theme } from "../../theme";
import { Pressable } from "react-native";

export default function Layout() {
    return (
        <Stack>
            <Stack.Screen 
                name="index" 
                options={{ 
                    title: 'Counter',
                    headerRight: () => (
                        <Link href="/counter/history" asChild>
                            <Pressable hitSlop={20} accessibilityLabel="History">
                                <FontAwesome6 name="info" size={24} color={theme.colors.grayDark} />
                            </Pressable>
                        </Link>
                    )
                }} 
            />
        </Stack>
    )
}