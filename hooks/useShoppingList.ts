import { useState, useCallback } from "react";
import { ShoppingListItemType } from "../types";

export const useShoppingList = () => {
    const [value, setValue] = useState('');
    const [items, setItems] = useState<ShoppingListItemType[]>([]);

    const handleSubmit = useCallback(() => {
        if (value.trim() === '') {
        return;
        }
        setItems([...items, { 
        id: new Date().toISOString(), 
        name: value 
        }]);
        setValue('');
    }, [value, items]);

    const onDelete = useCallback((id: string) => () => {
        const newShoppingList = items.filter((item) => item.id !== id);
        setItems(newShoppingList);
    }, [items]);

    const onToggleComplete = useCallback((id: string) => () => {
        const newShoppingList = items.map((item) => {
            if (item.id === id) {
                return { ...item, completedAt: item.completedAt ? null : Date.now() };
            }
            return item;
        });
        setItems(newShoppingList);
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