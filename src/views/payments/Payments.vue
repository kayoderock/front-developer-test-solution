<template>
    <main class="payments">
      <p class="payments__title">
        <span>All Payments</span> 
      </p>

      <section class="payments__content">
        <div class="payments__filters">
        </div>

        <div>
          <el-row :gutter="5">
            <el-col :xs="24" :sm="12" :md="12" :lg="8" :xl="8"
              v-for="(thisPaymentRecord, index) in myPayments"
              :key="`payment-${index}`"
            >
              <payment-record
                :payment="thisPaymentRecord"
              ></payment-record>
            </el-col>
          </el-row>
        </div>

      </section>
    </main>
</template>

<script>
import {Payment} from '../../models/payment';
import paymentRecord from '../../components/PaymentRecord';
export default {
    mounted () {
      Payment.getAllPayments();
    },
    data () {
      return {
        myPayments: []
      }
    },
    components: {
      paymentRecord
    },
    watch: {
      '$store.state.payments' () {
        this.myPayments = this.$store.state.payments.payments;
        console.log(this.myPayments);
      }
    }
}
</script>

<style lang="scss" scoped>
  .payments {
    max-width: 1200px;
    margin: auto;
    padding: 0 8px;

    &__title {
      font-size: 2rem;
      font-weight: bold;
      margin: 2rem 0;
    }
  }
</style>

