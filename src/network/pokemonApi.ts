import {
  Pokemon,
  PokemonPage,
  PokemonRaw,
  StatsName,
  StatsNameKeys,
} from "@/models/Pokemon";
import api from "./axiosIntance";
import { Charts, transformDataForChart } from "@/utils/chart";

function convertPokemonRaw(pokemonRaw: PokemonRaw): Pokemon {
  const pokemon: Pokemon = {
    name: pokemonRaw.name,
    types: pokemonRaw.types.map((typeData) => ({
      name: typeData.type.name,
      url: typeData.type.url,
    })),
    weight: pokemonRaw.weight / 10,
    height: pokemonRaw.height * 10,
    sprites: {
      baseImage: pokemonRaw.sprites.other["official-artwork"].front_default,
      shiny: pokemonRaw.sprites.other["official-artwork"].front_shiny,
    },
    stats: transformDataForChart(
      [
        {
          label: "STATS",
          values: pokemonRaw.stats.map((stat) => ({
            label: StatsName[stat.stat.name as StatsNameKeys],
            value: stat.base_stat,
          })),
        },
      ],
      Charts.stats
    ),
  };

  return pokemon;
}

export async function getPokemon(name: string) {
  const response = await api.get<PokemonRaw>(`/pokemon/${name}`);
  return convertPokemonRaw(response.data);
}

export async function getPokemonPage(page: number) {
  const pageSize = 12;
  const response = await api.get<PokemonPage>(`/pokemon`, {
    params: { limit: pageSize, offset: pageSize * (page - 1) },
  });
  return response.data;
}

export async function setNickname(pokemon: Pokemon, nickname: string) {
  return { ...pokemon, name: nickname };
}
