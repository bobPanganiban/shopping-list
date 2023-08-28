import { Flex, Input, Select, Box, Text, IconButton } from "@chakra-ui/react";
import { FaTrash } from "react-icons/fa";
import { GrDrag } from "react-icons/gr";
import { Item } from "./ShoppingList";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

interface Props {
  itemDetails: Item;
  onNameChange: (name: string) => void;
  onQuantityChange: (quantity: number) => void;
  onDelete: () => void;
}

const ShoppingListItem = ({
  itemDetails: { id, name, quantity },
  onNameChange,
  onQuantityChange,
  onDelete,
}: Props) => {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: id });

  const style = {
    transition,
    transform: CSS.Transform.toString(transform),
  };

  return (
    // sets the draggable item
    <Box
      ref={setNodeRef}
      style={style}
      borderWidth="1px"
      borderRadius="md"
      p="2"
      my="2"
    >
      <Flex alignItems="left" justifyContent="space-between">
        <Flex alignItems="center" width="60%">
          {/* sets the element where dragging is possible */}
          <IconButton
            {...attributes}
            {...listeners}
            icon={<GrDrag />}
            aria-label="Drag item"
            variant="ghost"
            mr="2"
          />
          <Text minWidth="80px">Item Name:</Text>
          <Flex flex="1" ml={2}>
            <Input
              placeholder="Enter item name"
              value={name}
              onChange={(e) => onNameChange(e.target.value)}
            />
          </Flex>
        </Flex>
        <Flex alignItems="center" width="35%">
          <Text mr="2">Quantity:</Text>
          <Select
            value={quantity}
            onChange={(e) => onQuantityChange(parseInt(e.target.value))}
            placeholder="Select quantity"
          >
            {[...Array(12).keys()].map((index) => (
              <option key={index} value={index + 1}>
                {index + 1}
              </option>
            ))}
          </Select>
        </Flex>
        <IconButton
          icon={<FaTrash />}
          aria-label="Delete item"
          colorScheme="red"
          onClick={() => {
            // Handle the delete action here
            onDelete();
          }}
        />
      </Flex>
    </Box>
  );
};

export default ShoppingListItem;
