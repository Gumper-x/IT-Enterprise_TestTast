<template>
  <transition name="modal" appear>
    <div class="modal" @mousedown="close">
      <div class="modal__inner" @mousedown.stop>
        <button class="modal__close" @click="close">
          <svg viewBox="0 0 26 26" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M0 20.06V5.95l.05-.2A6.47 6.47 0 016.45.01c4.37-.01 8.73-.01 13.1 0a6.43 6.43 0 016.1 4.41c.16.5.23 1.02.35 1.53v14.1l-.05.2a6.48 6.48 0 01-4.66 5.5c-.4.1-.82.17-1.23.25H5.94l-.17-.04a6.46 6.46 0 01-5.53-4.71c-.1-.4-.16-.8-.24-1.2zM23.83 13V6.66c0-.25 0-.5-.03-.73a4.3 4.3 0 00-4.39-3.75H6.61c-.33 0-.67.03-1 .1a4.25 4.25 0 00-3.43 4.2v13.05a4.3 4.3 0 004.4 4.28h12.83a4.35 4.35 0 004.42-4.38V13z"
            />
            <path
              d="M12.98 11.81L14 10.77l1.41-1.4a.82.82 0 01.9-.22c.33.12.52.36.57.71.04.3-.08.55-.29.76l-2.2 2.2-.2.16.18.18 2.22 2.22c.23.23.35.5.28.84a.85.85 0 01-1.34.51 1.52 1.52 0 01-.2-.18l-2.16-2.16c-.05-.05-.09-.12-.14-.2l-.2.19-2.22 2.22c-.27.26-.57.37-.94.25a.85.85 0 01-.31-1.42c.49-.51 1-1.01 1.5-1.51l.91-.91-.15-.17-2.25-2.25a.83.83 0 01-.23-.9.82.82 0 01.7-.57c.3-.05.56.07.77.29l2.21 2.2.15.2z"
            />
          </svg>
        </button>
        <slot />
      </div>
    </div>
  </transition>
</template>

<script lang="ts">
  import { Component, Prop, Vue } from "vue-property-decorator";
  // Utils
  import { disableScroll, enableScroll } from "@/utils/capsule";

  // Define CodeKey
  const ESC = 27;
  @Component
  export default class Modal extends Vue {
    @Prop({ default: "" }) readonly title!: string;
    mounted() {
      disableScroll();
      document.body.addEventListener("keyup", this.handleKeyUp);
    }
    destroyed() {
      enableScroll();
      document.body.removeEventListener("keyup", this.handleKeyUp);
    }
    close() {
      this.$emit("close");
    }
    handleKeyUp(e: any) {
      if (e.keyCode === ESC) this.close();
    }
  }
</script>

<style lang="scss" scoped>
  .modal {
    position: fixed;
    top: 0;
    left: 0;
    height: 100vh;
    width: 100vw;
    background: rgba($dark, 0.75);
    -webkit-tap-highlight-color: transparent;
    -webkit-touch-callout: none;
    z-index: 100;

    &__inner {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      padding: 28px 28px;
      background: $dark;
      border: 1px solid $grey-500;
      border-radius: 8px;
    }
    &__box {
      display: grid;
      align-items: start;
      grid-template-columns: 1fr 28px;
      grid-gap: 4px;
    }
    &__close {
      display: flex;
      width: 28px;
      opacity: 0.15;
      z-index: 10;
      background: transparent;
      border: none;
      transition: opacity 0.15s ease;
      svg {
        width: 100%;
        path {
          fill: $white-main;
        }
      }
      &:hover {
        opacity: 0.2;
      }
      &:active {
        opacity: 0.3;
        transition: 0s;
      }
    }
    &__title {
      font-weight: bold;
      font-size: 35;
      margin-bottom: 0.5rem;
    }
  }
  .modal-enter-active,
  .modal-leave-active {
    opacity: 1;
    transform: scale(1) translateY(0);
    transition: all 0.3s ease-in-out;
  }
  .modal-enter,
  .modal-leave-to {
    opacity: 0;
    transform: translateY(-7px);
  }
</style>
