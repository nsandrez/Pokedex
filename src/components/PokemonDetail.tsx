import { useState, useEffect } from "react";
import { Pokemon, PokemonData } from "../interface/PokemonData";

interface PokemonDetailProps {
  pokemon: Pokemon;
}

export default function PokemonDetail({ pokemon }: PokemonDetailProps) {
  const [pokemonData, setPokemonData] = useState<PokemonData | null>(null);

  useEffect(() => {
    fetchPokemonData();
  }, [pokemon]);

  const fetchPokemonData = async () => {
    try {
      const response = await fetch(pokemon.url);
      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }
      const data: PokemonData = await response.json();
      setPokemonData(data);
    } catch (error) {
      console.error("Error fetching Pokemon data:", error);
    }
  };

  if (!pokemonData) {
    return <div className="text-center mt-4">Cargando...</div>;
  }

  return (
    <div className="card w-100">
      {/* Encabezado de la tarjeta */}
      <div className="card-header text-center">
        <h5 className="card-title text-capitalize">
          {pokemonData.name.charAt(0).toUpperCase() + pokemonData.name.slice(1)}
        </h5>
      </div>

      {/* Contenido de la tarjeta */}
      <div className="card-body">
        <div className="row g-4">
          {/* Imagen del Pokémon */}
          <div className="col-md-6 text-center">
            <img
              src={pokemonData.sprites.front_default || ""}
              alt={pokemonData.name || "Pokémon"}
              className="img-fluid"
            />
          </div>

          {/* Detalles del Pokémon */}
          <div className="col-md-6">
            <p>
              <strong>Altura:</strong> {pokemonData.height / 10} m
            </p>
            <p>
              <strong>Peso:</strong> {pokemonData.weight / 10} kg
            </p>
            <p>
              <strong>Tipos:</strong>{" "}
              {pokemonData.types.map((type) => type.type.name).join(", ")}
            </p>
            <p>
              <strong>Habilidades:</strong>{" "}
              {pokemonData.abilities.map((ability) => ability.ability.name).join(", ")}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
