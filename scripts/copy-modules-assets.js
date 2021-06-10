const fs = require("fs/promises");

const srcPath = "./src/modules";
const distPath = "./dist/modules";

async function copyModulesAssets()
{
    try
    {
        const files = await fs.readdir(`${srcPath}`, { withFileTypes: true })

        for (const file of files)
        {
            if (file.isDirectory())
                copyModuleAssets(file.name);
        }
    }
    catch (error)
    {
    }
}

async function copyModuleAssets(moduleName)
{
    const srcAssets = `${srcPath}/${moduleName}/assets`;
    const distAssets = `${distPath}/${moduleName}/assets`;

    try
    {
        await fs.access(srcAssets);

        try
        {
            await fs.rmdir(distAssets);
        } 
        catch (error)
        {

        }

        await copyDirectory(srcAssets, distAssets);
    }
    catch (error)
    {
    }
}

async function copyDirectory(sourcePath, targetPath)
{
    await fs.mkdir(targetPath);

    const files = await fs.readdir(sourcePath, { withFileTypes: true });

    for (const file of files)
    {
        if (file.isDirectory())
            await copyDirectory(`${sourcePath}/${file.name}`, `${targetPath}/${file.name}`);
        else
            await fs.copyFile(`${sourcePath}/${file.name}`, `${targetPath}/${file.name}`);
    }
}

copyModulesAssets();