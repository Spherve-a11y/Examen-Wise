
const menuToggle = document.getElementById("menu-toggle");
const mobileMenu = document.getElementById("mobile-menu");

menuToggle.addEventListener("click", function () {
  const isOpen = mobileMenu.classList.contains("is-open");

  if (isOpen) {
    mobileMenu.classList.remove("is-open");
    mobileMenu.hidden = true;
    menuToggle.setAttribute("aria-expanded", "false");
  } else {
    mobileMenu.classList.add("is-open");
    mobileMenu.hidden = false;
    menuToggle.setAttribute("aria-expanded", "true");
  }
});

const mobileLinks = mobileMenu.querySelectorAll("a");
for (let i = 0; i < mobileLinks.length; i++) {
  mobileLinks[i].addEventListener("click", function () {
    mobileMenu.classList.remove("is-open");
    mobileMenu.hidden = true;
    menuToggle.setAttribute("aria-expanded", "false");
  });
}

const faqQuestions = document.querySelectorAll(".faq-question");

faqQuestions.forEach(function (question) {
  question.addEventListener("click", function () {
    const answer = question.parentElement.querySelector(".faq-answer");
    const isOpen = question.getAttribute("aria-expanded") === "true";

    faqQuestions.forEach(function (otherQuestion) {
      if (otherQuestion !== question) {
        otherQuestion.setAttribute("aria-expanded", "false");
        otherQuestion.parentElement.querySelector(".faq-answer").hidden = true;
      }
    });

        if (isOpen) {
      question.setAttribute("aria-expanded", "false");
      answer.hidden = true;
    } else {
      question.setAttribute("aria-expanded", "true");
      answer.hidden = false;
    }
  });
});


const statsSection = document.getElementById("stats-section");
const statValues = document.querySelectorAll(".stat-value");
let statsAlreadyAnimated = false;

function animateCounter(element) {
  const target = parseInt(element.getAttribute("data-target"), 10);
  const duration = 1500; 
  const stepTime = 20; 
  const totalSteps = duration / stepTime;
  const increment = target / totalSteps;

  let current = 0;

  const timer = setInterval(function () {
    current += increment;

    if (current >= target) {
      element.textContent = target;
      clearInterval(timer);
    } else {
      element.textContent = Math.floor(current);
    }
  }, stepTime);
}

const statsObserver = new IntersectionObserver(function (entries) {
  entries.forEach(function (entry) {
    if (entry.isIntersecting && !statsAlreadyAnimated) {
      statsAlreadyAnimated = true;
      statValues.forEach(function (value) {
        animateCounter(value);
      });
    }
  });
}, { threshold: 0.4 });

statsObserver.observe(statsSection);


const quoteForm = document.getElementById("quote-form");
const formSuccess = document.getElementById("form-success");

function isValidEmail(value) {
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailPattern.test(value);
}

quoteForm.addEventListener("submit", function (event) {
  event.preventDefault();

  const nomInput = document.getElementById("nom");
  const emailInput = document.getElementById("email");
  const messageInput = document.getElementById("message");

  const nomError = document.getElementById("nom-error");
  const emailError = document.getElementById("email-error");
  const messageError = document.getElementById("message-error");

  nomError.textContent = "";
  emailError.textContent = "";
  messageError.textContent = "";
  formSuccess.hidden = true;

  let hasError = false;

  if (nomInput.value.trim() === "") {
    nomError.textContent = "Merci d'indiquer votre nom.";
    hasError = true;
  }

  if (!isValidEmail(emailInput.value.trim())) {
    emailError.textContent = "Merci d'indiquer un email valide.";
    hasError = true;
  }

  if (messageInput.value.trim() === "") {
    messageError.textContent = "Merci de décrire votre projet.";
    hasError = true;
  }

  if (hasError) {
    return;
  }
  formSuccess.hidden = false;
  quoteForm.reset();
});