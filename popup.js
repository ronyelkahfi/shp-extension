document.getElementById('myButton').addEventListener('click', () => {
  chrome.tabs.query({active: true, currentWindow: true}, function (tabs) {
    const activeTabId = tabs[0].id;
    chrome.tabs.sendMessage(activeTabId, {"message": "This worked!"});
});

  });
  