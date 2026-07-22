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

  // YES CLICK EVENT WITH DIRECT WHATSAPP OPEN
  yesBtn.addEventListener('click', () => {
    switchCard(questionStep, successStep);

    // ⚠️ Yahan 923001234567 ko hata kar APNA WhatsApp number likhein!
    const myPhone = "923087324361"; 
    const message = encodeURIComponent("I read your letter and... YES! ❤️");

    // Click hote hi direct WhatsApp tab kholne ke liye:
    window.open(`https://wa.me/${myPhone}?text=${message}`, '_blank');
  });

  backToStartBtn.addEventListener('click', () => {
    noAttempts = 0;
    attemptHint.innerText = "";
    noBtn.style.transform = "translate(0px, 0px)";
    
    switchCard(successStep, envelopeStep);
  });
});
