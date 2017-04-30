import React, {Component} from 'react';
import {
    Form, Input, Button, Label
} from 'reactstrap';

class Search extends Component {
    static SORT_OPTIONS = {
        hot: 'Hot',
        new: 'New',
        top: 'Top'
    };

    render() {
        return (
            <Form inline right className="search-form">
                <Label check>
                    <Input type="checkbox" name="nsfw"/>
                    {' '}
                    NSFW
                    &nbsp;
                </Label>
                <Input type="select" name="sorting">
                    {Object.keys(Search.SORT_OPTIONS).map((sortOption) => (
                        <option value={sortOption}>
                            {Search.SORT_OPTIONS[sortOption]}
                        </option>
                    ))}
                </Input>
                <Input
                    type="text"
                    autoFocus
                    placeholder="gifs, pics, gonewild..."
                    name="subreddits"
                />
                <Button color="primary">
                    Search
                </Button>
            </Form>
        );
    }
}

export default Search;
