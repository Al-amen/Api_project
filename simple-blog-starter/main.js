// Modal functions


function openModal(postId) {
    const modal = document.getElementById('postModal');
    
    if (modal) {
        document.body.classList.add('modal-open');
        modal.classList.remove('hidden');
        modal.classList.add('flex');
        postDetails(postId);
       
    }
}

function closeModal() {
    const modal = document.getElementById('postModal');
    if (modal) {
        modal.classList.remove('flex');
        modal.classList.add('hidden');
        document.body.classList.remove('modal-open');
    }
}

// Close modal when clicking outside
document.getElementById('postModal')?.addEventListener('click', function (e) {
    if (e.target === this) {
        closeModal();
    }
});

let categories = [];
const makeRequest = async(url) => {
    const response = await fetch(url);
    if(!response.ok){
        const message = `Error : ${response.status}`;
        throw new Error(message);

    }
    const data = await response.json();
    return data;

}

const categoryNameById = (categoryId) => {
   
    const category = categories.find((cat) => cat.id === categoryId);
     
    
    return category ? category.name : "unknown";
}

const categorySelect = (id) => {
    makeRequest(`https://basic-blog.teamrabbil.com/api/post-list/${id}`)
    .then((data)=>{
        const newestPost = document.querySelector('#NewestPosts');
        newestPost.innerHTML = " ";
        data.forEach(el => {
            const categoryName = categoryNameById(el.category_id);
            newestPost.innerHTML += `<article
                        class="bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all overflow-hidden group">
                        <div class="relative overflow-hidden">
                            <img src="${el.img}" alt="Post Title"
                                class="w-full h-56 object-cover transform group-hover:scale-105 transition-transform duration-300">
                            <div class="absolute top-4 left-4">
                                <span
                                    class="px-4 py-2 bg-white/90 backdrop-blur-sm rounded-lg text-purple-600 text-sm font-semibold">
                                    ${categoryName}
                                </span>
                            </div>
                        </div>
                        <div class="p-6">
                            <h3
                                class="text-xl font-bold text-gray-800 mb-3 group-hover:text-purple-600 transition-colors">
                                ${el.title}
                            </h3>
                            <p class="text-gray-600 mb-4 line-clamp-2">
                                ${el.short}
                            </p>
                            <div class="flex items-center justify-between">
                                <span class="text-sm text-gray-500">${new Date(el.created_at).toLocaleDateString()}</span>
                                <button onclick="openModal(${el.id})"
                                    class="text-purple-600 hover:text-purple-700 font-medium inline-flex items-center gap-2 transition-colors">
                                    Read more →
                                </button>
                            </div>
                        </div>
                    </article>`
        });
    })
    .catch((err)=>console.log(err));
}

const getRequest = () => {
    makeRequest('https://basic-blog.teamrabbil.com/api/post-categories')
    .then((data) => {
        categoryButton = document.querySelector('#categoryBtns');
        categories = data;
        data.forEach(element => {
            categoryButton.innerHTML += `<button onClick = "categorySelect(${element.id})"
                            class="px-4 py-2 rounded-xl bg-gray-100 text-gray-600 hover:bg-purple-600 hover:text-white hover:shadow-lg hover:shadow-purple-200 transition-all text-sm sm:text-base whitespace-nowrap">
                            ${element.name}
                        </button>`
        });
    })
    .catch((err) => {
        console.log(err)
    });

}

getRequest();



const newestPost = () => {
    makeRequest(`https://basic-blog.teamrabbil.com/api/post-newest`)
    .then((data)=>{
        const newestPost = document.querySelector('#NewestPosts');
        data.forEach(el => {
            const categoryName = categoryNameById(el.category_id);
            newestPost.innerHTML += `<article
                        class="bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all overflow-hidden group">
                        <div class="relative overflow-hidden">
                            <img src="${el.img}" alt="Post Title"
                                class="w-full h-56 object-cover transform group-hover:scale-105 transition-transform duration-300">
                            <div class="absolute top-4 left-4">
                                <span
                                    class="px-4 py-2 bg-white/90 backdrop-blur-sm rounded-lg text-purple-600 text-sm font-semibold">
                                    ${categoryName}
                                </span>
                            </div>
                        </div>
                        <div class="p-6">
                            <h3
                                class="text-xl font-bold text-gray-800 mb-3 group-hover:text-purple-600 transition-colors">
                                ${el.title}
                            </h3>
                            <p class="text-gray-600 mb-4 line-clamp-2">
                                ${el.short}
                            </p>
                            <div class="flex items-center justify-between">
                                <span class="text-sm text-gray-500">${new Date(el.created_at).toLocaleDateString()}</span>
                                <button onclick="openModal(${el.id})"
                                    class="text-purple-600 hover:text-purple-700 font-medium inline-flex items-center gap-2 transition-colors">
                                    Read more →
                                </button>
                            </div>
                        </div>
                    </article>`
        });
    })
    .catch((err)=>console.log(err));
}

