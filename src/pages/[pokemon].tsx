import { useRouter } from "next/router";
import Head from "next/head";
import { Button, Form, Spinner } from "react-bootstrap";
import usePokemon from "@/hooks/usePokemon";
import { FormEvent } from "react";
import * as PokemonApi from "@/network/pokemonApi";
import PokemonImage from "@/components/PokemonImage";
import Chart from "@/components/Chart";
import PokemonInfo from "@/components/PokemonInfo";
import PokemonMoves from "@/components/PokemonMoves";

export default function PokemonDetailsPage() {
  const router = useRouter();
  const pokemonName = router.query.pokemon?.toString() || "";

  const { pokemon, pokemonLoading, mutatePokemon } = usePokemon(
    pokemonName,
    true
  );

  async function handleSubmitNickname(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const nickname = formData.get("nickname")?.toString().trim();

    if (!pokemon || !nickname) return;

    const update = await PokemonApi.setNickname(pokemon, nickname);
    mutatePokemon(update, { revalidate: false });
  }

  return (
    <>
      <Head>{pokemon && <title>{`${pokemon.name} - Pokedex`}</title>}</Head>

      <div className="d-flex flex-column align-items-center">
        <p onClick={() => router.back()} className="link-light">
          ← Pokedex
        </p>
        {pokemonLoading && <Spinner animation="grow" />}
        {pokemon === null && <p>Pokemon not found</p>}
        {pokemon && (
          <>
            <h1 className="text-center text-capitalize">{pokemon.name}</h1>
            <PokemonImage
              pokemonSprites={pokemon.sprites}
              pokemonName={pokemonName}
            />
            <PokemonInfo pokemon={pokemon} />
            <h2>Stats:</h2>
            <PokemonMoves pokemon={pokemon} />
            <Chart chartType="bar" data={pokemon.stats} showLabelInTitle />
            {JSON.stringify(pokemon.species)}
            {JSON.stringify(pokemon.evolutionChain)}
            <Form className="mt-4" onSubmit={handleSubmitNickname}>
              <Form.Group controlId="pokemon-nickname-input" className="mb-3">
                <Form.Label>Give this Pokemon a nickname</Form.Label>
                <Form.Control name="nickname" placeholder="nickname" />
              </Form.Group>
              <Button type="submit">Set nickname</Button>
            </Form>
          </>
        )}
      </div>
    </>
  );
}
