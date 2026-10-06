const cl=console.log;

const postForm = document.getElementById("postForm")
const title = document.getElementById("title")
const body = document.getElementById("body")
const userId = document.getElementById("userId")
const addPostBtn = document.getElementById("addPostBtn")
const updatePostBtn = document.getElementById("updatePostBtn")
const postContainer = document.getElementById("postContainer")

const BASE_URL = "https://jsonplaceholder.typicode.com"
const POST_URL = `${BASE_URL}/posts`;


//read
const xhr = new XMLHttpRequest()
xhr.open("GET", POST_URL)
xhr.send(null)

xhr.onload = function() {
    if(xhr.status === 200){
        let data = JSON.parse(xhr.response)
        let result = ``;
        data.forEach(post => {
            result += `<div class="col-md-4 my-4" id="${post.id}">
                <div class="card h-100">
                    <div class="card-header bg-info">
                        <h4>${post.title}</h4>
                    </div>
                    <div class="card-body">
                        <p>${post.body}</p>
                    </div>
                    <div class="card-footer d-flex justify-content-between bg-info">
                        <button onclick="onEdit(this)" type="submit" class="btn btn-sm btn-primary">Edit</button>
                        <button onclick="onDelete(this)" type="button" class="btn btn-sm btn-danger">Delete</button>
                    </div>
                </div>
            </div>`

            const postContainer = document.getElementById("postContainer");

            postContainer.innerHTML = result;
        })
    }else{
        cl("error")
    }
}


//create
function onCreate(eve){
    eve.preventDefault();

   spinner.classList.remove('d-none') ;

    let postobj = {
        userId: userId.value,
        title: title.value,
        body: body.value,
    }

    let xhr = new XMLHttpRequest()

    xhr.open("POST", POST_URL)
    xhr.send(JSON.stringify(postobj))
    xhr.onload = function(){
        let response = JSON.parse(xhr.response)

        if (xhr.status === 201){
            let newpost = document.createElement('div')
            newpost.className = `col-md-4 my-4`
            newpost.id = response.id
            newpost.innerHTML =`<div class="card h-100">
                    <div class="card-header bg-info">
                        <h4>${postobj.title}</h4>
                    </div>
                    <div class="card-body">
                        <p>${postobj.body}</p>
                    </div>
                    <div class="card-footer d-flex justify-content-between bg-info">
                        <button onclick="onEdit(this)" type="submit" class="btn btn-sm btn-primary">Edit</button>
                        <button onclick="onDelete(this)" type="button" class="btn btn-sm btn-danger">Delete</button>
                    </div>
                </div>`

                postContainer.prepend(newpost)
                postForm.reset() 
                Swal.fire({
                text: `Post ${postobj.title} created successfully`,
                icon: "success",
                timer: 2500
            }) 
        }
        else{
            cl("error")
        }

        spinner.classList.add("d-none")
        
    }
    xhr.onerror = function(){
        spinner.classList.add("d-none")
    }
}

//edit
function onEdit(ele){
    const editId = ele.closest(".col-md-4").id;

    spinner.classList.remove("d-none")

    localStorage.setItem("updateId",editId)
    let editUrl = `${BASE_URL}/posts/${editId}`
    let xhr = new XMLHttpRequest()
    xhr.open("GET", editUrl);
    xhr.send(null)
    xhr.onload = () =>{
        if(xhr.status == 200){
            let apiResponse = JSON.parse(xhr.response)

            title.value = apiResponse.title,
            body.value = apiResponse.body,
            userId.value = apiResponse.userId,

            addPostBtn.classList.add("d-none")
            updatePostBtn.classList.remove("d-none")

            }
            else{
                cl(" ")
            }

            spinner.classList.add("d-none")
    }

    xhr.onerror = function(){
        spinner.classList.add("d-none")
    }
}

//update
function onUpdate(){
    const updateId = localStorage.getItem("updateId")


    localStorage.removeItem("updateId")
    const updateObj = {
        title: title.value,
        body: body.value,
        userId: userId.value,
    }
    spinner.classList.remove("d-none");

    let xhr = new XMLHttpRequest()
    xhr.open("PATCH", `${POST_URL}/${updateId}`)
    xhr.send(JSON.stringify(updateObj))
    postForm.reset()
    xhr.onload = () =>{
        if(xhr.status >= 200 && xhr.status <= 299){
            let apiResponse = JSON.parse(xhr.response)

            let updatePostCard = document.getElementById(updateId)
            updatePostCard.querySelector("h4").innerHTML = updateObj.title
            updatePostCard.querySelector(".card-body").innerHTML = updateObj.body

            updatePostBtn.classList.add("d-none")
            addPostBtn.classList.remove("d-none")
            Swal.fire({
                text: `Post ${updateObj.title} update successfully`,
                icon: "success",
                timer: 2500
            }) 
        }
        else{
            cl("error")
        }
        spinner.classList.add("d-none")
    }
    xhr.onerror = function(){
        spinner.classList.add("d-none")
    }
}

//delete
function onDelete(ele){
    const deleteId = ele.closest(".col-md-4").id

    spinner.classList.remove("d-none")

  Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!"
    }).then((result) => {
    if (result.isConfirmed){

    let xhr = new XMLHttpRequest()
    const deleteUrl = `${BASE_URL}/posts/${deleteId}`
  
    xhr.open("DELETE", deleteUrl)
    xhr.send(null)
    xhr.onload = () =>{
        if(xhr.status === 200){
            ele.closest(".col-md-4").remove()
            
            Swal.fire({
                text: `Post with id : ${deleteId} deleted successfully`,
                icon: "success",
                timer: 2500
            }) 
        }
        else{
            cl("error")
        }
        spinner.classList.add("d-none")
        }

        xhr.onerror = function(){
            spinner.classList.add("d-none")
        }
    }
  })
}


postForm.addEventListener("submit", onCreate)
updatePostBtn.addEventListener("click", onUpdate)