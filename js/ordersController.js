import { orders } from "/js/orders.js";

const table = document.getElementById("ordersTable");

orders.forEach(order => {

  const row = document.createElement("tr");

  row.innerHTML = `
    <td>${order.id}</td>
    <td>${order.client}</td>
    <td>${order.contacts}</td>
    <td>${order.total}</td>
    <td>${order.status}</td>
    <td>${order.payment}</td>
    <td>${order.date}</td>
    <td>${order.action}</td>
  `;

  table.appendChild(row);

});