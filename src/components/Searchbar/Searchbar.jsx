import * as style from './Searchbar.styled';
import { MdSearch } from 'react-icons/md';
import PropTypes from 'prop-types';

const Searchbar = ({ onSubmit }) => {
  const handleSubmit = event => {
    event.preventDefault();
    const query = event.currentTarget.elements.searchInput.value.trim();
    onSubmit(query);
  };

  return (
    <style.Searchbar>
      <style.SearchForm onSubmit={handleSubmit}>
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
};

Searchbar.propType = {
  onSubmit: PropTypes.func.isRequired,
};

export default Searchbar;
