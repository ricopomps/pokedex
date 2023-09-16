import { Pokemon } from "@/models/Pokemon";
import styles from "@/styles/Pokemon.module.css";
import typesStyles from "@/styles/Types.module.css";

interface PokemonInfoProps {
  pokemon: Pokemon;
}
export default function PokemonInfo({ pokemon }: PokemonInfoProps) {
  return (
    <div className="d-inline-block mt-2">
      <div className={styles.typesContainer}>
        <strong>Types:</strong>{" "}
        {pokemon.types.map((type) => (
          <div
            className={`${styles.typeBackground} ${typesStyles[type.name]}`}
            key={type.name}
          >
            {type.name}
          </div>
        ))}
      </div>
      <div>
        <strong>Height:</strong> {pokemon.height} cm
      </div>
      <div>
        <strong>Weigth:</strong> {pokemon.weight} kg
      </div>
    </div>
  );
}
