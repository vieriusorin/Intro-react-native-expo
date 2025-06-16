import { Text, View, StyleSheet } from "react-native";

export default function CounterScreen() {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Counter</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    title: {
        fontSize: 24,
    }
})