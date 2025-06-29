import { Component } from "react";
import { SearchingBlock } from "../components/SearchBlock";
import { ShowScreen } from "../components/ShowBlock";

export default class SearchPage extends Component {
    render () {
        return (
            <>
            <h1>Welcome to the Main page!</h1>
            <SearchingBlock />
            <ShowScreen />
            </>
        )
    }
}