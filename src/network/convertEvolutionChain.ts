import { EvolutionChain, EvolutionChainRaw } from "@/models/EvolutonCain";

export function convertEvolutionChain(evolutionChainRaw: EvolutionChainRaw) {
  const evolutionChain: EvolutionChain = {
    id: evolutionChainRaw.id,
  };

  return evolutionChain;
}
