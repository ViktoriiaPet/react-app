import { Component } from "react";

interface PokemonData {
  name: string;
  id: number;
  weight: number;
  sprites: {
    front_default: string;
  };
}
interface ShowScreenProps {
  result: PokemonData | null;
}
export class ShowScreen extends Component<ShowScreenProps>{
    render() {
        const { result } = this.props;
        return (
            <div className="granPantalla">
                <h2>Your results</h2>
                <div className="showPantalla">
                    {result ? (
            <div>
              <h3>{result.name}</h3>
              <img src={result.sprites.front_default} alt={result.name} />
              <p>ID: {result.id}</p>
              <p>Weight: {result.weight}</p>
            </div>
          ) : (
            <p>Will show here</p>
          )}
                </div>
            </div>
        )
    }
}