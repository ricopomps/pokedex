import { GenerationMoves, Move } from "@/models/Pokemon";
import { convertMoveInfo } from "@/network/convertMove";
import * as PokemonApi from "@/network/pokemonApi";
import useSWR from "swr";

export default function usePokemonMoves(
  pokemonName: string,
  generationMoves: GenerationMoves
) {
  const { moves, generation } = generationMoves;
  const fetchMoveData = async (move: Move) => {
    try {
      return await PokemonApi.getMoveDataRaw(move.name);
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
    async () => {
      const rawData = await fetchAllMoveData();
      const moveData = rawData.map((raw) =>
        convertMoveInfo(raw, generationMoves)
      );
      return moveData;
    }
  );

  generationMoves.moves = generationMoves.moves.map((item) => ({
    ...item,
    used: undefined,
  }));

  return {
    moves: data,
    movesLoading: isLoading,
  };
}
