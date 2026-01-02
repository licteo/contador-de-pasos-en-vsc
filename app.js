// Variables globales
let dailyGoal = 10000;
let stepsPerKm = 1300;
let todayData = {
    steps: 0,
    startTime: null,
    history: []
};

// Elementos del DOM
const stepCountEl = document.getElementById('stepCount');
const caloriesCountEl = document.getElementById('caloriesCount');
const distanceCountEl = document.getElementById('distanceCount');
const progressFillEl = document.getElementById('progressFill');
const progressPercentageEl = document.getElementById('progressPercentage');
const historyLogEl = document.getElementById('historyLog');
const addStepsBtn = document.getElementById('addStepsBtn');
const customStepsBtn = document.getElementById('customStepsBtn');
const resetDayBtn = document.getElementById('resetDayBtn');
const resetAllBtn = document.getElementById('resetAllBtn');
const installBtn = document.getElementById('installBtn');
const dateTimeEl = document.getElementById('dateTime');
const stepsPerKmInput = document.getElementById('stepsPerKm');
const dailyGoalInput = document.getElementById('dailyGoal');
const modal = document.getElementById('customModal');
const customStepsInput = document.getElementById('customStepsInput');
const confirmCustomBtn = document.getElementById('confirmCustomBtn');
const closeBtn = document.querySelector('.close');
const toastEl = document.getElementById('toast');

// Service Worker
if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('service-worker.js').catch(err => {
        console.log('Service Worker no registrado:', err);
    });
}

// Install PWA
let deferredPrompt;
window.addEventListener('beforeinstallprompt', (e) => {
    e.preventDefault();
    deferredPrompt = e;
    installBtn.style.display = 'block';
});

installBtn.addEventListener('click', async () => {
    if (deferredPrompt) {
        deferredPrompt.prompt();
        const { outcome } = await deferredPrompt.userChoice;
        console.log(`Usuario respondió al prompt: ${outcome}`);
        deferredPrompt = null;
        installBtn.style.display = 'none';
    }
});

// Inicializar app
function init() {
    loadData();
    updateDateTime();
    stepsPerKmInput.value = stepsPerKm;
    dailyGoalInput.value = dailyGoal;
    updateDisplay();
    setInterval(updateDateTime, 1000);
}

// Cargar datos del localStorage
function loadData() {
    const today = new Date().toDateString();
    const savedData = localStorage.getItem('stepData');
    
    if (savedData) {
        const data = JSON.parse(savedData);
        if (data.date === today) {
            todayData = data;
        } else {
            resetData();
        }
    }

    const savedSettings = localStorage.getItem('stepSettings');
    if (savedSettings) {
        const settings = JSON.parse(savedSettings);
        stepsPerKm = settings.stepsPerKm || 1300;
        dailyGoal = settings.dailyGoal || 10000;
    }
}

// Guardar datos en localStorage
function saveData() {
    const today = new Date().toDateString();
    todayData.date = today;
    localStorage.setItem('stepData', JSON.stringify(todayData));
}

// Guardar configuración
function saveSettings() {
    localStorage.setItem('stepSettings', JSON.stringify({ stepsPerKm, dailyGoal }));
}

// Actualizar fecha y hora
function updateDateTime() {
    const now = new Date();
    const options = { 
        weekday: 'long', 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
    };
    dateTimeEl.textContent = now.toLocaleDateString('es-ES', options);
}

// Agregar pasos
function addSteps(steps) {
    if (steps <= 0) {
        showToast('Por favor ingresa una cantidad válida');
        return;
    }

    todayData.steps += steps;
    const time = new Date().toLocaleTimeString('es-ES');
    todayData.history.push({
        steps,
        time,
        timestamp: Date.now()
    });

    saveData();
    updateDisplay();
    showToast(`✅ ${steps} pasos agregados`);
}

// Actualizar display
function updateDisplay() {
    const steps = todayData.steps;
    const distance = (steps / stepsPerKm).toFixed(2);
    const calories = Math.round(steps * 0.04); // Aproximación: 0.04 calorías por paso

    stepCountEl.textContent = steps.toLocaleString('es-ES');
    caloriesCountEl.textContent = calories;
    distanceCountEl.textContent = distance + ' km';

    const progress = Math.min((steps / dailyGoal) * 100, 100);
    progressFillEl.style.width = progress + '%';
    progressPercentageEl.textContent = Math.round(progress) + '%';

    updateHistory();

    // Cambiar color del progreso según porcentaje
    if (progress >= 100) {
        progressFillEl.style.background = 'linear-gradient(90deg, #4CAF50 0%, #45a049 100%)';
    } else if (progress >= 75) {
        progressFillEl.style.background = 'linear-gradient(90deg, #8BC34A 0%, #7CB342 100%)';
    }
}

// Actualizar historial
function updateHistory() {
    historyLogEl.innerHTML = '';
    
    if (todayData.history.length === 0) {
        historyLogEl.innerHTML = '<p class="empty-message">Sin registros aún</p>';
        return;
    }

    // Mostrar últimos 10 registros
    const recentHistory = todayData.history.slice(-10).reverse();
    
    recentHistory.forEach(entry => {
        const historyItem = document.createElement('div');
        historyItem.className = 'history-item';
        historyItem.innerHTML = `
            <span>➕ ${entry.steps} pasos</span>
            <span class="history-time">${entry.time}</span>
        `;
        historyLogEl.appendChild(historyItem);
    });
}

// Mostrar notificación toast
function showToast(message) {
    toastEl.textContent = message;
    toastEl.classList.add('show');
    setTimeout(() => {
        toastEl.classList.remove('show');
    }, 3000);
}

// Resetear día
function resetDay() {
    if (confirm('¿Estás seguro de que deseas resetear los datos de hoy?')) {
        resetData();
        showToast('✅ Día reseteado');
    }
}

// Resetear todos los datos
function resetAll() {
    if (confirm('⚠️ ¿Estás seguro? Esta acción no se puede deshacer.')) {
        localStorage.removeItem('stepData');
        localStorage.removeItem('stepSettings');
        resetData();
        showToast('✅ Todos los datos eliminados');
    }
}

// Datos iniciales
function resetData() {
    const today = new Date().toDateString();
    todayData = {
        steps: 0,
        startTime: today,
        history: []
    };
    saveData();
    updateDisplay();
}

// Event Listeners
addStepsBtn.addEventListener('click', () => addSteps(10));

customStepsBtn.addEventListener('click', () => {
    modal.style.display = 'block';
    customStepsInput.value = '';
    customStepsInput.focus();
});

confirmCustomBtn.addEventListener('click', () => {
    const steps = parseInt(customStepsInput.value);
    if (steps > 0) {
        addSteps(steps);
        modal.style.display = 'none';
    } else {
        showToast('Por favor ingresa un número válido');
    }
});

customStepsInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        confirmCustomBtn.click();
    }
});

closeBtn.addEventListener('click', () => {
    modal.style.display = 'none';
});

window.addEventListener('click', (e) => {
    if (e.target === modal) {
        modal.style.display = 'none';
    }
});

resetDayBtn.addEventListener('click', resetDay);
resetAllBtn.addEventListener('click', resetAll);

stepsPerKmInput.addEventListener('change', () => {
    stepsPerKm = parseInt(stepsPerKmInput.value) || 1300;
    saveSettings();
    updateDisplay();
    showToast('⚙️ Configuración actualizada');
});

dailyGoalInput.addEventListener('change', () => {
    dailyGoal = parseInt(dailyGoalInput.value) || 10000;
    saveSettings();
    updateDisplay();
    showToast('🎯 Meta actualizada');
});

// Iniciar app
init();
