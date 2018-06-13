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
	
	if (!url || !caption) {
		alert("You must fill in all of the fields!");
	} else {
		addPost(url, caption);
		hideNewPostDialog();
		post('/', url, caption);
	}
}

function addPost(url, caption) {
	var postContext = {
		"postCaption": caption,
		"url": url
	};
	
	var postHTML = Handlebars.templates.post(postContext);
	var postContainer = document.getElementById('body');
	postContainer.insertAdjacentHTML('beforeend', postHTML);
}

function post(path, url, caption) {
	var xhr = new XMLHttpRequest();
	xhr.open("POST", '/', true);
	
	xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");

	xhr.send("url=" + url + "&postCaption=" + caption);
}

document.getElementById('new-button').onclick = showNewPostDialog;
document.getElementById('new-post-cancel').onclick = hideNewPostDialog;
document.getElementById('new-post-submit').onclick = acceptNewPost;
