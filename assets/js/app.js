const cl = console.log;

const BASE_URL = "https://jsonplaceholder.typicode.com";

const POST_URL = `${BASE_URL}/posts`

let xhr = new XMLHttpRequest()

xhr.open("GET", POST_URL)

xhr.onload = function () {
    if (xhr.status === 200) {
        // cl(xhr.response)
        let data = JSON.parse(xhr.response)

        let result = ``

        data.forEach(post => {
            result += `<div class="col-md-4 mt-4" id="${post.id}">
                <div class="card h-100" >
                    <div class="card-header">
                        <h4><span class="badge badge-info">${post.userId}</span> ${post.title}</h4>
                    </div>
                    <div class="card-body">
                        <p>${post.body}</p>
                    </div>
                    <div class="card-footer d-flex justify-content-between">
                        <button class="btn btn-sm btn-primary">Edit</button>
                        <button class="btn btn-sm btn-danger">Delete</button>
                    </div>
                </div>
            </div>`

            const postContainer = document.getElementById("postContainer")
            postContainer.innerHTML = result
        })
    } else {
        cl("error")
    }
}


xhr.send()


