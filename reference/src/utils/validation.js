export function isEmailInvalid(email) {
  const reg = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return !reg.test(email);
}

export function isPasswordWeak(str) {
  if (str.length < 8) {
    return false;
  } else if (str.length > 50) {
    return false;
  } else if (str.search(/\d/) == -1) {
    return false;
  } else if (str.search(/[a-zA-Z]/) == -1) {
    return false;
  }
}
