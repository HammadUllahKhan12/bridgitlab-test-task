import type BAddressInput from '@/components/common/BAddressInput.vue';
import type BButton from '@/components/common/BButton.vue';
import type BCard from '@/components/common/BCard.vue';
import type BDateRange from '@/components/common/BDateRange.vue';
import type BDatepicker from '@/components/common/BDatepicker.vue';
import type BDropdown from '@/components/common/BDropdown.vue';
import type BModal from '@/components/common/BModal.vue';
import type BIconDropdown from '@/components/common/BIconDropdown.vue';
import type BNumberInput from '@/components/common/BNumberInput.vue';
import type BPanel from '@/components/common/BPanel.vue';
import type BSvgIcon from '@/components/common/BSvgIcon.vue';
import type BTabs from '@/components/common/BTabs.vue';
import type BTextInput from '@/components/common/BTextInput.vue';
import type BTextarea from '@/components/common/BTextarea.vue';

declare module '@vue/runtime-core' {
  export interface GlobalComponents {
    BAddressInput: typeof BAddressInput;
    BButton: typeof BButton;
    BCard: typeof BCard;
    BDatepicker: typeof BDatepicker;
    BDateRange: typeof BDateRange;
    BDropdown: typeof BDropdown;
    BSvgIcon: typeof BSvgIcon;
    BIconDropdown: typeof BIconDropdown;
    BNumberInput: typeof BNumberInput;
    BPanel: typeof BPanel;
    BTabs: typeof BTabs;
    BTextarea: typeof BTextarea;
    BTextInput: typeof BTextInput;
  }
}
