"use server";

import { readFile, writeFile } from "fs/promises";

const localPath=process.env['CSS_THEME_PATH']||'./__local-theme.css';

export async function saveLocalTheme(themeCode:string){
    let current='';
    try{
        current=(await readFile(localPath)).toString();
    }catch{}
    const reg=/^((.|\n|\r)*)(\/\*+[ \t]*START_THEME[ \t]*\*+\/)(.|\n|\r)*(\/\*+[ \t]*END_THEME[ \t]*\*+\/)((.|\n|\r)*)$/;
    const match=reg.exec(current);
    if(match){
        themeCode=`${match[1]}${match[3]}\n${themeCode}\n${match[5]}${match[6]}`
    }else{
        themeCode=`/**** START_THEME ****/\n${themeCode}\n/**** END_THEME ****/`;
    }
    await writeFile(localPath,themeCode);
    return 'done';
}