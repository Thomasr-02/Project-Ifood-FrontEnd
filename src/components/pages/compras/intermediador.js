var Id

const intermediador = {
    
    idRest : (id, msg) =>{
        if (msg === "get") {
            return Id
        }
        if(msg === "set"){
            Id = id
        }
    },
    idUser : (id, msg) => {
        if (msg === "get") {
            return Id
        }
        if(msg === "set"){
            Id = id
        }
    }, 

    idCompra : (id, msg) => {
        if (msg === "get") {
            return Id
        }
        if(msg === "set"){
            Id = id
        }
    },
}

export default intermediador