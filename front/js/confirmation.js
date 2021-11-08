const idOrder = localStorage.getItem("orderId");
document.querySelector("#orderId").innerText = idOrder;
console.log(idOrder);
localStorage.clear();

if (idOrder == null) {
    window.location.href = "../html/index.html";
}
