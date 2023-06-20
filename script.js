document.addEventListener("DOMContentLoaded", function() {
  const userInput = document.getElementById("user-input");
  const chatArea = document.getElementById("chat");
  const sendBtn = document.querySelector(".fa-paper-plane");
  const form = document.getElementById('form');
  const infoBtn = document.getElementById('infoBtn');

  function handleSubmit(event) {
    event.preventDefault(); // Prevent refresh on form submission

    // If a user submits input, create a new bubble-container and bubble to show the user input in the chat
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
      userInput.value = ""; // Clear the input field

      // Check if the user input is a mathematical equation
      if (isMathematicalEquation(userString)) {
        try {
          // Evaluate the mathematical equation
          const result = eval(userString.replace(/,/g, ''));
          // Show the result in a chat bubble
          showResponse(result, true); // Pass the result and enable letter-by-letter effect
        } catch (error) {
          showResponse("Sorry, I couldn't evaluate the equation. Something is wrong with your equation! ", false); // Disable letter-by-letter effect
        }
      } else {
        showResponse("Sorry, I can only handle the 4 basic mathematical equations by using the symbols +, -, * or /. ", false); // Disable letter-by-letter effect
      }
    }
  }

  function isMathematicalEquation(input) {
    // Regular expression to match mathematical equations
    const equationRegex = /^[\d+\-*/%().,\s]+$/; // Updated regex to allow decimal values and commas
    return equationRegex.test(input);
  }

  function showResponse(response, enableLetterByLetter) {
    let newBubble2Container = document.createElement("div");
    newBubble2Container.classList.add("chat-bubble-container", "chat-gpt-bubble-container");
    newBubble2Container.innerHTML = '<div class="profile-picture"><img src="images/avatar.png" height="100%" /></div>';

    let newBubble2 = document.createElement("div");
    newBubble2.classList.add("chat-bubble", "chat-gpt-bubble");

    const formattedResponse = formatNumberWithCommas(response); // Format the response with comma separators

    if (enableLetterByLetter) {
      // Split the response into an array of characters
      const characters = formattedResponse.split('');

      // Display each character with a delay
      let index = 0;
      let delay = 100; // Default delay value

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
    } else {
      // Show the complete response without letter-by-letter effect
      newBubble2.innerHTML = formattedResponse;
    }

    newBubble2Container.appendChild(newBubble2);
    chatArea.appendChild(newBubble2Container);

    // Store the response in a cookie
    storeConversation(response);

    form.scrollIntoView();
    userInput.focus();
  }

  function formatNumberWithCommas(number) {
    // Convert the number to a string
    let numberString = number.toString();

    // Split the number into integer and decimal parts
    let parts = numberString.split(".");
    let integerPart = parts[0];
    let decimalPart = parts[1];

    // Add commas to the integer part
    let formattedIntegerPart = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, ",");

    // Combine the formatted parts and return the result
    let formattedNumber = formattedIntegerPart;
    if (decimalPart) {
      formattedNumber += "." + decimalPart;
    }
    return formattedNumber;
  }

  function storeConversation(response) {
    let conversations = getStoredConversations();

    conversations.push(response);

    // Set the conversations in a cookie
    setCookie('thedoggybrad-chatcalcu', JSON.stringify(conversations), 30); // Set expiration to 30 days
  }

  function getStoredConversations() {
    let conversations = [];

    // Get the conversations from the cookie
    const conversationsCookie = getCookie('thedoggybrad-chatcalcu');

    if (conversationsCookie) {
      conversations = JSON.parse(conversationsCookie);
    }

    return conversations;
  }

  function setCookie(name, value, days) {
    let expires = "";
    if (days) {
      const date = new Date();
      date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
      expires = "; expires=" + date.toUTCString();
    }
    document.cookie = name + "=" + (value || "") + expires + "; path=/";
  }

  function getCookie(name) {
    const nameEQ = name + "=";
    const cookies = document.cookie.split(';');
    for (let i = 0; i < cookies.length; i++) {
      let cookie = cookies[i];
      while (cookie.charAt(0) === ' ') {
        cookie = cookie.substring(1, cookie.length);
      }
      if (cookie.indexOf(nameEQ) === 0) {
        return cookie.substring(nameEQ.length, cookie.length);
      }
    }
    return null;
  }

  // Display previous conversations on page load
  const conversations = getStoredConversations();
  for (let i = 0; i < conversations.length; i++) {
    showResponse(conversations[i], false); // Disable letter-by-letter effect for stored conversations
  }

  sendBtn.addEventListener("click", handleSubmit); // Handle clicks to the submit button
  form.addEventListener("submit", handleSubmit); // Handle default submit (e.g., pressing enter)
});
