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

  // GREEN POPUP NOTIFICATION FUNCTION
  function showNotification(msg) {
    const toast = document.createElement('div');
    toast.innerText = msg;
    toast.style.position = 'fixed';
    toast.style.top = '20px';
    toast.style.left = '50%';
    toast.style.transform = 'translateX(-50%)';
    toast.style.backgroundColor = '#28a745'; // Vibrant Green
    toast.style.color = '#ffffff';
    toast.style.padding = '12px 24px';
    toast.style.borderRadius = '25px';
    toast.style.boxShadow = '0 4px 15px rgba(0,0,0,0.2)';
    toast.style.fontSize = '16px';
    toast.style.fontWeight = 'bold';
    toast.style.zIndex = '9999';
    toast.style.transition = 'all 0.5s ease';

    document.body.appendChild(toast);

    // 3 seconds baad notification disappear ho jayega
    setTimeout(() => {
      toast.style.opacity = '0';
      toast.style.top = '0px';
      setTimeout(() => toast.remove(), 500);
    }, 3000);
  }

  // YES CLICK EVENT
  yesBtn.addEventListener('click', () => {
    // Pop-up Notification trigger karein
    showNotification("✔ Response Submitted!");

    // Switch to success card
    switchCard(questionStep, successStep);

    // Formspree Integration
    const formspreeID = "mzdnabdy"; 

    fetch(`https://formspree.io/f/${formspreeID}`, {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({
        status: 'ACCEPTED! ❤️',
        message: 'She clicked YES on your love letter website!',
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
