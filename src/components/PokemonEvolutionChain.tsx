import { EvolutionChain, EvolutionTrigger } from "@/models/EvolutionChain";
import PokemonEntry from "./PokemonEntry";
import styles from "@/styles/PokemonEvolution.module.css";

interface PokemonEvolutionChainProps {
  evolutionChain: EvolutionChain;
}

export default function PokemonEvolutionChain({
  evolutionChain,
}: PokemonEvolutionChainProps) {
  return (
    <div className={styles.container}>
      <PokemonEntry name={evolutionChain.firstPokemon} />
      {evolutionChain.firstEvolutionTrigger && (
        <EvolutionTrigger
          evolutionTrigger={evolutionChain.firstEvolutionTrigger}
        />
      )}
      {evolutionChain?.secondPokemon && (
        <PokemonEntry name={evolutionChain.secondPokemon} />
      )}
      {evolutionChain.secondEvolutionTrigger && (
        <EvolutionTrigger
          evolutionTrigger={evolutionChain.secondEvolutionTrigger}
        />
      )}
      {evolutionChain?.thirdPokemon && (
        <PokemonEntry name={evolutionChain.thirdPokemon} />
      )}
    </div>
  );
}
interface EvolutionTriggerProps {
  evolutionTrigger: EvolutionTrigger;
}
function EvolutionTrigger({ evolutionTrigger }: EvolutionTriggerProps) {
  return (
    <div className={styles.container}>
      →
      <div>
        <div>{evolutionTrigger.trigger}</div>
        <div>{evolutionTrigger.minLevel}</div>
      </div>
      →
    </div>
  );
}
