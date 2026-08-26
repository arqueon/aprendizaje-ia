import fs from 'node:fs';
import { chromium } from 'playwright-core';
const base='http://100.107.89.3:1313/';
const pages=[
 ['blog','blog/ia-generativa-evaluacion-autentica/'],
 ['ficha','recursos/articulos/autenticidad-evaluacion-ajjawi-bearman/'],
 ['plagio','ia-educacion/etica-y-transparencia/plagio-autenticidad-era-ia/'],
 ['formativa','ia-educacion/guias/evaluacion-formativa-ia/'],
 ['glosario','recursos/glosario/integridad-academica/'],
];
fs.mkdirSync('/tmp/lote09-rendered',{recursive:true});
const browser=await chromium.launch({executablePath:'/home/hermes/.cache/ms-playwright/chromium-1234/chrome-linux64/chrome',headless:true});
const page=await browser.newPage();
const rows=[];
for(const [name,route] of pages){
 const response=await page.goto(new URL(route,base).href,{waitUntil:'networkidle'});
 const data=await page.evaluate(()=>({title:document.title,heading:document.querySelector('h1')?.innerText||'',text:document.querySelector('main')?.innerText||''}));
 const file=`/tmp/lote09-rendered/${name}.txt`; fs.writeFileSync(file,data.text);
 rows.push({name,status:response?.status(),title:data.title,heading:data.heading,chars:data.text.length,file});
}
await browser.close();
console.log(JSON.stringify(rows,null,2));
