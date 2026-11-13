<template>
    <div>
        <h1>Création d'un compte</h1>
        <p style="color: green;">{{ nc_message_confirmation_p }}</p>
        <p style="color: red;">{{ nc_message_confirmation_n }} {{ msg_err_mdp }}</p>
        <div>
            <div>
                <label for="nomcompte">Nom du compte : </label><input v-model.trim="nc_name" id="nomcompte">
            </div>
            <div>
                <label for="mdpcompte">Mot de passe : </label><input v-model.trim="nc_password" id="mdpcompte" type="password">
            </div>
            <div>
                <label for="confmdpcompte">Confirmer le mot de passe : </label><input v-model.trim="nc_confirm_password" id="confmdpcompte" type="password">
            </div>
            <div>
                <p>/!\ TOUT LES CHAMPS DOIVENT ÊTRE REMPLI</p>
                <button type="button" @click="validerCreerCompte">Créer</button>
            </div>
        </div>
    </div>
</template>