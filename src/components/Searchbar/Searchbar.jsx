import * as style from './Searchbar.styled';
import { MdSearch } from 'react-icons/md';

const Searchbar = ({ onSubmit }) => {
  return (
    <style.Searchbar>
      <style.SearchForm>
        <style.SearchFormButton type="submit">
          <MdSearch size="30px" />
        </style.SearchFormButton>

        <style.SearchFormInput
          type="text"
          autocomplete="off"
          autofocus
          placeholder="Search images and photos"
        />
      </style.SearchForm>
    </style.Searchbar>
  );
};

export default Searchbar;
