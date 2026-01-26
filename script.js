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

function startCountdown() {
    const targetDate = new Date('2026-01-27T18:30:00').getTime();
    
    function updateCountdown() {
        const now = new Date().getTime();
        const timeRemaining = targetDate - now;
        
        if (timeRemaining < 0) {
            document.getElementById('days').textContent = '0';
            document.getElementById('hours').textContent = '0';
            document.getElementById('minutes').textContent = '0';
            document.getElementById('seconds').textContent = '0';
            return;
        }
        
        const days = Math.floor(timeRemaining / (1000 * 60 * 60 * 24));
        const hours = Math.floor((timeRemaining % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((timeRemaining % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((timeRemaining % (1000 * 60)) / 1000);
        
        document.getElementById('days').textContent = days;
        document.getElementById('hours').textContent = hours;
        document.getElementById('minutes').textContent = minutes;
        document.getElementById('seconds').textContent = seconds;
    }
    
    updateCountdown();
    setInterval(updateCountdown, 1000);
}

startCountdown();

function updateScoreDisplay() {
    scoreDisplay.textContent = `Score: ${score}`;
    pointsPerSecondDisplay.textContent = `Points per Second: ${pointsPerSecond}`;
}
updateScoreDisplay();

clickButton.addEventListener('click', () => {
    score += pointsPerClick;
    updateScoreDisplay();
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
    score += pointsPerSecond;
    updateScoreDisplay();
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






