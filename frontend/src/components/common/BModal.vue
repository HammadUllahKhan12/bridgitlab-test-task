<script setup lang="ts">
import { computed, ref } from 'vue';
import Dialog from 'primevue/dialog';

const props = withDefaults(
    defineProps<{
        title?: string;
        alignTitle?: 'center' | 'right' | null;
        alignFooter?: 'center' | 'right' | null;
        alignContent?: 'center' | 'right' | null;
        visible: boolean;
        confirm: Function;
    }>(),
    {
        title: '',
        alignTitle: null,
        alignFooter: null,
        alignContent: null,
        visible: false,
        confirm: (value: boolean) => { },
    },
);

const footerStyle = computed(() =>
    props.alignFooter === 'center' ? 'center' : props.alignFooter === 'right' ? 'flex-end' : undefined,
);

const closeModal = () => {
    props.confirm(false);
};

const confirmModal = () => {
    props.confirm(true);
};
</script>

<template>
    <Dialog :visible="visible" :closeOnEscape="true" :header="props.title" :footer="footerStyle" :style="{ textAlign: props.alignContent, maxWidth: '80%' }"
        @hide="closeModal">
        <template v-if="$slots.header" #header>
            <slot name="header" />
        </template>
        <slot />
        <template v-if="$slots.footer" #footer>
            <slot name="footer" />
        </template>
    </Dialog>
</template>

<style lang="scss" scoped>
.p-dialog {
    .p-dialog-header {
        text-align: v-bind('$props.alignTitle');
    }

    .p-dialog-content {
        text-align: v-bind('$props.alignContent');
    }

    .p-dialog-footer {
        display: flex;
        gap: 0.75rem;
        justify-content: v-bind('footerStyle');
    }
}
</style>
