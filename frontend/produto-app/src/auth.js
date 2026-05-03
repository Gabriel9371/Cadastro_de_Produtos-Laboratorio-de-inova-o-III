export function gerarBasicAuth(username, password) {
  return "Basic " + btoa(`${username}:${password}`);
}

export function salvarAuth(auth) {
  sessionStorage.setItem("auth", auth);
}

export function pegarAuth() {
  return sessionStorage.getItem("auth");
}

export function limparAuth() {
  sessionStorage.removeItem("auth");
}