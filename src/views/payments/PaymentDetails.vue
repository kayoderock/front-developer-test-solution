<template>
  <main>
    <div v-if="isPaymentAvailable" class="payment-details">
      <div class="payment-detail">
        <div class="payment-detail__info">
          <el-row>
            <el-col :xs="24" :sm="16" :md="12" :lg="16" :xl="16">
              <span class="payment-record__email">{{payment.user.email}}</span>
              <p class="payment-record__name">{{payment.user.first}} {{payment.user.last}}</p>
            </el-col>
            <el-col :xs="24" :sm="8" :md="12" :lg="8" :xl="8">
              <div class="payment-record__amount">
                <p class="payment-record__amount--value">
                  <span class="payment-record__amount--currency" v-html="currencySymbol()"></span>
                  {{payment.amount.value}}
                </p>
              </div>
            </el-col>
          </el-row>
        </div>
      </div>
    </div>
  </main>
  
</template>

<script>
import tools from '../../util/tools'
export default {
  beforeMount () {
    const paymentId = this.$route.path.split('/')[2];
    this.$store.dispatch('getPayment', paymentId);
  },
  data () {
    return {
      payment: {}
    }
  },
  watch: {
    '$store.state.current_payment' () {
      this.payment = this.$store.state.current_payment;
      console.log(this.payment)
    },
  },
  computed: {
    isPaymentAvailable () {
      return this.payment !== null && (Object.keys(this.payment)).length > 0
    }
  },
  methods: {
    currencySymbol () {
      return tools.currencySymbol(this.payment.amount.currency);
    }
  }
}
</script>

<style lang="scss" scoped>
  .payment-record {
    cursor: pointer;

    &:hover { 
      transition: all .2s ease-in-out;
      transform: scale(1.1); 
    }

    &__name {
      font-size: 2rem;
      min-height: 80px;
    }

    &__email {
      font-weight: bold;
      color: $color-my-text-2;
    }

    &__info {
      display: flex;
      justify-content: space-between;

      &--merchant {
        font-weight: bold;
      }

      &--date {
        color: $color-my-text-1;
        font-weight: bold;
      }
    }

    &__amount {
      display: flex;
      justify-content: flex-end;

      &--value {
        font-size: 2.5rem;
        color: green;
        position: relative;
        width: fit-content;
      }

      &--currency {
        color: black;
        position: absolute;
        font-size: 1.5rem;
        left: -14px;
        color: darkmagenta;
      }
    }
  }
</style>