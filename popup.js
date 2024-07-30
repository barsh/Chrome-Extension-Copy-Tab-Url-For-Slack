(async () => {
    try {
      const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
      const tabTitle = tab.title;
      const tabUrl = tab.url;
  
      const a = document.createElement('a');
      a.href = tabUrl;
      a.innerHTML = tabTitle;
      // Use a contenteditable div for better reliability
      const div = document.createElement('div');
      div.contentEditable = true;
      div.appendChild(a);
      document.body.appendChild(div);
  
      const range = document.createRange();
      range.selectNodeContents(div);
      const selection = window.getSelection();
      selection.removeAllRanges();
      selection.addRange(range);
  
      // Copy to clipboard
      const success = document.execCommand('copy');
      const messageDiv = document.getElementById('message');
      if (success) {
        messageDiv.innerText = 'Copied!';
        messageDiv.style.color = 'green';
        setTimeout(() => {
          window.close();
        }, 1000);
      } else {
        messageDiv.innerText = 'Failed to copy. Please try again.';
        messageDiv.style.color = 'red';
      }
  
      document.body.removeChild(div);
    } catch (error) {
      console.error('Error copying to clipboard: ', error);
      const messageDiv = document.getElementById('message');
      messageDiv.innerText = 'An error occurred. Please try again.';
      messageDiv.style.color = 'red';
    }
  })();
  