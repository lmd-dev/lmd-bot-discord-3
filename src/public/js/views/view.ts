export interface TabData
{
    tabName: string;
    displayMethod: (view: View) => Element[];
}

export interface TabsData
{
    tabs: TabData[];
}

export class View
{
    private readonly _container: HTMLElement | null;

    /**
     * Constructor
     * @param container HTML container for the view 
     */
    constructor(container: HTMLElement | null)
    {
        this._container = container;
    }

    /**
     * Returns the first element that is a descendant of node that matches selectors.
     * @param cssSelector Searched css selectors
     * @returns The first element that matches selectors
     */
    querySelector(cssSelector: string): Element | null
    {
        return this._container?.querySelector(cssSelector) ?? null;
    }

    /**
     * Returns all element descendants of node that match selectors.
     * @param cssSelector Searched css selectors
     * @returns All element descendants of node that match selectors
     */
    querySelectorAll(cssSelector: string): NodeList
    {
        return this._container?.querySelectorAll(cssSelector) ?? new NodeList();
    }

    /**
     * Appends child element to the container of the view
     * @param child Element to append
     */
    appendChild(child: Element)
    {
        console.log(this._container);
        console.log(child);
        this._container?.appendChild(child);
    }

    /**
     * Appends tabs inside the view
     * @param tabsData Description of tabs to add
     */
    appendTabs(tabsData: TabsData)
    {
        const tabs = document.createElement("div");
        tabs.classList.add("tabs");

        const panels = document.createElement("div");
        panels.classList.add("panels");

        tabsData.tabs.forEach((tabData) => {
            const tab = document.createElement("div");
            tab.classList.add("tab");
            tab.innerText = tabData.tabName;

            const panel = document.createElement("div");
            panel.classList.add("panel");
            
            const panelItems = tabData.displayMethod(this);
            panelItems.forEach((panelItem) => {
                panel.appendChild(panelItem);
            });

            tabs.appendChild(tab);
            panels.appendChild(panel);
        });

        this._container?.appendChild(tabs);
        this._container?.appendChild(panels);
    }
}