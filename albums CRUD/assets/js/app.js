const cl = console.log;

const BASE_URL = "https://jsonplaceholder.typicode.com"

const ALBUMS_URL = `${BASE_URL}/albums`

let xhr = new XMLHttpRequest()

xhr.open("GET", ALBUMS_URL)

xhr.onload = function () {
    if (xhr.status === 200) {
        let data = JSON.parse(xhr.response)
        console.log(data);

        let result = ``

        data.forEach(albums => {
            result += ` <div class="col-4" id="${albums.id}">
                <div class="card">
                    <div class="card-header">
                        <h4>${albums.title}</h4>
                    </div>
                    <div class="card-footer d-flex justify-content-between">
                        <button class="btn btn-sm btn-outline-primary">Add</button>
                        <button class="btn btn-sm btn-outline-danger">Delete</button>
                    </div>
                </div>
            </div>`


            const albumsContainer = document.getElementById("albumsContainer")
            albumsContainer.innerHTML = result
        });
    } else {
        cl("error")
    }
}

xhr.send()