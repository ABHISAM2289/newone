function toggleText() {
    var text1 = document.querySelector('.text2');
    var readButton = document.querySelector('.read');
    if (text1.style.display === 'none' || text1.style.display === '') {
        text1.style.display = 'block';
        readButton.textContent = 'Read Less';
        readButton.style.marginTop = '100px';
    } else {
        text1.style.display = 'none';
        readButton.textContent = 'Read More';
        readButton.style.marginTop = '0px';
    }
  }