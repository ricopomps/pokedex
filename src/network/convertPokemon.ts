import {
  PokemonRaw,
  Pokemon,
  StatsName,
  StatsNameKeys,
  GenerationMoves,
} from "@/models/Pokemon";
import { transformDataForChart, Charts } from "@/utils/chart";

export function convertPokemonRaw(pokemonRaw: PokemonRaw): Pokemon {
  const pokemon: Pokemon = {
    id: pokemonRaw.id,
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
    moves: convertMoves(pokemonRaw),
  };

  return pokemon;
}

function convertMoves(pokemonRaw: PokemonRaw) {
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
  return movesList;
}
