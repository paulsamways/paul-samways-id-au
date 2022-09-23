import { renderSkillsTree, Skill } from "./skills-tree";
import { marked } from "marked";

function getPositionElements<T extends HTMLElement>(element: Element, selector: string): {[key: string]: T} {
    return [...element.querySelectorAll<T>(selector)].reduce<{ [key: string]: T}>((m, el) => {
        const pos = el.dataset.position;
        if (pos !== undefined) {
            m[pos] = el;
        }
        return m
    }, {})

    
}

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

    const experience = document.querySelector<HTMLElement>("#experience");

    if (experience !== null) {
        const buttons = getPositionElements(experience, "button.position");
        const sections = getPositionElements(experience, "section.position");      

        const selectPosition = (position: string): void => {
            for (let [k,v] of Object.entries(buttons)) {
                v.classList.toggle("active", k === position)
            }
            for (let [k,v] of Object.entries(sections)) {
                v.style.display = k === position ? "block" : "";
            }
        }

        Object.entries(buttons).forEach(([k,v]) => v.addEventListener("click", () => selectPosition(k)))
        selectPosition("0");
    }
}, false);