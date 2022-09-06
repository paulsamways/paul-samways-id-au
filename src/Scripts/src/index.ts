import { renderSkillsTree } from "./skills-tree";

document.addEventListener("DOMContentLoaded", () => {
    var treeContainer = document.querySelector<HTMLElement>("#skillsTree");
    if (treeContainer !== null) {
        renderSkillsTree(treeContainer, {
            name: "Programming Languages",
            image: "/img/technologies/go.svg",
            children: [
                {
                    name: ".NET / C#", image: "/img/technologies/dotnetcore.svg", children: [
                        { name: "Go", image: "/img/technologies/go.svg", children: [] },
                        { name: "TypeScript", image: "/img/technologies/typescript.svg", children: [] },
                    ]
                },
                { name: "Go", image: "/img/technologies/go.svg", children: [] },
                {
                    name: "TypeScript", image: "/img/technologies/typescript.svg", children: [{ name: "Go", image: "/img/technologies/go.svg", children: [] },
                    { name: "TypeScript", image: "/img/technologies/typescript.svg", children: [] },]
                },
            ]
        })
    }
}, false);