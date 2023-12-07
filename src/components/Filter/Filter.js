import { useDispatch, useSelector } from 'react-redux';
import { FilterText } from './Filter.styled';
import { setStoreFilter } from '../../redux/filterSlice';

export const Filter = () => {
  const currentFilter = useSelector(state => state.filter);

  const dispatch = useDispatch();

  const onSetFilter = newSearch => {
    const action = setStoreFilter(newSearch);
    dispatch(action);
  };
  return (
    <>
      <FilterText>Find contact by name</FilterText>
      <input
        type="text"
        name="search"
        placeholder="Type name"
        value={currentFilter}
        onChange={evt => onSetFilter(evt.target.value)}
      />
    </>
  );
};
