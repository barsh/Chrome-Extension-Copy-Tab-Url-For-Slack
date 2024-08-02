(async () => {
    try {
      // Get the active tab in the current window
      const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
      const tabTitle = tab.title;
      const tabUrl = tab.url;

      // Create an anchor tag with the tab's URL and title
      const a = document.createElement('a');
      a.href = tabUrl;
      a.innerHTML = tabTitle;

      // Create a contenteditable div for copying
      const div = document.createElement('div');
      div.contentEditable = true;
      div.appendChild(a);
      document.body.appendChild(div);
      
      // Select the content of the div
      const range = document.createRange();
      range.selectNodeContents(div);
      const selection = window.getSelection();
      selection.removeAllRanges();
      selection.addRange(range);
  
      // Copy the selected content to the clipboard
      const success = document.execCommand('copy');
      const messageDiv = document.getElementById('message'); // Get the message div for feedback
      if (success) {
        // Display success message and close the window after a short delay
        messageDiv.innerText = 'Copied!';
        messageDiv.style.color = 'green';
        setTimeout(() => {
          window.close();
        }, 1000);
      } else {
        // Display failure message
        messageDiv.innerText = 'Failed to copy. Please try again.';
        messageDiv.style.color = 'red';
      }

      // Clean up by removing the temporary div
      document.body.removeChild(div);
    } catch (error) {
      // Handle any errors that occur during the process
      console.error('Error copying to clipboard: ', error);
      const messageDiv = document.getElementById('message');  // Get the message div for feedback
      messageDiv.innerText = 'An error occurred. Please try again.';
      messageDiv.style.color = 'red';
    }
  })();
  
