import {ALL_STATUS_TYPES, StatusType} from "../../../02_models/023_Types/Attributes/StatusTypes";
import {ICharacterStatus} from "../../../02_models/021_Interfaces/Character/ICharacterStatus";

export function createCharacterStatusSection( {
                                                  status,
                                                  maximum_hit_die,
                                                  current_hit_die,
                                                  death_save_failure,
                                                  death_save_success
                                              } : {
    status: Record<StatusType, ICharacterStatus>,
    maximum_hit_die: string,
    current_hit_die: string,
    death_save_failure: number,
    death_save_success: number
}) :string {
    let innerHTML = `
        <div class="columns is-mobile is-multiline is-justify-content-center">
    `;

    Object.entries(ALL_STATUS_TYPES).forEach(([key, value]) => {
        let type = value;

        let base = 0;
        let effect = 0;
        let total = 0;
        let color = "";
        let pre_total_extra = "";
        let post_total_extra = "";
        let read_only_base = false;

        if(status[value]) {
            base = status[value].base ? status[value].base : 0;
            effect = status[value].effect ? status[value].effect : 0;
            total = status[value].total ? status[value].total : 0;
            color = status[value].color ? status[value].color : "";
            color = color == "is-dark" ? "is-primary" : color;
            pre_total_extra = status[value].pre_total_extra ? status[value].pre_total_extra : "";
            post_total_extra = status[value].post_total_extra ? status[value].post_total_extra : "";
            read_only_base = status[value].read_only_base ? status[value].read_only_base : false;
        }

        innerHTML += `
            <div class="column is-one-fifth-fullhd is-4-tablet ${type === "Current-HP" ? " is-12-mobile" : "is-6-mobile"}" id="status">
                <div class="card p-4 is-flex is-flex-direction-column" style="height: 100%">
                    <div class="card-header is-justify-content-center">
                        <span class="title mt-4 pb-4 is-size-4 has-text-centered">${type}</span>
                    </div>
                    <hr class="m-1" style="background: var(--bulma-card-background-color)">
                    
                    <div class="card-content columns is-12 is-multiline m-0 p-0 mt-auto">
                        <div class="column is-6 is-align-content-center">
                            <span class="column is-12 is-size-5 has-text-weight-semibold is-block has-text-black has-text-centered m-0 p-0">Base</span>
                            ${read_only_base ?
            `<input class="column is-12 input is-size-5 has-text-weight-bold has-text-centered m-0 p-0" disabled type="text" placeholder="0" value="${base}">`
            :
            `<input id="${type}-base-input" class="column is-12 input is-size-5 has-text-weight-bold has-text-centered m-0 p-0" type="text" placeholder="0" value="${base}">`
        }
                        </div>
                        <div class="column is-6 is-align-content-center">
                            <span class="column is-12 is-size-5 has-text-weight-semibold is-block has-text-black has-text-centered m-0 p-0">${type === "Current-HP" ? "Shield" : "Effect"}</span>
                            <input id="${type}-effect-input" class="column is-12 input is-size-5 has-text-weight-bold has-text-centered m-0 p-0" type="text" placeholder="0" value="${effect}">
                        </div>
                        
                        <div class="column is-12">
                            <hr class="my-0 py-1" style="background: var(--bulma-card-background-color)">
                        </div>
                        
                        <div class="column is-12 is-align-content-center pt-0">
                            <span class="column is-12 is-size-5 has-text-weight-semibold is-block has-text-black has-text-centered m-0 p-0">Total</span>
                            <span class="column is-12 tag ${color ? color : "is-primary"} is-size-4 has-text-weight-extrabold has-text-centered is-align-content-center m-0 p-0">${pre_total_extra}${total}${post_total_extra}</span>
                        </div>
                    </div>
                </div>
            </div>
        `;
    });
    innerHTML += `    
        </div>
    `;

    innerHTML += `
        <div class="card mt-0 mr-0 mb-4 ml-0 p-2">
            
            <div class="columns is-mobile is-vcentered is-variable is-2 m-0 is-mobile is-multiline">
                
                <div class="column is-2-fullhd is-6-tablet is-6-mobile">
                    <span class="tag is-size-5 has-text-weight-bold is-primary has-text-centered is-flex is-justify-content-center w-100" style="height: 3rem; width: 100%; white-space: normal">Maximum Hit Die</span>
                </div>
                
                <div class="column is-1-fullhd is-6-tablet is-6-mobile">
                    <input id="maximum-hit-die-input" class="input is-size-5 has-text-weight-bold has-text-centered" style="height: 3rem;" type="text" placeholder="1d6" value="${maximum_hit_die}">
                </div>
                
                <div class="column is-2-fullhd is-4-tablet is-4-mobile">
                    <div class="tag is-danger is-flex is-justify-content-center" style="height: 3rem; width: 100%;">
                        <span class="icon is-medium mr-1">
                            <i class="fas fa-xl fa-skull has-text-white"></i>
                        </span>
    `;

    for(let i = 1; i <= 3; i++) {
        innerHTML += `
                        <input id="death-save-failure-${i}-checkbox" class="checkbox redCheck ml-1" type="checkbox" ${death_save_failure > 0 ? "checked" : ""}>
        `;
        death_save_failure--;
    }

    innerHTML += `
                    </div>              
                </div>
                
                <div class="column is-2-fullhd is-4-tablet is-4-mobile">
                    <div class="tag has-text-weight-bold is-primary is-flex is-justify-content-center" style="height: 3rem; width: 100%;">
                        <span class="subtitle is-block has-text-weight-bold has-text-centered" style="white-space: normal">Death Saves</span>
                    </div>
                </div>
                
                <div class="column is-2-fullhd is-4-tablet is-4-mobile">
                    <div class="tag is-success is-flex is-justify-content-center" style="height: 3rem; width: 100%;">
    `;

    for(let i = 1; i <= 3; i++) {
        innerHTML += `
                        <input id="death-save-success-${i}-checkbox" class="checkbox greenCheck mr-1" type="checkbox" ${death_save_success > 0 ? "checked" : ""}>
        `;
        death_save_success--;
    }

    innerHTML += `
                        <span class="icon ml-1">
                            <i class="fas fa-xl fa-heart-pulse has-text-white"></i>
                        </span>
                    </div>
                </div>
                
                <div class="column is-1-fullhd is-6-tablet is-6-mobile">
                    <input id="current-hit-die-input" class="input is-size-5 has-text-weight-bold has-text-centered" style="height: 3rem;" type="text" placeholder="1d6" value="${current_hit_die}">
                </div>
                
                <div class="column is-2-fullhd is-6-tablet is-6-mobile">
                    <span class="tag is-size-5 has-text-weight-bold is-primary has-text-centered is-flex is-justify-content-center" style="height: 3rem; width: 100%; white-space: normal">Current Hit Die</span>
                </div>
                
            </div>
        </div>
    `;


    return innerHTML;
}
