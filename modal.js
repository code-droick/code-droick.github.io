document.addEventListener('DOMContentLoaded', function() {
    const modal = document.getElementById("avisoModal");
    const openBtn = document.getElementById("openModalBtn");
    const closeBtns = document.querySelectorAll(".modal-close, .close-btn");
    const continueBtn = document.querySelector(".modal-continue");
    const linkAcuerdos = document.querySelector(".modal-link");
    const newPageUrl = "new-person.html";

    if (openBtn) {
        openBtn.addEventListener('click', function(event) {
            event.preventDefault();
            modal.classList.add('is-visible');
        });
    }

    closeBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            modal.classList.remove('is-visible');
            continueBtn.disabled = true;
        });
    });

    if (linkAcuerdos) {
        linkAcuerdos.addEventListener('click', function() {
            continueBtn.disabled = false;
        });
    }

    if (continueBtn) {
        continueBtn.addEventListener('click', function() {
            if (!continueBtn.disabled) {
                window.location.href = newPageUrl;
            }
        });
    }

    window.addEventListener('click', function(event) {
        if (event.target === modal) {
            modal.classList.remove('is-visible');
            continueBtn.disabled = true;
        }
    });
});