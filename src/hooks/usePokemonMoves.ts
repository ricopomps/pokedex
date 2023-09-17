import { GenerationMoves, Move } from "@/models/Pokemon";
import * as PokemonApi from "@/network/pokemonApi";
import useSWR from "swr";

export default function usePokemonMoves(
  pokemonName: string,
  generationMoves: GenerationMoves
) {
  const { moves, generation } = generationMoves;

  const fetchMoveData = async (move: Move) => {
    try {
      return await PokemonApi.getMoveData(move.name, generationMoves);
    } catch (error) {
      throw error;
    }
  };

  const fetchAllMoveData = async () => {
    const movePromises = moves.map((move) => fetchMoveData(move));
    return await Promise.all(movePromises);
  };

  const { data, isLoading } = useSWR(
    `${pokemonName}-moves-${generation}`,
    async () => await fetchAllMoveData()
  );

  return {
    moves: data,
    movesLoading: isLoading,
  };
}
