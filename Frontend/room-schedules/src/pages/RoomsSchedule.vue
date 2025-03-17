<template>
  <div class="q-pa-md">
    <div class="q-pa-md">
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
      <q-table
        flat
        bordered
        grid
        title="Reuniões"
        :rows="meetings"
        :columns="columns"
        row-key="id"
        hide-header
      >
      </q-table>
    </div>
  </div>
</template>

<script>
import { defineComponent, ref, onMounted } from 'vue'
import { api } from 'src/boot/axios'

export default defineComponent({
  name: 'RoomsSchedule',

  setup() {
    const rooms = ref([])
    const meetings = ref([])
    const model = ref(null)

    const columns = [
      { name: 'id', field: 'id', label: 'Número da Reunião', sortable: false },
      { name: 'room', field: 'room', label: 'Sala de Reunião', sortable: false },
      {
        name: 'meetBegin',
        field: 'meetBegin',
        label: 'Inicio',
      },
      { name: 'meetEnd', field: 'meetEnd', label: 'Fim', sortable: false },
      { name: 'owner', field: 'owner', label: 'Responsável', sortable: false },
      { name: 'description', field: 'description', label: 'Descrição', sortable: false },
    ]

    onMounted(() => {
      getRooms()
    })

    const getRooms = async () => {
      const token = sessionStorage.getItem('token')
      await api
        .get('/rooms/list', { headers: { token: token } })
        .then((response) => {
          rooms.value = response.data
        })
        .catch((err) => {
          console.log(err)
        })
    }

    return {
      rooms,
      meetings,
      model,
      columns,
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
          for (const element of response.data) {
            element.meetBegin = new Date(Number(element.meetBegin)).toLocaleString('pt-BR', {
              timeZone: 'UTC',
            })
            element.meetEnd = new Date(Number(element.meetEnd)).toLocaleString('pt-BR', {
              timeZone: 'UTC',
            })
          }
          this.meetings = response.data.slice()
        })
        .catch((err) => {
          console.log(err)
        })
    },
  },
})
</script>
