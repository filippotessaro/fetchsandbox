const root = process.env.SERVER_URL || 'http://127.0.0.1:8080'
const assignmentsRoot = root+'/api/notes'
const fetch = require('node-fetch')

const exampleNote = {
    'title':'Titolo di prova',
    'body':'questo mi serve come test della nuova api'
}

const newContent = {
    'title':'Titolo Modificato',
    'body':'corpo Modifiato'
}


const postNote = function(note){
    return fetch(assignmentsRoot,{
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        body: JSON.stringify(note)
    })
}

const getOneNote = function(noteID){
    return fetch(assignmentsRoot+'/'+noteID, {
        method: 'GET',
        headers: {
            'Accept': 'application/json'
        }
    })
}

const deleteNote = function(noteID){
    return fetch(assignmentsRoot+'/'+noteID, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        }//,
    })
}

const putNote = function(note,noteID){
    return fetch(assignmentsRoot+'/'+noteID,{
        method: 'PUT',
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

test('test del put di una nota', ()=>{
    return putNote(newContent,exampleNote.noteID)
    .then(data =>{return data.json()})
    .then(note => {
        expect(note.title).toBe(newContent.title);
        expect(note.body).toBe(newContent.body);
    })
})

test('delete sample item', () =>{
    return deleteNote(exampleNote.noteID)
    // .then(res => {return res.json()})    
    .then(response => {expect(response.status).toBe(204);})
});

test('delete item actually deteted', ()=>{
    return deleteNote(exampleNote.noteID)
        .then(response => {expect(response.status).toBe(404);})
});