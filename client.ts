import * as fs from "fs";
import * as net from "net";

const HOST = "localhost";
const PORT = 8080;
const FILEPATH = "D:\\Programming\\AvansTransfer\\client\\large.txt";

const client = new net.Socket();
const fileStream = fs.createReadStream(FILEPATH);

client.connect(PORT, HOST, () => {
  console.log("Connected to the server.");
  fileStream.on("readable", () => {
    let chunk;
    while (null !== (chunk = fileStream.read())) {
      client.write(chunk);
    }
  });

  fileStream.on("end", () => {
    console.log("File has been sent.");
    client.end();
  });
});

client.on("close", () => {
  console.log("Connection closed.");
});
