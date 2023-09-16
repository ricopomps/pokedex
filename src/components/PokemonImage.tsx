"use client";

import { useState } from "react";
import PokemonSpritesToggleButton from "./PokemonSpritesToggleButton";
import { Pokemon } from "@/models/Pokemon";
import Image from "next/image";

interface PokemonImageProps {
  pokemon: Pokemon;
}

export default function PokemonImage({ pokemon }: PokemonImageProps) {
  const [currentImage, setCurrentImage] = useState(
    pokemon.sprites.baseImage || ""
  );

  function handleChangeCurrentImage(image: string) {
    console.log("setCurrentImage", image);
    setCurrentImage(image);
  }

  return (
    <div>
      <PokemonSpritesToggleButton
        pokemon={pokemon}
        changeCurrentImage={handleChangeCurrentImage}
        currentImage={currentImage}
      />
      {currentImage && (
        <Image
          src={currentImage}
          alt={`Pokemon: ${pokemon.name}`}
          width={400}
          height={400}
        />
      )}
    </div>
  );
}
