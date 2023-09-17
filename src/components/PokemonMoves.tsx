import usePokemonMoves from "@/hooks/usePokemonMoves";
import { GenerationMoves, Pokemon } from "@/models/Pokemon";
import { useState } from "react";
import { Nav, Tab, Table } from "react-bootstrap";
import typesStyles from "@/styles/Types.module.css";
import { capitalizeFirstLetter } from "@/utils/capitalizeFirstLetter";
import DamageClassIcon from "./DamageClassIcon";
interface PokemonMovesProps {
  pokemon: Pokemon;
}

export default function PokemonMoves({ pokemon }: PokemonMovesProps) {
  const [selectedGeneration, setSelectedGeneration] =
    useState<GenerationMoves | null>(null);

  const handleGenerationChange = (generationMoves: GenerationMoves) => {
    if (generationMoves !== selectedGeneration)
      setSelectedGeneration(generationMoves);
    else setSelectedGeneration(null);
  };

  return (
    <div>
      <MovesTable
        pokemonName={pokemon.name}
        generationMoves={pokemon.moves}
        selectedGeneration={selectedGeneration}
        handleGenerationChange={handleGenerationChange}
      />
    </div>
  );
}

interface MovesTableProps {
  pokemonName: string;
  generationMoves: GenerationMoves[];
  selectedGeneration: GenerationMoves | null;
  handleGenerationChange: (generaitonMove: GenerationMoves) => void;
}

const MovesTable: React.FC<MovesTableProps> = ({
  pokemonName,
  generationMoves,
  selectedGeneration,
  handleGenerationChange,
}) => {
  return (
    <div>
      <Nav variant="tabs" defaultActiveKey={1}>
        {generationMoves.map((generationMove) => (
          <Nav.Item key={generationMove.generation}>
            <Nav.Link
              eventKey={generationMove.generation}
              onClick={() => handleGenerationChange(generationMove)}
            >
              {generationMove.generation}
            </Nav.Link>
          </Nav.Item>
        ))}
      </Nav>
      {selectedGeneration && (
        <MoveContent
          pokemonName={pokemonName}
          selectedGeneration={selectedGeneration}
        />
      )}
    </div>
  );
};

interface MoveContentProps {
  pokemonName: string;
  selectedGeneration: GenerationMoves;
}

function MoveContent({ pokemonName, selectedGeneration }: MoveContentProps) {
  const { moves, movesLoading } = usePokemonMoves(
    pokemonName,
    selectedGeneration
  );

  if (movesLoading || !moves)
    return <div>{moves ? "Loading..." : "error"}</div>;

  return (
    <Tab.Content className={typesStyles.ground}>
      <Table striped bordered hover className={typesStyles.ground}>
        <thead>
          <tr>
            <th>Move Name</th>
            <th>Power</th>
            <th>Damage class</th>
            <th className={typesStyles.ground}>Accuracy</th>
            <th>Type</th>
            <th>PP</th>
            <th>Level Learned</th>
          </tr>
        </thead>
        <tbody>
          {moves.map((move, index) => (
            <tr key={index}>
              <td>{capitalizeFirstLetter(move.name)}</td>
              <td>{move.power ?? "-"}</td>
              <td>
                <span title={move.damageClass}>
                  <DamageClassIcon damageClass={move.damageClass} />
                </span>
              </td>
              <td>{move.accuracy ?? "-"}</td>
              <td>
                <div
                  className={`${typesStyles.typeBackground} ${
                    typesStyles[move.type]
                  }`}
                >
                  {move.type}
                </div>
              </td>
              <td>{move.pp}</td>
              <td>{move.learnedAtLevel}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Tab.Content>
  );
}
