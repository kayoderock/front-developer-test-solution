<template>
    
</template>

<script>
import {Payment} from '../../models/payment';
export default {
    mounted () {
      Payment.getAllPayments();
    },
    data () {
        return {
            myPayments: []
        }
    },
    methods: {
        
    },
    watch: {
      '$store.state.payments' () {
        this.myPayments = this.$store.state.payments;
        console.log('Getting all payents done.');
      }
    }
}
</script>

