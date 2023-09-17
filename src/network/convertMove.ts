import { MoveInfo, MoveInfoRaw } from "@/models/MoveInfo";
import { GenerationMoves } from "@/models/Pokemon";

export function convertMoveInfo(
  m: MoveInfoRaw,
  generationMoves: GenerationMoves
): MoveInfo {
  console.log(generationMoves);
  let moveInfo: MoveInfo = {
    id: m.id,
    name: m.name,
    accuracy: m.accuracy,
    power: m.power,
    pp: m.pp,
    type: m.type.name,
    damageClass: m.damage_class.name as "special" | "physical",
    learnedAtLevel:
      generationMoves.moves.find((move) => move.name === m.name)
        ?.learnedAtLevel ?? 0,
  };

  if (m.past_values.length > 0) {
    const pastValue = m.past_values.find(
      (value) => value.version_group.name === generationMoves.generation
    );
    if (pastValue) {
      moveInfo.power = pastValue.power ?? moveInfo.power;
      moveInfo.accuracy = pastValue.accuracy ?? moveInfo.accuracy;
      moveInfo.pp = pastValue.pp ?? moveInfo.pp;
      moveInfo.type = pastValue.type ?? moveInfo.type;
    }
  }

  return moveInfo;
}
