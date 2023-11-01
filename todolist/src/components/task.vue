<template>
  <div class="wrapp round basic-shadow flex column" :class="{
    'border-red': task.prio === 'high',
    'border-yellow': task.prio === 'medium',
    'border-green': task.prio === 'low',
  }" ref="taskComponent">
    <taskDetail :task="task" v-show="taskDetail" @tutup="tutup" class="detail" @ngapus="ngapus" @done="markAsDone"/>
    <div class="wrap-atas flex column" :class="{'low-opacity': this.status }">
      <div class="atas flex ycenter">
        <h2 :class="{ 'strike-through': this.status }">{{ task.name }}</h2>
      </div>
      <div class="desc">
        <p>{{ task.description }}</p>
      </div>
      <div class="line extreme-round"></div>
    </div>
    <button
      class="button extreme-round done"
      :class="{
        'border-red': task.prio === 'high' && !isHovered,
        'border-yellow': task.prio === 'medium' && !isHovered,
        'border-green': task.prio === 'low' && !isHovered,
        'bg-red': task.prio === 'high' && isHovered,
        'bg-yellow': task.prio === 'medium' && isHovered,
        'bg-green': task.prio === 'low' && isHovered,
        'low-opacity': this.status
      }"
      @mouseenter="isHovered = true"
      @mouseleave="isHovered = false"
      @click="markAsDone"
    >
      Done
    </button>
  </div>
</template>

<script>
import taskEdit from '@/components/taskEdit.vue';
import taskDetail from '@/components/taskDetail.vue';

import axios from 'axios';

export default {
  data() {
    return {
      isHovered: false,
      taskDetail: false,
      status: null,
      prio: null,
      Priority: []
    };
  },
  props: {
    task: Object,
  },
  methods: {
    markAsDone() {
      this.task.status="true"
      this.task.priority=this.task.priority.id
      axios.patch(`http://localhost:3000/api/Todo/${this.task.id}`, this.task)
      .then(response => {
          console.log('Task updated:', response.data);
      })
      .catch(error => {
          console.error('Error updating task:', error);
      });
      console.log(this.task)
      this.status=true
      console.log(this.status)
    },
    ngedit(){
        this.editMenu=false
    },
    ngapus(){
        this.editMenu=false
        this.$emit('ngapus', this.task.id)
    },
    openTaskDetail(event) {
      const taskComponentElement = this.$refs.taskComponent;

      const taskDetailElement = taskComponentElement.querySelector('.detail');
      const taskDoneElement = taskComponentElement.querySelector('.done');

      if (taskComponentElement.contains(event.target) && !taskDetailElement.contains(event.target) && !taskDoneElement.contains(event.target)) {
        this.taskDetail = true;
      }
    },
    tutup(){
        this.taskDetail=false;
    }
  },
  components: {
    taskEdit,
    taskDetail
  },
  mounted() {
    document.addEventListener('click', this.openTaskDetail);
    if (this.task.status == "false"){
      this.status=false
    }else{
      this.status=true
    }
    console.log(this.task)
  },
  beforeUnmount() {
    document.removeEventListener('click', this.openTaskDetail);
  },
};
</script>

<style lang="scss" scoped>
.wrapp {
  background-color: var(--putih);
  padding: 20px;
  width: 400px;
  height: 200px;
  justify-content: space-between;

  .wrap-atas {
    gap: 15px;
  }

  .atas {
    justify-content: space-between;
  }

  .line {
    width: 100%;
    height: 2px;
    background-color: rgb(223, 223, 223);
  }

  .button {
    align-self: flex-end;
    padding: 4px 8px;
  }

  /* Add styles for 'strike-through' class */
  .strike-through {
    text-decoration: line-through;
  }

  /* Add styles for 'low-opacity' class */
  .low-opacity {
    opacity: 0.5;
  }
}
</style>
