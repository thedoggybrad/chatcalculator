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
          showResponse(result); // Pass the result as-is
        } catch (error) {
          showResponse("Sorry, I couldn't evaluate the equation. Something is wrong with your equation! ");
        }
      } else {
        showResponse("Sorry, I can only handle the 4 basic mathematical equations by using the symbols +, -, * or /. ");
      }
    }
  }

  function formatNumberWithCommas(number) {
  return number.toLocaleString(undefined, { maximumFractionDigits: 20 });
}

  function isMathematicalEquation(input) {
    // Regular expression to match mathematical equations
    const equationRegex = /^[\d+\-*/%().,\s]+$/; // Updated regex to allow decimal values and commas
    return equationRegex.test(input);
  }

  function showResponse(response) {
    let newBubble2Container = document.createElement("div");
    newBubble2Container.classList.add("chat-bubble-container", "chat-gpt-bubble-container");
    newBubble2Container.innerHTML = '<div class="profile-picture"><img src="images/avatar.png" height="100%" /></div>';

    let newBubble2 = document.createElement("div");
    newBubble2.classList.add("chat-bubble", "chat-gpt-bubble");

    const formattedResponse = formatNumberWithCommas(response); // Format the response with comma separators

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

    newBubble2Container.appendChild(newBubble2);
    chatArea.appendChild(newBubble2Container);
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

  sendBtn.addEventListener("click", handleSubmit); // Handle clicks to the submit button
  form.addEventListener("submit", handleSubmit); // Handle default submit (e.g., pressing enter)
});
