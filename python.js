const { spawn } = require('child_process');
const child = spawn('sudo', ['python3','public/modify.py']);
child.stdout.on('data', (data) => {
                console.log(`child stdout:\n${data}`);
                });

child.stderr.on('data', (data) => {
                console.error(`child stderr:\n${data}`);
                });
