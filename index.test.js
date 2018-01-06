const url = 'https://fetchsandbox.herokuapp.com/api'
const fetch = require('node-fetch')

const exampleNote = {
    'title':'Titolo di prova',
    'body':'questo mi serve come test della nuova api'
}


const postNote = function(note){
    return fetch('https://fetchsandbox.herokuapp.com/api/notes',{
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        body: JSON.stringify(note)
    })
}

test('basic post and get the posted element', () =>{
    return postNote(exampleNote)
        .then(res => {return res.json()})
        .then(data =>{
            expect(data.body).toBe(exampleNote.body);
            expect(data.title).toBe(exampleNote.title);
        })
});