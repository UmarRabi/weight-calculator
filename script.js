// name - DAVID AWANYE
// CSC 635


document.getElementById('calculate').addEventListener('click', calculateProperties);
document.querySelectorAll('input').forEach(input => {
    input.addEventListener('input', validateInputs);
});


document.querySelectorAll('.number').forEach(button => {
    button.addEventListener('click', () => {
        appendNumber(button.innerText);
    });
});

function validateInputs() {
    const width = document.getElementById('width').value;
    const height = document.getElementById('height').value;
    const depth = document.getElementById('depth').value;

    if (width && height && depth) {
        document.getElementById('calculate').removeAttribute('disabled');
    } else {
        document.getElementById('calculate').setAttribute('disabled', 'true');
    }
}

function appendNumber(number) {
    const activeInput = document.querySelector('input:focus');
    if (activeInput) {
        activeInput.value += number;
    }
}

function calculateProperties() {
    const width = parseFloat(document.getElementById('width').value);
    const height = parseFloat(document.getElementById('height').value);
    const depth = parseFloat(document.getElementById('depth').value);

    const volume = calculateVolume(width, height, depth);
    const surfaceArea = calculateSurfaceArea(width, height, depth);
    const edgeLength = calculateEdgeLength(width, height, depth);
    const waterDensity = calculateWaterDensity(width, height, depth);

    displayResults(width, height, depth, volume, surfaceArea, edgeLength, waterDensity);
}

function calculateVolume(width, height, depth) {
    return width * height * depth;
}

function calculateSurfaceArea(width, height, depth) {
    return 2 * (width * height + height * depth + depth * width);
}

function calculateEdgeLength(width, height, depth) {
    return 4 * (width + height + depth);
}

function calculateWaterDensity(width, height, depth) {
    const temperatures = [0, 50, 100, 150, 200, 250, 300, 350];
    const densities = temperatures.map(temp => {
        // Formula for water density at given temperature (approximate)
        return (1000 - 0.2 * temp) / 1000;
    });
    return densities;
}

function displayResults(width, height, depth, volume, surfaceArea, edgeLength, waterDensity) {
    const resultsDiv = document.getElementById('results');
    resultsDiv.innerHTML = `
        <h2>Container Properties:</h2>
        <table>
            <tr><td>Width:</td><td>${width} cm</td></tr>
            <tr><td>Height:</td><td>${height} cm</td></tr>
            <tr><td>Depth:</td><td>${depth} cm</td></tr>
            <tr><td>Volume:</td><td>${volume.toFixed(2)} cm<sup>3</sup></td></tr>
            <tr><td>Surface Area:</td><td>${surfaceArea.toFixed(2)} cm<sup>2</sup></td></tr>
            <tr><td>Edge Length:</td><td>${edgeLength.toFixed(2)} cm</td></tr>
        </table>
        <h2>Water Density (g/cm<sup>3</sup>) at Different Temperatures:</h2>
        <table>
            ${waterDensity.map((density, index) => <tr><td>${index * 50}°C:</td><td>${density.toFixed(4)}</td></tr>).join('')}
        </table>
    `;
}