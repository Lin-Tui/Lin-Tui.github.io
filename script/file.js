const fs = require('fs');
const targetPath = "../source/_posts";
const operateFiles = (targetPath) => {
    fs.readdir(targetPath, function(err, files) {
        if(err) {
            console.log('Error', err);
        } else {
            files.forEach((file) => {
                const filePath = `${targetPath}/${file}`;
                fs.stat(filePath, (err, stats) => {
                    if (err) {
                        console.log('Error File', file)
                    } else if (stats.isDirectory()) {
                        operateFiles(filePath)
                    } else if (stats.isFile()) {
                        const writeContent = `---\ntitle: ${file.substring(0, file.length - 3)}\ndate: ${stats.birthtimeMs}\ntags:\n- 前端\ncategory:\n- 技术笔记\n---\n`;
                        let data = fs.readFileSync(filePath, {encoding: 'utf8'});
                        data = writeContent + data;
                        fs.writeFileSync(filePath, data)
                    }
                })
            }) 
        }
    })
}

operateFiles(targetPath)