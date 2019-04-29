import { h } from 'hyperapp';
import { Item } from '../item';
import { itemFilter } from '../utils';

export const ItemList = ({ items, term }) => {
  return (<div class="item-list">
    { items.filter(itemFilter(term)).map( ({id, contents}) => {
      return <div class="item-list__item">
          <Item id={id} contents={contents} />
        </div>
    } ) }
  </div>);
}
