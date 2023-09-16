import { GenerationMoves, Move, Pokemon } from "@/models/Pokemon";
import { useState } from "react";
import { Nav, Tab, Table } from "react-bootstrap";

interface PokemonMovesProps {
  pokemon: Pokemon;
}

export default function PokemonMoves({ pokemon }: PokemonMovesProps) {
  const [selectedGeneration, setSelectedGeneration] =
    useState<GenerationMoves | null>(null);

  const handleGenerationChange = (generationMoves: GenerationMoves) => {
    if (generationMoves !== selectedGeneration)
      setSelectedGeneration(generationMoves);
  };

  return (
    <div>
      <MovesTable
        generationMoves={pokemon.moves}
        selectedGeneration={selectedGeneration}
        handleGenerationChange={handleGenerationChange}
      />
    </div>
  );
}

interface MovesTableProps {
  generationMoves: GenerationMoves[];
  selectedGeneration: GenerationMoves | null;
  handleGenerationChange: (generaitonMove: GenerationMoves) => void;
}

const MovesTable: React.FC<MovesTableProps> = ({
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
      <Tab.Content>
        {selectedGeneration && (
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Move Name</th>
                <th>Level Learned</th>
              </tr>
            </thead>
            <tbody>
              {selectedGeneration.moves.map(
                (move: Move & { learnedAtLevel: number }, index) => (
                  <tr key={index}>
                    <td>{move.name}</td>
                    <td>{move.learnedAtLevel}</td>
                  </tr>
                )
              )}
            </tbody>
          </Table>
        )}
      </Tab.Content>
    </div>
  );
};
