<template>
    <main class="payments">
      <p class="payments__title">
        <span>All Payments</span> 
      </p>

      <section class="payments__content">
        <div class="payments__filters">
          <el-row :gutter="5">
            <el-col :xs="24" :sm="10">
              <input @keyup="filterPayments" v-model="filterKeyword" placeholder="filter by name or email. .">
            </el-col>
            <el-col :xs="24" :sm="10" >
            </el-col>
          </el-row>
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
        myPayments: [],
        filterKeyword: '',
      }
    },
    components: {
      paymentRecord
    },
    methods: {
      filterPayments () {
        if (this.filterKeyword.length < 0) {
          this.myPayments = this.$store.state.payments.payments;
          return;
        }

        this.myPayments = this.$store.state.payments.payments.filter(payment => {
          const userDetails = `${payment.user.last} ${payment.user.first} ${payment.user.email}`;
          return userDetails.includes(this.filterKeyword);
        })
      }
    },
    watch: {
      '$store.state.payments' () {
        this.myPayments = this.$store.state.payments.payments;
      }
    }
}
</script>

<style lang="scss" scoped>
  .payments {
    max-width: 1200px;
    margin: auto;
    padding: 0 8px;

    &__filters {
      margin: 8px 0;

      & input {
        width: 100%;
        height: 40px;
        border-radius: 5px;
        border: 1px solid $color-my-text-2;
        font-size: 1.5rem;
        padding: 8px;
      }
    }

    &__title {
      font-size: 2rem;
      font-weight: bold;
      margin: 2rem 0;
    }
  }
</style>

