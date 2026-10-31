import {watchWeekly,watchHomework} from "./firebase.js";
const $=id=>document.getElementById(id);
let weekly=[],homework=[],chosen=localDate(),stops=[];
const names=["вс","пн","вт","ср","чт","пт","сб"];
function localDate(){const d=new Date();d.setMinutes(d.getMinutes()-d.getTimezoneOffset());return d.toISOString().slice(0,10)}
function parseDate(s){return new Date(s+"T12:00:00")}
const esc=s=>String(s??"").replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));
const cat=`<div class="empty"><svg viewBox="0 0 420 300" role="img" aria-label="Спящий кот в кресле"><path d="M65 270 45 110Q40 35 125 25q135-15 165 25l35 90 42 12q38 6 35 53l-2 65z" fill="#f1f1f3" stroke="#f1f1f3" stroke-width="9" stroke-linejoin="round"/><path d="M95 245 65 112Q55 50 126 45q117-12 143 23l25 63" fill="none" stroke="#080808" stroke-width="5" stroke-linecap="round"/><path d="M165 57q18 10 30 70l17 70q8 24 36 24h105q31 0 36 33l7 40" fill="none" stroke="#080808" stroke-width="5" stroke-linecap="round"/><path d="m240 112-3-42 31 18 62-8 32-25 10 48 20 65-9 30q-50 25-106 0l-32-26z" fill="#f1f1f3" stroke="#080808" stroke-width="5" stroke-linejoin="round"/><path d="M257 128q12 12 25 0m37-5q12 12 25 0" fill="none" stroke="#080808" stroke-width="5" stroke-linecap="round"/><path d="m291 144 20-7-10 18q-10-2-10-11z" fill="none" stroke="#080808" stroke-width="4"/><path d="M291 159q17 15 33 0" fill="none" stroke="#080808" stroke-width="4" stroke-linecap="round"/><ellipse cx="258" cy="151" rx="14" ry="8" fill="#b9dcff"/><ellipse cx="355" cy="148" rx="14" ry="8" fill="#b9dcff"/></svg><h2>На сегодня ничего не задано</h2><p>Можно немного отдохнуть ☺</p></div>`;
const dateList=Array.from({length:15},(_,i)=>{const d=new Date();d.setDate(d.getDate()+i-7);return localISO(d)});
function localISO(d){const x=new Date(d);x.setMinutes(x.getMinutes()-x.getTimezoneOffset());return x.toISOString().slice(0,10)}
function dates(id){$(id).innerHTML=dateList.map(d=>`<button class="date ${d===chosen?"selected":""}" data-date="${d}"><b>${parseDate(d).getDate()}</b><small>${names[parseDate(d).getDay()]}</small></button>`).join("")}
function render(){
 dates("dateStrip");dates("hwDates");
 const d=parseDate(chosen),dayName=["Воскресенье","Понедельник","Вторник","Среда","Четверг","Пятница","Суббота"][d.getDay()];
 $("selectedDay").innerHTML=`<div class="selected-label"><b>${dayName}</b><span>${d.toLocaleDateString("ru-RU",{day:"numeric",month:"long"})}</span></div>`;
 const lessons=weekly.filter(x=>Number(x.weekday)===d.getDay()).sort((a,b)=>(a.start||"").localeCompare(b.start||""));
 $("lessonCards").innerHTML=lessons.length?lessons.map(x=>`<article class="lesson"><div><b>${esc(x.subject)}</b><time>${esc(x.start)} — ${esc(x.end)}</time></div><span class="lesson-number">${String(lessons.indexOf(x)+1).padStart(2,"0")}</span></article>`).join(""):cat;
 const hw=homework.filter(x=>x.date===chosen);
 $("homeworkCards").innerHTML=hw.length?hw.map(x=>`<article class="homework"><b>${esc(x.subject)}</b><p>${esc(x.text)}</p></article>`).join(""):cat;
}
function tab(name){document.querySelectorAll(".screen").forEach(x=>x.classList.toggle("active",x.id===name));document.querySelectorAll("nav button").forEach(x=>x.classList.toggle("active",x.dataset.screen===name));$("pageTitle").textContent=name==="schedule"?"Расписание":name==="homework"?"Задания":"Настройки"}
document.querySelector("nav").onclick=e=>{const b=e.target.closest("[data-screen]");if(b)tab(b.dataset.screen)};
document.addEventListener("click",e=>{const d=e.target.closest("[data-date]");if(d){chosen=d.dataset.date;render()}});
function applyTheme(v){const dark=v==="dark"||(v==="system"&&matchMedia("(prefers-color-scheme: dark)").matches);document.documentElement.dataset.theme=dark?"dark":"light";$("themeSelect").value=v;localStorage.setItem("studentTheme",v)}
applyTheme(localStorage.getItem("studentTheme")||"system");$("themeSelect").onchange=e=>applyTheme(e.target.value);
function connect(){
 stops.forEach(s=>s());stops=[];$("status").textContent="Загружаем данные…";
 stops.push(watchWeekly(x=>{weekly=x;render();$("status").textContent="Расписание обновлено"},e=>$("status").textContent="Ошибка: "+e.message));
 stops.push(watchHomework(x=>{homework=x;render()},e=>$("status").textContent="Ошибка: "+e.message));
}
$("refresh").onclick=connect;connect();render();
