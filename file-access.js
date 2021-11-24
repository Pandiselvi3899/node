const fs=require("fs");
fs.readFile("./cool.txt", "utf-8", function (err,content) {
    if(err) {
        console.log(err);
    }
    console.log(content);
});

const quote ="No beauty shines brighter than that of a good heart";
// fs.writeFile("./awesome.txt", "quote", function(err) {
//     console.log("Completed writing!!!");
// });

// const quote2 ="\nLive more ,worry less";

// fs.appendFile("./awesome.txt", "quote 2", function(err) {
//     console.log("Added to the file!!!");
//  });

//  fs.unlink("./backups/text1.js",function (err) {
//      console.log("Removed the file!!!");
//  });

// //10 files -inside backups 
// //text-1.html,text2.html...text10.html - Good morning!!!

// const htmlData = "Good Morning!!!";

// for(let i = 1; i <= 10;i++) {
//     fs.writeFile(`./backups/text-${i}.html`, htmlData, function (err) {
//         console.log("Completed writing!!!",i);
//     });

       //async
       //fs.writeFileSync

// }
// fs.readdir("./backups" , function (err, files) {
//     console.log(files);
// });

// //task
// //delete all 10 files in backups


// for (let i=1;i <= 10;i++) {
//     fs.unlink(`./backups/text-${i}.html`, function (err) {
//         console.log("Removed the file!!!",i);
//     });
// }
    
 

//task to remove all files in backups
//unknown-no.of files in backups&name of the files


// readdir & unlink(delete)

function removeFile(file) {
    fs.unlink(`./backups/${file}`, function (err) {
        console.log("Removed the file!!!", file);
    });
}

fs.readdir("./backups" , function (err, files) {
console.log(files);
files.forEach((file) => removeFile(file));
        
});