document.addEventListener("DOMContentLoaded", function (event) {
	contents = document.body.innerHTML;
	document.body.innerHTML = basehtml;
	document.getElementById("contents").innerHTML = contents;
	document.body.style = "background-color: #202020";

	var notes = document.getElementsByTagName('note');
	for (var i = 0; i < notes.length; i++) {
		let content = notes[i].innerHTML;
		notes[i].innerHTML = "<img src=\"Images/Info.webp\" alt=\"INFO\">" + content;
	}
	var notes = document.getElementsByTagName('warning');
	for (var i = 0; i < notes.length; i++) {
		let content = notes[i].innerHTML;
		notes[i].innerHTML = "<img src=\"Images/Warning.png\" alt=\"WARNING\">" + content;
	}
	var notes = document.getElementsByTagName('deprecatedwarning');
	for (var i = 0; i < notes.length; i++) {
		let content = notes[i].innerHTML;
		notes[i].innerHTML = "<img src=\"Images/Deprecated.png\" alt=\"DEPRECATED\">" + content;
	}
	var codes = Array.from(document.getElementsByTagName('code')).concat(Array.from(
		document.getElementsByTagName("inline-code")));
	for (var j = 0; j < codes.length; j++) {
		if (codes[j].getAttribute("language") != "js") continue;
		let content = codes[j].innerHTML;
		let result = "";
		let builder = "";
		let color = "gray";
		let state = 0;
		for (i = 0; i < content.length; i++) {
			if (content[i]=="\"") {
				for (; i < content.length; i++) {
					builder += content[i];
					if (content[i] == "\"") break;
				}
				result += "<span style=\"color:#E0E000\">" + builder + "</span>";
				builder = "";
				state = 0;
				color = "white";
				continue;
			}
			builder += content[i];
			if (content[i] === "\n"||content[i] === ";") {
				result += "<span style=\"color:" + color + "\">" + builder.substring(0,builder.length-1) + "</span>";
				result += "<span style=\"color:white\">"+content[i]+"</span>";
				color = "gray";
				state = 0;
				builder = "";
			}
			if (content[i] === "(") {
				result += "<span style=\"color:#018ea0\">" + builder.substring(0,builder.length-1) + "</span>";
				result += "<span style=\"color:white\">(</span>";
				builder = "";
			}
			if (content[i] === ")") {
				result += "<span style=\"color:white\">" + builder + "</span>";
				builder = "";
			}
			if (state == 1) {
				if (content[i] === "=") {
					result += "<span style=\"color:#018ea0\">" + builder.substring(0, builder.length - 1) + "</span>";
					result += "<span style=\"color:white\">\=</span>";
					builder = "";
					color = "white";
					state = 2;
				}
				continue;
			}
			if (state == 2) {
				if (content[i] === " ") {
					result += "<span style=\"color:#018ea0\">" + builder + "</span>";
					builder = "";
					color = "#0f770f";
					state = 0;
				}
				continue;
			}
			if (builder === "function " || builder === "return "||builder==="var "||builder==="let ") {
				result += "<span style=\"color:#ea716a\">" + builder + "</span>";
				if (builder==="var "||builder==="let ") {
					color = "#018ea0";
					state = 1;
				}
				builder = "";
			}
			if (content[i] == "\t") {
				result += "\t";
				builder = "";
			}
		}
		result += "<span color=\"" + color + "\">" + builder + "</span>";
		codes[j].innerHTML = result;
	}
});