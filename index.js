const todoInput = document.getElementById("todoInput");
    const addBtn = document.getElementById("addBtn");
    const todoList = document.getElementById("todoList");
    const message = document.getElementById("message");

     // Function to create a new to-do item
    function createTodoItem(text) {
      const li = document.createElement("li");
      li.className = "flex justify-between items-center bg-gray-50 px-3 py-2 rounded shadow-sm";

      const span = document.createElement("span");
      span.textContent = text;
      span.className = "flex-grow";

      const btnContainer = document.createElement("div");
      btnContainer.className = "flex space-x-2";

      // Edit icon
      const editBtn = document.createElement("button");
      editBtn.innerHTML = `
        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-yellow-500 hover:text-yellow-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.232 5.232l3.536 3.536M4 13.5V19h5.5l9.086-9.086a2 2 0 00-2.828-2.828L6.672 16.172A2 2 0 016 16.5H4z" />
        </svg>
      `;
      editBtn.onclick = () => editTodoItem(span);

      // Trash icon
      const deleteBtn = document.createElement("button");
      deleteBtn.innerHTML = `
        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-red-500 hover:text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6M9 7h6m2 0H7m4-4h2a1 1 0 011 1v1H8V4a1 1 0 011-1z" />
        </svg>
      `;
      deleteBtn.onclick = () => li.remove();

      btnContainer.appendChild(editBtn);
      btnContainer.appendChild(deleteBtn);

      li.appendChild(span);
      li.appendChild(btnContainer);

      return li;
    }

     // Add to-do with validation
    function addTodo() {
      const text = todoInput.value.trim();

      // Clear previous message
      message.textContent = "";

      if (text === "") {
        message.textContent = "Please Add to-do";
        return;
      }

      // Check for duplicates
      const items = Array.from(todoList.querySelectorAll("span")).map(span => span.textContent.toLowerCase());
      if (items.includes(text.toLowerCase())) {
        message.textContent = "Already added this to-do";
        return;
      }

      const todoItem = createTodoItem(text);
      todoList.appendChild(todoItem);
      todoInput.value = "";
      todoInput.focus();
    }

     // Edit to-do
    function editTodoItem(span) {
      const currentText = span.textContent;
      const input = document.createElement("input");
      input.type = "text";
      input.value = currentText;
      input.className = "flex-grow border border-gray-300 rounded px-2 py-1";

      span.replaceWith(input);
      input.focus();

      function save() {
        const newText = input.value.trim() || currentText;
        span.textContent = newText;
        input.replaceWith(span);
      }

      input.addEventListener("keydown", (e) => {
        if (e.key === "Enter") save();
      });
      input.addEventListener("blur", save);
    }

    addBtn.addEventListener("click", addTodo);
    todoInput.addEventListener("keydown", (e) => {
      if (e.key === "Enter") addTodo();
    });
