<template>
  <div class="q-pa-lg row absolute-center q-gutter-lg">
    <q-card class="my-card" style="width: 50vh">
      <QCardSection>
        <div class="text-h6 q-pa-lg">Login</div>
      </QCardSection>
      <q-card-section>
        <div class="q-pa-lg" style="max-width: 600px">
          <q-form @submit="onSubmit" @reset="onReset" class="q-gutter-md">
            <q-input
              class="q-my-md q-gutter-lg"
              filled
              v-model="input.username"
              label="Nome de Usuário"
              lazy-rules
              :rules="[(val) => (val && val.length > 0) || 'Campo não pode ser vazio']"
            />
            <q-input
              class="q-my-md q-gutter-lg"
              filled
              type="password"
              v-model="input.password"
              label="Senha"
              lazy-rules
              :rules="[(val) => (val !== null && val !== '') || 'Campo não pode ser vazio']"
            />
            <div>
              <q-btn label="Login" type="submit" color="primary" v-on:click.prevent="login()" />
            </div>
            <div class="text-center">
              Ainda não tem uma conta? <RouterLink to="/signin" class="text-dark">Criar</RouterLink>
            </div>
          </q-form>
        </div>
      </q-card-section>
    </q-card>
  </div>

  <q-dialog v-model="alert">
    <q-card>
      <q-card-section>
        <div class="text-h6">Atenção</div>
      </q-card-section>

      <q-card-section class="q-pt-none"> User Name ou senha inválida. </q-card-section>

      <q-card-actions align="right">
        <q-btn flat label="OK" color="primary" v-close-popup />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script>
import { api } from 'src/boot/axios'
import { ref } from 'vue'
import { useRouter } from 'vue-router'

export default {
  name: 'LoginView',

  data() {
    return {
      input: {
        username: '',
        password: '',
      },
      alert: ref(false),
      router: useRouter(),
    }
  },
  methods: {
    login: function () {
      let loginJson = {
        user: this.input.username,
        password: this.input.password,
      }
      api
        .post('/users/login', loginJson)
        .then((response) => {
          if (response.status === 200) {
            sessionStorage.setItem('token', response.data.token)
            sessionStorage.setItem('userName', response.data.username)
            sessionStorage.setItem('userId', response.data.userid)
            this.navigate()
          }
        })
        .catch((error) => {
          this.alert = true
          console.log(error)
        })
    },

    navigate: function () {
      this.router.push('/home')
    },
  },
}
</script>
