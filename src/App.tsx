import { Grid, GridItem } from "@chakra-ui/react";
import NavBar from "./components/NavBar";
import ShoppingDetails from "./components/ShoppingDetails";

const App = () => {
  return (
    <Grid
      mx={"25%"}
      templateAreas={{
        base: `"nav" "base"`,
      }}
    >
      <GridItem area="nav" bg={"gray.100"}>
        <NavBar />
      </GridItem>
      <GridItem area="base">
        <ShoppingDetails />
      </GridItem>
    </Grid>
  );
};

export default App;
