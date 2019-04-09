<template>
    <div class="uploader" @click="openImageFinder"  v-loading="fileSelect.uploading" :class="(fileSelect.uploaded) ? 'solidBorder':'dottedBorder'">
        <div class="uploader__icon-container" v-if="!fileSelect.uploaded">
            <i class="el-icon-plus uploader__icon"></i>
        </div>
        <input type="file" @change="upLoadMyReceipt" ref="file" id="pdfFileInput" class="imagePreviewer" v-show="false" accept=".jpg"/>
    </div>
</template>

<script>
import {Payment} from '../models/payment';
export default {
    data () {
        return {
            connecting: {
                uploading: false,
            },
            fileSelect: {
                uploading: false,
                uploaded: false
            }
        }
    },
    methods: {
         openImageFinder () {
            this.$refs.file.click()
        },
        async upLoadMyReceipt () {
            const receipt = new FormData();
            receipt.append("receipt", this.$refs.file.files[0]);
            
            const paymentId = this.$route.path.split('/')[2];

            const payload = {receipt, id: paymentId};
            
            try {
                const res =  await this.$store.dispatch('addMoreReciept', payload);
                this.fetchPayment();
                alert('Your receipt image successfully uploaded !');
            }catch (error) {
                alert('An error occured while saving this image, please try again.');
            }
        },
        fetchPayment () {
            const paymentId = this.$route.path.split('/')[2];
            this.$store.dispatch('getPayment', paymentId);
        },
    }
}
</script>


<style lang="scss" scoped>
    .uploader {
        width: 100%;
        height: 250px;
        
        cursor: pointer;
        position: relative;

        &:hover {
            border-color: #409EFF;
        }

        &__icon-container{
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
        }

        &__icon {
            width: fit-content;
            height: fit-content;
            font-size: 35px;
            color: #8c939d;
        }

        &__file-title {
            display: block;
            margin: 2rem 0;
            text-align: center;
            overflow-wrap: break-word;
        }
    }

    .solidBorder {
        border: 1px solid gainsboro;
    }

    .dottedBorder {
        border: 2px dashed gainsboro;
        border-radius: 12px;
    }

</style>

