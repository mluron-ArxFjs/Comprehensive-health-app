$(function () {
  if (window.location.pathname === '/login') {
    $('.signup-form').remove()
    $('.login').on('click', login);
  }

  if (window.location.pathname === '/register') {
    $('.login-form').remove()
    $('.signup').on('click', signup);
  }

  if (window.location.pathname === '/dashboard') {
    $('.logout').on('click', logout);
  }
})

function validInput(names) {
  for (let i = 0; i < names.length; i++) {
    if (!$('[name="' + names[i] + '"]').val()) {
      return false;
    }
  }
  return true;
}

function login(e) {
  e.preventDefault();
  if (!validInput(['username', 'password'])) return;
  fetch('/api/login', {
    headers: { 'Content-Type': 'application/json' },
    method: 'POST',
    body: JSON.stringify({
      data: {
        username: $('[name="username"]').val(),
        password: $('[name="password"]').val()
      }
    })
  }).then(res => res.json())
    .then(({ user, useridToken }) => {
      $.cookie('auth_token', useridToken, { expires: 7 });
      if (!user) throw new Error('invalid username or password');
      window.location.href = '/dashboard'
    }).catch((err) => alert(err.responseText))
}

function signup(e) {
  e.preventDefault();
  if (!validInput(['username', 'password', 'email'])) return;
  fetch('/api/register', {
    headers: { 'Content-Type': 'application/json' },
    method: 'POST',
    body: JSON.stringify({
      username: $('[name="username"]').val(),
      email: $('[name="email"]').val(),
      password: $('[name="password"]').val()
    })
  }).then(res => res.json())
    .then(({ User, AuthToken }) => {
      if (User && AuthToken.token) {
        $.cookie('auth_token', AuthToken.token, { expires: 7 });
        window.location.href = '/dashboard'
      } else {
        throw new Error('something went wrong')
      }
    }).catch((err) => alert(err.responseText))
}

function logout(e) {
  e.preventDefault();
  fetch('/api/logout', {
    method: 'DELETE',
    data: {}
  }).then(user => {
    $.removeCookie('auth_token');
    window.location.href= '/login'
    //window.location.reload()
  })
}
const logoutBtnEl = document.getElementById('logout-btn')
logoutBtnEl.addEventListener('click', logout)
