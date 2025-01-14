import { RegionSelectorProps } from "../interface/PokemonData";

  
  export default function RegionSelector({ regions, selectedRegion, onRegionChange }: RegionSelectorProps) {
    return (
      <div className="mb-3">
        <label htmlFor="regionSelector" className="form-label">
          Selecciona una región:
        </label>
        <select
          id="regionSelector"
          className="form-select w-auto"
          value={selectedRegion}
          onChange={(e) => onRegionChange(e.target.value)}
        >
          <option value="" disabled>
            Selecciona una región
          </option>
          {regions.map((region) => (
            <option key={region.name} value={region.name}>
              {region.name.charAt(0).toUpperCase() + region.name.slice(1)}
            </option>
          ))}
        </select>
      </div>
    );
  }
  