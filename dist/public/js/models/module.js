export class Module {
    constructor(data) {
        this._name = data?.name;
        this._jsFiles = [];
        this.jsFiles.push(...data.jsFiles);
        this.loadJS();
    }
    get name() { return this._name; }
    ;
    set name(value) { this._name = value; }
    get jsFiles() { return this._jsFiles; }
    ;
    async loadJS() {
        this.jsFiles.forEach(async (fileName) => {
            import(`/api/module-file/?filename=${fileName}`);
        });
    }
}
