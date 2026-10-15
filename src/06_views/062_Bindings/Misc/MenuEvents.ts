export function bindMenuEvents(): void {
    const importCharacterInput = document.getElementById('import-character-input') as HTMLInputElement;
    const importCharacterButton = document.getElementById('import-character-button') as HTMLButtonElement;
    const exportCharacterButton = document.getElementById('export-character-button') as HTMLButtonElement;
    const createCharacterButton = document.getElementById('create-character-button') as HTMLButtonElement;

    importCharacterButton.addEventListener('click', (event): void => {
        importCharacterInput.click();
    })

    importCharacterInput.addEventListener('change', (event): void => {
        const target = event.currentTarget as HTMLInputElement;
        const id = target.id;
        const files = target.files;

        if (files && files.length > 0) {
            const file = files[0];
            this.viewModel.handleMenuClick(id, file)
        }
    })

    exportCharacterButton.addEventListener('click', (event): void => {
        const target = event.currentTarget as HTMLInputElement;
        const id = target.id;
        this.viewModel.handleMenuClick(id, null);
    })

    createCharacterButton.addEventListener('click', (event): void => {
        const target = event.currentTarget as HTMLInputElement;
        const id = target.id;
        this.viewModel.handleMenuClick(id, null);
    })
}