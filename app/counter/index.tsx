import { Text, View, StyleSheet, TouchableOpacity } from "react-native";
import { theme } from "../../theme";
import { registerForPushNotificationsAsync } from "../../utils/registerForPushNotificationsAsync";

export default function CounterScreen() {
    const handleRequestPermission = async () => {
        const status = await registerForPushNotificationsAsync();
        console.log('status', status);
    }
    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.button} onPress={handleRequestPermission}>
                <Text style={styles.buttonText}>Request Permission</Text>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    button: {
        backgroundColor: theme.colors.dark,
        padding: 10,
        borderRadius: 6,
    },
    buttonText: {
        color: theme.colors.light,
        fontSize: 16,
        textTransform: 'uppercase',
        fontWeight: 'bold',
        letterSpacing: 1
    },
    title: {
        fontSize: 24
    }
})