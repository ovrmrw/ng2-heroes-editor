const specFiles: string[] = [
  './app/app.component.spec',  
  './page2/page2.component.spec'
];

specFiles.forEach(file => require(file));