import { h } from 'hyperapp';
import { debounce } from 'lodash';

export const Search = () => ({ term }, actions) => (
  <div class="search">
    <input type="search" class="search__field" value={term} onkeyup={debounce((e) => actions.search(e.target.value), 300)} />
  </div>
)