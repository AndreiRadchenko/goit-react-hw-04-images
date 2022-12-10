import { Component } from 'react';
import * as style from './Searchbar.styled';
import { MdSearch } from 'react-icons/md';
import PropTypes from 'prop-types';

class Searchbar extends Component {
  handleSubmit = event => {
    event.preventDefault();
    const query = event.currentTarget.elements.searchInput.value.trim();
    this.props.onSubmit(query);
  };

  render() {
    return (
      <style.Searchbar>
        <style.SearchForm onSubmit={this.handleSubmit}>
          <style.SearchFormButton type="submit">
            <MdSearch size="30px" />
          </style.SearchFormButton>

          <style.SearchFormInput
            type="text"
            name="searchInput"
            autocomplete="off"
            autoFocus
            placeholder="Search images and photos"
          />
        </style.SearchForm>
      </style.Searchbar>
    );
  }
}

Searchbar.propType = {
  onSubmit: PropTypes.func.isRequired,
};

export default Searchbar;
