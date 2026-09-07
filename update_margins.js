const fs = require('fs');
const path = require('path');

function processDir(dir) {
    const files = fs.readdirSync(dir);
    for (const file of files) {
        const fullPath = path.join(dir, file);
        if (fs.statSync(fullPath).isDirectory()) {
            processDir(fullPath);
        } else if (fullPath.endsWith('.tsx')) {
            let content = fs.readFileSync(fullPath, 'utf8');

            // Regex to match <section ... className="...">
            const regex = /<section[^>]*className=["']([^"']+)["']/g;
            let newContent = content.replace(regex, (match, classNames) => {
                let newClasses = classNames.split(/\s+/).filter(c => {
                    return !/^mt-\d+$/.test(c) && 
                           !/^mb-\d+$/.test(c) && 
                           !/^my-\d+$/.test(c) && 
                           !/^lg:mt-\d+$/.test(c) && 
                           !/^lg:mb-\d+$/.test(c) && 
                           !/^xl:mt-\d+$/.test(c) && 
                           !/^sm:mt-\d+$/.test(c) && 
                           !/^md:mt-\d+$/.test(c);
                });
                
                // Don't add mt-10 if it's already there (though filter removed it, so we add it once)
                newClasses.push('mt-10');
                
                return match.replace(classNames, newClasses.join(' '));
            });

            if (content !== newContent) {
                fs.writeFileSync(fullPath, newContent);
                console.log('Updated: ' + fullPath);
            }
        }
    }
}

const dirs = [
    'src/components/home',
    'src/components/about',
    'src/components/features',
    'src/components/how_work',
    'src/components/faqs',
    'src/components/contact',
    'src/components/blog'
];

dirs.forEach(d => {
    const full = path.join('f:/heartView', d);
    if (fs.existsSync(full)) {
        processDir(full);
    }
});
