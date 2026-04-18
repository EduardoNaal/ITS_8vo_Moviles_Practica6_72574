import { createContext } from "react";

export enum EPokedexMenuOption {
  POKEDEX = 1,
  PACK = 2,
  EXIT = 3
}

export enum EPokedexScreen {
  MENU,
  POKEDEX = 1,
  PACK = 2,
  EXIT = 3
}

export type TMenuPokedexContext = {
  screen: EPokedexScreen;
  menuOption: EPokedexMenuOption;
  pokemonIndex: number;
  itemIndex: number;
  setScreen: (option: EPokedexScreen) => void;
  setMenuOption: (option: EPokedexMenuOption) => void;
  setPokemonIndex: (index: number) => void;
  setItemIndex: (index: number) => void;
}

export const MenuPokedexContext = createContext<TMenuPokedexContext>({
  screen: EPokedexScreen.MENU,
  menuOption: EPokedexMenuOption.POKEDEX,
  pokemonIndex: 0,
  itemIndex: 0,
  setScreen: () => {},
  setMenuOption: () => {},
  setPokemonIndex: () => {},
  setItemIndex: () => {},
});