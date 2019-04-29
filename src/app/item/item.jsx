import { h } from 'hyperapp';

export const Item = ({ id, contents }) => {
  return <div class="item" data-id={id}>
    { name } - { contents }
  </div>
};
