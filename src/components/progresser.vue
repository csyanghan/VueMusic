<template>
  <div class="progress-bar" ref="progressBar" @click="progressClick">
    <div class="bar-inner">
      <div class="progress" ref="progress"></div>
      <div class="progress-btn-wrapper" ref="progressBtn">
        <!-- @touchstart.prevent="progressTouchStart"
        @touchmove.prevent="progressTouchMove"
        @touchend="progressTouchEnd"> -->
        <div class="progress-btn"></div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      btnWidth: {
        type: Number,
        default: 0
      },
      touchInfo: {
        initiated: false
      }
    }
  },
  props: {
    percent: {
      type: Number,
      default: 0
    }
  },
  mounted() {
    this.btnWidth = document.getElementsByClassName('progress-btn')[0].clientWidth
  },
  methods: {
    // progressTouchStart(e) {
    //   this.touchInfo.initiated = true
    //   this.touchInfo.startX = e.touches[0].pageX
    //   this.touchInfo.left = this.$refs.progress.clientWidth
    // },
    // progressTouchMove(e) {
    //   if (!this.touchInfo.initiated) {
    //     return
    //   }
    //   const moveX = e.touches[0].pageX - this.touches[0].startX
    //   const offsetWidth = Math.min(Math.max(0, this.touchInfo.left + moveX), this.$refs.progressBar.clientWidth - this.btnWidth)
    //   this._setOffset(offsetWidth)
    // },
    // progressTouchEnd(e) {
    //   this.touchInfo.initiated = false
    //   this._triggerPercent()
    // },
    progressClick(e) {
      this._setOffset(e.offsetX)
      this._triggerPercent()
    },
    _triggerPercent() {
      const barWidth = this.$refs.progressBar.clientWidth - this.btnWidth
      const percent = Math.min(1, this.$refs.progress.clientWidth / barWidth)
      this.$emit('percentChange', percent)
    },
    _setOffset(offsetWidth) {
      this.$refs.progress.style.width = `${offsetWidth}px`
      this.$refs.progressBtn.style.transform = `translate3d(${offsetWidth}px, 0, 0)`
    }
  },
  watch: {
    percent(newPercent, oldPercent) {
      if (newPercent > 0 && !this.touchInfo.initiated) {
        const barWidth = this.$refs.progressBar.clientWidth - this.btnWidth
        const offsetWidth = barWidth * newPercent
        this._setOffset(offsetWidth)
      }
    }
  }
}
</script>

<style scoped>
.progress-bar{
    height: 0.5rem;
    width: 80%;
}
.bar-inner{
    position: relative;
    top: 0.2rem;
    height:0.08rem;
    background: rgba(0, 0, 0, 0.3)
}
.progress{
    position: absolute;
    height: 100%;
    background: red;
}
.progress-btn-wrapper{
    position: absolute;
    left: -0.25rem;
    top: -0.25rem;
    width: 0.5rem;
    height: 0.5rem;
}
.progress-btn{
    position: relative;
    top: 0.12rem;
    left: 0.12rem;
    width: 0.32rem;
    height: 0.32rem;
    border: 0.06rem solid black;
    border-radius: 50%;
    background: black;
}
</style>
