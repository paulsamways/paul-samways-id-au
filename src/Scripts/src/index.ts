import { renderSkillsTree, Skill } from "./skills-tree";
import { marked } from "marked";

document.addEventListener("DOMContentLoaded", () => {
    var treeContainer = document.querySelector<HTMLElement>("#skillsTree");
    if (treeContainer !== null) {
        const data = (window as any).skillsJson;

        renderSkillsTree(treeContainer, data)

        treeContainer.addEventListener("skill-click", (e) => {
            
            const dialog = treeContainer?.querySelector<HTMLDialogElement>("dialog");
            const dialogContent = dialog?.querySelector<HTMLDivElement>(".content");

            if (dialog && dialogContent) {
                const skill = (<CustomEvent<Skill>>e).detail;

                dialogContent.innerHTML = marked.parse(skill.description ?? "");
                dialog.showModal();
            }
        })
    }
}, false);