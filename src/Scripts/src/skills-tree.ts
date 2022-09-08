import * as d3 from 'd3';

export interface Skill {
    name: string,
    description: string | null;
    image: string,
    level: number | null,
    children: Skill[]
}

export async function renderSkillsTree(element: HTMLElement, skills: Skill) {
    const nodeSize = 48;
    const nodeCircleRadius = nodeSize / 1.75;
    const tree = d3.tree<Skill>();

    const layout = tree
        .separation((a, b) => 3/b.depth)
        .nodeSize([nodeSize * 1.5, nodeSize * 5]);

    const root = layout(d3.hierarchy(skills))
    const links = root.links();
    const nodes = root.descendants();

    let x0 = Infinity;
    let x1 = -x0;
    let y0 = Infinity;
    let y1 = -y0;

    nodes.forEach(d => {
        if (d.y > x1) x1 = d.y;
        if (d.y < x0) x0 = d.y;
        if (d.x > y1) y1 = d.x;
        if (d.x < y0) y0 = d.x;
    });

    const svg = d3
        .select(element)
        .append("svg")
        .attr("viewBox", [x0-100, y0-100, (x1-x0) + 400, (y1-y0)+200]);

    const linkGenerator = d3.link<d3.HierarchyLink<Skill>, d3.HierarchyPointNode<Skill>>(d3.curveStep).x(d => d.y).y(d => d.x);

    const link = svg
        .append("g")
        .selectAll("path")
        .data(links)
        .join("path")
        .attr("d", linkGenerator)
        .attr("class", "link");


    const node = svg.append("g")
        .selectAll("a")
        .data(nodes)
        .join("a")
        .attr("class", d => d.data.description === null ? "node" : "node-active")
        .attr("transform", d => `translate(${d.y}, ${d.x})`);

    node
        .filter(d => d.data.description !== null)
        .on("click", (_, d) => element.dispatchEvent(new CustomEvent<Skill>('skill-click', { detail: d.data })));

    node
        .append("circle")
        .attr("class", "node-circle")
        .attr("r", nodeCircleRadius)

    node
        .append("image")
        .attr("href", d => d.data.image)
        .attr("width", nodeCircleRadius*1.3)
        .attr("height", nodeCircleRadius*1.3)
        .attr("x", d => (-nodeCircleRadius*1.3)/2)
        .attr("y", d => (-nodeCircleRadius*1.3)/2)

    const text = node
        .append("text")
        .attr("dy", "0.32em")
        .attr("x", d => d.children ? 0 : nodeCircleRadius + 10)
        .attr("y", d => d.children ? nodeCircleRadius * 1.75 : -nodeCircleRadius/3)
        .attr("class", "node-text")
        .attr("text-anchor", d => d.children ? "middle" : "start")
        .attr("paint-order", "stroke");
    text
        .append("tspan")
        .text((d) => d.data.name)
    
    text
        .filter(d => d.data.level !== null)
        .append("tspan")
        .attr("class", "node-text-star")
        .attr("x",  d => d.children ? 0 : nodeCircleRadius + 10)
        .attr("dy", "1.5em")
        .text(d => "☆".repeat(d.data.level ?? 0))
}