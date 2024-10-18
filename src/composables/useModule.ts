import { useAppStore } from "@/stores/app";
import { ref } from "vue";
import { useRoute } from "vue-router";
import { useToast } from "primevue/usetoast";
import { moduleExists } from "@/utils/module-exists";

/**
 * Provides reactive variables and functions for a module page
 *
 * @returns An object with the following properties:
 * - `toggleEditableName`: A boolean variable to show/hide the edit name field
 * - `toggleEditableDescription`: A boolean variable to show/hide the edit description field
 * - `editName`: A reactive string variable to store the name of the module
 * - `slug`: The slug of the module
 * - `app`: The app store
 * - `editDescription`: A reactive string variable to store the description of the module
 * - `onBlurNameSave`: A function to save the name of the module on blur
 * - `onBlurDescriptionSave`: A function to save the description of the module on blur
 */
export const useModule = () => {
  const route = useRoute();
  const app = useAppStore();

  const toast = useToast();

  const toggleEditableName = ref<boolean>(false);
  const toggleEditableDescription = ref<boolean>(false);

  const slug = route?.params?.slug as string;

  const editName = ref<string>(app.modules.find(m => m.moduleName === slug)?.moduleName || "");
  const editDescription = ref<string>(
    app.modules.find(m => m.moduleName === slug)?.description || "");

  const onBlurNameSave = () => {
    
    if (!editName.value) {
      toast.add({
        severity: "error",
        summary: "Ошибка",
        detail: "Название модуля не может быть пустым!",
        life: 3000,
      });
      return;
    }
    app.updateModuleNameAndDescription(slug, { name: editName.value });
    toggleEditableName.value = false;
  };

  const onBlurDescriptionSave = () => {

    app.updateModuleNameAndDescription(slug, {
      description: editDescription.value,
    });
    toggleEditableDescription.value = false;
  };

  return {
    toggleEditableName,
    toggleEditableDescription,
    editName,
    slug,
    app,
    editDescription,
    onBlurNameSave,
    onBlurDescriptionSave,
  };
};
