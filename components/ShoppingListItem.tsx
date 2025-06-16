import React, { View, Alert, Text, TouchableOpacity, StyleSheet } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { theme } from "../theme";

type Props = {
    name: string;
    isCompleted?: boolean;
}

export function ShoppingListItem({name, isCompleted = false}: Props) {
    const handleConfirm = () => {
        console.log('ok, I will not delete it')
      }
      const handleDelete = () => {
        Alert.alert('Delete', `Are you sure you want to delete ${name}?`, [
          {
            text: 'Cancel',
            style: 'cancel',
          },
          {
            text: 'Delete',
            style: 'destructive',
            onPress: () => handleConfirm()
          }
        ])
    }

    return (
        <View style={[styles.container, isCompleted && styles.completed]}>
            <Text style={[styles.text, isCompleted && styles.completedText]}>
                {name}
            </Text>
            <TouchableOpacity style={styles.button} onPress={handleDelete} activeOpacity={0.8}>
                <AntDesign name="closecircle" size={18} color={!isCompleted ? theme.colors.danger : theme.colors.grayDark} />
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: 10,
        width: '100%',
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
        paddingHorizontal: 20,
        paddingVertical: 10,
    },
    toggle: {
        paddingHorizontal: 20,
        paddingVertical: 10,
        fontSize: 16,
        fontWeight: 'bold',
        color: '#ffffff',
        backgroundColor: theme.colors.grayDark,
        justifyContent: 'center',
    },
    completedText: {
        textDecorationLine: 'line-through',
        color: theme.colors.grayDark,
    },
    completed: {
        backgroundColor: theme.colors.grayLight,
        borderBottomColor: theme.colors.gray,
        opacity: 0.5,
    },
    text: {
      paddingVertical: 10,
      fontSize: 16,
      fontWeight: 'bold',
      color: '#000000',
    },
    button: {
      paddingHorizontal: 10,
      paddingVertical: 10,
      fontSize: 12,
      fontWeight: 'bold',
      color: '#ffffff',
      justifyContent: 'center',
      borderRadius: 6
    },
    buttonText: {
      color: theme.colors.light,
      fontWeight: 'bold',
      textTransform: 'uppercase',
      letterSpacing: 1
    }
  });