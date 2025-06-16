import { StatusBar } from 'expo-status-bar';
import {  StyleSheet, Text, View, Alert, TouchableOpacity,  } from 'react-native';
import { theme } from './theme';

export default function App() {
  const handleConfirm = () => {
    console.log('ok, I will not delete it')
  }
  const handleDelete = () => {
    Alert.alert('Delete', 'Are you sure you want to delete this item?', [
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
    <View style={styles.container}>
      
      <Text style={styles.text}>
        Coffee Shop
      </Text>
      <TouchableOpacity onPress={handleDelete} style={styles.button} activeOpacity={0.8}>
        <Text style={styles.buttonText}>Delete</Text>
      </TouchableOpacity>
      <StatusBar style="auto" />
    </View>
  );
}




const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#efefef',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignContent: 'center',
    alignItems: 'center',
    gap: 10,
  },
  text: {
    paddingVertical: 10,
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000000',
  },
  button: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    fontSize: 16,
    fontWeight: 'bold',
    color: '#ffffff',
    backgroundColor: theme.colors.primary,
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
