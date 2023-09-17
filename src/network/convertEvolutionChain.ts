import { EvolutionChain, EvolutionChainRaw } from "@/models/EvolutionChain";

export function convertEvolutionChain(evolutionChainRaw: EvolutionChainRaw) {
  try {
    const evolutionChain: EvolutionChain = {
      id: evolutionChainRaw.id,
      firstPokemon: evolutionChainRaw.chain.species.name,
      firstEvolutionTrigger: evolutionChainRaw.chain?.evolves_to?.[0]
        ?.evolution_details?.[0]?.trigger?.name
        ? {
            trigger:
              evolutionChainRaw.chain.evolves_to?.[0].evolution_details?.[0]
                ?.trigger?.name,
            minLevel:
              evolutionChainRaw.chain.evolves_to?.[0].evolution_details?.[0]
                ?.min_level,
          }
        : undefined,
      secondPokemon: evolutionChainRaw.chain?.evolves_to?.[0]?.species?.name,
      secondEvolutionTrigger: evolutionChainRaw.chain?.evolves_to?.[0]
        ?.evolves_to?.[0]?.evolution_details?.[0]?.trigger?.name
        ? {
            trigger:
              evolutionChainRaw.chain.evolves_to?.[0].evolves_to?.[0]
                ?.evolution_details?.[0]?.trigger?.name,
            minLevel:
              evolutionChainRaw.chain.evolves_to?.[0].evolves_to?.[0]
                ?.evolution_details?.[0]?.min_level,
          }
        : undefined,
      thirdPokemon:
        evolutionChainRaw.chain.evolves_to?.[0]?.evolves_to?.[0]?.species?.name,
    };
    console.log("evolutionChain", evolutionChain);
    return evolutionChain;
  } catch (error) {
    console.error(error);
  }
}
