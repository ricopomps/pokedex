import { useRouter } from "next/router";
import Head from "next/head";
import { Button, Form, Spinner } from "react-bootstrap";
import usePokemon from "@/hooks/usePokemon";
import { FormEvent } from "react";
import * as PokemonApi from "@/network/pokemonApi";
import PokemonImage from "@/components/PokemonImage";
import Chart from "@/components/Chart";
import styles from "@/styles/Pokemon.module.css";
import typesStyles from "@/styles/Types.module.css";

export default function PokemonDetailsPage() {
  const router = useRouter();
  const pokemonName = router.query.pokemon?.toString() || "";

  const { pokemon, pokemonLoading, mutatePokemon } = usePokemon(pokemonName);

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
            <div className="d-inline-block mt-2">
              <div className={styles.typesContainer}>
                <strong>Types:</strong>{" "}
                {pokemon.types.map((type) => (
                  <div
                    className={`${styles.typeBackground} ${
                      typesStyles[type.name]
                    }`}
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
            <h2>Stats:</h2>
            <Chart chartType="bar" data={pokemon.stats} showLabelInTitle />
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
