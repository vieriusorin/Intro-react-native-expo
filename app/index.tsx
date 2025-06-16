
import React, {  StyleSheet, View,   } from 'react-native';
import { ShoppingListItem } from '../components/ShoppingListItem';
import { StatusBar } from 'expo-status-bar';
import { Link, usePathname, useRouter } from 'expo-router';

export default function App() {
  const pathname = usePathname();

  return (
    <View style={styles.container}>
      <View style={styles.links}>
        <Link href="/counter" style={[styles.link, pathname === '/counter' && styles.linkActive]}>Counter</Link>
        <Link href="/idea" style={[styles.link, pathname === '/idea' && styles.linkActive]}>Ideea</Link>
      </View>
      <ShoppingListItem name="Coffees" isCompleted={true} />
      <ShoppingListItem name="Bread" />
      <ShoppingListItem name="Milk" />
      <ShoppingListItem name="Eggs" />
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
    flexDirection: 'column',
    alignContent: 'center',
    gap: 10,
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
});
