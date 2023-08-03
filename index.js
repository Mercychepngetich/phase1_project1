// const jsonServer = require("json-server");
// const server = jsonServer.create();
// const router = jsonServer.router("db.json");
// const middlewares = jsonServer.defaults();
// const port = process.env.PORT ||3001;

// server.use(middlewares);
// server.use(router);

// server.listen(port);
document.addEventListener("DOMContentLoaded", function (){

function fetchJobs(){
    fetch("https://phase1-project01.onrender.com/jobs")
    .then(res => res.json())
    .then(data => displayJobs(data))
    .catch(error => console.log(error))
}
fetchJobs()

function displayJobs(jobs){
    for(const job of jobs){
        const jobPosts = document.getElementById("jobPosts")
        const newElement = document.createElement("div")
        newElement.innerHTML = `
        <div id="className">
        <h2>${job.title}</h2>
        Job Post ID:${job.id}
         <p> ${job.description}</p>
         <p> ${job.comments}</p>
         <button> Add Commment</button>
         </div>
           `
        jobPosts.appendChild(newElement)
//search options
let options = document.getElementById('datalistOptions')
let option1 = document.createElement('option')
option1.innerHTML=`
<option value = "${job.title}">`
options.appendChild(option1)

    }
    
    function searchJob() {
        let searchInput = document.getElementById('searchInput').value.toLowerCase();
        let jobPosts = document.querySelectorAll('#jobPosts > div');
    
        for (const jobPost of jobPosts) {
            let title = jobPost.querySelector('h2').textContent.toLowerCase();
            if (title.includes(searchInput)) {
                jobPost.style.display = 'block';
            } else {
                jobPost.style.display = 'none';
            }
        }
    }
    let searchForm = document.getElementById('searchInput');
searchForm.addEventListener('input', searchJob);
    

}



  let form = document.getElementById('postForm')
       form.addEventListener('submit', postJob )
      



//function to post new job
  
function postJob(e){
    e.preventDefault()
    
    
let inputTitle = document.getElementById('title')
let inputDescription = document.getElementById('description')
fetch("https://phase1-project01.onrender.com/jobs",{
    method:"POST",
    headers:{"Content-Type":"application/json"},
    body:JSON.stringify({
        title:inputTitle.value,
        description:inputDescription.value
    })
} )
.then((response)=>{
    if (response.ok){
        alert("Job has been posted successfully!");
        form.reset()
    }else{
        alert("Failed to post Job. Please try again")
        
    }
})


}
let updateForm = document.getElementById('updateForm');
updateForm.addEventListener('submit', updateJob);

function updateJob(e) {
    e.preventDefault();

    let newId = document.getElementById('newId').value;
    let newTitle = document.getElementById('newtTitle').value;

    fetch(`https://phase1-project01.onrender.com/jobs/${newId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            title: newTitle
        })
    })
        .then((response) => {
            if (response.ok) {
                alert("Job has been updated successfully!");
                updateForm.reset();
                fetchJobs(); // Refresh the job list after the update
            } else {
                alert("Failed to update Job. Please try again");
                updateForm.reset();
            }
        })
        .catch((error) => {
            alert("Error occurred while updating job");
            console.log(error);
        });
}
let deleteForm = document.getElementById('deleteForm');
deleteForm.addEventListener('submit', deleteJob);

  
function deleteJob(e){
    e.preventDefault();
    let deleteId = document.getElementById('deleteId').value;

    if (confirm("Are you sure you want to delete this job post?")) {
    fetch(`https://phase1-project01.onrender.com/jobs/${deleteId}`, {
        method:"DELETE"
    })
    .then((response) => {
        if (response.ok) {
            alert("Job has been deleted successfully!");
            deleteForm.reset()
            fetchJobs(); // job list is refreshed
        } else {
            alert("Failed to delete Job. Please try again");
            deleteForm.reset()
        }
    })
    .catch((error) => {
        alert("Error occurred while deleting job");
        console.log(error);
    });


}
}


let commentForm = document.getElementById('commentForm');
commentForm.addEventListener("submit", function(){
    addComment()
})


//function to add a comment to job post

function addComment(e){
    e.preventDefault();
    let commentId = document.getElementById('commentId').value
    let commentText = document.getElementById("comment").value

    fetch(`https://phase1-project01.onrender.com/jobs/${commentId}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ comments: commentText })
    })
    .then((response) => {
        if (response.ok) {
            alert("Comment has been added successfully!");
            commentForm.reset();
            fetchJobs(); // Refresh the job list after the comment is added
        } else {
            alert("Failed to add comment. Please try again");
            commentForm.reset();
        }
    })
    .catch((error) => {
        alert("Error occurred while adding comment");
        console.log(error);
    });
}




})













