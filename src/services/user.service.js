function saveUser(dico){
    let data=JSON.parse(localStorage.getItem('data'));
    console.log(Boolean(data));
    if (data){
        data=data['user'];
        data[dico['name']]={};
        for (const cle of Object.keys(dico)){
            data[dico['name']][cle]=dico[cle];
        }
        localStorage.setItem('data',JSON.stringify(data));
    }
    else{
        data={};
        data['user']={};
        localStorage.setItem('data',JSON.stringify(data));
    }
}
export { saveUser }