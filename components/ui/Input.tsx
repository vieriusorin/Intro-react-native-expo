import { TextInput, TextInputProps, StyleSheet } from "react-native";

export const Input = (props: TextInputProps) => {
    return (
        <TextInput
        style={styles.textInput}
        placeholder="Add item" 
        keyboardAppearance='dark'
        keyboardType='default'
        returnKeyType='done'
        {...props} />
    )
}

const styles = StyleSheet.create({
    textInput: {
        height: 50,
        marginHorizontal: 12,
        marginBottom: 20,
        padding: 12,
        backgroundColor: 'white',
        borderWidth: 2,
        borderColor: 'gray',
        borderRadius: 15,
        fontSize: 16,
    },
})
