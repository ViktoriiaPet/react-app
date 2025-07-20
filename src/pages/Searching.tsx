import { Component } from 'react';
import { SearchingBlock } from '../components/SearchBlock';
import { ShowScreen } from '../components/ShowBlock';
import { BoomButton } from '../components/BoomButton';

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
export default class SearchPage extends Component<object, State> {
  constructor(props: object) {
    super(props);
    this.state = { result: null };
  }
  handleResult = (data: PokemonData) => {
    this.setState({ result: data });
  };
  render() {
    return (
      <>
        <h1>Welcome to the Main &apos;Pokemon&apos; page!</h1>
        <h3>
          You can try to enter names of pokemons (for exapmle &quot;ditto&quot;,
          &quot;raichu&quot;, &quot;pikachu&quot;)
        </h3>
        <SearchingBlock onResult={this.handleResult} />
        <ShowScreen result={this.state.result} />
        <BoomButton />
      </>
    );
  }
}
