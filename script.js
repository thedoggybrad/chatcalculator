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
          const result = evaluateEquation(userString);
          // Show the result in a chat bubble
          showResponse("The answer for your equation is " + result + ". "); // The Result with comma formatting
        } catch (error) {
          showResponse("Unfortunately, I detected a syntax error in your equation! Kindly check and fix your equation! "); // If Syntax Error
        }
      } else {
        showResponse("I'm sorry, your entry is not a valid equation! I can only handle equations using the four basic operations: +, -, *, or /. "); // If Invalid Equation
      }
    }
  }

  function isMathematicalEquation(input) {
    // Regular expression to match mathematical equations
    const equationRegex = /^[\d+\-*/%().,\s]+$/; // Updated regex to allow decimal values and commas
    return equationRegex.test(input);
  }

  function evaluateEquation(equation) {
    // Remove commas from the equation string before evaluation
    const equationWithoutCommas = equation.replace(/,/g, '');
    return eval(equationWithoutCommas);
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
    let index = 0; // Start of the array
    let delay = 40; // Delay value

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
    form.scrollIntoView(false);
  }

  function formatNumberWithCommas(number) {
    // Convert the number to a string
    let numberString = number.toString();

    // Split the number into integer and decimal parts
    let parts = numberString.split(".");
    let integerPart = parts[0];
    let decimalPart = parts[1];

    // Truncate the decimal part to a maximum of 12 decimal places
    if (decimalPart && decimalPart.length > 12) {
      decimalPart = decimalPart.slice(0, 12);
    }

    // Round up the last decimal value based on the stripped 13th decimal place
    if (decimalPart && decimalPart.length === 12) {
      const lastDigit = parseInt(decimalPart[11], 10);
      const strippedDecimalPart = decimalPart.slice(0, 11);
      if (lastDigit >= 5) {
        // Round up by incrementing the stripped decimal part
        const roundedDecimalPart = (parseInt(strippedDecimalPart, 10) + 1).toString();
        decimalPart = roundedDecimalPart;
      } else {
        decimalPart = strippedDecimalPart;
      }
    }

    // Remove trailing zeros in the decimal part
    if (decimalPart) {
      decimalPart = decimalPart.replace(/0+$/, "");
    }

    // Add commas to the integer part
    let formattedIntegerPart = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, ",");

    // Combine the formatted parts and return the result
    let formattedNumber = formattedIntegerPart;
    if (decimalPart) {
      formattedNumber += "." + decimalPart;
    }
    return formattedNumber;
  }

  sendBtn.addEventListener("click", handleSubmit); // Handle clicks on the submit button
  form.addEventListener("submit", handleSubmit); // Handle default submit (e.g., pressing enter)
});
