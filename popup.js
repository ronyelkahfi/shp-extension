document.getElementById('myButton').addEventListener('click', () => {
    var console = chrome.extension.getBackgroundPage().console;
    console.log('foo');

  });
  