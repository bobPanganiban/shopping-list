import { Box, Button, HStack, Input, Select, Text } from "@chakra-ui/react";
import ShoppingList, { Item } from "./ShoppingList";
import { FieldValues, useForm } from "react-hook-form";
import { useState } from "react";
import UserContext from "./contexts/itemsContext";
import SaveModal from "./SaveModal";
import Types from "../assets/Types";

interface FormData {
  listName: string;
  type: string;
}

const ShoppingDetails = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  const [isModalOpen, setModalOpen] = useState(false);
  const [shoppingItems, setshoppingItems] = useState<Item[]>([]);

  const onSubmit = () => {
    validateFields();
  };

  const validateFields = () => {
    const hasEmptyField = shoppingItems.some(
      (item) => item.name === "" || item.quantity === 0
    );
    setModalOpen(!hasEmptyField);
  };

  return (
    <UserContext.Provider value={{ shoppingItems, setshoppingItems }}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <HStack justifyContent="space-between" py={3}>
          <Box width="50%">
            <Text mb="8px">
              List Name
              <span color="red">
                *{" "}
                {errors.listName?.type === "required" &&
                  "List name is required"}
              </span>
            </Text>
            <Input type="text" {...register("listName", { required: true })} />
          </Box>
          <Box width="50%">
            <Text mb="8px">
              Type
              <span color="red">
                * {errors.type?.type === "required" && "Type is required"}
              </span>
            </Text>
            <Select {...register("type", { required: true })} name="type">
              {Types.map((type, index) => (
                <option key={index} value={type}>
                  {type}
                </option>
              ))}
            </Select>
          </Box>
        </HStack>
        <ShoppingList />
        <HStack justifyContent={"end"}>
          <Button type="submit">Save</Button>
          <Button variant={"outline"}>Cancel</Button>
        </HStack>
      </form>
      <SaveModal
        modalOpen={isModalOpen}
        closeModal={() => setModalOpen(false)}
      />
    </UserContext.Provider>
  );
};

export default ShoppingDetails;
