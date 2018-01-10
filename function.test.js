const foo = require('./function');

test('prova con foo 0,-1 per function 100%', ()=>{
    expect(foo(0,-1));
})

test('prova con x diverso da 0 e y diverso da 0', ()=>{
    expect(foo(5,5));
})