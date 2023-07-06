import { HeaderComponent } from "./components/header/header.component"
import.meta.jest
import {jest} from '@jest/globals'

// einfaches Beispiel 

describe('if the filter is working', ()=>{
    const myFilter =  HeaderComponent; // soll checken ob es gefiltert ist oder nicht
    it('the filter works!!',()=>{
        expect(myFilter.filterChicking()).toBe(true)
    })
})