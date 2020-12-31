const Pusher = require("pusher");

const pusher = new Pusher({
  appId: "1130812",
  key: "ed5fec5cf477e3e6fa5a",
  secret: "749637e57bc2439a64aa",
  cluster: "us2",
  useTLS: true
});

pusher.trigger("app", "abcabc", {
  message: "tiagorosadacost@gmail.com readed email ✓✓"
});