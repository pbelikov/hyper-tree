import * as d3 from 'd3';

export class TreeCreator {
  constructor(containerSelector, treeData, term) {
    // Setup zoom
    this.zoomListener = d3.zoom().scaleExtent([0.1, 3])
      .on("zoom", this.zoom.bind(this));

    // Setup wrapper/container
    this.container = d3
      .select(containerSelector)
      .append('svg')
      .attr('width', '100%')
      .attr('height', '100%')
      .attr('class', 'item-tree__tree')
      .call(this.zoomListener);

    // Set tree data
    this.treeData = treeData;
    this.tree = null;
  }

  render() {
    // Set width of container
    const width = 900;

    // Build the hierarchy and setup items
    const root = d3.hierarchy(this.treeData);
    root.dx = 10;
    root.dy = width / (root.height + 1);

    // Wire it up and expose tree
    this.tree = d3.tree().nodeSize([root.dx, root.dy])(root);
    
    // Now - render the tree (we'll use same method for update on collapse/expand)
    this.update(this.tree);
  }

  update(tree) {
    let x0 = Infinity;
    let x1 = -x0;
    tree.each(d => {
      if (d.x > x1) x1 = d.x;
      if (d.x < x0) x0 = d.x;
    });
    
    const g = this.container.append("g")
      .attr("font-family", "Roboto, sans-serif")
      .attr("font-size", 12)
      .attr("transform", `translate(${tree.dy / 3},${tree.dx - x0})`);

    const link = g.append("g")
      .attr("fill", "none")
      .attr("stroke", "#555")
      .attr("stroke-opacity", 0.4)
      .attr("stroke-width", 1.5)
      .selectAll("path")
      .data(tree.links())
      .join("path")
        .attr("d", d3.linkHorizontal()
          .x(d => d.y)
          .y(d => d.x));

    const node = g.append("g")
        .attr("stroke-linejoin", "round")
        .attr("stroke-width", 3)
      .selectAll("g")
        .data(tree.descendants())
        .join("g")
        .attr("transform", d => `translate(${d.y},${d.x})`);

    node.append("circle")
      .attr("fill", d => d.children ? "#555" : "#999")
      .attr("r", 5)
      .on('click', this.toggle.bind(this));;

    node.append("text")
      .attr("dy", "0.31em")
      .attr("x", d => d.children ? -6 : 6)
      .attr("text-anchor", d => d.children ? "end" : "start")
      .text(d => d.data.name)
      .clone(true).lower()
      .attr("stroke", "white")
      .on('click', this.toggle.bind(this));
  }

  zoom() {
    let { width, height } = this.container.node().getBoundingClientRect();
    d3.event.transform.x = Math.min(0, Math.max(d3.event.transform.x, width - width * d3.event.transform.k));
    d3.event.transform.y = Math.min(0, Math.max(d3.event.transform.y, height - height * d3.event.transform.k));
    this.container.attr("transform", d3.event.transform);
  }

  toggle(node) {
    // Save children on "prvate" prop and remove them on "public" one
    if (node.children) {
      node._children = node.children; node.children = null;
    } else {
      node.children = node._children; node._children = null;
    }

    // Re-render
    this.update(this.tree);
    
		return false;
  }
}
