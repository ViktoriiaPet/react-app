import { Component} from "react";
import { getData } from "../servicios/getPokeList";

interface State {
  query: string;
  result: any;
  isLoading: boolean;
}

interface PokemonData {
  name: string;
  id: number;
  weight: number;
  sprites: {
    front_default: string;
  };
}

export interface SearchingBlockProps {
    onResult: (data: PokemonData) => void;
}

interface State {
  query: string;
  isLoading: boolean;
}

export class SearchingBlock extends Component <SearchingBlockProps, State> {
    constructor(props: SearchingBlockProps) {
        super(props);
        this.state = {
            query: localStorage.getItem("words") || "",
            result: null,
            isLoading: false
        }
    }
    handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        this.setState({query:e.target.value})
    }
    handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        this.setState ({
            isLoading: true
        })
        localStorage.removeItem("words");
        localStorage.setItem("words", this.state.query);

        getData()
        .then((data) => {
        this.props.onResult(data);
        this.setState({ isLoading: false });
      })
        .catch((error) => {
        console.error(error);
        this.setState({ isLoading: false });
      });
    }
    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <input 
                placeholder="Please, enter..."
                value={this.state.query}
                onChange={this.handleChange}>
                </input>
                <button type="submit">
                    Search!
                </button>
            </form>
        )
    }
}