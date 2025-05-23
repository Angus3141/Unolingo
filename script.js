function speakWithVoice(voice) {
  const phrase = document.getElementById('phrase').value;
  const utterance = new SpeechSynthesisUtterance(phrase);
  utterance.voice = voice;
  speechSynthesis.cancel(); // Clear queue
  speechSynthesis.speak(utterance);
}

function loadVoices() {
  const voices = speechSynthesis.getVoices();
  const italianVoices = voices.filter(v => v.lang.startsWith('it'));
  const container = document.getElementById('voice-buttons');
  container.innerHTML = '';

  if (italianVoices.length === 0) {
    container.innerHTML = '<p>No Italian voices found. Try using Chrome or Safari and reload after voices load.</p>';
    return;
  }

  italianVoices.forEach(voice => {
    const btn = document.createElement('button');
    btn.textContent = `${voice.name} (${voice.lang})`;
    btn.onclick = () => speakWithVoice(voice);
    container.appendChild(btn);
  });
}

// Load after voices are available
if (speechSynthesis.onvoiceschanged !== undefined) {
  speechSynthesis.onvoiceschanged = loadVoices;
}
