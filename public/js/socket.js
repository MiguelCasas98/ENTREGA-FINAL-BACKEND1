const socket = io();

socket.on("serviceCreated", (newService) => {
  const list = document.getElementById("servicesList");
  if (!list) return;

  const li = document.createElement("li");
  li.innerHTML = `
    <strong>${newService.name}</strong> — ${newService.description}
    (${newService.duration} min) — $${newService.price}
    <em>${newService.category}</em>
    ${newService.available ? "✔ Disponible" : "❌ No disponible"}
  `;

  list.appendChild(li);
});