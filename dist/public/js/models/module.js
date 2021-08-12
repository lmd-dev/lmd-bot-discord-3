export class Module {
    /**
     * Constructor
     * @param data Data of the module
     */
    constructor(data) {
        this._name = data?.name;
        this._entryPointFileName = data?.entryPointFileName ?? null;
        this._entryPointClassName = data?.entryPointClassName ?? null;
        this._entryPoint = null;
        this.loadJS();
    }
    get name() { return this._name; }
    ;
    async loadJS() {
        if (this._entryPointFileName && this._entryPointClassName) {
            const module = await import(`/api/module-file/${this.name}/${this._entryPointFileName}`);
            this._entryPoint = new module[this._entryPointClassName]();
        }
    }
    initView(view) {
        this._entryPoint?.initView(view);
    }
}
