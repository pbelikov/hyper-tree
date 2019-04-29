import { h } from 'hyperapp';
import { ItemList } from '../item-list';
import { Search } from '../search/search';

export const SideBar = ({ items, term }) => (
  <div>
    <Search />
    <ItemList items={items} term={term} />
  </div>
)
