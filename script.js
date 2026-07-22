document.addEventListener('DOMContentLoaded', () => {
  const envelopeStep = document.getElementById('envelope-step');
  const letterStep = document.getElementById('letter-step');
  const questionStep = document.getElementById('question-step');
  const successStep = document.getElementById('success-step');

  const envelopeBtn = document.getElementById('envelope-btn');
  const nextToQuestionBtn = document.getElementById('next-to-question');
  const yesBtn = document.getElementById('yes-btn');
  const noBtn = document.getElementById('no-btn');
  const backToStartBtn = document.getElementById('back-to-start');
  const attemptHint = document.getElementById('attempt-hint');

  let noAttempts = 0;
  const hintMessages = [
    "pretty please?",
    "think about it...",
    "are you sure?",
    "you can't click no! 😉"
  ];

  function switchCard(from, to) {
    from.classList.remove('active');
    from.classList.add('hidden');
    setTimeout(() => {
      to.classList.remove('hidden');
      to.classList.add('active');
    }, 200);
  }

  envelopeBtn.addEventListener('click', () => switchCard(envelopeStep, letterStep));
  nextToQuestionBtn.addEventListener('click', () => switchCard(letterStep, questionStep));

  function moveNoButton() {
    noAttempts++;
    const msgIndex = Math.min(noAttempts - 1, hintMessages.length - 1);
    attemptHint.innerText = hintMessages[msgIndex];

    const x = (Math.random() - 0.5) * 180;
    const y = (Math.random() - 0.5) * 120;

    noBtn.style.transform = `translate(${x}px, ${y}px)`;
  }

  noBtn.addEventListener('mouseover', moveNoButton);
  noBtn.addEventListener('click', moveNoButton);

  // YES CLICK EVENT WITH GREEN SUBMITTED MESSAGE
  yesBtn.addEventListener('click', () => {
    // Heading ko Change karein aur Green color dein
    const heading = successStep.querySelector('h2');
    if (heading) {
      heading.innerText = "Response Submitted!";
      heading.style.color = "#28a745"; // Vibrant Green Color
    }

    switchCard(questionStep, successStep);

    const formspreeID = "mzdnabdy"; 

    fetch(`https://formspree.io/f/${formspreeID}`, {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({
        status: 'ACCEPTED! ❤️',
        message: 'Alohana clicked YES on your love letter website!',
        time: new Date().toLocaleString()
      })
    }).catch(err => console.log(err));
  });

  backToStartBtn.addEventListener('click', () => {
    noAttempts = 0;
    attemptHint.innerText = "";
    noBtn.style.transform = "translate(0px, 0px)";
    
    switchCard(successStep, envelopeStep);
  });
});
