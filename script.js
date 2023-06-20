document.addEventListener("DOMContentLoaded", function() {
  const userInput = document.getElementById("user-input");
  const chatArea = document.getElementById("chat");
  const sendBtn = document.querySelector(".fa-paper-plane");
  const form = document.getElementById('form');
  const infoBtn = document.getElementById('infoBtn');

  function evaluateMathematicalEquation(input) {
    try {
      const result = math.evaluate(input);
      return result;
    } catch (error) {
      throw new Error("Invalid equation");
    }
  }

  function handleSubmit(event) {
    event.preventDefault();

    if (userInput.value !== "") {
      let userString = userInput.value;

      let newBubbleContainer = document.createElement("div");
      newBubbleContainer.classList.add("chat-bubble-container", "user-bubble-container");
      newBubbleContainer.innerHTML = '<div class="profile-picture"><img src="images/user.png" height="100%" /></div>';

      let newBubble = document.createElement("div");
      newBubble.classList.add("chat-bubble", "user-bubble");
      newBubble.innerHTML = userInput.value;
      newBubbleContainer.appendChild(newBubble);
      chatArea.appendChild(newBubbleContainer);
      userInput.value = "";

      if (isMathematicalEquation(userString)) {
        try {
          const result = evaluateMathematicalEquation(userString);
          showResponse(result);
        } catch (error) {
          showResponse("Sorry, I couldn't evaluate the equation. Something is wrong with your equation! ");
        }
      } else {
        showResponse("Sorry, I can only handle the 4 basic mathematical equations by using the symbols +, -, * or /. ");
      }
    }
  }

  function isMathematicalEquation(input) {
    const equationRegex = /^[\d+\-*/%().,\s]+$/;
    return equationRegex.test(input);
  }

  function showResponse(response) {
    let newBubble2Container = document.createElement("div");
    newBubble2Container.classList.add("chat-bubble-container", "chat-gpt-bubble-container");
    newBubble2Container.innerHTML = '<div class="profile-picture"><img src="images/avatar.png" height="100%" /></div>';

    let newBubble2 = document.createElement("div");
    newBubble2.classList.add("chat-bubble", "chat-gpt-bubble");

    const formattedResponse = formatNumberWithCommas(response);

    const characters = formattedResponse.split('');

    let index = 0;
    let delay = 100;

    if (response === "Sorry, I couldn't evaluate the equation. Something is wrong with your equation! ") {
      delay = 25;
    } else if (response === "Sorry, I can only handle the 4 basic mathematical equations by using the symbols +, -, * or /. ") {
      delay = 25;
    }

    function displayCharacter() {
      newBubble2.innerHTML += characters[index];
      index++;

      if (index < characters.length) {
        setTimeout(displayCharacter, delay);
      }
    }

    displayCharacter();

    newBubble2Container.appendChild(newBubble2);
    chatArea.appendChild(newBubble2Container);
    form.scrollIntoView();
    userInput.focus();
  }

  function formatNumberWithCommas(number) {
    return number.toLocaleString(undefined, { maximumFractionDigits: 20 });
  }

  sendBtn.addEventListener("click", handleSubmit);
  form.addEventListener("submit", handleSubmit);
});
