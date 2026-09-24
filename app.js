const micBtn = document.getElementById('micBtn');
const orb = document.getElementById('visualOrb');
const statusLabel = document.getElementById('statusLabel');

let isListening = false;
let recognition = null;

// Speech Recognition Engine Setup
if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
  const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
  recognition = new SpeechRecognition();
  recognition.continuous = true;
  recognition.interimResults = false;
  recognition.lang = 'ta-IN'; // Tamil + English mixed support

  recognition.onresult = (event) => {
    const transcript = event.results[event.results.length - 1][0].transcript.trim();
    statusLabel.innerText = `You: "${transcript}"`;
    respondBack(transcript);
  };

  recognition.onerror = () => {
    statusLabel.innerText = "Listening idle...";
  };
}

function respondBack(userText) {
  orb.classList.add('talking');
  statusLabel.innerText = "friendU is speaking...";

  const utter = new SpeechSynthesisUtterance();
  utter.text = `Sollunga nanba, neenga "${userText}" nu sonneenga. Naan ungaluku eppadi help panrathu?`;
  utter.rate = 1.0;
  utter.pitch = 1.0;

  utter.onend = () => {
    orb.classList.remove('talking');
    statusLabel.innerText = "Listening for you...";
  };

  window.speechSynthesis.speak(utter);
}

micBtn.addEventListener('click', () => {
  if (!recognition) {
    alert("Speech recognition not supported in this browser environment.");
    return;
  }
  if (!isListening) {
    recognition.start();
    isListening = true;
    micBtn.classList.add('active');
    statusLabel.innerText = "Listening...";
  } else {
    recognition.stop();
    isListening = false;
    micBtn.classList.remove('active');
    statusLabel.innerText = "Paused";
  }
});