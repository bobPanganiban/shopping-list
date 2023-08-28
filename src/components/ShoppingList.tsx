import { Button, Text } from "@chakra-ui/react";
import { useContext } from "react";
import ShoppingListItem from "./ShoppingListItem";
import UserContext from "./contexts/itemsContext";
import { DndContext, closestCenter, DragEndEvent } from "@dnd-kit/core";
import { SortableContext, arrayMove } from "@dnd-kit/sortable";

export interface Item {
  id: number;
  name: string;
  quantity: number;
}

const ShoppingList = () => {
  const { shoppingItems, setshoppingItems } = useContext(UserContext);

  const handleItemChange = (index: number, newItem: Item) => {
    const updatedItems = [...shoppingItems];
    updatedItems[index] = newItem;
    setshoppingItems(updatedItems);
    console.log(updatedItems);
  };

  const onDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (active.id === over?.id) return;
    setshoppingItems((shoppingItems) => {
      const oldIndex = shoppingItems.findIndex(
        (shoppingItem) => shoppingItem.id === active.id
      );
      const newIndex = shoppingItems.findIndex(
        (shoppingItem) => shoppingItem.id === over?.id
      );
      return arrayMove(shoppingItems, oldIndex, newIndex);
    });
  };

  return (
    <>
      <Button
        width={"100%"}
        minWidth="80px"
        onClick={() =>
          setshoppingItems([
            ...shoppingItems,
            { id: shoppingItems.length + 1, name: "", quantity: 0 },
          ])
        }
      >
        Add an Item
      </Button>
      {shoppingItems.length === 0 && <Text>No Items</Text>}
      <DndContext collisionDetection={closestCenter} onDragEnd={onDragEnd}>
        <SortableContext items={shoppingItems}>
          {shoppingItems.map((item, index) => (
            <ShoppingListItem
              key={item.id}
              itemDetails={item}
              onNameChange={(e) =>
                handleItemChange(index, { ...item, name: e })
              }
              onQuantityChange={(e) =>
                handleItemChange(index, { ...item, quantity: e })
              }
              onDelete={() =>
                setshoppingItems(shoppingItems.filter((item, i) => i !== index))
              }
            />
          ))}
        </SortableContext>
      </DndContext>
    </>
  );
};

export default ShoppingList;
