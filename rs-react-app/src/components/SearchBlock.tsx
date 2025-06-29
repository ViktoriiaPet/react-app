import { Component} from "react";
import { getData } from "../servicios/getPokeList";

interface State {
  query: string;
  result: any;
  isLoading: boolean;
}

interface SearchingBlockProps {
  // если нет пропсов — можно оставить пустым
}


export class SearchingBlock extends Component <{}, State> {
    constructor(props: SearchingBlockProps) {
        super(props);
        this.state = {
            query: '',
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

          getData()
    .then(data => {
      this.setState({ result: data, isLoading: false });
    })
    .catch(error => {
      console.error(error);
      this.setState({ isLoading: false });
    });
    }
    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <input placeholder="Please, enter...">
                </input>
                <button type="submit">
                    Search!
                </button>
            </form>
        )
    }
}