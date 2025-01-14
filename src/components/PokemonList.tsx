import { PokemonListProps } from "../interface/PokemonData";

export default function PokemonList({ pokemonList, onSelectPokemon, region }: PokemonListProps) {
  return (
    <div className="w-100">
      {/* Título de la región */}
      <h2 className="text-center mb-4 text-capitalize">{region} Region Pokémon</h2>

      {/* Lista de Pokémon */}
      <div className="row row-cols-2 row-cols-sm-3 row-cols-md-4 row-cols-lg-5 g-4">
        {pokemonList.map((pokemon) => (
          <div
            key={pokemon.name}
            className="col"
            onClick={() => onSelectPokemon(pokemon)}
            style={{ cursor: "pointer" }}
          >
            <div className="card h-100 text-center shadow-sm">
              <div className="card-body">
                {/* Imagen del Pokémon */}
                <img
                  src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.url.split('/')[6]}.png`}
                  alt={pokemon.name}
                  className="card-img-top mb-2"
                  style={{ width: "100%", height: "auto" }}
                />
                {/* Nombre del Pokémon */}
                <p className="card-text text-capitalize font-weight-medium">
                  {pokemon.name}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
