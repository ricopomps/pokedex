import { Pokemon, PokemonPage } from "@/models/Pokemon";
import api from "./axiosIntance";

export async function getPokemon(name: string) {
  const response = await api.get<Pokemon>(`/pokemon/${name}`);
  return response.data;
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
