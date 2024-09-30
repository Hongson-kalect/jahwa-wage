import CryptoJS from "crypto-js";

export const scrollToId = (id: string) => {
  const element = document.getElementById(id);
  if (element) {
    element.scrollIntoView({ behavior: "smooth" });
  }
};

export async function setCookie(name: string, value: string, hour?: number) {
  let expires = "";
  const key = CryptoJS.SHA256(import.meta.env.VITE_CryptoJS).toString();
  const encrypted = CryptoJS.AES.encrypt(value, key).toString();
  if (hour) {
    const date = new Date();
    date.setTime(date.getTime() + hour * 60 * 60 * 1000);
    expires = "; expires=" + date.toUTCString();
  }
  document.cookie = name + "=" + (encrypted || "") + expires + "; path=/";
}

export function getCookie(name: string) {
  const nameEQ = name + "=";
  const ca = document.cookie.split(";");
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) == " ") c = c.substring(1, c.length);
    if (c.indexOf(nameEQ) == 0) {
      const value = c.substring(nameEQ.length, c.length);
      const key = CryptoJS.SHA256(import.meta.env.VITE_CryptoJS).toString();
      const bytes = CryptoJS.AES.decrypt(value, key);
      const decrypted = bytes.toString(CryptoJS.enc.Utf8);
      return decrypted;
    }
  }
  return null;
}

export function getRawCookie(name: string) {
  const nameEQ = name + "=";
  const ca = document.cookie.split(";");
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) == " ") c = c.substring(1, c.length);
    if (c.indexOf(nameEQ) == 0) {
      const value = c.substring(nameEQ.length, c.length);
      console.log("value", value);
      return value;
    }
  }
  return null;
}

export function removeCookie(name: string) {
  document.cookie = name + "=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;";
  document.cookie =
    name +
    "=; expires=Thu, 01 Jan 1970 00:00:00 UTC; domain=" +
    domain +
    "; path=/";
}

export function deleteAllCookies() {
  const cookies = document.cookie.split(";");

  for (let i = 0; i < cookies.length; i++) {
    const domain = ".jahwa.co.kr";
    const cookie = cookies[i];
    const eqPos = cookie.indexOf("=");
    const name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
    const domainParts = window.location.hostname.split(".");

    // Attempt to delete cookie for each domain level
    while (domainParts.length > 0) {
      document.cookie =
        name +
        `=;expires=Thu, 01 Jan 1970 00:00:00 GMT;domain=${domain};path=/`;
      domainParts.shift();
    }

    // Also delete cookie without domain
    document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/";
  }
}

// const domain = ".jahwa.co.kr";
const domain = ".jahwa.co.kr";

export function setDomainCookie(name: string, value: string, hour?: number) {
  let expires = "";
  if (hour) {
    const date = new Date();
    date.setTime(date.getTime() + hour * 60 * 60 * 1000);
    expires = "; expires=" + date.toUTCString();
  }
  document.cookie =
    name + "=" + (value || "") + expires + ";domain=" + domain + ";path=/";
}

export const monthNames = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

export const handleLogout = () => {
  deleteAllCookies();
  window.location.href =
    "https://sso.jahwa.co.kr/login.html?relayState=https://vina.jahwa.co.kr";
};
