# Front-end Coder

Front-end coder is a front-end development tool. It helps you by doing the following:
* You write html, css and JS in different files, the tool builds a final html file with all files in one
* You can set additional imports by declaring them in a specific file
* The tool automatically transpiles typescript to pure javascript
* The tool compiles and minify css files

How to use it

1. Run `npm install` to start
2. Write your HTML content in the file `src/content.html`
3. Write you css code in the file `src/css/main.css`, you can use css imports too
4. Write your JS code in the file `src/js/header/index.ts`  or `src/js/footer/index.ts`, deppending whether you want the JS on the header or on the bottom of your HTML content.
5. If you need to add external JS or CSS importations, write then in the file `src/imports.html`
6. `src/template.html` and `src/template-body.html` are not supposed to be edited. They are templates that the tool uses to generates the final HTML file
7. Build the final HTML content with the command `gulp build`. Or use `gulp watch` to automatically build whenever files in the `src` dir were edited
8. Find the generated file in `dist/template.html` or `dist/template-body.html` deppending whether you want a full HTML file or just the HTML body.
