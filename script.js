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
          const result = eval(userString);
          // Show the result in a chat bubble
          showResponse(result);
        } catch (error) {
          showResponse("Sorry, I couldn't evaluate the equation.");
        }
      } else {
        showResponse("Sorry, I can only handle mathematical equations.");
      }
    }
  }

  function isMathematicalEquation(input) {
    // Regular expression to match mathematical equations
    const equationRegex = /^[\d+\-*/%()\s]+$/;
    return equationRegex.test(input);
  }

  function showResponse(response) {
    let newBubble2Container = document.createElement("div");
    newBubble2Container.classList.add("chat-bubble-container", "chat-gpt-bubble-container");
    newBubble2Container.innerHTML = '<div class="profile-picture"><img src="images/avatar.png" height="100%" /></div>';

    let newBubble2 = document.createElement("div");
    newBubble2.classList.add("chat-bubble", "chat-gpt-bubble");
    newBubble2.innerHTML = response;
    newBubble2Container.appendChild(newBubble2);
    chatArea.appendChild(newBubble2Container);
    form.scrollIntoView();
    userInput.focus();
  }

  sendBtn.addEventListener("click", handleSubmit); // Handle clicks to the submit button
  form.addEventListener("submit", handleSubmit); // Handle default submit (e.g., pressing enter)

  const infoText = [
    "Hi! I'm TheDoggyBrad. I made this site just for fun.",
    "To be clear: this site does not actually use ChatGPT or any other form of AI. It just returns a random number of aws. Nothing is done with your input either.",
    'If you want to know more, <a href="https://github.com/thedoggybrad/dogpt/" target="_blank">check out the code on Github</a>.',
    'By the way, this is distributed using The Unlicensed, <a href="https://github.com/thedoggybrad/dogpt/blob/master/license" target="_blank">which can be visited here</a>.',
    'Enjoy using the "DogGPT!"'
  ]; // Lines of the information chat

  infoBtn.addEventListener("click", handleInfoClick); // Handle clicks to the info link

  function handleInfoClick() {
    // Create a chat-bubble-container
    let newBubble3Container = document.createElement("div");
    newBubble3Container.classList.add("chat-bubble-container", "wouter-bubble-container");
    newBubble3Container.innerHTML = '<div class="profile-picture"><img src="images/thedoggybrad.jpeg" height="100%" /></div>';

    function createLine(i) { // Create each line separately, one at a time
      if (i < infoText.length) { // Check if the line exists
        let newBubble3 = document.createElement("div");
        newBubble3.classList.add("chat-bubble", "wouter-bubble");
        let currentLineText = infoText[i];
        let currentWord = 0;
        let singleLineLoop = setInterval(() => { // Loop over the words to simulate typing behavior
          if (currentWord < currentLineText.length) {
            currentWord += Math.floor(Math.random() * 10) + 5; // Return between 5 and 15 characters
            newBubble3.innerHTML = currentLineText.slice(0, currentWord) + "█"; // While typing, end the string with a block character
          } else {
            newBubble3.innerHTML = currentLineText; // When finished, put the entire response in the bubble without the block character
            clearInterval(singleLineLoop);
            form.scrollIntoView();
            userInput.focus(); // Focus the input again, so the user can type a new response
            createLine(i + 1); // Call this function again using i+1 so the next line is created
          }
        }, 80);

        newBubble3Container.appendChild(newBubble3);
        chatArea.appendChild(newBubble3Container);
      }
    }

    createLine(0); // Start creating the response with the first line
  }
});