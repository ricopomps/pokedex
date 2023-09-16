import {
  Move,
  Pokemon,
  PokemonPage,
  PokemonRaw,
  StatsName,
  StatsNameKeys,
} from "@/models/Pokemon";
import api from "./axiosIntance";
import { Charts, transformDataForChart } from "@/utils/chart";

interface GenerationMoves {
  generation: string;
  moves: (Move & { learnedAtLevel: number })[];
}

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

  const movesByGeneration: Record<string, GenerationMoves> = {};
  for (const moveData of pokemonRaw.moves) {
    for (const versionGroupDetail of moveData.version_group_details) {
      if (versionGroupDetail.move_learn_method.name === "level-up") {
        const generationName = versionGroupDetail.version_group.name;
        const { name: moveName, url } = moveData.move;

        if (!movesByGeneration[generationName]) {
          movesByGeneration[generationName] = {
            generation: generationName,
            moves: [],
          };
        }

        movesByGeneration[generationName].moves.push({
          name: moveName,
          url,
          learnedAtLevel: versionGroupDetail.level_learned_at,
        });
      }
    }
  }

  for (const generationMoves of Object.values(movesByGeneration)) {
    generationMoves.moves.sort((a, b) => a.learnedAtLevel - b.learnedAtLevel);
  }

  const movesList = Object.values(movesByGeneration);

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

export async function findPokemon(
  name: string,
  page: number,
  pageSize: number = 12
): Promise<PokemonPage> {
  const response = await api.get<PokemonPage>(`/pokemon`, {
    params: { limit: -1 },
  });

  const resultsFiltered = response.data.results.filter((pokemon) =>
    pokemon.name.includes(name)
  );

  const startIndex = (page - 1) * pageSize;
  const endIndex = startIndex + pageSize + 1;

  const paginatedResults = resultsFiltered.slice(startIndex, endIndex - 1);

  return {
    previous: page > 1 ? "true" : null,
    next: resultsFiltered.length > pageSize ? "true" : null,
    results: paginatedResults,
  };
}

function findPokemonInList(
  pokemonList: { name: string; url: string }[],
  name: string,
  page: number,
  pageSize: number = 12
): PokemonPage {
  const resultsFiltered = pokemonList.filter((pokemon) =>
    pokemon.name.includes(name)
  );

  const startIndex = (page - 1) * pageSize;
  const endIndex = startIndex + pageSize + 1;

  const paginatedResults = resultsFiltered.slice(startIndex, endIndex - 1);

  return {
    previous: page > 1 ? "true" : null,
    next: resultsFiltered.length > pageSize ? "true" : null,
    results: paginatedResults,
  };
}

interface PokemonByType {
  pokemon: { pokemon: { name: string; url: string } }[];
}

export async function findPokemonByType(type: string) {
  const response = await api.get<PokemonByType>(`/type/${type}`, {
    params: { limit: -1 },
  });

  return response.data.pokemon.map((pokemon) => ({
    name: pokemon.pokemon.name,
    url: pokemon.pokemon.url,
  }));
}

export async function findPokemonByNameAndType(
  name: string,
  page: number,
  type?: string
) {
  if (type) {
    const pokemons = await findPokemonByType(type);
    return findPokemonInList(pokemons, name, page);
  } else {
    return await findPokemon(name, page);
  }
}

export async function setNickname(pokemon: Pokemon, nickname: string) {
  return { ...pokemon, name: nickname };
}
