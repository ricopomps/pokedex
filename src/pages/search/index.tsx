import PokemonEntry from "@/components/PokemonEntry";
import { PokemonPage, PokemonType } from "@/models/Pokemon";
import * as PokemonApi from "@/network/pokemonApi";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { Button, Col, Row, Spinner } from "react-bootstrap";

export default function SearchPage() {
  const router = useRouter();
  const [search, setSearch] = useState("");
  const [type, setType] = useState<string>();
  const [pokemonData, setPokemonData] = useState<PokemonPage>();
  const [isLoading, setIsLoading] = useState(false);
  const page = parseInt(router.query.page?.toString() || "1");
  const searchQuery = router.query.searchQuery?.toString() || "";
  const typeQuery = router.query.typeQuery?.toString();

  useEffect(() => {
    async function getData() {
      try {
        setIsLoading(true);
        setSearch(searchQuery);
        setType(typeQuery);
        const data = await PokemonApi.findPokemonByNameAndType(
          searchQuery,
          page,
          typeQuery
        );
        setPokemonData(data);
      } catch (error) {
      } finally {
        setIsLoading(false);
      }
    }
    getData();
  }, [page, searchQuery, typeQuery]);

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
      <select value={type} onChange={(e) => setType(e.target.value)}>
        <option value={""}>Type</option>
        {Object.values(PokemonType).map((c) => {
          const capitalizedType = c.charAt(0).toUpperCase() + c.slice(1);
          return (
            <option key={c} value={c}>
              {capitalizedType}
            </option>
          );
        })}
      </select>

      <button
        onClick={() =>
          router.push({
            query: {
              ...router.query,
              searchQuery: search,
              typeQuery: type,
              page: 1,
            },
          })
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
