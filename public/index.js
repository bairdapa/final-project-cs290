function showNewPostDialog() {
	document.getElementById('new-post-background').classList.remove('hidden');
	document.getElementById('new-post-container').classList.remove('hidden');
}

function hideNewPostDialog() {
	document.getElementById('new-post-background').classList.add('hidden');
	document.getElementById('new-post-container').classList.add('hidden');
	
	document.getElementById('new-post-input-url').value = '';
	document.getElementById('new-post-input-caption').value = '';
}

function acceptNewPost() {
	var url = document.getElementById('new-post-input-url').value;
	var caption = document.getElementById('new-post-input-caption').value;
	
	addPost(url, caption);
	hideNewPostDialog();
}

function addPost(url, caption) {
	var postContext = {
		"url" : url,
		"caption" : caption
	};
	
	var postHTML = Handlebars.templates.post(postContext);
	var postContainer = document.getElementById('body');
	postContainer.insertAdjacentHTML('beforeend', postHTML);
}


document.getElementById('new-button').onclick = showNewPostDialog;
document.getElementById('new-post-cancel').onclick = hideNewPostDialog;
document.getElementById('new-post-submit').onclick = acceptNewPost;