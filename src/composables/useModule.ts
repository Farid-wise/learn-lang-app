import { useAppStore } from "@/stores/app";
import { computed, ref, useTemplateRef } from "vue";
import { useRoute } from "vue-router";
import { useToast } from "primevue/usetoast";
import { useDialog } from "primevue/usedialog";
import { moduleExists } from "@/utils/module-exists";
import { delay } from "@/utils/delay";
import { onClickOutside } from "@vueuse/core";

/**
 * Provides reactive variables and functions for managing a module.
 *
 * @returns An object with the following properties:
 * - `toggleEditableName`: A boolean ref to toggle the edit state of the module name.
 * - `toggleEditableDescription`: A boolean ref to toggle the edit state of the module description.
 * - `editName`: A string ref for editing the module's name.
 * - `slug`: The current module's slug from the route parameters.
 * - `app`: The app store instance.
 * - `isNameError`: A boolean ref indicating if there's an error with the module name.
 * - `editDescription`: A string ref for editing the module's description.
 * - `onBlurNameSave`: A function to validate and save the module's name on blur.
 * - `onBlurDescriptionSave`: A function to save the module's description on blur.
 */
export const useModule = () => {
  const route = useRoute();
  const target = useTemplateRef<HTMLElement>("target");


  const slug = computed(() => route?.params?.slug as string);
  const descrRef = useTemplateRef("descr");
  

  const app = useAppStore();
  const toast = useToast();
  const dialog = useDialog()

  const isNameError = ref<boolean>(false);
  const isNameUpdating = ref<boolean>(false);
  const isDescriptionUpdating = ref<boolean>(false);
  const isRemovingModule = ref<boolean>(false);

  const toggleEditableName = ref<boolean>(false);
  const toggleEditableDescription = ref<boolean>(false);
  const editName = ref<string>(
    app.appModules.modules.find((m) => m.moduleName === slug.value)
      ?.moduleName || ""
  );
  const editDescription = ref<string>(
    app.appModules.modules.find((m) => m.moduleName === slug.value)
      ?.description || ""
  );

  const onBlurNameSave = async () => {
    isNameError.value = false;

    if (editName.value === slug.value) {
      toggleEditableName.value = false;
      return;
    }

    if (!editName.value) {
      toast.add({
        severity: "error",
        summary: "Ошибка",
        detail: "Название модуля не может быть пустым!",
        life: 3000,
      });
      isNameError.value = true;
      isNameUpdating.value = false;
      return;
    }
    if (moduleExists(editName.value, app.appModules.modules)) {
      toast.add({
        severity: "error",
        summary: "Ошибка",
        detail: "Модуль с таким названием уже существует!",
        life: 3000,
      });
      isNameError.value = true;
      isNameUpdating.value = false;
      return;
    }

    isNameUpdating.value = true;

    await delay(500);

    isNameUpdating.value = false;
    app.updateModuleNameAndDescription(slug.value, { name: editName.value });
    toggleEditableName.value = false;
  };

  const onBlurDescriptionSave = () => {

    if(editDescription.value === app.appModules.modules.find((m) => m.moduleName === slug.value)?.description) {
      toggleEditableDescription.value = false;
      return;
    }

    app.updateModuleNameAndDescription(slug.value, {
      description: editDescription.value,
    });
    toggleEditableDescription.value = false;
  };

  const removeModule = async (slug: string) => {
    isRemovingModule.value = true;
    await delay(500);

    try {
      await app.removeModule(slug);
    } catch (error) {
      console.log(error);
      toast.add({
        severity: "error",
        summary: "Ошибка",
        detail: `Произошла ошибка при удалении модуля ${slug}!`,
        life: 3000,
      });
    } finally {
      isRemovingModule.value = false;
    }
  };


  onClickOutside(target, () => {
    toggleEditableDescription.value = false;
  });



  return {
    toggleEditableName,
    toggleEditableDescription,
    editName,
    slug,
    app,
    target,
    isRemovingModule,
    isNameError,
    editDescription,
    isDescriptionUpdating,
    isNameUpdating,
    removeModule,
    descrRef,
    onBlurNameSave,
    onBlurDescriptionSave,
  };
};
