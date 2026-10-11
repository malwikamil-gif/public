import {describe,it,expect} from 'vitest';
import {calculate,errors,initial,isScenario,type Scenario} from './model';
const scenario=(items:[number,number][],budget=100000):Scenario=>({...initial(),totalBudget:budget,categories:items.map(([budget,expectedROI],i)=>({id:String(i),name:'Kanał',budget,expectedROI}))});
describe('Model finansowy PRD',()=>{
 it('oblicza dodatni zwrot',()=>{const x=calculate(scenario([[100000,50]]));expect(x.gross).toBe(150000);expect(x.net).toBe(50000)});
 it('oblicza stratę',()=>{const x=calculate(scenario([[100000,-20]]));expect(x.gross).toBe(80000);expect(x.net).toBe(-20000)});
 it('stosuje ważony ROI',()=>expect(calculate(scenario([[80000,100],[20000,0]])).roi).toBe(80));
 it('nie uwzględnia nieprzydzielonych środków jako kosztu',()=>{const x=calculate(scenario([[60000,50]]));expect(x.remaining).toBe(40000);expect(x.roi).toBe(50)});
 it('blokuje przekroczenie budżetu',()=>{const s=scenario([[110000,50]]);expect(calculate(s).remaining).toBe(-10000);expect(errors(s)).toContain('Alokacja przekracza dostępny budżet.')});
 it('obsługuje brak inwestycji oraz ROI -100%',()=>{expect(calculate(scenario([[0,100]])).roi).toBeNull();expect(calculate(scenario([[100000,-100]])).gross).toBe(0)});
 it('odrzuca pusty i niedozwolony ROI',()=>{expect(errors(scenario([[100,-101]])).length).toBeGreaterThan(0);expect(errors(scenario([[100,NaN]])).length).toBeGreaterThan(0)});
 it('utrzymuje dokładność dziesiętnych kwot',()=>{const x=calculate(scenario([[.1,100],[.2,100]],1));expect(x.allocated).toBe(.3);expect(x.net).toBe(.3)});
 it('kopie zachowują ID kanałów i nie modyfikują oryginału',()=>{const a=scenario([[100,50]]),b=structuredClone(a);b.categories[0].budget=80;expect(a.categories[0].budget).toBe(100);expect(a.categories[0].id).toBe(b.categories[0].id)});
 it('różnica ROI wynosi 15 punktów procentowych',()=>expect(calculate(scenario([[100,65]])).roi!-calculate(scenario([[100,50]])).roi!).toBe(15));
 it('waliduje backup',()=>{expect(isScenario(initial())).toBe(true);expect(isScenario({schemaVersion:2})).toBe(false)});
});
