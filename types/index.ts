export type ShoppingListItemType = Readonly<{
    id: string;
    name: string;
    completedAt?: number
  }>

export  type TShoppingListItemProps = {
    name: string;
    isCompleted?: boolean;
    onDelete: () => void;
    onToggleComplete: () => void;
}