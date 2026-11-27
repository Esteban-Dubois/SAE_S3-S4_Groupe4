function saveUser(dico){
    let data=JSON.parse(localStorage.getItem('data'));
    console.log(JSON.stringify(dico));
    if (!data){
        data={};
        data['user']={};
    }
    console.log(data);
    if (data['user'].hasOwnProperty(dico['name'])){
        console.log("User already exists");
        return;
    }
    data['user'][dico['name']]={};
    for (const cle of Object.keys(dico)){
        data['user'][dico['name']][cle]=dico[cle];
    }
    localStorage.setItem('data',JSON.stringify(data));
}
export { saveUser }