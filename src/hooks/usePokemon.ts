import useSWR from "swr";
import * as PokemonApi from "@/network/pokemonApi";
import { AxiosError } from "axios";

export default function usePokemon(name: string, evolution?: boolean) {
  const { data, isLoading, mutate } = useSWR(
    evolution ? `${name}-${evolution}` : name,
    async () => {
      try {
        let pokemon = await PokemonApi.getPokemon(name);

        if (evolution) {
          try {
            const pokemonSpecies = await PokemonApi.getPokemonSpecies(
              pokemon.id
            );
            const pokemonEvolutionChain =
              await PokemonApi.getPokemonEvolutionChain(
                pokemonSpecies.evolutionChainId
              );
            pokemon.species = pokemonSpecies;
            pokemon.evolutionChain = pokemonEvolutionChain;
          } catch (error) {}
        }

        return pokemon;
      } catch (error) {
        if (error instanceof AxiosError && error.response?.status === 404) {
          return null;
        } else {
          throw error;
        }
      }
    }
  );

  return {
    pokemon: data,
    pokemonLoading: isLoading,
    mutatePokemon: mutate,
  };
}
