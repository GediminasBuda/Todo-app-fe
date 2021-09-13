const baseUrl = 'https://localhost:5001/todos'; //naujas testas del pakeitimu isasugojimo 2021.09.13


async function getTodos() {
    const response = await fetch(baseUrl);

    return response.json();
}

async function createTodo(todoItem){
    const response = await fetch(baseUrl, {
        method: "POST",
        body: JSON.stringify(todoItem),
        headers: {
            "Content-type": "application/json; charset=UTF-8",
        },
    });
    return response.json();
}
async function editTodo(request){
    let response = await fetch(baseUrl + '/'+ request.id, {
        method: "PUT",
        body: JSON.stringify({
            title: request.title,  
            description: request.description, 
        }),
        headers: {
            "Content-type": "application/json; charset=UTF-8",
        },
    });
    return response.json();
}
async function changeStatusTodo(id){
    let response = await fetch(baseUrl + '/'+ id + '/status', {
        method: "PATCH",
    });
}

async function deleteTodo(id){
    let response = await fetch(baseUrl + '/'+ id, {
        method: "DELETE",
    });
    // return response.json();
}
