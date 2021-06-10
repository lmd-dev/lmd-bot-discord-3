export interface ModuleData
{
    name: string;
    jsFiles: string[];
}

export class Module
{
    private _name: string;
    public get name(): string { return this._name; };
    public set name(value: string) { this._name = value; }

    private _jsFiles: string[];
    public get jsFiles(): string[] { return this._jsFiles; };
    
    
    constructor(data: ModuleData)
    {
        this._name = data?.name;
        this._jsFiles = [];
        this.jsFiles.push(...data.jsFiles);

        this.loadJS();
    }

    async loadJS()
    {
        this.jsFiles.forEach(async (fileName) => {
            import(`/api/module-file/?filename=${fileName}`);
        });
    }
}