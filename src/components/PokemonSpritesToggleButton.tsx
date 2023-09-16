"use client";

import { Pokemon } from "@/models/Pokemon";
import styles from "@/styles/PokemonSpritesToggleButton.module.css";

interface PokemonSpritesToggleButtonProps {
  pokemon: Pokemon;
  changeCurrentImage: (image: string) => void;
  currentImage: string;
}
export default function PokemonSpritesToggleButton({
  pokemon,
  changeCurrentImage,
  currentImage,
}: PokemonSpritesToggleButtonProps) {
  return (
    <div className={styles.buttonContainer}>
      <div
        onClick={() => {
          console.log("default");
          if (pokemon.sprites.baseImage == currentImage) return;
          changeCurrentImage(pokemon.sprites.baseImage);
        }}
      >
        default
      </div>
      <div
        onClick={() => {
          console.log("shiny");
          if (pokemon.sprites.shiny == currentImage) return;
          changeCurrentImage(pokemon.sprites.shiny);
        }}
      >
        shiny
      </div>
    </div>
  );
}
