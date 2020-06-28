const socket = io("http://localhost:8000")

const form = document.querySelector('.sendForm')
const msgInp = document.querySelector('.sendMsg')
const msgContainer = document.querySelector('.sendMsgContainer')

const append = (msg, position) => {
    const msgElement = document.createElement('div')
    msgElement.innerHTML = msg
    msgElement.classList.add('message')
    msgElement.classList.add(position)
    msgContainer.append(msgElement)
}

const username = prompt("Type your name to join")

socket.emit('new-user-joined', username)

socket.on('user-joined', name => {
    if (name != null) {
        append(`${name} joined the chat.`, 'right')
    } else {
        console.log("object");
    }
})

socket.on('receive', data => {
    if (data.name != null) {
        append(`${data.message} From ${data.name}`, 'left')
    } else {
        append(`${data.message} From Unknown`, 'left')
    }
})

socket.on('user-left', user => {
    if (user != null) {
        append(`${user} left the chat`, 'left') 
    } else {
        console.log("object");
    }
})

form.addEventListener('submit', (event) => {
    event.preventDefault()
    const msg = msgInp.value

    append(`You : ${msg}`, 'right')
    // emit is used for running events
    socket.emit('send', msg)
    event.target.reset()
})