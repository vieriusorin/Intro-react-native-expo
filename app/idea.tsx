import { Link, useRouter, usePathname } from "expo-router";
import { Text, View, StyleSheet, TouchableOpacity } from "react-native";

export default function IdeeaScreen() {
    const pathname = usePathname();
    const router = useRouter();
    return (
        <View style={styles.container}>
            <View style={styles.links}>
                <TouchableOpacity onPress={() => router.navigate('/counter')}>
                    <Text style={styles.link}>Counter</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => router.navigate('/ideea')}>
                    <Text style={styles.link}>Ideea</Text>
                </TouchableOpacity>
            </View>
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
    links: {
        flexDirection: 'row',
        gap: 10,
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        paddingVertical: 20,
        backgroundColor: '#fff',
      },
      link: {
        fontSize: 16,
        color: '#000',
        textDecorationColor: '#000',
        textDecorationStyle: 'solid',
      },
      linkActive: {
        color: '#000',
        textDecorationColor: '#000',
        textDecorationStyle: 'solid',
      }

})