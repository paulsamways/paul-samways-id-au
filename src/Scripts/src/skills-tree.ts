import * as d3 from 'd3';
import { dsvFormat } from 'd3';

interface Skill {
    name: string,
    image: string,
    children: Skill[]
}

export async function renderSkillsTree(element: HTMLElement, skills: Skill) {
    const w = element.offsetWidth, h = window.innerHeight;
    const nodeSize = w/10;
    const nodeCircleRadius = nodeSize / 4;
    const tree = d3.tree<Skill>();

    const root = tree.nodeSize([nodeSize, nodeSize])(d3.hierarchy(skills))

    const svg = d3
        .select(element)
        .append("svg")
        .attr("width", w)
        .attr("height", h)
        .attr("viewBox", [(-w/2), -nodeSize, w, h]);

    const link = d3.link<d3.HierarchyLink<Skill>, d3.HierarchyPointNode<Skill>>(d3.curveLinear).x(d => d.x).y(d => d.y);

    svg
        .append("g")
        .selectAll("path")
        .data(root.links())
        .join("path")
        .attr("d", link)
        .attr("class", "link");

    const node = svg.append("g")
        .selectAll("a")
        .data(root.descendants())
        .join("a")
        .attr("transform", d => `translate(${d.x}, ${d.y})`)

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

    node
        .append("text")
        .attr("dy", "0.32em")
        .attr("x", d => nodeCircleRadius + 10)
        .attr("class", "node-text")
        .attr("text-anchor", "start")
        .attr("paint-order", "stroke")
        .text((d) => d.data.name);
}