const defaultTheme = require("tailwindcss/defaultTheme");

/** @type {import('tailwindcss').Config} */
export default {
	darkMode: "class",
	content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
	theme: {
		extend: {
			colors: {
				primary: {
					DEFAULT: "var(--primary)",
					foreground: "var(--primary-fg)",
				},
				secondary: "var(--secondary)",
				background: "var(--bg)",
				foreground: "var(--fg)",
				"muted-foreground": "var(--muted-fg)",
				border: "var(--border)",
			},
			keyframes: {
				"accordion-down": {
					from: { height: "0" },
					to: { height: "var(--radix-accordion-content-height)" },
				},
				"accordion-up": {
					from: { height: "var(--radix-accordion-content-height)" },
					to: { height: "0" },
				},
			},
			animation: {
				"accordion-down": "accordion-down 0.2s ease-out",
				"accordion-up": "accordion-up 0.2s ease-out",
			},
			fontFamily: {
				sans: ["iA Writer Duo", ...defaultTheme.fontFamily.sans],
				mono: ["iA Writer Mono", ...defaultTheme.fontFamily.mono],
			},
			typography: ({ theme }) => ({
				everforest: {
					css: {
						"--tw-prose-body": "var(--fg)",
						"--tw-prose-headings": "var(--fg)",
						"--tw-prose-lead": "var(--muted-fg)",
						"--tw-prose-links": "var(--primary)",
						"--tw-prose-counters": "var(--muted-fg)",
						"--tw-prose-bullets": "var(--muted-fg)",
						"--tw-prose-quotes": "var(--muted-fg)",
						"--tw-prose-bold": "var(--fg)",
						"--tw-prose-hr": "var(--secondary)",
						"--tw-prose-quote-borders": "var(--secondary)",
						"--tw-prose-captions": "var(--muted-fg)",
						"--tw-prose-invert-body": "var(--bg)",
						"--tw-prose-pre-bg": "var(--secondary)",
						"--tw-prose-invert-headings": "var(--bg)",
						"--tw-prose-invert-lead": "var(--muted-fg)",
						"--tw-prose-invert-links": "var(--primary)",
						"--tw-prose-invert-counters": "var(--muted-fg)",
						"--tw-prose-invert-bullets": "var(--muted-fg)",
						"--tw-prose-invert-quotes": "var(--muted-fg)",
						"--tw-prose-invert-quote-borders": "var(--secondary)",
						"--tw-prose-invert-captions": "var(--muted-fg)",
					},
				},
			}),
		},
	},
	plugins: [
		require("@tailwindcss/typography"),
		require("tailwindcss-animate"),
		require("daisyui"),
		require("tailwind-scrollbar"),
	],
	daisyui: {
		styled: false,
		base: false,
	},
};