newestPost();


const postDetails = (postId) => {
    const postDetail = document.querySelector('#postDetails');
    postDetail.innerHTML = " ";
    makeRequest(`https://basic-blog.teamrabbil.com/api/post-details/${postId}`)
    .then((data) => {
        console.log(data);
        postDetail.innerHTML += `<img class="w-full h-64 object-cover rounded-lg mb-6" src="${data.postDetails.img}"
                    alt="Getting Started with TailwindCSS">
                <div class="prose max-w-none">
                    <p class="text-gray-700 mb-8" id = "postContent">
                        ${data.postDetails.content}
                    </p>
                </div>

                <!-- Comments Section -->
                <div class="border-t pt-6">
                    <h3 class="text-xl font-bold mb-6 text-purple-600">Join the Discussion</h3>

                    <!-- Existing Comments -->
                    <div class="space-y-4 mb-8" id="commentsSection">
                        
                        
                    </div>

                    <!-- Comment Form -->
                    <form id="commentForm" class="bg-gray-50 p-6 rounded-xl shadow-sm border border-purple-100">
                        <h4 class="text-lg font-semibold mb-4 text-gray-800">Leave a Comment</h4>
                        <div class="space-y-6">
                            <div>
                                <label class="block text-sm font-medium text-gray-700 mb-1">Your Name</label>
                                <input type="text" id="authorName" placeholder="John Doe"
                                    class="w-full px-4 py-3 rounded-lg border-2 border-gray-200 focus:border-purple-400 focus:ring focus:ring-purple-100 transition-colors bg-white"
                                    required>
                            </div>
                            <div>
                                <label class="block text-sm font-medium text-gray-700 mb-1">Your Comment</label>
                                <textarea id="commentText" rows="4" placeholder="Share your thoughts..."
                                    class="w-full px-4 py-3 rounded-lg border-2 border-gray-200 focus:border-purple-400 focus:ring focus:ring-purple-100 transition-colors bg-white resize-none"
                                    required></textarea>
                            </div>
                            <div class="flex items-center justify-end gap-3">
                                <button type="button" onclick="closeModal()"
                                    class="px-6 py-2.5 rounded-lg border-2 border-gray-300 text-gray-600 hover:bg-gray-50 transition-colors">
                                    Cancel
                                </button>
                                <button type="submit"
                                    class="px-6 py-2.5 rounded-lg bg-purple-600 text-white hover:bg-purple-700 transition-colors flex items-center gap-2">
                                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                            d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8">
                                        </path>
                                    </svg>
                                    Post Comment
                                </button>
                            </div>
                        </div>
                    </form>
                </div>`;

        // Render comments;

        const commentsSection = document.querySelector('#commentsSection');

        if (data.postComments.length > 0) {
            data.postComments.forEach((comment) => {
                commentsSection.innerHTML += `<div class="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                            <div class="flex items-center gap-3 mb-3">
                                <div
                                    class="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center text-purple-600 font-semibold">
                                    ${comment.author[0]}
                                </div>
                                <div>
                                    <div class="font-semibold text-gray-800">${comment.author}</div>
                                    <div class="text-sm text-gray-500">${new Date(comment.created_at).toLocaleDateString()}</div>
                                </div>
                            </div>
                            <p class="text-gray-600 leading-relaxed"> ${comment.comment}</p>
                        </div>`;
            });
        } else {
            commentsSection.innerHTML = `<p class="text-gray-500">No comments yet. Be the first to comment!</p>`;
        }

        document.querySelector('#commentForm').addEventListener('submit', (event) => {
            createComment(event, postId);
        });
    });
};
