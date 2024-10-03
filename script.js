const auth = document.getElementById('auth')
const main_page = document.getElementById('main-page')
const anonim_forum = document.getElementById('anonim_forum')

auth.style.display = 'block';

function authFunc() {
    auth.style.display = 'none';
    main_page.style.display = 'block';
}
function afFunc() {
    anonim_forum.style.display = 'block';
    main_page.style.display = 'none';
}
