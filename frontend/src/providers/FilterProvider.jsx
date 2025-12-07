import { useMemo } from 'react';
import filter from 'leo-profanity';
import FilterContext from '../contexts/FilterContext.jsx';

const FilterProvider = ({ children }) => {
  filter.list()
  filter.clearList()
  filter.add(filter.getDictionary('en'))
  filter.add(filter.getDictionary('ru'))

  const contextValue = useMemo(() => {
    const filterProfanity = (text) => filter.clean(text);
    return { filterProfanity };
  }, []);

  return (
    <FilterContext.Provider value={contextValue}>
      {children}
    </FilterContext.Provider>
  );
};

export default FilterProvider;
