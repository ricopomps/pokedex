import { Specie, SpecieRaw } from "@/models/Specie";

function extractIdFromUrl(url: string) {
  const parts = url.split("/");

  const id = parts.slice(-2, -1)[0];

  return parseInt(id, 10);
}

export function convertSpecie(specieRaw: SpecieRaw) {
  const specie: Specie = {
    id: specieRaw.id,
    evolutionChainId: extractIdFromUrl(specieRaw.evolution_chain.url),
  };

  return specie;
}
