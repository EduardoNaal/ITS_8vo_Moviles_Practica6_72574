import { useContext } from "react";
import { EPokedexScreen, MenuPokedexContext } from "../../contexts/MenuPokedexContext";

export const Cross = () => {
  const {
    screen,
    menuOption,
    setMenuOption,
    pokemonIndex,
    setPokemonIndex,
    itemIndex,
    setItemIndex
  } = useContext(MenuPokedexContext);

  const handleUp = () => {
    if (screen === EPokedexScreen.MENU) {
      const newOption = menuOption - 1 < 1 ? 3 : menuOption - 1;
      setMenuOption(newOption);
    } else if (screen === EPokedexScreen.POKEDEX) {
      const newIndex = pokemonIndex - 1 < 0 ? 150 : pokemonIndex - 1;
      setPokemonIndex(newIndex);
    } else if (screen === EPokedexScreen.PACK) {
      const newIndex = itemIndex - 1 < 0 ? 49 : itemIndex - 1;
      setItemIndex(newIndex);
    }
  };

  const handleDown = () => {
    if (screen === EPokedexScreen.MENU) {
      const newOption = menuOption + 1 > 3 ? 1 : menuOption + 1;
      setMenuOption(newOption);
    } else if (screen === EPokedexScreen.POKEDEX) {
      const newIndex = pokemonIndex + 1 > 150 ? 0 : pokemonIndex + 1;
      setPokemonIndex(newIndex);
    } else if (screen === EPokedexScreen.PACK) {
      const newIndex = itemIndex + 1 > 49 ? 0 : itemIndex + 1;
      setItemIndex(newIndex);
    }
  };

  return (
    <div id="cross">
      <div id="leftcross" className="gameboy-button">
        <div id="leftT"></div>
      </div>
      <div id="topcross" className="gameboy-button" onClick={handleUp}>
        <div id="upT"></div>
      </div>
      <div id="rightcross" className="gameboy-button">
        <div id="rightT"></div>
      </div>
      <div id="midcross" className="gameboy-button">
        <div id="midCircle"></div>
      </div>
      <div id="botcross" className="gameboy-button" onClick={handleDown}>
        <div id="downT"></div>
      </div>
    </div>
  );
};