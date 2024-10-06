// // https://medium.com/@dylanconnor4/page-transitions-in-vanilla-javascript-d71f4331dcf6

document.addEventListener("DOMContentLoaded", function () {
    const links = document.querySelectorAll('a');

    if (!links || links.length === 0) {
        return;
    }

    links.forEach((link) => {
        if (link.textContent.includes('noydb')) {
            return;
        }

        link.onclick = (e) => {
            e.preventDefault();
            let body = document.querySelector('body');
            body.classList.add('fade-out');

            setTimeout(() => {
                if (!e.srcElement.parentElement.href) {
                    window.location = e.srcElement.href;
                } else {
                    window.location = e.srcElement.parentElement.href;
                }
            }, 500); // must match transition time in styles.scss
        }
    });

});
