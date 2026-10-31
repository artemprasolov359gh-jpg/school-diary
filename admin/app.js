import {auth,login,logout,onAuthStateChanged,watchWeekly,watchHomework,addWeekly,updateWeekly,deleteWeekly,addHomework,updateHomework,deleteHomework} from "./firebase.js";
const $=id=>document.getElementById(id);
let weekly=[], homework=[], stops=[];
const today=()=>{const d=new Date();d.setMinutes(d.getMinutes()-d.getTimezoneOffset());return d.toISOString().slice(0,10)};
$("hwDate").value=today();
const days=["Воскресенье","Понедельник","Вторник","Среда","Четверг","Пятница","Суббота"];
const esc=s=>String(s??"").replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));
function drawWeekly(){
 weekly.sort((a,b)=>Number(a.weekday)-Number(b.weekday)||(a.start||"").localeCompare(b.start||""));
 $("weeklyTotal").textContent=weekly.length+" уроков";
 $("weeklyRecords").innerHTML=weekly.length?days.map((day,i)=>{const items=weekly.filter(x=>Number(x.weekday)===i);return items.length?`<section class="day-group"><h4>${day}</h4>${items.map(x=>`<article class="record"><div><b>${esc(x.subject)}</b><p class="muted">${esc(x.start)}—${esc(x.end)}</p></div><div class="actions"><button class="secondary" data-wedit="${x.id}">Изменить</button><button class="danger" data-wdel="${x.id}">Удалить</button></div></article>`).join("")}</section>`:""}).join(""):'<p class="muted">Недельное расписание пока пустое.</p>';
}
function drawHomework(){
 homework.sort((a,b)=>(a.date||"").localeCompare(b.date||""));
 $("hwTotal").textContent=homework.length+" заданий";
 $("homeworkRecords").innerHTML=homework.length?homework.map(x=>`<article class="record"><div><b>${esc(x.subject)}</b><p class="muted">${esc(x.date)}</p><small>${esc(x.text)}</small></div><div class="actions"><button class="secondary" data-hedit="${x.id}">Изменить</button><button class="danger" data-hdel="${x.id}">Удалить</button></div></article>`).join(""):'<p class="muted">Домашних заданий пока нет.</p>';
}
function clearWeekly(){ $("weeklyForm").reset();$("weeklyEditId").value="";$("weeklyMessage").textContent=""; }
function clearHw(){ $("homeworkForm").reset();$("homeworkEditId").value="";$("hwDate").value=today();$("hwMessage").textContent=""; }
$("weeklyClear").onclick=clearWeekly;$("hwClear").onclick=clearHw;
$("loginForm").onsubmit=async e=>{e.preventDefault();try{await login($("email").value,$("password").value)}catch{$("loginError").textContent="Не удалось войти. Проверьте email и пароль."}};
$("logout").onclick=logout;
onAuthStateChanged(auth,u=>{
 $("login").hidden=!!u;$("workspace").hidden=!u;
 stops.forEach(s=>s());stops=[];
 if(u){
  stops.push(watchWeekly(x=>{weekly=x;drawWeekly()},e=>$("weeklyMessage").textContent=e.message));
  stops.push(watchHomework(x=>{homework=x;drawHomework()},e=>$("hwMessage").textContent=e.message));
 }else{weekly=[];homework=[];drawWeekly();drawHomework()}
});
$("weeklyForm").onsubmit=async e=>{
 e.preventDefault();
 const data={weekday:Number($("weekday").value),subject:$("weeklySubject").value.trim(),start:$("weeklyStart").value,end:$("weeklyEnd").value};
 if(data.end<=data.start){$("weeklyMessage").textContent="Время окончания должно быть позже начала.";return}
 try{const id=$("weeklyEditId").value;if(id)await updateWeekly(id,data);else await addWeekly(data);$("weeklyMessage").textContent="Сохранено! Урок будет повторяться каждую неделю.";clearWeekly()}
 catch(err){$("weeklyMessage").textContent="Ошибка: "+err.message}
};
$("homeworkForm").onsubmit=async e=>{
 e.preventDefault();const data={date:$("hwDate").value,subject:$("hwSubject").value.trim(),text:$("hwText").value.trim()};
 try{const id=$("homeworkEditId").value;if(id)await updateHomework(id,data);else await addHomework(data);$("hwMessage").textContent="Домашнее задание сохранено.";clearHw()}
 catch(err){$("hwMessage").textContent="Ошибка: "+err.message}
};
$("weeklyRecords").onclick=async e=>{
 const edit=e.target.closest("[data-wedit]"),del=e.target.closest("[data-wdel]");
 if(edit){const x=weekly.find(v=>v.id===edit.dataset.wedit);$("weeklyEditId").value=x.id;$("weekday").value=x.weekday;$("weeklySubject").value=x.subject;$("weeklyStart").value=x.start;$("weeklyEnd").value=x.end;scrollTo({top:0,behavior:"smooth"})}
 if(del&&confirm("Удалить этот повторяющийся урок?"))try{await deleteWeekly(del.dataset.wdel)}catch(err){alert(err.message)}
};
$("homeworkRecords").onclick=async e=>{
 const edit=e.target.closest("[data-hedit]"),del=e.target.closest("[data-hdel]");
 if(edit){const x=homework.find(v=>v.id===edit.dataset.hedit);$("homeworkEditId").value=x.id;$("hwDate").value=x.date;$("hwSubject").value=x.subject;$("hwText").value=x.text;scrollTo({top:0,behavior:"smooth"})}
 if(del&&confirm("Удалить домашнее задание?"))try{await deleteHomework(del.dataset.hdel)}catch(err){alert(err.message)}
};
function theme(t){document.documentElement.dataset.theme=t;localStorage.setItem("adminTheme",t)}
theme(localStorage.getItem("adminTheme")||(matchMedia("(prefers-color-scheme:dark)").matches?"dark":"light"));
$("theme").onclick=()=>theme(document.documentElement.dataset.theme==="dark"?"light":"dark");
