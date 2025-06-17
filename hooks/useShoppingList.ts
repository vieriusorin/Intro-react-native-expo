import { useState, useCallback, useEffect } from "react";
import { ShoppingListItemType } from "../types";
import { getFromStorage, saveToStorage } from "../utils/storage";
import { LayoutAnimation } from "react-native";
import * as Haptics from 'expo-haptics';

const STORAGE_KEY = 'shopping-list';

export const useShoppingList = () => {
    const [value, setValue] = useState('');
    const [items, setItems] = useState<ShoppingListItemType[]>([]);

    useEffect(() => {
        const fetchInitialData = async () => {
            const data = await getFromStorage(STORAGE_KEY);
            if (data) {
                LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
                setItems(data);
            }
        };
        fetchInitialData();
    },[]);

    useEffect(() => {
        saveToStorage(STORAGE_KEY, items);
    }, [items]);

    const handleSubmit = useCallback(() => {
        if (value.trim() === '') {
        return;
        }
        LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
        setItems([...items, { 
            id: new Date().toISOString(),
            lastUpdated: Date.now(),
            name: value 
        }]);
        setValue('');
    }, [value, items]);

    const onDelete = useCallback((id: string) => () => {
        const newShoppingList = items.filter((item) => item.id !== id);
        LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
        setItems(newShoppingList);
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    }, [items]);

    const onToggleComplete = useCallback((id: string) => () => {
        const newShoppingList = items.map((item) => {
            if (item.id === id) {
                if (item.completedAt) {
                    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
                } else {
                    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
                }
                return { 
                    ...item, 
                    completedAt: item.completedAt ? null : Date.now(), 
                    lastUpdated: Date.now() 
                };
            }
            return item;
        });
        LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
        setItems(newShoppingList as ShoppingListItemType[]);
    }, [items]);
    

    return {
        value,
        items,
        handleSubmit,
        setValue,
        onDelete,
        onToggleComplete
    }

}