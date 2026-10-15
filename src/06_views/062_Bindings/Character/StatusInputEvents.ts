import {Character} from "../../../02_models/022_Classes/Character/Character";
import {ALL_STATUS_TYPES, StatusType} from "../../../02_models/023_Types/Attributes/StatusTypes";
import {isNumeric} from "../../../07_services/Util";

export function bindStatusInputEvents(character: Character): void {
    Object.entries(ALL_STATUS_TYPES).forEach(([key, value]) => {
        const inputBase = document.getElementById(value + "-base-input") as HTMLInputElement;

        inputBase?.addEventListener("change", (event) => {
            const target = event.target as HTMLInputElement;
            const targetID = target.id;
            const targetIDSplit = targetID.split("-");
            const targetType = targetIDSplit.length > 3 ? `${targetIDSplit[0]}-${targetIDSplit[1]}` as StatusType : targetIDSplit[0] as StatusType;

            if (!isNumeric(target.value)) {
                target.value = character.status[value].base.toString();
                return;
            }

            const newStatusBase = Number(target.value);

            this.viewModel.handleStatusInputBaseChange(targetType, newStatusBase);
        });

        const inputEffect = document.getElementById(value + "-effect-input") as HTMLInputElement | null;

        inputEffect?.addEventListener("change", (event) => {
            const target = event.target as HTMLInputElement;
            const targetID = target.id;
            const targetIDSplit = targetID.split("-");
            const targetType = targetIDSplit.length > 3 ? `${targetIDSplit[0]}-${targetIDSplit[1]}` as StatusType : targetIDSplit[0] as StatusType;

            if (!isNumeric(target.value)) {
                target.value = character.status[value].effect.toString();
                return;
            }

            const newStatusEffect = Number(target.value);

            this.viewModel.handleStatusInputEffectChange(targetType, newStatusEffect);
        });
    });

    const inputMaximumHitDie = document.getElementById("maximum-hit-die-input") as HTMLInputElement | null;
    inputMaximumHitDie?.addEventListener("change", (event) => {
    const target = event.target as HTMLInputElement;
    this.viewModel.handleMaximumHitDieChange(target.value);
})

const inputCurrentHitDie = document.getElementById("current-hit-die-input") as HTMLInputElement | null;
inputCurrentHitDie?.addEventListener("change", (event) => {
    const target = event.target as HTMLInputElement;
    this.viewModel.handleCurrentHitDieChange(target.value);
})

for(let i = 1; i <= 3; i++) {
    const checkboxDeathSaveFailure = document.getElementById(`death-save-failure-${i}-checkbox`) as HTMLInputElement | null;
    checkboxDeathSaveFailure?.addEventListener("change", (event) => {
        const target = event.target as HTMLInputElement;
        const targetID = target.id.split("-").at(-2);
        this.viewModel.handleDeathSaveFailureChange(Number(targetID), target.checked);
    })

    const checkboxDeathSaveSuccess = document.getElementById(`death-save-success-${i}-checkbox`) as HTMLInputElement | null;
    checkboxDeathSaveSuccess?.addEventListener("change", (event) => {
        const target = event.target as HTMLInputElement;
        const targetID = target.id.split("-").at(-2);
        this.viewModel.handleDeathSaveSuccessChange(Number(targetID), target.checked);
    })
}
}