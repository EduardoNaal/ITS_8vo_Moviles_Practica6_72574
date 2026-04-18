import { JSX, ReactNode, useState } from "react";
import { EPokedexMenuOption, EPokedexScreen, MenuPokedexContext } from "./MenuPokedexContext";

export const MenuPokedexProvider = ({ children }: { children: ReactNode | JSX.Element | JSX.Element[] }) => {
  const [screen, setScreen] = useState(EPokedexScreen.MENU);
  const [menuOption, setMenuOption] = useState(EPokedexMenuOption.POKEDEX);
  const [pokemonIndex, setPokemonIndex] = useState(0);
  const [itemIndex, setItemIndex] = useState(0);

  return (
    <MenuPokedexContext.Provider
      value={{
        screen,
        setScreen,
        menuOption,
        setMenuOption,
        pokemonIndex,
        setPokemonIndex,
        itemIndex,
        setItemIndex,
      }}
    >
      {children}
    </MenuPokedexContext.Provider>
  )
}