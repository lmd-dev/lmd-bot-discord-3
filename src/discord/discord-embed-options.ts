export interface DiscordEmbedOptions
{
    color?: string;
    title?: string;
    linkURL?: string;
    description?: string;
    thumbnailURL?: string;
    author?: string;
    authorLinkURL?: string;
    authorThumbnailURL?: string;
    fields?: DiscordEmbedField[]; 
    imageURL?: string;
    date?: Date;
    footer?: string;
    footerThumbnailURL?: string;
}

export interface DiscordEmbedField
{
    name: string;
    value: string;
    inline?: boolean;
}