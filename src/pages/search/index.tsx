import PokemonEntry from "@/components/PokemonEntry";
import { PokemonPage } from "@/models/Pokemon";
import * as PokemonApi from "@/network/pokemonApi";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { Button, Col, Row, Spinner } from "react-bootstrap";

export default function SearchPage() {
  const router = useRouter();
  const [search, setSearch] = useState("");
  const [pokemonData, setPokemonData] = useState<PokemonPage>();
  const [isLoading, setIsLoading] = useState(false);
  const page = parseInt(router.query.page?.toString() || "1");
  const searchQuery = router.query.searchQuery?.toString() || "";

  useEffect(() => {
    async function getData() {
      try {
        setIsLoading(true);
        setSearch(searchQuery);
        const data = await PokemonApi.findPokemon(searchQuery, page);
        setPokemonData(data);
      } catch (error) {
      } finally {
        setIsLoading(false);
      }
    }
    getData();
  }, [page, searchQuery]);

  if (isLoading)
    return <Spinner animation="border" className="d-block m-auto" />;

  return (
    <div>
      <h1 className="text-center mb-4">Gotta cache &apos;em all</h1>
      <input
        defaultValue={searchQuery}
        type="text"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <button
        onClick={() =>
          router.push({ query: { ...router.query, searchQuery: search } })
        }
      >
        search
      </button>
      <Row xs={1} sm={2} lg={3} xl={4} className="g-4">
        {pokemonData?.results.map((pokemonEntry) => (
          <Col key={pokemonEntry.name}>
            <PokemonEntry name={pokemonEntry.name} />
          </Col>
        ))}
      </Row>
      <div className="d-flex justify-content-center gap-2 mt-4">
        {pokemonData?.previous && (
          <Button
            onClick={() =>
              router.push({ query: { ...router.query, page: page - 1 } })
            }
          >
            Previous page
          </Button>
        )}
        {pokemonData?.next && (
          <Button
            onClick={() =>
              router.push({ query: { ...router.query, page: page + 1 } })
            }
          >
            Next page
          </Button>
        )}
      </div>
    </div>
  );
}
