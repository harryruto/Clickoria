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
    },
    goldenTime: {
        cost: 100,
        increment: 2,
        quantity: 0
    }
};
let scoreDisplay = document.getElementById('score-display');
let clickButton = document.getElementById('click-button');
let clickUpgradeButton = document.getElementById('click-upgrade-button');
let autoUpgradeButton = document.getElementById('auto-upgrade-button');
let pointsPerSecondDisplay = document.getElementById('points-per-second-display');

function updateScoreDisplay() {
    scoreDisplay.textContent = `Score: ${score}`;
    pointsPerSecondDisplay.textContent = `Points per Second: ${pointsPerSecond}`;
}
updateScoreDisplay();

// Fonction addScore
function addScore(points) {
    if (typeof points === 'number' && points > 0) {
        score += points;
        updateScoreDisplay();
        return true;
    }
    return false;
}

clickButton.addEventListener('click', () => {
    addScore(pointsPerClick);
});

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

setInterval(() => {
    addScore(pointsPerSecond);
}, 1000);

function saveScore() {
    localStorage.setItem('clickerGameScore', score);
    localStorage.setItem('clickerGamePointsPerClick', pointsPerClick);
    localStorage.setItem('clickerGamePointsPerSecond', pointsPerSecond);
    localStorage.setItem('clickerGameUpgrades', JSON.stringify(upgrades));
}
setInterval(saveScore, 5000);

function loadScore() {
    let savedScore = localStorage.getItem('clickerGameScore');
    let savedPointsPerClick = localStorage.getItem('clickerGamePointsPerClick');
    let savedPointsPerSecond = localStorage.getItem('clickerGamePointsPerSecond');
    let savedUpgrades = localStorage.getItem('clickerGameUpgrades');
    if (savedScore !== null) score = parseInt(savedScore);
    if (savedPointsPerClick !== null) pointsPerClick = parseInt(savedPointsPerClick);
    if (savedPointsPerSecond !== null) pointsPerSecond = parseInt(savedPointsPerSecond);
    if (savedUpgrades !== null) upgrades = JSON.parse(savedUpgrades);

    clickUpgradeButton.textContent = `Upgrade Click (+${upgrades.clickUpgrade.increment}) - Cost: ${upgrades.clickUpgrade.cost}`;
    autoUpgradeButton.textContent = `Upgrade Auto (+${upgrades.autoUpgrade.increment}/s) - Cost: ${upgrades.autoUpgrade.cost}`;
    updateScoreDisplay();
}
loadScore();

window.addEventListener('beforeunload', saveScore);

let resetButton = document.getElementById('reset-button');
resetButton.addEventListener('click', () => {
    if (confirm('Êtes-vous sûr de vouloir réinitialiser votre score ? Cette action est irréversible.')) {
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
            },
            goldenTime: {
                cost: 100,
                increment: 2,
                quantity: 0
            }
        };
        clickUpgradeButton.textContent = `Upgrade Click (+${upgrades.clickUpgrade.increment}) - Cost: ${upgrades.clickUpgrade.cost}`;
        autoUpgradeButton.textContent = `Upgrade Auto (+${upgrades.autoUpgrade.increment}/s) - Cost: ${upgrades.autoUpgrade.cost}`;
        updateScoreDisplay();
        saveScore();
    }
});

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

function adjustLayout() {
    let width = window.innerWidth;
    let body = document.body;
    if (width < 600) {
        body.style.fontSize = '14px';
    } else {
        body.style.fontSize = '16px';
    }
}
window.addEventListener('resize', adjustLayout);
adjustLayout();

function goldenTime() {
    alert("Cette fonctionnalité est encore en développement");
}

function comingSoon() {
    alert("Coming soon...");
}

// ChatBot fonctionnel
function openChatBot() {
    !alert("ChatBot : Je ne suis pas disponible actuellement");
}

