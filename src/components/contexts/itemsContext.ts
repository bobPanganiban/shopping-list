import { Dispatch, SetStateAction } from "react";
import { Item } from "../ShoppingList";
import React from "react";

interface UserContextType {
  shoppingItems: Item[];
  setshoppingItems: Dispatch<SetStateAction<Item[]>>;
}

const UserContext = React.createContext<UserContextType>({} as UserContextType);

export default UserContext;
