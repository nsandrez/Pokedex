import { useState } from "react";
import { SearchBarProps } from "../interface/PokemonData";


export default function SearchBar({ onSearch }: SearchBarProps) {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(searchTerm);
  };

  return (
    <form onSubmit={handleSubmit} className="d-flex justify-content-center mb-3">
      <input
        type="text"
        className="form-control me-2 w-50"
        value={searchTerm}
        onChange={(e) => {
          setSearchTerm(e.target.value);
          onSearch(e.target.value);
        }}
        placeholder="Buscar Pokémon"
      />
      <button type="submit" className="btn btn-primary">
        Buscar
      </button>
    </form>
  );
}
