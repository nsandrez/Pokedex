// interface/PokemonData.tsx

export interface Pokemon {
    name: string;
    url: string;
  }
  
  export interface PokemonData {
    name: string;
    sprites: {
      front_default: string;
    };
    height: number;
    weight: number;
    types: { type: { name: string } }[];
    abilities: { ability: { name: string } }[];
  }
  
  export interface PokemonListProps {
    pokemonList: Pokemon[];
    onSelectPokemon: (pokemon: Pokemon) => void;
    region: string;
  }

  export interface Region {
    name: string;
    limit: number;
    offset: number;
  }

  export interface RegionSelectorProps {
    regions: Region[];
    selectedRegion: string;
    onRegionChange: (region: string) => void;
  }

  export interface SearchBarProps {
    onSearch: (term: string) => void;
  }

