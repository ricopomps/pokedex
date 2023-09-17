import { MoveInfoRaw } from "@/models/MoveInfo";
import {
  GenerationMoves,
  Pokemon,
  PokemonPage,
  PokemonRaw,
} from "@/models/Pokemon";
import api from "./axiosIntance";
import { convertMoveInfo } from "./convertMove";
import { convertPokemonRaw } from "./convertPokemon";

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

export async function getMoveData(
  moveName: string,
  generationMoves: GenerationMoves
) {
  const moveDataRaw = await api.get<MoveInfoRaw>(`/move/${moveName}`);
  return convertMoveInfo(moveDataRaw.data, generationMoves);
}
