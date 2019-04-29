import { h } from 'hyperapp';

import { SideBar } from './sidebar';
import { ItemTree } from './tree';

import { itemFlatten } from './utils';

export const view = (state, actions) => (
    <div class="hyper-tree">
      <div class="hyper-tree__diagram">
        <ItemTree treeData={state.items} term={state.term} />
      </div>
      <div class="hyper-tree__sidebar">
        <SideBar items={itemFlatten(state.items)} term={state.term}/>
      </div>
    </div>   
)
