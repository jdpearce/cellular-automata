import './styles.scss';

import { CellularAutomaton } from './cellular-automaton';

document.addEventListener('DOMContentLoaded', function(event) {
    const body = document.querySelector('body');

    const queryParams = new URLSearchParams(window.location.search.slice(1));
    const ruleSet = parseInt(queryParams.get('rule') || '222');
    const binaryRuleSet = ruleSet.toString(2).split('').map(x => parseInt(x)).reverse();

    while(binaryRuleSet.length < 8) {
        binaryRuleSet.push(0);
    }

    const canvas = document.createElement('canvas');
    canvas.setAttribute('id', 'game');
    canvas.setAttribute('width', '1000');
    canvas.setAttribute('height', '500');

    const blockSize = 2;

    body.appendChild(canvas);   

    const classOneRuleset = [0, 1, 1, 1, 1, 0, 1, 1]; // uniformity (rule 222)
    const classTwoRuleset = [0, 1, 1, 1, 1, 1, 0, 1]; // repetition (rule 190)
    const classThreeRuleset = [0, 1, 1, 1, 1, 0, 0, 0]; // random (rule 30)
    const classFourRuleset = [0, 1, 1, 1, 0, 1, 1, 0]; // complexity (rule 110)
    console.log(binaryRuleSet, classThreeRuleset)

    const ca = new CellularAutomaton(canvas.width/blockSize, binaryRuleSet);
    //const ca = new CellularAutomaton(canvas.width/blockSize, classTwoRuleset);
    //const ca = new CellularAutomaton(canvas.width/blockSize, classThreeRuleset);
    //const ca = new CellularAutomaton(canvas.width/blockSize, classFourRuleset);

    const context = canvas.getContext('2d');

    const fill = (cellValue: number, x, y): void => {
        context.fillStyle = cellValue === 0 ? 'white' : 'black';
        context.fillRect(x * blockSize, y, blockSize, blockSize);
    };

    let currentlyRenderingRow = 0;
    const renderGeneration = () => {
        const gen = ca.cells;
        for(let k = 0; k < gen.length; k++) {
            fill(gen[k], k, currentlyRenderingRow);
        }

        ca.generate();
        currentlyRenderingRow += blockSize;
        if (currentlyRenderingRow >= canvas.height) {
            // currentlyRenderingRow = 0;
            return;
        }
        window.requestAnimationFrame(renderGeneration);
    };

    renderGeneration();
});