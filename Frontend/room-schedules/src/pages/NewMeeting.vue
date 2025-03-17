<template>
  <div class="row absolute-center q-gutter-md">
    <q-card class="my-card wrap content-start q-my-lg" style="width: 100vh">
      <QCardSection>
        <div class="text-h6 q-pl-lg q-pt-lg">Nova Reunião</div>
      </QCardSection>
      <q-card-section>
        <div class="q-pa-sm">
          <q-form @submit="onSubmit" @reset="onReset" class="q-gutter-md q-pa-md">
            <q-select
              class="q-my-md q-gutter-lg"
              filled
              v-model="model"
              :options="rooms"
              label="Selecione uma sala"
              hint="Sala de Reunião"
              map-options
              option-value="id"
              option-label="name"
              @update:model-value="getSchedule()"
              lazy-rules
              :rules="[(val) => (val !== null && val !== '') || 'Por favor, selecione uma sala']"
            />

            <hr />
            <q-input
              class="row q-gutter-lg q-my-md"
              v-model="date"
              filled
              type="date"
              label="Data de Início"
              hint="Data de Início"
              lazy-rules
              :rules="[(val) => (val !== null && val !== '') || 'Por favor, selecione uma data']"
            />
            <hr />
            <div class="row q-gutter-lg q-my-md">
              <q-input
                v-model="timeBegin"
                filled
                type="time"
                label="Hora de Início"
                hint="Hora de Início"
                style="width: 40%"
                lazy-rules
                :rules="[
                  (val) =>
                    (val !== null && val !== '') || 'Por favor, selecione uma hora de início',
                  (val) =>
                    Date.parse(this.date + 'T' + val + 'Z') > Date.now() ||
                    'A data de início não pode ser no passado.',
                ]"
              />
              <q-input
                v-model="timeEnd"
                filled
                type="time"
                label="Hora do Fim"
                hint="Hora do Fim"
                style="width: 40%"
                lazy-rules
                :rules="[
                  (val) =>
                    Date.parse(this.date + 'T' + val + 'Z') >
                      Date.parse(this.date + 'T' + this.timeBegin + 'Z') ||
                    'Selecione uma hora valida',
                ]"
              />
            </div>
            <hr />
            <q-editor v-model="editor" min-height="5rem" class="row q-ma-md" />
            <hr />
            <div>
              <q-btn label="Nova Reunião" type="submit" color="primary" />
            </div>
          </q-form>
        </div>
      </q-card-section>
    </q-card>
  </div>
</template>

<script>
import { api } from 'src/boot/axios'
import { ref, onMounted, defineComponent } from 'vue'
import { useRouter } from 'vue-router'
import { useQuasar } from 'quasar'

export default defineComponent({
  name: 'NewMeeting',

  setup() {
    const $q = useQuasar()
    const rooms = ref([])
    const model = ref(null)
    const router = useRouter()
    const meetings = ref([])
    const date = ref('')
    const timeBegin = ref('')
    const timeEnd = ref('')
    const editor = ref('')

    onMounted(() => {
      getRooms()
    })

    const getRooms = async () => {
      const token = sessionStorage.getItem('token')
      await api
        .get('/rooms/list', { headers: { token: token } })
        .then((response) => {
          console.log(response)
          rooms.value = response.data
        })
        .catch((err) => {
          console.log(err)
        })
    }

    const saveMeeting = async () => {
      const token = sessionStorage.getItem('token')
      const userName = sessionStorage.getItem('userName')
      const userId = sessionStorage.getItem('userId')
      const data = {
        meetBegin: Date.parse(date.value + 'T' + timeBegin.value + 'Z'),
        meetEnd: Date.parse(date.value + 'T' + timeEnd.value + 'Z'),
        description: editor.value,
        room: model.value.name,
        roomId: model.value.id,
        owner: userName,
        ownerId: userId,
      }
      console.log(data)
      await api
        .post('/schedules/new', data, { headers: { token: token } })
        .then((response) => {
          console.log(response)
          $q.notify({
            color: 'green-5',
            textColor: 'white',
            icon: 'check',
            message: 'Reunião marcada com sucesso!.',
          })

          model.value = null
          date.value = ''
          timeBegin.value = ''
          timeEnd.value = ''
          editor.value = ''
        })
        .catch((err) => {
          $q.notify({
            color: 'red-5',
            textColor: 'white',
            icon: 'alert',
            message: 'Erro ao marcar Reunião, tente novamente mais tarde.\n\n',
          })
          console.log(err)
        })
    }

    return {
      model,
      rooms,
      router,
      meetings,
      date,
      timeBegin,
      timeEnd,
      editor,

      onSubmit() {
        let flag = true
        const dateBegin = Date.parse(date.value + 'T' + timeBegin.value + 'Z')
        const dateEnd = Date.parse(date.value + 'T' + timeEnd.value + 'Z')
        for (const element of meetings.value) {
          if (
            (dateBegin >= element.meetBegin && dateBegin < element.meetEnd) ||
            (element.meetBegin > dateBegin && element.meetBegin < dateEnd) ||
            (dateEnd > element.meetBegin && dateEnd < element.meetEnd) ||
            (element.meetEnd > dateBegin && element.meetEnd < dateEnd)
          ) {
            flag = false
          }
        }

        if (flag) {
          saveMeeting()
        } else {
          $q.notify({
            color: 'red-5',
            textColor: 'white',
            icon: 'warning',
            message:
              'Atenção! \n Já existe outra reunião marcada nesta sala neste horário, por favor, escolha outro horário.',
          })
        }
      },
    }
  },

  methods: {
    getSchedule: async function () {
      const token = sessionStorage.getItem('token')
      const config = {
        headers: {
          token: token,
          room: this.model.id,
        },
      }
      await api
        .get('schedules/listbyroom', config)
        .then((response) => {
          this.meetings = response.data.slice()
          console.log(this.meetings)
        })
        .catch((err) => {
          console.log(err)
        })
    },
  },
})
</script>
