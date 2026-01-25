//---------- Clicker Game Logic ----------//

let score = 0;
let pointsPerClick = 1;
let pointsPerSecond = 0;
let upgrades = {
    clickUpgrade: {
        cost: 10,
        increment: 1,
        quantity: 0
    },
    autoUpgrade: {
        cost: 50,
        increment: 1,
        quantity: 0
    }
};
let scoreDisplay = document.getElementById('score-display');
let clickButton = document.getElementById('click-button');
let clickUpgradeButton = document.getElementById('click-upgrade-button');
let autoUpgradeButton = document.getElementById('auto-upgrade-button');
let pointsPerSecondDisplay = document.getElementById('points-per-second-display');

// Update score display
function updateScoreDisplay() {
    scoreDisplay.textContent = `Score: ${score}`;
    pointsPerSecondDisplay.textContent = `Points per Second: ${pointsPerSecond}`;
}
updateScoreDisplay();

// Handle click button
clickButton.addEventListener('click', () => {
    score += pointsPerClick;
    updateScoreDisplay();
});

// Handle click upgrade purchase
clickUpgradeButton.addEventListener('click', () => {
    let upgrade = upgrades.clickUpgrade;
    if (score >= upgrade.cost) {
        score -= upgrade.cost;
        pointsPerClick += upgrade.increment;
        upgrade.quantity += 1;
        upgrade.cost = Math.floor(upgrade.cost * 1.5);
        clickUpgradeButton.textContent = `Upgrade Click (+${upgrade.increment}) - Cost: ${upgrade.cost}`;
        updateScoreDisplay();
    }
});

// Handle auto upgrade purchase
autoUpgradeButton.addEventListener('click', () => {
    let upgrade = upgrades.autoUpgrade;
    if (score >= upgrade.cost) {
        score -= upgrade.cost;
        pointsPerSecond += upgrade.increment;
        upgrade.quantity += 1;
        upgrade.cost = Math.floor(upgrade.cost * 1.5);
        autoUpgradeButton.textContent = `Upgrade Auto (+${upgrade.increment}/s) - Cost: ${upgrade.cost}`;
        updateScoreDisplay();
    }
});

// Auto increment score
setInterval(() => {
    score += pointsPerSecond;
    updateScoreDisplay();
}, 1000);

//---------- Save score to localStorage ----------//

function saveScore() {
    localStorage.setItem('clickerGameScore', score);
    localStorage.setItem('clickerGamePointsPerClick', pointsPerClick);
    localStorage.setItem('clickerGamePointsPerSecond', pointsPerSecond);
    localStorage.setItem('clickerGameUpgrades', JSON.stringify(upgrades));
}
setInterval(saveScore, 5000); // Save every 5 seconds

// Load score from localStorage
function loadScore() {
    let savedScore = localStorage.getItem('clickerGameScore');
    let savedPointsPerClick = localStorage.getItem('clickerGamePointsPerClick');
    let savedPointsPerSecond = localStorage.getItem('clickerGamePointsPerSecond');
    let savedUpgrades = localStorage.getItem('clickerGameUpgrades');
    if (savedScore !== null) score = parseInt(savedScore);
    if (savedPointsPerClick !== null) pointsPerClick = parseInt(savedPointsPerClick);
    if (savedPointsPerSecond !== null) pointsPerSecond = parseInt(savedPointsPerSecond);
    if (savedUpgrades !== null) upgrades = JSON.parse(savedUpgrades);
    // Update upgrade buttons
    clickUpgradeButton.textContent = `Upgrade Click (+${upgrades.clickUpgrade.increment}) - Cost: ${upgrades.clickUpgrade.cost}`;
    autoUpgradeButton.textContent = `Upgrade Auto (+${upgrades.autoUpgrade.increment}/s) - Cost: ${upgrades.autoUpgrade.cost}`;
    updateScoreDisplay();
}
loadScore();

// Save score when the window is closed or refreshed
window.addEventListener('beforeunload', saveScore);

//----------- Reset score functionality ----------//

let resetButton = document.getElementById('reset-button');
resetButton.addEventListener('click', () => {
    if (confirm('Etes-vous sûr de vouloir réinitialiser votre score ? Cette action est irréversible.')) {
        score = 0;
        pointsPerClick = 1;
        pointsPerSecond = 0;
        upgrades = {
            clickUpgrade: {
                cost: 10,
                increment: 1,
                quantity: 0
            },
            autoUpgrade: {
                cost: 50,
                increment: 1,
                quantity: 0
            }
        };
        clickUpgradeButton.textContent = `Upgrade Click (+${upgrades.clickUpgrade.increment}) - Cost: ${upgrades.clickUpgrade.cost}`;
        autoUpgradeButton.textContent = `Upgrade Auto (+${upgrades.autoUpgrade.increment}/s) - Cost: ${upgrades.autoUpgrade.cost}`;
        updateScoreDisplay();
        saveScore();
    }
});

//---------- Konami Code Implementation ----------//

let konamiCode = [38,38,40,40,37,39,37,39,66,65];
let konamiIndex = 0;
window.addEventListener('keydown', (e) => {
    if (e.keyCode === konamiCode[konamiIndex]) {
        konamiIndex++;
        if (konamiIndex === konamiCode.length) {
            alert('Konami Code actvé! Vous gagnez 1000 points!');
            score += 1000;
            updateScoreDisplay();
            konamiIndex = 0;
        }
    } else {
        konamiIndex = 0;
    }
});

// --------  Music Control Logic  -------- //

let musicToggleButton = document.getElementById('play-sound-button');
let backgroundMusic = new Audio('music.mp3');
backgroundMusic.loop = true;
let isMusicPlaying = false;
musicToggleButton.addEventListener('click', () => {
    if (isMusicPlaying) {
        backgroundMusic.pause();
        musicToggleButton.textContent = 'Activer le son';
    } else {
        backgroundMusic.play();
        musicToggleButton.textContent = 'Désactiver le son';
    }
    isMusicPlaying = !isMusicPlaying;

});

//---------- Responsive Design Handling ----------//

function handleResize() {
    let width = window.innerWidth;
    let gameContainer = document.getElementById('game-container');
    if (width < 600) {
        gameContainer.style.flexDirection = 'column';
    } else {
        gameContainer.style.flexDirection = 'row';
    }
}
window.addEventListener('resize', handleResize);
handleResize();
