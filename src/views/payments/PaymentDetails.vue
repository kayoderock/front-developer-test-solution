<template>
  <main>
    <div v-if="isPaymentAvailable" class="payment-details">
      <div class="payment-details__title">
       
      </div>

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

        <div class="payment-record__info">
          <div class="payment-record__info--date">
            {{timeAgo()}}
          </div>

          <div class="payment-record__info--merchant">
            {{payment.merchant}}
          </div>
        </div>
      </div>

      <div class="payment-details__content">
        <el-row :gutter="10">
          <el-col :xs="24" :sm="24" :md="16">
            <div class="payment-details__content--reciepts"></div>
          </el-col>
          <el-col :xs="24" :sm="24" :md="8">
            <span class="payment-details__content--title">Payment comment</span>
            <div v-if="payment.comment.length > 0">
              <p class="payment-details__content--comments">{{payment.comment}}</p>
              <p>
                <el-button plain @click="editComment" size="mini" icon="el-icon-edit" >Edit Comment</el-button>
              </p>
            </div>
            <div v-else class="payment-details__content--comment">
               <el-input type="textarea" v-model="currentComment" placeholder="Write your comment here"></el-input>
               <el-button plain @click="makeComment">Comment</el-button>
            </div>
          </el-col>
        </el-row>
      </div>
    </div>

    <div class="no-payment-notification" v-else>
      <i class="el-icon-loading"></i>
      <p>
        loading your data .. .
      </p>
    </div>
  </main>
  
</template>

<script>
import tools from '../../util/tools'
export default {
  beforeMount () {
    this.fetchPayment();
  },
  data () {
    return {
      payment: {},
      currentComment: ''
    }
  },
  watch: {
    '$store.state.current_payment' () {
      this.payment = this.$store.state.current_payment;
      this.currentCommet = this.payment.comment;
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
    },
    timeAgo () {
      return tools.timeAgo(this.payment.date);
    },
    async makeComment () {
      const comment = this.currentComment;
      const res = await this.$store.dispatch('updateMyComment', {id: this.payment.id, comment})
      this.fetchPayment();
    },
    fetchPayment () {
      const paymentId = this.$route.path.split('/')[2];
      this.$store.dispatch('getPayment', paymentId);
    },
    editComment () {
      this.currentComment = this.payment.comment;
      this.payment.comment = '';
    }
  }
}
</script>

<style lang="scss" scoped>

  .payment-details {
    max-width: 1200px;
    margin: auto;

    &__title {
      font-size: 2.5rem;
      margin: 2rem 0;
    }

    &__content {
      margin: 8px 0;

      &--title {
        font-size: 2rem;
      }

      &--reciepts {
        border: 1px solid $color-grey-light-2;
        min-height: 70vh;
      }

      &--comments {
        border: 1px solid $color-grey-light-2;
        height: fit-content;
        margin: 10px 0;
        font-size: 2rem;
        color: blue;
        padding: 1.2rem;
      }

      &--comment {
        text-align: right;
        & button {
          margin: 10px 0;
        }
      }
    }

    
  }

  .payment-record {
    cursor: pointer;

    &:hover { 
      transition: all .2s ease-in-out;
      transform: scale(1.1); 
    }

    &__name {
      font-size: 2.5rem;
    }

    &__email {
      font-weight: bold;
      color: $color-my-text-2;
      font-size: 1.5rem;
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

  .no-payment-notification {
    text-align: center;
    padding: 25% 0;

    & i {
      font-size: 4.5rem;
    }

    & p {
      font-size: 2rem;
      letter-spacing: 2px;
    }
  }
</style>