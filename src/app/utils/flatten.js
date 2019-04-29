export const itemFlatten = (node, accumulator = []) => {
  // Set the accumulator
  let flattened = accumulator;

  // Push first value
  flattened.push({
    name: node.name,
    contents: node.contents,
    id: node.id
  });

  // If there are children - then iterate and do the same
  if (node.children) {
    node.children.forEach(child => itemFlatten(child, flattened));
  }

  // Get the result
  return flattened;
}
