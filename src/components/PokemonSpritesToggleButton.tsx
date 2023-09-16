"use client";

import { Sprites } from "@/models/Pokemon";
import styles from "@/styles/PokemonSpritesToggleButton.module.css";
import shinyButtonDark from "@/assets/iconShinyDark.png";
import shinyButtonLight from "@/assets/iconShinyLigth.png";
import Image from "next/image";

interface PokemonSpritesToggleButtonProps {
  pokemonSprites: Sprites;
  changeCurrentImage: (image: string) => void;
  currentImage: string;
}
export default function PokemonSpritesToggleButton({
  pokemonSprites,
  changeCurrentImage,
  currentImage,
}: PokemonSpritesToggleButtonProps) {
  function handleImageChange(image: string) {
    if (currentImage === image) {
      const defaultImage = pokemonSprites.baseImage;
      changeCurrentImage(defaultImage);
      return;
    }
    changeCurrentImage(image);
  }

  return (
    <div className={styles.buttonContainer}>
      <div onClick={() => handleImageChange(pokemonSprites.shiny)}>
        <span title="Shiny">
          {currentImage === pokemonSprites.shiny ? (
            <Image
              src={shinyButtonDark}
              alt="Profile picture"
              width={40}
              height={40}
              className={`${styles.icon} ${styles.iconSelected}`}
            />
          ) : (
            <Image
              src={shinyButtonLight}
              alt="Profile picture"
              width={40}
              height={40}
              className={`${styles.icon}`}
            />
          )}
        </span>
      </div>
    </div>
  );
}
