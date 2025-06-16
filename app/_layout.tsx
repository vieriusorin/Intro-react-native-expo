import { Stack } from "expo-router";
import { theme } from "../theme";

export default function RootLayout() {
    return (
        <Stack>
            <Stack.Screen name="index" options={{ 
                title: 'Shopping List',
                headerStyle: {
                    backgroundColor: theme.colors.primary,
                },
                headerTintColor: theme.colors.light,
                headerTitleStyle: {
                    fontWeight: 'bold',
                },
             }} />
        </Stack>
    )
}