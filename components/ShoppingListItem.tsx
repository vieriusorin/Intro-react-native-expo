import React, {  Alert, Text, TouchableOpacity, StyleSheet, Pressable } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { theme } from "../theme";
import { TShoppingListItemProps } from "../types";

export function ShoppingListItem({name, isCompleted = false, onDelete, onToggleComplete}: TShoppingListItemProps) {
    const handleDelete = () => {
      Alert.alert('Delete', `Are you sure you want to delete ${name}?`, [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: () => onDelete()
        }
      ])
    }

    return (
      <Pressable 
        style={[styles.container, isCompleted && styles.completed]}
        onPress={onToggleComplete}
      >
          <Text 
            numberOfLines={1}
            ellipsizeMode="tail"
            style={[styles.text, isCompleted && styles.completedText]}>
              {name}
          </Text>
          <TouchableOpacity style={styles.button} onPress={handleDelete} activeOpacity={0.8}>
              <AntDesign name={isCompleted ? 'checkcircle' : 'closecircle'} size={18} color={!isCompleted ? theme.colors.danger : theme.colors.green} />
          </TouchableOpacity>
      </Pressable>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        flex: 1,
        justifyContent: 'space-between',
        gap: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
        paddingHorizontal: 20,
        paddingVertical: 10,
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
      flex: 1
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
  });