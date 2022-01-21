# Front-end Coder

Front-end coder is a front-end development tool. It helps you doing the following:
* You write html, css and JS in different files, the tool builds a final html file with all files in one
* You can set additional imports by declaring them in a specific file
* The tool automatically transpiles typescript to pure javascript
* The tool compiles and minify css files

How to use it

1. Run `npm install` to start
2. Write your HTML content in the file `src/content.html`
3. Write you css code in the file `src/css/main.css`, you can use css imports too
4. Write your JS code in the file `src/js/header/index.ts`  or `src/js/footer/index.ts`, deppending wheter you want the JS on the header or on the bottom of your HTML content.
5. Build the final HTML content with the command `gulp build`
6. Find the generated file in `dist/template.html` or `dist/template-body.html` deppending wheter you want a full HTML file or just the HTML body.