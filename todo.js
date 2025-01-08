const fs = require('fs');

// 📂 File name for storing todos
const FILE_NAME = 'todos.txt';

// 🛠️ Ensure the file exists
if (!fs.existsSync(FILE_NAME)) {
    fs.writeFileSync(FILE_NAME, '', 'utf8');
}

// 📜 Command-line arguments
const args = process.argv.slice(2);
const command = args[0];

// 🧰 Helper Functions
const readTodos = () => 
    fs.readFileSync(FILE_NAME, 'utf8').trim().split('\n').filter(Boolean);

const writeTodos = (todos) => 
    fs.writeFileSync(FILE_NAME, todos.join('\n'), 'utf8');

// 🎯 Command Handling
switch (command) {
    case 'add': {
        const task = args.slice(1).join(' ').trim();
        if (!task) {
            console.error('❌ Error: 📝 Task description is required!');
        } else {
            fs.appendFileSync(FILE_NAME, task + '\n', 'utf8');
            console.log('✅ 🎉 Todo added: ✏️ "' + task + '"');
        }
        break;
    }

    case 'list': {
        const todos = readTodos();
        if (todos.length === 0) {
            console.log('📭 No tasks found. Your Todo list is empty! 🗒️');
        } else {
            console.log('🗂️ Your Todo List:');
            todos.forEach((todo, index) => 
                console.log(`  ${index + 1}. 📝 ${todo}`)
            );
        }
        break;
    }

    case 'delete': {
        const index = parseInt(args[1], 10) - 1;
        if (isNaN(index) || index < 0) {
            console.error('❌ Error: 🔢 Invalid task number!');
        } else {
            const todos = readTodos();
            if (index >= todos.length) {
                console.error('❌ Error: 🚫 Task number out of range!');
            } else {
                const deletedTask = todos.splice(index, 1);
                writeTodos(todos);
                console.log(`🗑️ Todo deleted: ✂️ "${deletedTask}"`);
            }
        }
        break;
    }

    case 'mark': {
        const markIndex = parseInt(args[1], 10) - 1;
        if (isNaN(markIndex) || markIndex < 0) {
            console.error('❌ Error: 🔢 Invalid task number!');
        } else {
            const todos = readTodos();
            if (markIndex >= todos.length) {
                console.error('❌ Error: 🚫 Task number out of range!');
            } else {
                todos[markIndex] = `[✔️] ${todos[markIndex]}`;
                writeTodos(todos);
                console.log(`✅ Task marked as complete: 🏁 "[✔️] ${todos[markIndex]}"`);
            }
        }
        break;
    }

    case 'clear': {
        writeTodos([]);
        console.log('🧹 All tasks cleared! Your list is sparkling clean! ✨');
        break;
    }

    default: {
        console.log('📖 Usage:');
        console.log('  🚀 node todo.js add <task>      # ➕ Add a new task');
        console.log('  🚀 node todo.js list            # 📋 Display all tasks');
        console.log('  🚀 node todo.js delete <number> # ❌ Delete a task by its number');
        console.log('  🚀 node todo.js mark <number>   # ✔️ Mark a task as complete');
        console.log('  🚀 node todo.js clear           # 🧹 Clear all tasks');
        break;
    }
}
