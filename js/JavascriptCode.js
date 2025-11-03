
    const toggleBtn = document.getElementById('menu-toggle');
    const sidebar = document.getElementById('sidebar');
    const mainContent = document.getElementById('main-content');

    toggleBtn.addEventListener('click', () => {
      sidebar.classList.toggle('-translate-x-full');
      mainContent.classList.toggle('ml-64');
      mainContent.classList.toggle('ml-0');
    });
async function fetchUsers() {
  const tableBody = document.getElementById("userTable");


  tableBody.innerHTML = Array(10).fill(`
    <tr class="animate-pulse">
      <td class="px-6 py-4">
        <div class="h-4 bg-gray-200 rounded w-8"></div>
      </td>
      <td class="px-6 py-4">
        <div class="h-4 bg-gray-200 rounded w-32"></div>
      </td>
      <td class="px-6 py-4">
        <div class="h-4 bg-gray-200 rounded w-48"></div>
      </td>
      <td class="px-6 py-4">
        <div class="h-4 bg-gray-200 rounded w-24"></div>
      </td>
    </tr>
  `).join("");

  
  try {
    const response = await fetch("https://jsonplaceholder.typicode.com/users");

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const users = await response.json();
    tableBody.innerHTML = users.map(user => `
      <tr class="hover:bg-gray-50 transition">
        <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">${user.id}</td>
        <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">${user.name}</td>
        <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">${user.email}</td>
        <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">${user.address.city}</td>
      </tr>
    `).join("");
  } catch (error) {
    console.error("Error fetching users:", error);
    tableBody.innerHTML = `
      <tr>
        <td colspan="4" class="text-center text-red-600 py-4 font-semibold">
          ❌ Failed to load user data. Please try again later.
        </td>
      </tr>
    `;
  }
}

fetchUsers();
