import {openDB} from 'idb';
import {isScenario, type Scenario} from './model';
const db=()=>openDB('planwise',1,{upgrade(db){db.createObjectStore('scenarios',{keyPath:'id'});db.createObjectStore('meta')}});
export async function load(){const d=await db();const raw=await d.getAll('scenarios');if(!raw.every(isScenario))throw new Error('Nieprawidłowy format zapisanych danych.');return {scenarios:raw as Scenario[],last:await d.get('meta','last') as string|undefined}}
export async function save(s:Scenario){const d=await db();const tx=d.transaction(['scenarios','meta'],'readwrite');await tx.objectStore('scenarios').put(s);await tx.objectStore('meta').put(s.id,'last');await tx.done}
export async function remove(id:string){const d=await db();await d.delete('scenarios',id)}
