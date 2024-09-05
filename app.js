// Init speech API
const synth = window.speechSynthesis;
// DOM Elements
const textForm = document.querySelector("form");
const textInput = document.querySelector("#text-input");
const voiceSelect = document.querySelector("#voice-select");
const rate = document.querySelector("#rate");
const rateValue = document.querySelector("#rate-value");
const pitch = document.querySelector("#pitch");
const pitchValue = document.querySelector("#pitch-value");
const body = document.querySelector("body");

// Init voices array
let voices = [];
const getVoices = () => {
  voices = synth.getVoices();
  // Loop through voices and create an option for each one
  voices.forEach((voice) => {
    // Create option element
    const option = document.createElement("option");

    option.textContent = voice.name + "(" + voice.lang + ")";
    option.setAttribute("data-lang", voice.lang);
    option.setAttribute("data-name", voice.name); // Corrected attribute name
    voiceSelect.appendChild(option);
  });
};
getVoices();
if (synth.onvoiceschanged !== undefined) {
  synth.onvoiceschanged = getVoices;
}

// Speak function
const speak = () => {
  // Background Animation
  body.style.background = '#141414 url(img/wave.gif)'; // Corrected background URL
  body.style.backgroundRepeat = "repeat-x";
  body.style.backgroundSize = "100% 100%";

  // Check if already speaking
  if (synth.speaking) {
    console.error("Already speaking....");
    return;
  }
  if (textInput.value !== "") {
    // Get speak text
    const speakText = new SpeechSynthesisUtterance(textInput.value); // Corrected typo
    // Speak end
    speakText.onend = e => {
      console.log("Done speaking....");
      body.style.background = "#141414";
    };
    // Speak error
    speakText.onerror = e => {
      console.log("Something went wrong");
    };
    // Selected voice
    const selectedVoice =
      voiceSelect.selectedOptions[0].getAttribute("data-name");
    // Loop through voices
    voices.forEach(voice => {
      if (voice.name === selectedVoice) {
        speakText.voice = voice;
      }
    });
    // Set pitch and rate
    speakText.rate = rate.value;
    speakText.pitch = pitch.value;
    // Speak
    synth.speak(speakText);
  }
};

// Event Listeners
// Text form submit
textForm.addEventListener('submit', e => {
  e.preventDefault();
  speak();
  textInput.blur();
});

rate.addEventListener('input', e => { // Corrected event type
  rateValue.textContent = rate.value;
});

pitch.addEventListener('input', e => { // Corrected event type
  pitchValue.textContent = pitch.value;
});

// Voice select change
voiceSelect.addEventListener('change', e => speak());
