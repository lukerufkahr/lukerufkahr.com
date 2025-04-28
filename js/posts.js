async function posts() {
	//Downloads postindex json file
	const metadata = JSON.parse(await getFile("metadata/postindex.json"));
	
	//creates an ul element and adds it to the body div
	var ul = document.createElement('ul');
	siteBody[0].appendChild(ul);
	
	//postindex.json has post information: oldest posts are first
	//starts from the last post added and works it way to the first added.
	for (var i = metadata.posts.length - 1; i >= 0; i--) {
		var li = document.createElement('li');
		var a = document.createElement('a');
			
		a.innerHTML = metadata.posts[i].title;
		a.setAttribute('style', "color:green");
		a.setAttribute('onclick', "loadPage('posts/"+metadata.posts[i].file+"')");

		li.appendChild(a);
		ul.appendChild(li)
	}
}

posts();
