<template>
  <q-page padding>
    <div class="row absolute-center q-gutter-md">
      <q-card class="my-card" style="width: 50vh; height: 50vh">
        <QCardSection>
          <div class="text-h6 q-pa-lg">Nova Sala</div>
        </QCardSection>
        <q-card-section>
          <div class="q-pa-lg" style="max-width: 600px">
            <q-form @submit="onSubmit" class="q-gutter-md">
              <q-input
                class="q-my-md q-gutter-lg"
                filled
                v-model="roomname"
                label="Nome da nova sala"
                lazy-rules
                :rules="[(val) => checkName(val) || 'Já Existe uma Sala com esse nome!']"
              />
              <div>
                <q-btn label="Criar nova sala" type="submit" color="primary" />
              </div>
            </q-form>
          </div>
        </q-card-section>
      </q-card>
    </div>
  </q-page>
</template>

<script>
import { api } from 'src/boot/axios'
import { ref, defineComponent, onMounted } from 'vue'
import { useQuasar } from 'quasar'

export default defineComponent({
  name: 'NewRoom',
  setup() {
    const roomname = ref('')
    const rooms = ref([])
    const $q = useQuasar()

    onMounted(() => {
      getRooms()
    })

    const getRooms = async () => {
      const token = sessionStorage.getItem('token')
      await api
        .get('/rooms/list', { headers: { token: token } })
        .then((response) => {
          for (const room of response.data) {
            rooms.value.push(room.name)
          }
        })
        .catch((err) => {
          console.log(err)
        })
    }

    const saveRoom = async () => {
      const data = {
        name: roomname.value,
      }
      const token = sessionStorage.getItem('token')

      await api
        .post('/rooms/new', data, { headers: { token: token } })
        .then((response) => {
          console.log(response)
          $q.notify({
            color: 'green-5',
            textColor: 'white',
            icon: 'check',
            message: 'Sala Criada com sucesso!',
          })
        })
        .catch((err) => {
          $q.notify({
            color: 'red-5',
            textColor: 'white',
            icon: 'alert',
            message: 'Problema ao criar a sala, tente novamente mais tarde.\n\n',
          })
          console.log(err)
        })
    }

    return {
      roomname,
      rooms,

      onSubmit() {
        saveRoom()
      },
    }
  },

  methods: {
    checkName: function (val) {
      return !this.rooms.includes(val)
    },
  },
})
</script>
