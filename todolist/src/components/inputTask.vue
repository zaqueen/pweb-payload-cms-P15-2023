<template>
    <div class="wrap basic-shadow">
        <div class="input flex ycenter column">
            <h2>Write your task</h2>
            <div class="flex taskName column">
                <h4>Task Name</h4>
                <input type="text" v-model="task.title">
            </div>
            <div class="flex taskDesc column">
                <h4>Task Desc</h4>
                <textarea v-model="task.desc"></textarea>
            </div>
            <div class="flex priority column">
                <h4>Priority</h4>
                <div class="buton flex xcenter ycenter">
                    <div class="extreme-round basic-shadow button" @click="setPriority(this.Priority[2].id)" :class="{'bg-red':this.task.prio==='high', 'border-red':this.task.prio!=='high'}">High</div>
                    <div class="extreme-round medium basic-shadow button" @click="setPriority(this.Priority[1].id)" :class="{'bg-yellow':this.task.prio==='medium', 'border-yellow':this.task.prio!=='medium'}">Medium</div>
                    <div class="extreme-round low basic-shadow button" @click="setPriority(this.Priority[0].id)" :class="{'bg-green':this.task.prio==='low', 'border-green':this.task.prio!=='low'}">Low</div>
                </div>
            </div>
            <button class="extreme-round create basic-shadow button bg-blue text-putih" @click="saveData()">Create</button>
        </div>
    </div>
</template>

<script>
    import axios from 'axios';

    export default {
        data() {
            return {
                task:{
                    id: null,
                    title: null,
                    desc: null,
                    priority: null,
                    prio: null,
                },
                Priority: []
            }
        },
        methods: {
            saveData() {
                // Create an object with your task data
                const taskData = {
                    name: this.task.title,
                    description: this.task.desc,
                    priority: this.task.priority,
                    prio: this.task.prio,
                    status: false
                };

                console.log(taskData)

                // Make a POST request to PayloadCMS to add the task data
                axios.post('http://localhost:3000/api/Todo', taskData, {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                })
                .then(response => {
                    // Handle the response, e.g., reset the form fields
                    this.task.title = null;
                    this.task.desc = null;
                    this.task.priority = null;
                    this.task.prio = null;

                    console.log(taskData)

                    // Emit an event to notify parent components (if needed)
                    this.$emit('done');
                })
                .catch(error => {
                    console.error('Error:', error);
                });
            },
            setPriority(prioId){
                const chPrio = this.Priority.find((prio) => prio.id === prioId);
                this.task.priority=chPrio.id;
                this.task.prio=chPrio.name
                // console.log(this.task.priority)
            }
        },
        async created() {
            await axios.get('http://localhost:3000/api/Category/') // Sesuaikan dengan URL endpoint yang sesuai
            .then(response => {
                this.Priority = response.data.docs;
            })
            .catch(error => {
                console.error("Error fetching categories:", error);
            });

            // console.log(this.Priority)
            // console.log(this.Priority[0].id)
        }
    }
</script>

<style lang="scss" scoped>
.wrap{
    position: fixed;
    max-width: 250px;
    height: 100vh;
    padding: 20px 20px;
    background-color: var(--putih);
    z-index: 99;
    top: 0;
    margin-left: 45px;
}
.input{
    align-items: flex-start;
    gap: 20px;

    * {
        align-items: flex-start;
    }

    > div{
        width: 100%
    }

    input{
        width: 100%;
    }

    textarea{
        max-width: 100%;
        width: 100%;
        font-size: 12px;
        height: 150px;
    }

    h4{
        margin-bottom: 3px;
    }

    .buton{
        gap: 8px;
        font-weight: 800;
    }

    .high:hover{
        background-color: var(--red);
        color: var(--putih)
    }

    .medium:hover{
        background-color: var(--yellow);
        color: var(--putih)
    }

    .low:hover{
        background-color: var(--green);
        color: var(--putih)
    }

    .create{
        margin-top: 40px;
        border: none;
        font-size: 14px;
        padding: 8px 16px;
    }

    .priority{
        width: 100%;

        .buton{
            justify-content: space-between;
            width: 100%;
        }
    }
}

.create{
    align-self: flex-end;
}
</style>