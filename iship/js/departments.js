document.querySelectorAll('.more').forEach(button => {
    button.addEventListener('click', () => {
        button.closest('.cont').classList.toggle('flip');
    });
});