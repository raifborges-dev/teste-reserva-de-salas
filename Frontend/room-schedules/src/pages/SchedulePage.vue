<template>
  <div class="q-pa-md">
    <div class="q-pa-md">
      <q-table
        flat
        bordered
        grid
        title="Reuniões"
        :rows="meetings"
        :columns="columns"
        row-key="id"
        hide-header
        selection="single"
        v-model:selected="selected"
        @update:selected="onSelection"
      >
      </q-table>
    </div>
  </div>
  <q-page-sticky position="bottom-right" :offset="[25, 25]">
    <q-btn fab icon="add" label="Marcar Reunião" color="primary" v-on:click.prevent="navigate" />
  </q-page-sticky>
  <q-page-sticky position="bottom-left" :offset="[25, 25]">
    <q-btn
      fab
      label="Excluir Reunião"
      icon="delete"
      color="red"
      v-on:click.prevent="deleteMeeting"
      v-show="isSelected"
    />
  </q-page-sticky>
</template>

<script>
import { defineComponent, ref, onMounted } from 'vue'
import { api } from 'src/boot/axios'
import { useRouter } from 'vue-router'
import { useQuasar } from 'quasar'

export default defineComponent({
  name: 'ScheduleTable',

  data() {
    return {
      router: useRouter(),
    }
  },

  setup() {
    const meetings = ref([])
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
      getMeetings()
    })

    const getMeetings = async () => {
      const config = {
        headers: {
          token: sessionStorage.getItem('token'),
          owner: sessionStorage.getItem('userId'),
        },
      }
      await api
        .get('/schedules/listbyowner', config)
        .then((response) => {
          console.log(response.data)
          for (const element of response.data) {
            element.meetBegin = new Date(Number(element.meetBegin)).toLocaleString('pt-BR', {
              timeZone: 'UTC',
            })
            element.meetEnd = new Date(Number(element.meetEnd)).toLocaleString('pt-BR', {
              timeZone: 'UTC',
            })
          }
          meetings.value = response.data
        })
        .catch((err) => {
          console.log(err)
        })
    }

    return {
      meetings,
      columns,
      selected: ref([]),
      isSelected: ref(false),
      $q: useQuasar(),
      getMeetings,
    }
  },

  methods: {
    navigate: function () {
      this.router.push('/newmeet')
    },

    onSelection: function () {
      this.isSelected = this.selected.length > 0
      console.log(this.selected[0])
    },

    deleteMeeting: async function () {
      const token = sessionStorage.getItem('token')
      const data = {
        scheduleId: this.selected[0].id,
      }
      await api
        .put('/schedules/deletemeet', data, { headers: { token: token } })
        .then((response) => {
          console.log(response.data)
          this.$q.notify({
            color: 'green-5',
            textColor: 'white',
            icon: 'check',
            message: 'Reunião Excluída com sucesso!',
          })
        })
        .catch((err) => {
          console.log(err)
        })
      this.getMeetings()
      this.isSelected = false
    },
  },
})
</script>
