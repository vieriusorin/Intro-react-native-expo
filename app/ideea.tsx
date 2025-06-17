import { Text, View, StyleSheet } from "react-native";

export default function IdeeaScreen() {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Ideea</Text>
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
    },
})