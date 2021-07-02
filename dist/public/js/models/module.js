export class Module {
    /**
     * Constructor
     * @param data Data of the module
     */
    constructor(data) {
        this._name = data?.name;
        this._jsFiles = [];
        this._jsFiles.push(...data.jsFiles);
        this.loadJS();
    }
    get name() { return this._name; }
    ;
    async loadJS() {
        this._jsFiles.forEach(async (fileName) => {
            await import(`/api/module-file/?filename=${fileName}`);
        });
    }
}
