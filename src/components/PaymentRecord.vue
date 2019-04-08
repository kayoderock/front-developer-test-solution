<template>
  <div class="payment-record">
    <el-card shadow="hover">
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

      <div class="payment-record__info">
        <div class="payment-record__info--date">
          {{timeAgo(payment.date)}}
        </div>

        <div class="payment-record__info--merchant">
          {{payment.merchant}}
        </div>
      </div>
      
    </el-card>
  </div>
</template>

<script>
export default {
  props: {
    payment: {
      type: Object,
      default: () => ({
        amount: {value: "1854.99", currency: "EUR"},
        category: "",
        comment: "",
        date: "2018-09-10T02:11:29.184Z",
        id: "5b996064dfd5b783915112f5",
        index: 0,
        merchant: "KAGE",
        user: {first: "Vickie", last: "Lee", email: "vickie.lee@pleo.io"}
      })
    }
  },
  methods: {
     currencySymbol () {
      const symbols = new Map([
        ['EUR', '&euro;'],
        ['NGR', '&#8358;'],
        ['DKK', '&#107'],
        ['GBP', '&pound;'],
        ['DKK', '&#107'],
      ])
    
      return symbols.get(this.payment.amount.currency);
    },
    timeAgo (date) {
      return this.Moment(date, "YYYYMMDD").fromNow();
    }
  },
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

