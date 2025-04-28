//Defines all the various elements in preparation for manipulation
var siteHeader = document.getElementsByClassName('load-header');
var siteFooter = document.getElementsByClassName('load-footer');
var siteBody = document.getElementsByClassName('load-body');
var sitePage = document.getElementsByClassName('site-page');
var siteLocation = window.location.href;

if (siteLocation === "https://lukerufkahr.com/" || siteLocation === "https://lukerufkahr.com/#") { siteLocation = "views/home.html";}
else { siteLocation = (window.location.href).replace("https://lukerufkahr.com/#", "");}

//Loads the initial view
loadPage("snippets/header.html", siteHeader);
loadPage("snippets/footer.html", siteFooter);
loadPage(siteLocation);

//takes two arguments, a file, and an element
async function loadPage(file, element = siteBody) {
	//element[0].innerHTML = "";
	const pageData = await getFile(file);
	var metadata = null;

	//replaces the element data
	element[0].innerHTML = pageData;

	if (element === siteBody) {
		//each page in 'views/' should have a HTML comment at the top containing a JSON string with page metadata
		//title of the page, created, edited, and linked script file if the view needs extra javascript functionality
		metadata = pageData.slice(9, pageData.indexOf("end-->"));
		metadata = JSON.parse(metadata.trim());
		
		//sets the metadata to the page
		(document.getElementsByClassName('$title'))[0].innerHTML = metadata.title;
		(document.getElementsByClassName('$created'))[0].innerHTML = metadata.created;
		(document.getElementsByClassName('$edited'))[0].innerHTML = metadata.edited;

		//embeds the script file into the page
		if (metadata.script != "") {
			const scriptData = await getFile(metadata.script);
			var script = document.createElement("script");
			script.innerHTML = scriptData;

			//appendChild is needed for the browser to execute the script
			siteBody[0].appendChild(script);
		}

		window.location.href = "#"+file;
	}
}

//Downloads a file from the web server and returns it as a string
async function getFile(file) {
	var url = "https://lukerufkahr.com/"+file
	const data = await fetch(url);
	return data.text();
}
