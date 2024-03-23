import * as fs from "fs";
import * as net from "net";

const server = net.createServer();
const PORT = 8080;
const FILENAME = "output.file";

server.on("connection", (socket) => {
  console.log("Client connected.");
  const fileStream = fs.createWriteStream(FILENAME);

  socket.on("data", (chunk) => {
    console.log(`Received data chunk.`);
    fileStream.write(chunk);
  });

  socket.on("end", () => {
    console.log("Transfer is complete.");
    fileStream.close();
  });

  socket.on("error", (err) => {
    console.error("An error occurred:", err);
    fileStream.close();
  });
});

server.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
