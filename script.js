<script>
  const voiceButtonsContainer = document.getElementById("voice-buttons");
  let voicesLoaded = false;

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
        Go to <strong>Settings → Accessibility → Spoken Content → Voices → Italian</strong><br>
        and download more.</p>`;
      return;
    }

    italianVoices.forEach(voice => {
      const btn = document.createElement("button");
      btn.textContent = `${voice.name} (${voice.lang})`;
      btn.onclick = () => speakWithVoice(voice);
      voiceButtonsContainer.appendChild(btn);
    });
  }

  function waitForVoices(maxTries = 10) {
    let tries = 0;

    const interval = setInterval(() => {
      const voices = speechSynthesis.getVoices();
      if (voices.length > 1 || tries >= maxTries) {
        clearInterval(interval);
        displayVoices();
      }
      tries++;
    }, 250);
  }

  document.addEventListener("DOMContentLoaded", () => {
    if (typeof speechSynthesis === "undefined") {
      voiceButtonsContainer.innerHTML = "<p>Speech synthesis not supported in this browser.</p>";
      return;
    }

    // Trigger voice loading (iOS workaround)
    speechSynthesis.getVoices();
    waitForVoices();
  });
</script>
