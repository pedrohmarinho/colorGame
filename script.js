// Cores iniciais
const allColors = ["AliceBlue", "AntiqueWhite", "Aqua", "Aquamarine", "Azure", "Beige", "Bisque", "Black", "BlanchedAlmond", "Blue", "BlueViolet", "Brown", "BurlyWood", "CadetBlue", "Chartreuse", "Chocolate", "Coral", "CornflowerBlue", "Cornsilk", "Crimson", "Cyan", "DarkBlue", "DarkCyan", "DarkGoldenRod", "DarkGray", "DarkGrey", "DarkGreen", "DarkKhaki", "DarkMagenta", "DarkOliveGreen", "DarkOrange", "DarkOrchid", "DarkRed", "DarkSalmon", "DarkSeaGreen", "DarkSlateBlue", "DarkSlateGray", "DarkSlateGrey", "DarkTurquoise", "DarkViolet", "DeepPink", "DeepSkyBlue", "DimGray", "DimGrey", "DodgerBlue", "FireBrick", "FloralWhite", "ForestGreen", "Fuchsia", "Gainsboro", "GhostWhite", "Gold", "GoldenRod", "Gray", "Grey", "Green", "GreenYellow", "HoneyDew", "HotPink", "IndianRed", "Indigo", "Ivory", "Khaki", "Lavender", "LavenderBlush", "LawnGreen", "LemonChiffon", "LightBlue", "LightCoral", "LightCyan", "LightGoldenRodYellow", "LightGray", "LightGrey", "LightGreen", "LightPink", "LightSalmon", "LightSeaGreen", "LightSkyBlue", "LightSlateGray", "LightSlateGrey", "LightSteelBlue", "LightYellow", "Lime", "LimeGreen", "Linen", "Magenta", "Maroon", "MediumAquaMarine", "MediumBlue", "MediumOrchid", "MediumPurple", "MediumSeaGreen", "MediumSlateBlue", "MediumSpringGreen", "MediumTurquoise", "MediumVioletRed", "MidnightBlue", "MintCream", "MistyRose", "Moccasin", "NavajoWhite", "Navy", "OldLace", "Olive", "OliveDrab", "Orange", "OrangeRed", "Orchid", "PaleGoldenRod", "PaleGreen", "PaleTurquoise", "PaleVioletRed", "PapayaWhip", "PeachPuff", "Peru", "Pink", "Plum", "PowderBlue", "Purple", "RebeccaPurple", "Red", "RosyBrown", "RoyalBlue", "SaddleBrown", "Salmon", "SandyBrown", "SeaGreen", "SeaShell", "Sienna", "Silver", "SkyBlue", "SlateBlue", "SlateGray", "SlateGrey", "Snow", "SpringGreen", "SteelBlue", "Tan", "Teal", "Thistle", "Tomato", "Turquoise", "Violet", "Wheat", "White", "WhiteSmoke", "Yellow", "YellowGreen"];

// Elementos HTML
const colorDisplay = document.getElementById("colorDisplay");
const colorOptionsDiv = document.getElementById("colorOptions");
const startButton = document.getElementById("startButton");
const endButton = document.getElementById("endButton");
const restartButton = document.getElementById("restartButton");

// Variáveis do jogo
let selectedColors, targetColor, attempts;

// Adicionar evento de clique ao botão de iniciar
startButton.addEventListener("click", startGame);

// Adicionar evento de clique ao botão de finalizar
endButton.addEventListener("click", endGame);

// Adicionar evento de clique ao botão de reiniciar
restartButton.addEventListener("click", startGame);

// Função para iniciar o jogo
function startGame() {
    // Reinicializar variáveis do jogo
    selectedColors = getRandomColors(allColors, 10);
    targetColor = getRandomColor(selectedColors);
    attempts = 0;

    // Exibir as cores selecionadas para o usuário
    displayColors(selectedColors);

    // Mostrar a cor a ser adivinhada
    colorDisplay.innerHTML = "Adivinhe a cor:";
    const targetColorElement = document.createElement("div");
    targetColorElement.style.backgroundColor = targetColor;
    targetColorElement.style.width = "50px";
    targetColorElement.style.height = "50px";
    targetColorElement.style.margin = "auto"; // Centralizar a cor principal
    colorDisplay.appendChild(targetColorElement);

    // Esconder botão de reiniciar
    restartButton.style.display = "none";
}

// Função para finalizar o jogo
function endGame() {
    // Exibir mensagem de despedida
    if (attempts > 0) {
        alert("O jogo foi finalizado. Espero que tenha se divertido!");
    } else {
        alert("Você ainda não iniciou o jogo. Clique em 'Iniciar' para começar!");
    }

    // Esconder elementos do jogo
    colorDisplay.innerHTML = "";
    colorOptionsDiv.innerHTML = "";

    // Exibir botão de reiniciar
    restartButton.style.display = "block";
}

// Função para obter cores aleatórias do vetor
function getRandomColors(colors, num) {
    const shuffledColors = colors.slice().sort(() => 0.5 - Math.random());
    return shuffledColors.slice(0, num);
}

// Função para escolher uma cor aleatória
function getRandomColor(colors) {
    const randomIndex = Math.floor(Math.random() * colors.length);
    return colors[randomIndex];
}

// Função para comparar cores, ignorando possíveis espaços e caracteres invisíveis
function colorsMatch(color1, color2) {
    return color1.replace(/[\s\xa0]+/g, "").toLowerCase() === color2.replace(/[\s\xa0]+/g, "").toLowerCase();
}

// Função para exibir as cores selecionadas na página
function displayColors(colors) {
    colorOptionsDiv.innerHTML = ""; // Limpar as opções de cores

    for (let i = 0; i < colors.length; i++) {
        const colorOption = document.createElement("div");
        colorOption.className = "colorOption";
        colorOption.style.backgroundColor = colors[i];
        colorOptionsDiv.appendChild(colorOption);

        // Adicionar evento de clique às opções de cores
        colorOption.addEventListener("click", function () {
            attempts++;
            const selectedColor = this.style.backgroundColor;
            if (colorsMatch(selectedColor, targetColor)) {
                alert("Parabéns! Você acertou a cor em " + attempts + " tentativas.");
                document.body.style.backgroundColor = targetColor;
                endGame(); // Chama a função para finalizar o jogo
            } else {
                if (attempts >= 3) {
                    alert("Suas 3 tentativas acabaram. A cor correta era: " + targetColor);
                    endGame(); // Chama a função para finalizar o jogo
                } else {
                    alert("Você errou, tente novamente! Tentativa " + attempts + " de 3. A cor a ser adivinhada é: " + targetColor);
                }
            }
        });
    }
}

// Iniciar o jogo ao carregar a página
startGame();
