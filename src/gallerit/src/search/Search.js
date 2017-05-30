import React, {Component} from 'react';
import {Form, Input, Button, Label} from 'reactstrap';
import {observer, inject} from 'mobx-react';

const SORT_OPTIONS = {
    hot: 'Hot',
    new: 'New',
    top: 'Top'
};

class Search extends Component {
    onFormChange = ({target: {checked, value, name, type}}) => {
        const _value = type === 'checkbox' ? checked : value;
        this.props.search.changed(name, _value);
    };

    onFormSubmit = (event) => {
        const {router, search: {subreddits, sorting, nsfw}, images} = this.props;
        router.push(`/r/${subreddits}`);
        images.queryImages(subreddits, sorting, nsfw);
        event.preventDefault();
    };

    render() {
        const {search: {nsfw, sorting, subreddits}} = this.props;
        return (
            <Form
                inline
                className="search-form"
                onChange={this.onFormChange}
                onSubmit={this.onFormSubmit}
            >
                <Label check>
                    <Input type="checkbox" name="nsfw" checked={nsfw}/>
                    {' '}
                    NSFW
                    &nbsp;
                </Label>
                <Input type="select" name="sorting" value={sorting}>
                    {Object.keys(SORT_OPTIONS).map((sortOption, i) => (
                        <option value={sortOption} key={i}>
                            {SORT_OPTIONS[sortOption]}
                        </option>
                    ))}
                </Input>
                <Input
                    type="text"
                    value={subreddits}
                    autoFocus
                    placeholder="gif, pics, gonewild..."
                    name="subreddits"
                />
                <Button color="primary">
                    Search
                </Button>
            </Form>
        );
    }
}

export {SORT_OPTIONS};
export default inject('search', 'images', 'router')(
    observer(Search)
);
