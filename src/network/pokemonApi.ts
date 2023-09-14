import { Pokemon, PokemonPage } from "@/models/Pokemon";
import api from "./axiosIntance";

export async function getPokemon(name: string) {
  await delay();
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

async function delay() {
  const delay = Math.random() * 2000;
  await new Promise((r) => setTimeout(r, delay));
}

export async function setNickname(pokemon: Pokemon, nickname: string) {
  return { ...pokemon, name: nickname };
}
