import PokemonEntry from "@/components/PokemonEntry";
import { useRouter } from "next/router";
import useSWR from "swr";
import * as PokemonApi from "@/network/pokemonApi";
import { Button, Col, Row, Spinner } from "react-bootstrap";
import styles from "@/styles/HomePage.module.css";
import magnifyingGlass from "@/assets/magnifyingGlass.png";
import Image from "next/image";

export default function Home() {
  const router = useRouter();

  const page = parseInt(router.query.page?.toString() || "1");
  const { data, isLoading } = useSWR(`getPokemonPage:${page}`, () =>
    PokemonApi.getPokemonPage(page)
  );

  if (isLoading)
    return <Spinner animation="border" className="d-block m-auto" />;

  return (
    <div>
      <div className={styles.container}>
        <div className={styles.grow}></div>
        <h1 className={`text-center mb-4 ${styles.mainText}`}>
          Gotta cache &apos;em all
        </h1>
        <div
          onClick={() => router.push("/search")}
          className={`d-flex justify-content-center ${styles.iconText} ${styles.grow}`}
        >
          <p className={`link-light ${styles.searchText}`}>Search →</p>
          <Image
            src={magnifyingGlass}
            alt="search"
            width={40}
            height={40}
            className={styles.icon}
          />
        </div>
      </div>
      <Row xs={1} sm={2} lg={3} xl={4} className="g-4">
        {data?.results.map((pokemonEntry) => (
          <Col key={pokemonEntry.name}>
            <PokemonEntry name={pokemonEntry.name} />
          </Col>
        ))}
      </Row>
      <div className="d-flex justify-content-center gap-2 mt-4">
        {data?.previous && (
          <Button
            onClick={() =>
              router.push({ query: { ...router.query, page: page - 1 } })
            }
          >
            Previous page
          </Button>
        )}
        {data?.next && (
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
