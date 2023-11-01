<template>
    <div class="wrap-out">
        <div class="wrap round basic-shadow flex column" :class="{
            'border-red': task.prio === 'high',
            'border-yellow': task.prio === 'medium',
            'border-green': task.prio === 'low',
        }">
            <div class="title">
                <p>Judul Tugas</p>
                <input v-model="task.name" class="input-title">
            </div>
            <div class="desc">
                <p>Deskripsi Tugas</p>
                <textarea v-model="task.description" class="input-desc"></textarea>
            </div>
            <div class="bnyk flex column">
                <h5>prio</h5>
                <div class="buton flex xcenter ycenter">
                    <div class="extreme-round high basic-shadow button" @click="this.task.prio='high'" :class="{'bg-red':this.task.prio==='high', 'border-red':this.task.prio!=='high'}">High</div>
                    <div class="extreme-round medium basic-shadow button" @click="this.task.prio='medium'" :class="{'bg-yellow':this.task.prio==='medium', 'border-yellow':this.task.prio!=='medium'}">Medium</div>
                    <div class="extreme-round low basic-shadow button" @click="this.task.prio='low'" :class="{'bg-green':this.task.prio==='low', 'border-green':this.task.prio!=='low'}">Low</div>
                </div>
            </div>
            <div class="buton flex xcenter yecenter save">
                <button class="extreme-round create basic-shadow button bg-blue text-putih" @click="saveData()">Create</button>
                <button class="extreme-round create basic-shadow button bg-red text-putih" @click="delData()">Delete</button>
                <button class="extreme-round create basic-shadow button bg-green text-putih" @click="doneData()" v-if="this.status===false">Done</button>
                <button class="extreme-round create basic-shadow button bg-green text-putih" @click="unDone()" v-if="this.status===true">unDone</button>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios';
    export default {
        data() {
            return {
                status: null
            }
        },
        props: {
            task: Object
        },
        methods: {
            saveData() {
                this.task.priority=this.task.priority.id
                axios.put(`http://localhost:3000/api/Todo/${this.task.id}`, this.task)
                .then(response => {
                    console.log('Task updated:', response.data);
                })
                .catch(error => {
                    console.error('Error updating task:', error);
                });
                this.$emit('tutup')
            },
            delData(){
                this.$emit('ngapus')
                this.$emit('tutup')
            },
            doneData(){
                this.task.status=true
                this.task.priority=this.task.priority.id
                axios.put(`http://localhost:3000/api/Todo/${this.task.id}`, this.task)
                .then(response => {
                    console.log('Task updated:', response.data);
                })
                .catch(error => {
                    console.error('Error updating task:', error);
                });
                console.log(this.task)
                this.status=true
                this.$emit('done')
                this.$emit('tutup')
            },
            closeEditMenuOnClickOutside(event) {
                // Check if the click event target is not within the ".menu" element
                if (!event.target.closest('.wrap')) {
                    this.$emit('tutup')
                }
            },
            unDone(){
                this.task.status=false
                axios.put(`http://localhost:3000/api/Todo/${this.task.id}`, this.task)
                .then(response => {
                    console.log('Task updated:', response.data);
                })
                .catch(error => {
                    console.error('Error updating task:', error);
                });
                console.log(this.task)
                this.status=false
                this.$emit('tutup')
            }
        },
        mounted() {
            // Add a click event listener to the document to handle clicks outside of ".menu"
            document.addEventListener('click', this.closeEditMenuOnClickOutside);
                if (this.task.status == "false"){
            this.status=false
            }else{
                this.status=true
            }
        },
        beforeUnmount() {
            // Remove the click event listener when the component is about to be destroyed
            document.removeEventListener('click', this.closeEditMenuOnClickOutside);
        },
    }
</script>

<style lang="scss" scoped>
.wrap-out{
    position: absolute;
    background-color: rgba(0, 0, 0, 0.334);
    width: 100vw;
    height: 100vh;
    top: 0;
    left: 0;
    z-index: 99
}
.wrap{
    position: absolute;
    background-color: var(--putih);
    width: 500px;
    height: 400px;
    padding: 40px;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    align-items: flex-start;
    gap: 20px;
    justify-content: space-between;

    > div{
        width: 100%;
        
        p{
            font-size: 12px;
        }
    }

    .input-title{
        font-size: 24px;
        font-weight: 700;
        width: 100%;
        border: none;
    }

    .input-desc{
        max-width: 100%;
        width: 100%;
        max-height: 100px;
        height: 100px; 
        border: none;
        font-weight:500;
    }

    .bnyk{
        width: fit-content;
        gap: 10px;
    }

    .buton{
        gap: 10px;
    }

    .save{
        justify-content: flex-end;
    }
}
</style>