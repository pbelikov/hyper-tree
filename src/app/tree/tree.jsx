import { h } from 'hyperapp';
import { TreeCreator } from './creator/tree.creator';

let tree;

export const ItemTree = ({treeData, term}) => (
  <div class="item-tree" oncreate={element => {
    tree = new TreeCreator(element, treeData, term);
    tree.render();
  }} onupdate={() => {
    tree.render();
  }}></div>
);
