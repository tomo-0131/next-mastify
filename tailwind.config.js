module.exports = {
	content: [
		"./pages/**/*.{js,ts,jsx,tsx}",
		"./components/**/*.{js,ts,jsx,tsx}",
	],
	theme: {
		extend: {
			height: {
				600: "600px",
				700: "700px",
			},
		},
	},
	plugins: [
		require("@tailwindcss/forms"),
		require("tailwind-scrollbar"),
		require("tailwind-scrollbar-hide"),
	],
};
