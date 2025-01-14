import { useState, useEffect } from "react";
import PokemonList from "./components/PokemonList";
import PokemonDetail from "./components/PokemonDetail";
import SearchBar from "./components/SearchBar";
import RegionSelector from "./components/RegionSelector";

const regions = [
  { name: "kanto", limit: 151, offset: 0 },
  { name: "johto", limit: 100, offset: 151 },
  { name: "hoenn", limit: 135, offset: 251 },
  { name: "sinnoh", limit: 107, offset: 386 },
];

export default function Pokedex() {
  const [pokemonList, setPokemonList] = useState<{ name: string; url: string }[]>([]);
  const [selectedPokemon, setSelectedPokemon] = useState<{ name: string; url: string } | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedRegion, setSelectedRegion] = useState("kanto");

  useEffect(() => {
    fetchPokemonList(selectedRegion);
  }, [selectedRegion]);

  const fetchPokemonList = async (region: string) => {
    const selectedRegionData = regions.find((r) => r.name === region);
    if (!selectedRegionData) {
      console.error("Selected region data not found");
      return;
    }
    try {
      const response = await fetch(
        `https://pokeapi.co/api/v2/pokemon?limit=${selectedRegionData.limit}&offset=${selectedRegionData.offset}`
      );
      const data = await response.json();
      setPokemonList(data.results);
    } catch (error) {
      console.error("Error fetching Pokemon list:", error);
    }
  };

  const handlePokemonSelect = (pokemon: { name: string; url: string }) => {
    setSelectedPokemon(pokemon);
  };

  const handleSearch = (term: string) => {
    setSearchTerm(term.toLowerCase());
  };

  const handleRegionChange = (region: string) => {
    setSelectedRegion(region);
    setSelectedPokemon(null);
  };

  const filteredPokemon = pokemonList.filter((pokemon) =>
    pokemon.name.toLowerCase().includes(searchTerm)
  );

  return (
    <div className="container py-4">
      <h1 className="text-center display-4 mb-4">Pokedex</h1>
      {/* Filtros y búsqueda */}
      <div className="d-flex flex-column flex-sm-row justify-content-between align-items-center mb-4 gap-3">
        <RegionSelector
          regions={regions}
          selectedRegion={selectedRegion}
          onRegionChange={handleRegionChange}
        />
        <SearchBar onSearch={handleSearch} />
      </div>
      {/* Lista y detalles */}
      <div className="row">
        <div className="col-md-8">
          <PokemonList
            pokemonList={filteredPokemon}
            onSelectPokemon={handlePokemonSelect}
            region={selectedRegion}
          />
        </div>
        <div className="col-md-4">
          {selectedPokemon && <PokemonDetail pokemon={selectedPokemon} />}
        </div>
      </div>
    </div>
  );
}
