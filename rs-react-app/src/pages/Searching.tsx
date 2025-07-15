import { Component } from "react";
import { SearchingBlock } from "../components/SearchBlock";
import { ShowScreen } from "../components/ShowBlock";

interface PokemonData {
    name: string;
    id: number;
    weight: number;
    sprites: {
      front_default: string;
  };
}
interface State {
  result: PokemonData | null;
}
export default class SearchPage extends Component<{}, State> {
    constructor(props: {}){
        super(props);
        this.state =  { result: null }
    }
    handleResult = (data:PokemonData) => {
        this.setState({result:data})
    }
    render () {
        return (
            <>
            <h1>Welcome to the Main 'Pokemon' page!</h1>
            <h3>You can try to enter names of pokemons (for exapmle "ditto", "raichu", "pikachu")</h3>
            <SearchingBlock onResult={this.handleResult} />
            <ShowScreen result={this.state.result} />
            </>
        )
    }
}