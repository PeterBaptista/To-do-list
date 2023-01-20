
// back to the original html
function refresh()
{
    localStorage.removeItem('todos');
    location.reload();
}

//retrieve localStorage
const savedTodos = JSON.parse(localStorage.getItem('todos'));

// Model Section
let todos;

 // check if it's an array
if(Array.isArray(savedTodos))
{todos = savedTodos;
}
else{
    todos = [{
     title: 'Get groceries',
     dueDate: '2023-01-20',
     id: 'id1',
     isDone: false,
     isEditing: undefined
    },   {
     title: 'Wash car',
     dueDate: '2023-01-21',
     id: 'id2',
     isDone: false,
      isEditing: undefined
     },  {
     title: 'Make dinner',
     dueDate: '2023-01-22',
     id: 'id3',
     isDone: false,
      isEditing: undefined

     }];
};

 // Create a todo
 function createTodo(title, dueDate){
     const id = new Date().getTime();

 
    todos.push({
     title: title,
     dueDate: dueDate,
     id: id,
     isDone: false,
     isEditing: undefined
    });

    saveTodos();
 };

 // remove a todo
 function removeTodo(idToDelete)
 {
     todos = todos.filter(function (todo){
        
        if(todo.id == idToDelete)
        {
            return false;
        } else{ 
            return true;
        };
    });

    saveTodos();
 };

 function toogleTodo(todoId, checked)
 {
      todos.forEach(function(todo){
         if(todo.id == todoId)
         {
             todo.isDone = checked;
         }
      })

      saveTodos();
 };

 function toggleEditMode(todoId)
 {

     todos.forEach(function(todo){
         
         if(todo.id == todoId)
         {
             todo.isEditing = true;
         }
     });
 }


 function updateData(todoId, newTitle, newDate)
 {
   todos.forEach(function(todo){
     console.log(todoId + '  ' + todoId)
         if(todo.id == todoId)
         {
              todo.title = newTitle;
              todo.title = newTitle;
             todo.dueDate = newDate;
             todo.isEditing = false;
         };
     });

     saveTodos;
     
 };

 function saveTodos()
 {  
     localStorage.setItem('todos', JSON.stringify(todos));

 };
//---------------------------------------------

// Controller Section      
function addTodo()
{
 //reset our list'
     document.getElementById('todo-list').innerHTML = '';

    const textbox = document.getElementById('todo-title');
    const title = textbox.value;

    const datePicker = document.getElementById('date-picker');
    const dueDate = datePicker.value;

    
    createTodo(title, dueDate);
    render();


 }; 


 function deleteTodo(event)
 {
     const deleteButton = event.target;
     const idToDelete = deleteButton.id;
     

     removeTodo(idToDelete);
     render();
 }

 function checkTodo(event)
 {
     const checkbox = event.target;

     const todoId = checkbox.dataset.todoId;
     const checked = checkbox.checked;

     toogleTodo(todoId, checked);
     render();
 };


 function editTodo(event)
 {
     
     const editButton = event.target;
     const todoId = editButton.dataset.id;

     toggleEditMode(todoId);
     render();

 };

 function updateTodo(event)
 {
     const updateButton = event.target;
     const todoId = updateButton.dataset.id;

     const editText = document.getElementById('edit-title-' + todoId);
     const newTitle = editText.value;

     const editDate = document.getElementById('edit-date-' + todoId);
     const newDate = editDate.value;

     updateData(todoId, newTitle, newDate);
     render();


 }
//---------------------------------------------

// View Section
 function render(){

 document.getElementById('todo-list').innerHTML = '';
 
 todos.forEach(function (todo){
     const element = document.createElement('div');

     if(todo.isEditing === true)
     {
     
         // edit textbox
         const editText = document.createElement('input');
         editText.type = 'text';
         editText.id = 'edit-title-' + todo.id;
         element.appendChild(editText);

         //edit date picker
         const editDate = document.createElement('input');
         editDate.type = 'date';
         editDate.id = 'edit-date-' + todo.id;
         element.appendChild(editDate);

         //edit update button
         const updateButton = document.createElement('button');
         updateButton.innerText = 'Update';
         updateButton.dataset.id = todo.id;
         updateButton.onclick = updateTodo;
         element.appendChild(updateButton);

     }
     else{
     
        // todo item 
        const taskName = document.createElement('div');
        taskName.innerText = todo.title + ' | ' + todo.dueDate + ' |';
        taskName.className = 'texto-todo';
        element.appendChild(taskName)
       
        
        //edit button
        const editButton = document.createElement('button');
        
        editButton.dataset.id = todo.id;
        editButton.className = 'edit-button'
        editButton.onclick = editTodo;


        const editImage = document.createElement('img');
        editImage.src = 'images/edit.png';
        editImage.className = 'edit-image';
        editButton.appendChild(editImage);

        element.appendChild(editButton);


        //Delete button
        const deleteButton = document.createElement('button');
        deleteButton.id = todo.id;
        deleteButton.className = 'delete-button'
        deleteButton.onclick = deleteTodo;


        const deleteImage = document.createElement('img');
        deleteImage.src = 'images/delete.png';
        deleteImage.className = 'trash-image';
        deleteButton.appendChild(deleteImage);

        element.appendChild(deleteButton);

        //checkbox
        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.dataset.todoId = todo.id;
        checkbox.onchange = checkTodo;

        if(todo.isDone === true)
        {
            checkbox.checked = true;
        }
        else{
            checkbox.checked = false;
        }
        
        element.prepend(checkbox);


 }
 const todoList = document.getElementById('todo-list');
 todoList.appendChild(element);
 });

};


render();
