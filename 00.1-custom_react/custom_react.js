function customRender (react_element, container) {
	const dom_element = document.createElement (react_element.type);
	dom_element.innerHTML = react_element.children;

//	dom_element.setAttribute ("href", react_element.props.href);
//	dom_element.setAttribute ("target", react_element.props.target);

	for (const prop in react_element.props) {
		if (prop === "children") continue;
		dom_element.setAttribute (prop, react_element.props [prop]);
	}

	container.appendChild (dom_element);
}

const react_element = {
	type: "a"
	, props: {
		href: "https://google.com"
		, target: "_blank"
	}
	, children: "Google"
};

const container = document.getElementById ("root");

customRender (react_element, container);