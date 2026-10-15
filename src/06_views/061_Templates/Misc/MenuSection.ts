export function createMenuSection(): string{
    let innerHTML = `
        <div class="box columns p-0 m-0 is-mobile is-multiline">
            <input id="import-character-input" type="file" class="is-hidden" accept=".json">
            <div class="column is-2-fullhd is-4-tablet is-12-mobile">
                <a id="import-character-button" class="button is-success is-flex is-justify-content-center p-4" style="height: 100%">
                    <span class="icon mr-0">
                        <i class="fas fa-file-import"></i>
                    </span>
                    <span class="title has-text-white pl-1 is-size-5 has-text-weight-semibold" style="white-space: normal;">Import</span>
                </a>
            </div>
            
            <div class="column is-2-fullhd is-4-tablet is-12-mobile">
                <a id="export-character-button" class="button is-info is-flex is-justify-content-center p-4" style="height: 100%">
                    <span class="icon mr-0">
                        <i class="fas fa-file-export"></i>
                    </span>
                    <span class="title has-text-white pl-1 is-size-5 has-text-weight-semibold" style="white-space: normal;">Export</span>
                </a>
            </div>
            
            <div class="column is-2-fullhd is-4-tablet is-12-mobile">            
                <a class="button is-love is-flex is-justify-content-center p-4" style="height: 100%" href="https://ko-fi.com/sk0rp1" target="_blank" rel="noopener noreferrer">
                    <span class="icon mr-0">
                        <i class="fas fa-hand-holding-heart"></i>
                    </span>
                    <span class="title has-text-white pl-1 is-size-5 has-text-weight-semibold" style="white-space: normal;">Support Me</span>
                </a>
            </div>
            
            <div class="column is-2-fullhd is-4-tablet is-12-mobile">            
                <a class="button is-github is-flex is-justify-content-center p-4" style="height: 100%" href="https://github.com/Sk0rpi/Skorpis-Awesome-DnD-Automated-Sheet" target="_blank" rel="noopener noreferrer">
                    <span class="icon mr-0">
                        <i class="fa-brands fa-github"></i>
                    </span>
                    <span class="title has-text-white pl-1 is-size-5 has-text-weight-semibold" style="white-space: normal;">Github</span>
                </a>
            </div>
            
            <div class="column is-2-fullhd is-4-tablet is-12-mobile">            
                <a id="create-character-button" class="button is-danger is-flex is-justify-content-center p-4" style="height: 100%">
                    <span class="icon mr-0">
                        <i class="fas fa-user-plus"></i>
                    </span>
                    <span class="title has-text-white pl-1 is-size-5 has-text-weight-semibold" style="white-space: normal;">Create New</span>
                </a>
            </div>
        </div>
    `;
    return innerHTML;
}
