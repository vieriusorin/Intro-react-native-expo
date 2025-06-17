import React, {  FlatList, StatusBar, StyleSheet, Text, View } from 'react-native';
import { ShoppingListItem } from '../components/ShoppingListItem';
import { useShoppingList } from '../hooks/useShoppingList';
import { Input } from '../components/ui/Input';

export default function App() {
  const { value, items, handleSubmit, setValue, onDelete, onToggleComplete } = useShoppingList();
  return (
    <View style={styles.container}>
      <Input 
        value={value}
        onChangeText={setValue}
        onSubmitEditing={handleSubmit}
      />
      
      <FlatList
        style={styles.flatList}
        data={items}
        renderItem={({ item }) => <ShoppingListItem 
          name={item.name} 
          onDelete={onDelete(item.id)}
          onToggleComplete={onToggleComplete(item.id)}
          isCompleted={!!item.completedAt}
        />}
        ListEmptyComponent={<View style={styles.emptyList}><Text>No items</Text></View>}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: StatusBar.currentHeight + 10,
    backgroundColor: '#efefef',
    paddingHorizontal: 20,
  },
  flatList: {
    flex: 1,
  },
  list: {
    paddingTop: 10,
  },
  emptyList: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 20,
  }
});