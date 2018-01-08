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

const getOneNote = function(noteID){
    return fetch('https://fetchsandbox.herokuapp.com/api/notes/'+noteID, {
        method: 'GET',
        headers: {
            'Accept': 'application/json'
        }
    })
}

const deleteNote = function(noteID){
    return fetch('https://fetchsandbox.herokuapp.com/api/notes/'+noteID, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        }//,
    })
}

test('basic post and get the posted element', () =>{
    return postNote(exampleNote)
        .then(res => {return res.json()})
        .then(data =>{
            exampleNote.noteID = data._id
            return getOneNote(exampleNote.noteID)
        })
        .then(getResponse => {return getResponse.json()})
        .then(jsonresponse => {
            expect(jsonresponse.body).toBe(exampleNote.body);
            expect(jsonresponse.title).toBe(exampleNote.title);
            expect(jsonresponse._id).toBe(exampleNote.noteID);
        })
});

test('delete sample item', () =>{
    return deleteNote(exampleNote.noteID)
    .then(res => {return res.json()})    
    .then(response => {expect(response.status).toBe(204);})
});

test('delete item actually deteted', ()=>{
    return deleteNote(exampleNote.noteID)
        .then(response => {expect(response.status).toBe(404);})
});