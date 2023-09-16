"use client";

import { useState } from "react";
import PokemonSpritesToggleButton from "./PokemonSpritesToggleButton";
import { Sprites } from "@/models/Pokemon";
import Image from "next/image";
interface PokemonImageProps {
  pokemonName: string;
  pokemonSprites: Sprites;
}

export default function PokemonImage({
  pokemonName,
  pokemonSprites,
}: PokemonImageProps) {
  const [currentImage, setCurrentImage] = useState(
    pokemonSprites.baseImage || ""
  );

  function handleChangeCurrentImage(image: string) {
    console.log("setCurrentImage", image);
    setCurrentImage(image);
  }

  return (
    <div>
      <PokemonSpritesToggleButton
        pokemonSprites={pokemonSprites}
        changeCurrentImage={handleChangeCurrentImage}
        currentImage={currentImage}
      />
      {currentImage && (
        <Image
          src={currentImage}
          alt={`Pokemon: ${pokemonName}`}
          width={400}
          height={400}
        />
      )}
    </div>
  );
}
