document.addEventListener("DOMContentLoaded", () => {
  const voiceButtonsContainer = document.getElementById("voice-buttons");

  function speakWithVoice(voice) {
    const phrase = document.getElementById("phrase").value;
    const utterance = new SpeechSynthesisUtterance(phrase);
    utterance.voice = voice;
    speechSynthesis.cancel();
    speechSynthesis.speak(utterance);
  }

  function displayVoices() {
    const voices = speechSynthesis.getVoices();
    const italianVoices = voices.filter(v => v.lang.startsWith("it"));
    voiceButtonsContainer.innerHTML = "";

    if (italianVoices.length === 0) {
      voiceButtonsContainer.innerHTML = `
        <p>No Italian voices detected.<br>
        To enable more, go to:<br>
        <strong>Settings → Accessibility → Spoken Content → Voices → Italian</strong><br>
        and download additional voices like <strong>Luca (Enhanced)</strong>.</p>`;
      return;
    }

    const luca = italianVoices.find(v => v.name.toLowerCase().includes("luca"));
    if (luca) {
      const autoBtn = document.createElement("button");
      autoBtn.textContent = `🔊 Speak with preferred: ${luca.name}`;
      autoBtn.onclick = () => speakWithVoice(luca);
      voiceButtonsContainer.appendChild(autoBtn);
    }

    italianVoices.forEach(voice => {
      const btn = document.createElement("button");
      btn.textContent = `${voice.name} (${voice.lang})`;
      btn.onclick = () => speakWithVoice(voice);
      voiceButtonsContainer.appendChild(btn);
    });

    console.log("Loaded Italian voices:", italianVoices.map(v => v.name));
  }

  function waitForVoices(maxTries = 20) {
    let tries = 0;
    const interval = setInterval(() => {
      const voices = speechSynthesis.getVoices();
      if (voices.length > 1 || tries >= maxTries) {
        clearInterval(interval);
        displayVoices();
      }
      tries++;
    }, 300);
  }

  if (typeof speechSynthesis !== "undefined") {
    speechSynthesis.cancel();
    speechSynthesis.onvoiceschanged = displayVoices;
    waitForVoices();
  } else {
    voiceButtonsContainer.innerHTML = "<p>Speech synthesis is not supported in this browser.</p>";
  }
});
