# Vue 3 Supabase Starter

Authentification prête à l'emploi avec [Supabase](https://supabase.com/), Vue 3 & Tailwind CSS.

- formulaire de login avec validation (vee-validate)
- formulaire de création de compte
- persistence de l'utilisateur
- formulaire de reset du mot de passe (pré-rempli avec email rentré lors du login)

## Getting Started

### Supabase

Vous devez créer un projet sur [Supabase](https://supabase.com/) avant toute chose.

### Code

- Cloner ce repo
- Créer un fichier `.env` et renseigner les variables présentes dans le fichier `env.d.ts`.
- `npm install`
- `npm run dev`

## Utilisation

### useAuth

Utilisez le composable `useAuth` pour tout ce qui est lié à l'authentification.

```js
const { user, login, register, logout } = useAuth();
```

Ci-dessus, `user` est l'utilisateur actuellement connecté, il s'agit d'une variable réactive.

Exemple: afficher un lien dans le menu seulement pour un utilisateur connecté:

```html
<script setup lang="ts">
  import useAuth from "./composables/useAuth";
  const { user } = useAuth();
</script>

<template>
  <div>
    <div v-if="user">Your email is {{ user.email }}<div>
    <div v-else>Vous n'êtes pas connecté</div>
  </div>
</template>
```

### useSupabase

Le projet utilise le package `@supabase/supabase-js`. Pour récupérer l'instance du client supabase.

```js
const supabase = useSupabase();
```
