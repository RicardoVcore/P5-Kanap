const queryString_url_id = window.location.search;
const uRLSearchParams = new URLSearchParams(queryString_url_id);
const id = uRLSearchParams.get("orderId");
document.querySelector("#orderId").innerText = id;
