const { exec } = require('child_process');
exec('bash start.sh', (err, stdout, stderr) => {
  if (err) {
    console.error(err)
  } else {
   console.log(`stdout: ${stdout}`);
   console.log(`stderr: ${stderr}`);
  }
});